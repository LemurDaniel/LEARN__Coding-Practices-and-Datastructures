const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day23-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day23-part2.js INPUT'    to process Todays input from 'day23-input.txt'.
//
//  Enter:
//    'node .\day23-part2.js TEST'     to process Todays Testinput from 'day23-input-test.txt'.
//    'node .\day23-part2.js'          to process Todays Testinput from 'day23-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day23-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day23-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const Input = fileContent.split('\r\n').map(v => v.split(''))

// Get Needed Classes
const Vector2D = Datastructures.Vector2D
const CoordinateGrid = Datastructures.CoordinateGrid

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


class Elf extends Vector2D {

  static MoveSetOrder = [
    // E | SE | S | SW | W | NW | N | NE
    ['North', surroundings => (surroundings & 0b00000111) == 0, elf => Vector2D.add(elf, 0, -1)],
    ['South', surroundings => (surroundings & 0b01110000) == 0, elf => Vector2D.add(elf, 0, 1)],
    ['West', surroundings => (surroundings & 0b00011100) == 0, elf => Vector2D.add(elf, -1, 0)],
    ['East', surroundings => (surroundings & 0b11000001) == 0, elf => Vector2D.add(elf, 1, 0)]
  ]

  static CoordinateGrid = new CoordinateGrid()
  static Proposals = {}
  static Character = '#'
  static Rounds = 0
  static All = []

  static get emptyTiles() {

    const totalTiles = Vector2D.sub(
      Elf.CoordinateGrid.boundsMax,
      Elf.CoordinateGrid.boundsMin,
    )
      .add(1, 1)
      .dimension.reduce((x, y) => x * y)

    return totalTiles - Elf.CoordinateGrid.size
  }

  static goOneRound() {
    // Increase Rounds and Reset Propsoals for next Round.
    Elf.Rounds++
    Elf.Proposals = {}

    // Iterate all elfs for their next Proposal.
    Elf.All.forEach(elf => elf.decideProposedMove())


    // Get all Proposals and return false, when no elfs are moving anymore.
    const proposals = Object.values(Elf.Proposals)
    if (proposals.length == 0)
      return false

    // Go through all proposals
    for (const elf of proposals) {

      // destinations where multiple elfs wanted to move are set to null.
      if (null == elf) continue
      Elf.CoordinateGrid.remove(elf)
      elf.set(elf.proposal)
      Elf.CoordinateGrid.set(elf)
    }

    // Set first Proposal to end of list.
    const firstMove = Elf.MoveSetOrder[0]
    for (let i = 0; i < Elf.MoveSetOrder.length; i++) {
      Elf.MoveSetOrder[i] = Elf.MoveSetOrder[i + 1]
    }
    Elf.MoveSetOrder[Elf.MoveSetOrder.length - 1] = firstMove

    // return true after a finished Round.
    return true
  }

  print() {
    return Elf.Character
  }

  constructor(x, y) {
    super(x, y)

    this.proposal = null
    Elf.All.push(this)
    Elf.CoordinateGrid.set(this)
  }

  decideProposedMove() {

    // Generates array of directions in following order:
    // E | SE | S | SW | W | NW | N | NE
    const [PI, TAU] = [Math.PI, Math.PI * 2]
    const surroundings = parseInt(
      Array(8).fill(TAU / 8)
        .map((angle, idx) => Vector2D.fromAngle(angle * idx).round().add(this))
        .map(vector => Elf.CoordinateGrid.exists(vector))
        .map(Number)
        .join('')
      , 2)

    // Do nothing, since no elfs arround
    if (surroundings == 0b00000000)
      return

    for (const [name, validation, destination] of Elf.MoveSetOrder) {

      if (validation(surroundings)) {

        // Check if its a unique Proposed Move accross all Elfs.
        this.proposal = destination(this)
        if (this.proposal in Elf.Proposals)
          Elf.Proposals[this.proposal] = null
        else
          Elf.Proposals[this.proposal] = this

        return
      }
    }

  }
}

///////////////////////////////////////////////////////////////

for (let row = 0; row < Input.length; row++) {
  for (let col = 0; col < Input[row].length; col++) {
    if (Input[row][col] == Elf.Character) new Elf(col, row)
  }
}

///////////////////////////////////////////////////////////////

// Keep moving until return false, which means no Elve moved.
while (Elf.goOneRound()) {
  if (Elf.Rounds % 100 == 0)
    console.log(`Proccessed ${Elf.Rounds} Rounds.`)
}

///////////////////////////////////////////////////////////////

const solution = Elf.emptyTiles
console.clear()
console.log(Elf.CoordinateGrid.toString())
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`The Elfs finish moving at Round ${Elf.Rounds} with '${solution.toLocaleString()}' free tiles in the rectangle.`)
console.log()
console.groupEnd()