const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day14-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day14-part1.js INPUT'    to process Todays input from 'day14-input.txt'.
//
//  Enter:
//    'node .\day14-part1.js TEST'     to process Todays Testinput from 'day14-input-test.txt'.
//    'node .\day14-part1.js'          to process Todays Testinput from 'day14-input-test.txt'.

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


///////////////////////////////////////////////////////////////

const SourceVector = new Vector(500, 0)
const Bounds = {
  min: new Vector(500, 0),
  max: new Vector(500, 0)
}
const Characters = {
  AIR: argument.includes('TEST') ? '.' : `⚪`,
  ROCK: argument.includes('TEST') ? '#' : `🪨`,
  SOURCE: argument.includes('TEST') ? '+' : `👾`,
  SAND: argument.includes('TEST') ? 'O' : `🥪` // Couldn't Find Sand-Emoji, but Sandwich is close enough for me.
}

const POSITIONS = {}
POSITIONS.is = function (vector, character) {
  return (this[vector] ?? Characters['AIR']) == Characters[character]
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

  }
}

const Lines = input.map(
  line => line.map(
    vector => new Vector(...vector.split(','))
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
    new Vector(-1, 1),  // DownLeft
    new Vector(0, 1)    // Down
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

    // Assume sandFlocks falling into Abyss, when Numbers go crazy
    if (i > 1_000) return false

  }

  Bounds.max.y = Math.max(Bounds.max.y, sandFlock.y)
  Bounds.max.x = Math.max(Bounds.max.x, sandFlock.x)
  Bounds.min.y = Math.min(Bounds.min.y, sandFlock.y)
  Bounds.min.x = Math.min(Bounds.min.x, sandFlock.x)

  // Finalize Sandflock position
  POSITIONS[sandFlock] = Characters['SAND']
  return true

}


///////////////////////////////////////////////////////////////

// Process Flocks until falling into infinity
while (processNextSandFlock()) { }

const restingSandFlocks = Object.keys(POSITIONS).filter(v => POSITIONS[v] == Characters['SAND'])

console.log('\n///////////////////////////////////////////////////////////////')

console.log(restingSandFlocks)

console.log(`\n  There is a total of ${restingSandFlocks.length} before the Start falling into the Abyss\n`)


///////////////////////////////////////////////////////////////

/// Visuals 

Bounds.max.add(1, 1)
Bounds.min.sub(1, 1)

const visual = new Array(Bounds.max.y - Bounds.min.y + 1).fill(Characters.AIR)
  .map((row, rowIdx) =>
    Array(Bounds.max.x - Bounds.min.x + 1)
      .fill(Characters.AIR)
      .map((col, colIdx) => new Vector(colIdx + Bounds.min.x, rowIdx + Bounds.min.y))
      .map(vector =>
        vector.is(SourceVector) ? Characters.SOURCE : ((POSITIONS[vector] ?? Characters.AIR)))
  )

if (argument.includes('TEST'))
  console.log(Utils.Print.fromMatrix(visual, 2))
else
  fs.writeFileSync(`./day14-part1.${argument.toLowerCase()}.txt`, Utils.Print.fromMatrix(visual, 1, false), 'utf-8')
