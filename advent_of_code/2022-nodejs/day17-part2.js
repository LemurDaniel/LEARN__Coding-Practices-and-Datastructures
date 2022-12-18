const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day17-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day17-part2.js INPUT'    to process Todays input from 'day17-input.txt'.
//
//  Enter:
//    'node .\day17-part2.js TEST'     to process Todays Testinput from 'day17-input-test.txt'.
//    'node .\day17-part2.js'          to process Todays Testinput from 'day17-input-test.txt'.

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
const WindowSlidingQueue = Datastructures.WindowSlidingQueue
const BoundedShape = Datastructures.BoundedShape

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################hasleftChild
*/

class JetPattern {

  static ptrPattern = 0
  static Pattern = Input.map(v => v == '<' ? -1 : 1)

  static get next() {
    const pattern = JetPattern.Pattern[JetPattern.ptrPattern]
    JetPattern.ptrPattern = (JetPattern.ptrPattern + 1) % JetPattern.Pattern.length
    return pattern
  }

}

///////////////////////////////////////////////////////////////


class Rock {

  static maximumHeight = -1
  static rockCount = 0
  static rockIndex = -1

  static get nextRock() {
    Rock.rockCount++
    Rock.rockIndex = (Rock.rockIndex + 1) % 5
    switch (Rock.rockIndex) {
      case 0:
        return new Rock([
          0b0011110
        ])
      case 1:
        return new Rock([
          0b0001000,
          0b0011100,
          0b0001000
        ])
      case 2:
        return new Rock([
          0b0000100,
          0b0000100,
          0b0011100
        ])
      case 3:
        return new Rock([
          0b0010000,
          0b0010000,
          0b0010000,
          0b0010000
        ])
      case 4:
        return new Rock([
          0b0011000,
          0b0011000
        ])

      default:
        throw 'bla'
    }
  }

  constructor(shape) {
    this.y = Rock.maximumHeight + 4
    this.shape = shape.reverse() // so that y=0 starts at index 0
  }

  fallDown(positions) {
    if (this.y == 0) return false

    for (let i = 0; i < this.shape.length; i++) {
      const rowAtHeight = positions.get(this.y - 1 + i)
      if (null == Rock.maximumHeight)
        break
      // If the  XOR is the NOT the same as OR then collision detected.
      if ((rowAtHeight ^ this.shape[i]) != (rowAtHeight | this.shape[i]))
        return false

    }
    this.y -= 1
    return true
  }

  pushSideways(positions) {

    const direction = JetPattern.next
    const copy = this.shape.map(v => parseInt(v))

    for (let i = 0; i < copy.length; i++) {

      if (direction == -1) {
        //console.log('left', (copy[i] | 0b10000000).toString(2).substring(1), (copy[i] & 0b1000000) == 0b1000000)
        // When there is a leftmost bit set, can't shift into wall
        if ((copy[i] & 0b1000000) == 0b1000000)
          return this
        else
          copy[i] <<= 1
      }
      else {
        //console.log('right', (copy[i] | 0b10000000).toString(2).substring(1), (copy[i] & 0b0000001) == 0b0000001)
        // When there is a rightmost bit set, can't shift into wall
        if ((copy[i] & 0b0000001) == 0b0000001)
          return this
        else
          copy[i] >>= 1
      }

      // Check for collision with other elements.
      if (null != positions.get(this.y + i)) {
        const rowAtIndex = positions.get(this.y + i)
        //console.log('YYYY', (rowAtIndex | 0b10000000).toString(2).substring(1), (copy[i] | 0b10000000).toString(2).substring(1), (rowAtIndex ^ copy[i]) | 0b10000000).toString(2).substring(1), (rowAtIndex | copy[i]) | 0b10000000).toString(2).substring(1))
        if ((rowAtIndex ^ copy[i]) != (rowAtIndex | copy[i]))
          return this
      }
    }

    this.shape = copy
    return this
  }

