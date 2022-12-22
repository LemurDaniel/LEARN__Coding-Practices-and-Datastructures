const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day22-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day22-part1.js INPUT'    to process Todays input from 'day22-input.txt'.
//
//  Enter:
//    'node .\day22-part1.js TEST'     to process Todays Testinput from 'day22-input-test.txt'.
//    'node .\day22-part1.js'          to process Todays Testinput from 'day22-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day22-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day22-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const Input = fileContent.split('\r\n\r\n')

const board = Input[0].split('\r\n').map(v => v.split(''))
const instructions = Input[1].replace(/([RL]{1})/g, `-$1-`).split('-')
  .map(v => 'LR'.includes(v) ? v : parseInt(v))

const Characters = {
  WALL: '#',
  EMPTY: ' ',
  FIELD: '.'
}

// Get Needed Classes
const Vector2D = Datastructures.Vector2D
const VectorBase = Datastructures.VectorBase

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

class Range extends VectorBase {

  static ALL = {}

  static byName(name) {
    return this.ALL[[this, name]]
  }

  get start() {
    return this.dimension[0]
  }

  get end() {
    return this.dimension[1]
  }

  constructor(name, start, end) {
    super(start, end)
    this.name = name
  }

  add() {
    this.constructor.ALL[[this.constructor, this.name]] = this
  }
}

class BoundsY extends Range { }
class BoundsX extends Range { }

///////////////////////////////////////////////////////////////

const Positions = {}

for (let row = 0; row < board.length; row++) {

  let colStart = null
  let colEnd = 0
  for (let col = 0; col < board[row].length; col++) {
    if (board[row][col] != Characters.EMPTY) {
      // Make a dictionary for all Positions.
      const pos = new Vector2D(col, row)
      Positions[pos] = board[row][col]

      // Make a dictionary for looking at all Bound on each line.
      colEnd = col
      colStart = colStart ?? col
    }
  }
  new BoundsX(row, colStart, colEnd).add()
}

for (let col = 0; col < board[0].length; col++) {

  let rowStart = null
  let rowEnd = 0
  for (let row = 0; row < board.length; row++) {
    if (board[row][col] != Characters.EMPTY) {

      // Make a dictionary for looking at all Bound on each line.
      rowEnd = row
      rowStart = rowStart ?? row
    }
  }
  new BoundsY(col, rowStart, rowEnd).add()
}

///////////////////////////////////////////////////////////////

class Mover extends Vector2D {

  get direction() {
    const [PI, TAU] = [Math.PI, 2 * Math.PI]
    //const angle = (TAU - (PI/2) * this.facing) % TAU
    // Because in grid moving down is down and down is up.
    // Moving down is increasing row, means Plus.
    const angle = PI / 2 * this.facing
    return Vector2D.fromAngle(angle).round()
  }

  constructor(x, y) {
    super(x, y)
    this.facing = 0
  }

  rotate(direction) {
    switch (direction) {
      case 'R':
        this.facing = (this.facing + 1) % 4; break;
      case 'L':
        this.facing = (this.facing + 4 - 1) % 4; break;
      default:
        throw `Invalid Operation: ${direction}`
    }
  }

  move(number) {
    const direction = this.direction
    const nextPos = this.copy

    while (number--) {
      nextPos.add(direction)

      const boundX = BoundsX.byName(this.y)
      const boundY = BoundsY.byName(this.x)

      if (nextPos.x > boundX.end) nextPos.x = boundX.start
      if (nextPos.x < boundX.start) nextPos.x = boundX.end
      if (nextPos.y > boundY.end) nextPos.y = boundY.start
      if (nextPos.y < boundY.start) nextPos.y = boundY.end

      if (Positions[nextPos] == Characters.WALL)
        return

      this.x = nextPos.x
      this.y = nextPos.y
    }
  }
}

///////////////////////////////////////////////////////////////

const mover = new Mover(BoundsX.byName(0).start, 0)
for (const instr of instructions) {

  if ('LR'.includes(instr))
    mover.rotate(instr)
  else
    mover.move(instr)

}

///////////////////////////////////////////////////////////////

// Plus 1, since Grid in Puzzle start at 1 not 0, but grid here is zerobased.
const finalCol = mover.x + 1
const finalRow = mover.y + 1
const solution = 1_000 * finalRow + 4 * finalCol + mover.facing
console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`After following the Monkeys' notes, the resulting password is: '${solution.toLocaleString()}'`)
console.log(`Your final Position is at (${finalCol}, ${finalRow})`)
console.log()
console.groupEnd()