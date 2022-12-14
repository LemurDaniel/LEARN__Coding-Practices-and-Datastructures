const Helper = require('../../nodejs/Helper')
const Utils = require('../_utils/Utils')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day14-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day14-part2.js INPUT'    to process Todays input from 'day14-input.txt'.
//
//  Enter:
//    'node .\day14-part2.js INPUT'    to process Todays Testinput from 'day14-input-test.txt'.
//    'node .\day14-part2.js'          to process Todays Testinput from 'day14-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day14-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day14-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const input = fileContent.split('\r\n').map(v => v.split(' -> '))

// Get Needed Classes
const Vector = Utils.Vector

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


///////////////////////////////////////////////////////////////

const FloorVector = new Vector(0, 0)
const SourceVector = new Vector(0, 500)
const Characters = {
  AIR: '.',
  ROCK: '#',
  SOURCE: '+',
  SAND: 'O'
}

const POSITIONS = {}
POSITIONS.is = function (vector, character) {
  return vector.y < FloorVector.y && (this[vector] ?? Characters['AIR']) == Characters[character]
}

function processLine(line) {

  const vectors = line.map(v => v)
  const position = vectors.pop().copy
  POSITIONS[position] = Characters['ROCK']

  while (vectors.length > 0) {

    const delta = vectors.pop()
    const target = Vector.add(position, delta)
    const step = delta.copy.limit()

    while (!position.is(target)) {
      position.add(step)
      POSITIONS[position] = Characters['ROCK']
    }

    if (position.y + 2 > FloorVector.y)
      FloorVector.set(new Vector(position.y + 2, 0))
  }
}

const Lines = input.map(
  line => line.map(
    vector => new Vector(...vector.split(',').reverse())
  )
    .reverse().map(
      (v, i, arr) => v.sub(arr[i + 1] ?? Vector.NULL)
    )
)
  .forEach(line => processLine(line))

///////////////////////////////////////////////////////////////

function processNextSandFlock() {

  const sandFlock = SourceVector.copy
  const directions = [
    new Vector(1, 1),   // DownRiht
    new Vector(1, -1),  // DownLeft
    new Vector(1, 0)    // Down
  ]

  for (let i = 0; ; i++) {

    // Filter out next valid positions
    const nextPositions = directions
      .map(vector => Vector.add(sandFlock, vector))
      .filter(vector => POSITIONS.is(vector, 'AIR'))

    //console.log(nextPositions)
    if (nextPositions.length != 0)
      sandFlock.set(nextPositions.pop())
    else
      break

  }

  // Finalize Sandflock position
  POSITIONS[sandFlock] = Characters['SAND']
  return sandFlock

}


///////////////////////////////////////////////////////////////

console.log('\nThis might take a few seconds... \n')

// Process flocks until source is covered
while (!processNextSandFlock().is(SourceVector)) { }

const restingSandFlocks = Object.keys(POSITIONS).filter(v => POSITIONS[v] == Characters['SAND'])

console.clear()
console.log('\n///////////////////////////////////////////////////////////////')

console.log(`\n  There is a total of ${restingSandFlocks.length} before until the Sandsource is covered.\n`)
