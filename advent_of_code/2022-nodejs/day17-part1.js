const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');
// NOTE:
//  node .\day17-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day17-part1.js INPUT'    to process Todays input from 'day17-input.txt'.
//
//  Enter:
//    'node .\day17-part1.js TEST'     to process Todays Testinput from 'day17-input-test.txt'.
//    'node .\day17-part1.js'          to process Todays Testinput from 'day17-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day17-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day17-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const Input = fileContent.split('\r\n').join('').split('')

// Get Needed Classes
const Vector = Datastructures.Vector
const BoundedShape = Datastructures.BoundedShape

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################hasleftChild
*/

class JetPattern {

  static ptrPattern = 0
  static Pattern = Input.map(v => v == '<' ? BoundedShape.MOVE.LEFT : BoundedShape.MOVE.RIGHT)

  static get next() {
    const pattern = JetPattern.Pattern[JetPattern.ptrPattern]
    JetPattern.ptrPattern = (JetPattern.ptrPattern + 1) % JetPattern.Pattern.length
    return pattern
  }

}

///////////////////////////////////////////////////////////////

class Shape extends BoundedShape {

  static #ROCKS = fs.readFileSync('./day17-rocks.txt', 'utf-8').split('\r\n\r\n')
    .map(rock => rock.split('\r\n')
      .flatMap((line, rowIdx, lines) => line.split('')
        .map((col, colIdx) => col == Shape.ROCK.STILL ? new Vector(colIdx, lines.length - rowIdx - 1) : null)
        .filter(vector => vector != null)
      )
    )
  static get ROCKS() {
    return Shape.#ROCKS.map(rock => new Shape(...rock))
  }

  static ptrNextRock = -1
  static get nextRock() {
    Shape.ptrNextRock = ++Shape.ptrNextRock % Shape.#ROCKS.length
    return new Shape(...Shape.#ROCKS[Shape.ptrNextRock])
  }

  constructor(...vectors) {
    super()
    vectors.forEach(
      vector => this.add(vector, Shape.ROCK.MOVE)
    )
  }

}

class Chamber extends BoundedShape {

  constructor() {
    super()

    this.max.y = -1 // Start with zero tall
    this.max.x = 6 // 7 Untis wide starting from index 0
    this.enableWalls = [false, true, true, true]
    this.jetPatternNext
  }

  spawnRock(heigth) {
    const rock = Shape.nextRock
    this.refrenceShape(rock)
    // Two Units away from left Wall
    rock.translation.x = this.min.x + (rock.min.x + 2)
    // Two Units above highest Rock
    rock.translation.y = this.max.y + (rock.min.y + 3) + 1

    return rock
  }

  *cycle(rockTargetCount) {

    let rockCount = 1
    let fallDown = false
    let jetPush = true
    let rock = this.spawnRock(0)
    yield rockCount

    while (rockCount <= rockTargetCount) {

      if (fallDown) {
        const success = rock.translate(1, Shape.MOVE.DOWN, this)

        if (!success) {
          this.mergeShape(rock)
          rock = this.spawnRock(this.max.y)
          rockCount++
          // Reset to make new rock being pushed first after apearing
          jetPush = true
          fallDown = false
          yield rockCount
          continue
        }
      } else if (jetPush)
        rock.translate(1, JetPattern.next, this)

      fallDown = !fallDown
      jetPush = !jetPush
      yield rockCount
    }

    return
  }

}

///////////////////////////////////////////////////////////////

const chamber = new Chamber()
const iterator = chamber.cycle(2022)
while (!iterator.next().done) { }

if (argument.includes('TEST'))
  fs.writeFileSync(`./day17-part1.${argument.toLowerCase()}.txt`, chamber.toString(), 'utf-8')
else
  fs.writeFileSync(`./day17-part1.${argument.toLowerCase()}.txt`, chamber.toString(), 'utf-8')

// Overengineered nonsense solution
console.log(`\n After 2022 fallen rocks the height of the tower is ${chamber.max.y + 1}\n`) // +1 since, max.y is the highest Point of a Rock and one above that