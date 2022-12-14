const Helper = require('../../nodejs/Helper')
const Utils = require('../_utils/Utils')
const process = require('process')
const fs = require('fs');


const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day09-input-test2.txt', 'utf-8'); break
  case 'TEST1':
    fileContent = fs.readFileSync('input/day09-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day09-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const input = fileContent.split('\r\n')

// Get Needed Classes
const Vector = Utils.Vector

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

///////////////////////////////////////////////////////////

Vector.prototype.limit = function (vector) {
  // Getting all numbers, especially diagonals in range [1,-1] for movement
  const signX = this.x >= 0 ? 1 : -1
  const signY = this.y >= 0 ? 1 : -1
  this.set(
    this.y != 0 ? this.y / this.y * signY : this.y,
    this.x != 0 ? this.x / this.x * signX : this.x
  )

  return this
}


///////////////////////////////////////////////////////////

const GRID_BOUNDS = {
  EMPTY: '.',
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

  return Array(GRID_BOUNDS.y.length).fill(GRID_BOUNDS.EMPTY)
    .map(v => Array(GRID_BOUNDS.x.length).fill(GRID_BOUNDS.EMPTY).map(v => v))

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

function printableGrid(rope) {

  // Horrible garbage Code
  const visitedInRange = Object.keys(Rope.VISITED)
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

  while (rope) {
    // Invert X-Axis, since Y(0) of GRID is Highest Row in GRID
    const hrope = convertRange(rope)
    GRID[hrope.y][hrope.x] = GRID[hrope.y][hrope.x] == GRID_BOUNDS.EMPTY || GRID[hrope.y][hrope.x] == '#' ? rope.char : GRID[hrope.y][hrope.x]

    // Move to next Rope Node
    rope = rope.next
  }

  return Helper.printMatrix(GRID, true, 2)

}


///////////////////////////////////////////////////////////

class Rope extends Vector {

  static VISITED = {}
  static STEPPING_DIRECTIONS = {
    'U': new Vector(1, 0),
    'R': new Vector(0, 1),
    'D': new Vector(-1, 0),
    'L': new Vector(0, -1),
  }

  constructor(len, isHead) {
    super(0, 0)
    this.char = isHead ?? true ? 'H' : len
    this.len = len
    this.next = len > 1 ? new Rope(len - 1, false) : null

    this.isHead = isHead
    this.isTail = null == this.next
  }

  adjustGridSize() {
    // Since Grid Size is not Known before, dynamically increase it.
    GRID_BOUNDS.x.max = Math.max(GRID_BOUNDS.x.max, this.x)
    GRID_BOUNDS.y.max = Math.max(GRID_BOUNDS.y.max, this.y)
    GRID_BOUNDS.x.min = Math.min(GRID_BOUNDS.x.min, this.x)
    GRID_BOUNDS.y.min = Math.min(GRID_BOUNDS.y.min, this.y)
  }

  follow(predecessor) {

    if (this.dist(predecessor) >= 2) {
      this.add(Vector.sub(predecessor, this).limit())
      this.adjustGridSize()
      // Call Recursivley on following rope parts to move whole rope
      this.next?.follow(this)
    }

    if (this.isTail)
      Rope.VISITED[[this.y, this.x]] = true
  }

  step(vector) {

    this.add(vector)
    this.adjustGridSize()

    // Running recursivley on all Nodes
    this.next?.follow(this)

  }

}

const ropeHead = new Rope(10)

// Step through instructions
input.map(v => v.split(' '))
  .forEach(([direction, steps]) => {
    console.log(`== ${direction} ${steps} ==`)

    for (let i = 0; i < steps; i++) {
      ropeHead.step(Rope.STEPPING_DIRECTIONS[direction])
      if (argument.includes('TEST'))
        console.log(printableGrid(ropeHead))
    }

  })


console.log('||| Finished Simulation|||')

if (!argument.includes('TEST'))
  fs.writeFileSync(`./day09-part2.${argument.toLowerCase()}.txt`, printableGrid(ropeHead), 'utf-8')


console.log(`\n The Rope Tail has visited ${Object.keys(Rope.VISITED).length} Places.`)
console.log()