  mergeRock(positions) {
    for (let i = 0; i < this.shape.length; i++) {

      if (null == positions.get(this.y + i))
        positions.enqueue(this.shape[i])
      else {
        const rowAtIndex = positions.get(this.y + i)
        positions.set(this.y + i, rowAtIndex | this.shape[i])
      }

    }

    Rock.maximumHeight = Math.max(Rock.maximumHeight, this.y + this.shape.length - 1)
  }

}

///////////////////////////////////////////////////////////////

function print(rockCurrent, positions, patternSkippedHeight) {

  let grid = Array.from(positions)
  const heightDiff = Math.max(0, rockCurrent.y + rockCurrent.shape.length - positions.idxHead - 1)
  for (let i = 0; i < heightDiff; i++) {
    grid.push(0b0000000)
  }

  grid = grid.map(row => (row | 0b10000000).toString(2).substring(1)
    .split('').map(bit => bit == '0' ? BoundedShape.EMPTY : BoundedShape.ROCK.STILL)
  )

  for (let i = 0; i < rockCurrent.shape.length; i++) {
    const bitstring = (rockCurrent.shape[i] | 0b10000000).toString(2).substring(1)
      .split('').map(bit => bit == '0' ? BoundedShape.EMPTY : BoundedShape.ROCK.MOVE)

    const index = (rockCurrent.y + i) - positions.idxTail
    grid[index] = grid[index].map((char, idx) => char == BoundedShape.EMPTY ? bitstring[idx] : char)
  }


  console.log('Window-End ==> Height:', (positions.ptrHead + heightDiff + patternSkippedHeight).toLocaleString())
  console.log(Utils.Print.fromMatrix(grid.reverse(), 2))
  console.log('Window-Start ==> Height: ', (positions.ptrTail + patternSkippedHeight).toLocaleString())
}


///////////////////////////////////////////////////////////////

const Cache = {}
const positions = new WindowSlidingQueue(50)
const rocksToSimulate = 1_000_000_000_000
let patternSkippedHeight = 0
let currentRock = Rock.nextRock
let alternate = 0 /// 0 => jetpush, 1 => fall down

console.log()
console.group()
while (Rock.rockCount <= rocksToSimulate) {

  if (alternate == 0) {
    if (currentRock.y > 100000000)
      console.log(currentRock)
    currentRock = currentRock.pushSideways(positions)
    alternate = (alternate + 1) % 2
  } else {
    if (currentRock.fallDown(positions)) {
      alternate = (alternate + 1) % 2
    }
    else {
      currentRock.mergeRock(positions)

      // After each rock merged, search for repeatable pattern.
      const cacheKey = Array.from(positions).join(',')
      if (cacheKey in Cache) {

        const savedMaxHeight = Rock.maximumHeight
        const [rockcount, height] = Cache[cacheKey]
        const heightDiff = Rock.maximumHeight - height
        const patternLength = Rock.rockCount - rockcount

        const leftToSimulate = rocksToSimulate - Rock.rockCount
        const patternRepeats = Math.floor(leftToSimulate / patternLength)

        if (patternRepeats > 0) {
          // Skipping with pattern to the end
          patternSkippedHeight += patternRepeats * heightDiff
          Rock.rockCount += patternRepeats * patternLength
          console.log(`Skip simulating ${(patternRepeats * patternLength).toLocaleString()} Rocks to Height ${(patternSkippedHeight + Rock.maximumHeight + 1).toLocaleString()}`)
        }
      }
      else {
        Cache[cacheKey] = [Rock.rockCount, Rock.maximumHeight]
      }

      currentRock = Rock.nextRock
      alternate = 0
    }
  }

}

print(currentRock, positions, patternSkippedHeight)
console.log(`\nAfter ${(Rock.rockCount - 1).toLocaleString()} fallen rocks the height of the tower is ${(patternSkippedHeight + Rock.maximumHeight + 1).toLocaleString()}\n`)
console.groupEnd()