const Helper = require('../../nodejs/Helper')
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

const input = fileContent.split('\r\n')

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

///////////////////////////////////////////////////////////

class Vector {

  get copy() {
    return new Vector(this.y, this.x)
  }

  get heading() {
    const [PI, TAU] = [Math.PI, Math.PI * 2]

    if (this.x == 0)
      return this.y > 0 ? (PI / 2) : (3 * PI / 2)

    if (this.x > 0)
      // Add TAU and do Modulo to not get the negative angle like -90, but 270 instead as radians in this case.
      return (TAU + Math.atan(this.y / this.x)) % TAU

    if (this.x < 0)
      return Math.PI + Math.atan(this.y / this.x)
  }

  get magnitue() {
    return Math.sqrt(Math.pow(this.y - this.y, 2))
  }

  constructor(y, x) {
    this.y = parseInt(y)
    this.x = parseInt(x)
  }

  toString() {
    return `(${this.y}; ${this.x})`
  }

  dist(vector) {
    return Math.sqrt(Math.pow(this.y - vector.y, 2) + Math.pow(this.x - vector.x, 2))
  }

  set(vector) {
    this.y = vector.y
    this.x = vector.x
    return
  }

  add(vector) {
    this.y += vector.y
    this.x += vector.x
    return this
  }

  diff(vector) {
    return new Vector(
      this.y - vector.y,
      this.x - vector.x
    )
  }

  round() {
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
  }

  limit() {
    // Getting all numbers, especially diagonals in range [1,-1] for movement
    const signX = this.x >= 0 ? 1 : -1
    const signY = this.y >= 0 ? 1 : -1
    this.x = this.x != 0 ? this.x / this.x * signX : this.x
    this.y = this.y != 0 ? this.y / this.y * signY : this.y

    return this
  }
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
  vector.x += Math.abs(GRID_BOUNDS.x.min)
  vector.y += Math.abs(GRID_BOUNDS.y.min)

  // Invert Y-Axis since Y(Min) is Highest Row in Grid and Y(Max) row 0. 
  vector.y = GRID_BOUNDS.y.length - vector.y - 1

  return vector
}

function print(rope) {

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

  console.log(Helper.printMatrix(GRID, true, 2))

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

      const diff = predecessor.diff(this)
      diff.x = diff.x ? diff.x / diff.x : diff.x
      diff.y = diff.y ? diff.y / diff.y : diff.y

      this.add(predecessor.diff(this).limit())
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
      if (argument.includes('TEST')) print(ropeHead)
    }

  })


console.log('||| Finished Simulation|||')

console.log(`\n The Rope Tail has visited ${Object.keys(Rope.VISITED).length} Places.`)
console.log()