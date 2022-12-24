const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day24-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day24-part1.js INPUT'    to process Todays input from 'day24-input.txt'.
//
//  Enter:
//    'node .\day24-part1.js TEST'     to process Todays Testinput from 'day24-input-test.txt'.
//    'node .\day24-part1.js'          to process Todays Testinput from 'day24-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day24-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day24-input.txt', 'utf-8'); break

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


class Blizzard extends CoordinateGrid {

  static Wall = class Wall extends Vector2D {
    static Character = '#'
    constructor(x, y) {
      super(x, y)
    }
    print() {
      return Wall.Character
    }
  }

  //////////////////

  static Snow = class Snow extends Vector2D {
    static Directions = {
      '>': new Vector2D(1, 0),
      '<': new Vector2D(-1, 0),
      '^': new Vector2D(0, -1),
      'v': new Vector2D(0, 1),
    }
    constructor(x, y, char) {
      super(x, y)
      this.char = char
      this.direction = Blizzard.Snow.Directions[char].copy
    }
    print() {
      return this.char
    }
  }

  constructor(input) {
    super()

    this.walls = []
    this.snow = []

    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[0].length; col++) {

        const value = input[row][col]
        if ('.' == value)
          continue

        if (Blizzard.Wall.Character == value) {
          const wall = new Blizzard.Wall(col, row)
          this.walls.push(wall)
          this.set(wall)
        } else {
          const snow = new Blizzard.Snow(col, row, value)
          this.snow.push(snow)
          this.set(snow)
        }
      }
    }
  }

  progress() {

    this.snow.forEach(snow => this.remove(snow))

    for (const snow of this.snow) {

      snow.add(snow.direction)
      if (snow.x >= this.boundsMax.x)
        snow.x = this.boundsMin.x + 1
      else if (snow.y >= this.boundsMax.y)
        snow.y = this.boundsMin.y + 1
      else if (snow.x <= this.boundsMin.x)
        snow.x = this.boundsMax.x - 1
      else if (snow.y <= this.boundsMin.y)
        snow.y = this.boundsMax.y - 1


      const current = this.get(snow)
      if (null == current)
        this.set(snow)
      else if (typeof current == 'number')
        this.set(snow, current + 1)
      else
        this.set(snow, 2)
    }

  }

}

const blizzard = new Blizzard(Input)
console.log(blizzard.toString())
blizzard.progress()
console.log(blizzard.toString())
blizzard.progress()
console.log(blizzard.toString())
blizzard.progress()
console.log(blizzard.toString())
blizzard.progress()
console.log(blizzard.toString())





///////////////////////////////////////////////////////////////

return
const solution = 0
console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`The Solution is ...: '${solution.toLocaleString()}'`)
console.log()
console.groupEnd()