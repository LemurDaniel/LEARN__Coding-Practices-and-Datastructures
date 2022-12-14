const Helper = require('../../nodejs/Helper')
const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');


const argument = process.argv[2] ?? 'TEST'
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day09-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day09-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const input = fileContent.split('\r\n')

// Get Needed Classes
const Vector = Datastructures.Vector

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

///////////////////////////////////////////////////////////

const GRID_BOUNDS = {
  x: {
    min: 0,
    max: 0,
    get length() {
      return this.max + Math.abs(this.min) + 1
    }
  },
  y: {
    min: 0,
    max: 0,
    get length() {
      return this.max + Math.abs(this.min) + 1
    }
  }
}

function genGrid() {

  return Array(GRID_BOUNDS.y.length).fill('.')
    .map(v => Array(GRID_BOUNDS.x.length).fill('.').map(v => v))

}

function convertRange(vector) {

  vector = vector.copy
  // Move Vectors in Positive Range for putting in Grid
  vector.add(
    Math.abs(GRID_BOUNDS.y.min),
    Math.abs(GRID_BOUNDS.x.min)
  )

  // Invert Y-Axis since Y(Min) is Highest Row in Grid and Y(Max) row 0. 
  vector.set(
    GRID_BOUNDS.y.length - vector.y - 1,
    vector.x
  )

  return vector
}

function printableGrid(head, tail, visited) {

  // Horrible garbage Code
  const visitedInRange = Object.keys(visited)
    .map(v => v.split(','))
    .map(v => new Vector(v[0], v[1]))
    .map(v => convertRange(v))
    .map(v => [v.y, v.x])
    .map(v => ({ [v]: v }))
    .reduce((acc, v) => ({ ...acc, ...v }), {})

  const GRID = genGrid().map((row, rowIdx) =>
    // Invert Y-Axis since Y(Min) is Highest Row in Grid and Y(Max) row 0. 
    row.map((col, colIdx) => [rowIdx, colIdx])
      .map(pos => pos in visitedInRange ? '#' : '.')
  )


  // Invert X-Axis, since Y(0) of GRID is Highest Row in GRID
  //console.log(GRID_BOUNDS.y, GRID_BOUNDS.x)
  //console.log(head, tail)
  const hPrint = convertRange(head)
  const tPrint = convertRange(tail)
  //console.log(hPrint, tPrint)

  GRID[hPrint.y][hPrint.x] = 'H'
  GRID[tPrint.y][tPrint.x] = 'T'

  // console.log(hPrint, tPrint)
  return Helper.printMatrix(GRID, true, 2)

}


///////////////////////////////////////////////////////////

const visited = {}
const head = new Vector(0, 0)
const tail = new Vector(0, 0)

///////////////////////////////////////////////////////////

function step(direction, steps) {

  const steppingDirection = {
    'U': new Vector(1, 0),
    'R': new Vector(0, 1),
    'D': new Vector(-1, 0),
    'L': new Vector(0, -1),
  }[direction]


  console.log(`== ${direction} ${steps} ==`)

  for (let i = 0; i < steps; i++) {
    const headOld = head.copy
    // Calculate new Tail
    head.add(steppingDirection)

    // console.log(head, tail, head.dist(tail))

    // Tail always ends on old Position of Head,
    // When Distance is >= 2 // diagonal distance is sqrt(2)
    if (head.dist(tail) >= 2)
      tail.set(headOld)

    // Since Grid Size is not Known before, dynamically increase it.
    GRID_BOUNDS.x.max = Math.max(GRID_BOUNDS.x.max, tail.x, head.x)
    GRID_BOUNDS.y.max = Math.max(GRID_BOUNDS.y.max, tail.y, head.y)
    GRID_BOUNDS.x.min = Math.min(GRID_BOUNDS.x.min, tail.x, head.x)
    GRID_BOUNDS.y.min = Math.min(GRID_BOUNDS.y.min, tail.y, head.y)

    visited[[tail.y, tail.x]] = true


    if (argument.includes('TEST'))
      console.log(printableGrid(head, tail, visited))

  }

}


// Step through instructions
input.map(v => v.split(' '))
  .forEach(([direction, steps]) => step(direction, steps))

console.log('||| Finished |||')

if (!argument.includes('TEST'))
  fs.writeFileSync(`./day09-part1.${argument.toLowerCase()}.txt`, printableGrid(head, tail, visited), 'utf-8')


console.log(`\n The Rope Tail has visited ${Object.keys(visited).length} Places.`)
console.log()