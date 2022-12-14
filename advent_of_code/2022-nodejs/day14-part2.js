const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day14-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day14-part2.js INPUT'    to process Todays input from 'day14-input.txt'.
//
//  Enter:
//    'node .\day14-part2.js TEST'     to process Todays Testinput from 'day14-input-test.txt'.
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
const Vector = Datastructures.Vector

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


//////////////////////////////////////////////////////////////
const FloorVector = new Vector(0, 0)
const SourceVector = new Vector(0, 500)

const Bounds = {
  min: new Vector(0, 500),
  max: new Vector(0, 500)
}
const Characters = {
  AIR: argument.includes('TEST') ? '.' : `⚪`,
  ROCK: argument.includes('TEST') ? '#' : `🪨`,
  SOURCE: argument.includes('TEST') ? '+' : `👾`,
  SAND: argument.includes('TEST') ? 'O' : `🥪` // Couldn't Find Sand-Emoji, but Sandwich is close enough for me.
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
  ).reverse().map(
    (vector, index, arr) => {
      Bounds.max.y = Math.max(Bounds.max.y, vector.y)
      Bounds.max.x = Math.max(Bounds.max.x, vector.x)
      Bounds.min.y = Math.min(Bounds.min.y, vector.y)
      Bounds.min.x = Math.min(Bounds.min.x, vector.x)
      return vector.sub(arr[index + 1] ?? Vector.NULL)
    })
).forEach(line => processLine(line))

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

  Bounds.max.y = Math.max(Bounds.max.y, sandFlock.y)
  Bounds.max.x = Math.max(Bounds.max.x, sandFlock.x)
  Bounds.min.y = Math.min(Bounds.min.y, sandFlock.y)
  Bounds.min.x = Math.min(Bounds.min.x, sandFlock.x)

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


///////////////////////////////////////////////////////////////

/// Visuals 

Bounds.max.add(1, 1)
Bounds.min.sub(1, 1)

const visual = new Array(Bounds.max.y - Bounds.min.y + 1).fill(Characters.AIR)
  .map((row, rowIdx) =>
    Array(Bounds.max.x - Bounds.min.x + 1)
      .fill(Characters.AIR)
      .map((col, colIdx) => new Vector(rowIdx + Bounds.min.y, colIdx + Bounds.min.x))
      .map(vector =>
        vector.is(SourceVector) ? Characters.SOURCE : (vector.y == FloorVector.y ? Characters.ROCK : (POSITIONS[vector] ?? Characters.AIR)))
  )


// With emojies the offset seem off in the output, but the file seems to work on my machine
if (argument.includes('TEST'))
  console.log(Utils.Print.fromMatrix(visual, 2))
else
  fs.writeFileSync(`./day14-part2.${argument.toLowerCase()}.txt`, Utils.Print.fromMatrix(visual, 1, false), 'utf-8')
