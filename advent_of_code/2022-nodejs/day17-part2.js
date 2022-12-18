const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');

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
const ArrayQueue = Datastructures.ArrayQueue
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

class WindowList {

  get asArray() {
    return Array(this.windowSize).fill(this.ptrTail)
      .map((ptr, idx) => this.hashtable[ptr + idx] ?? null)
  }

  constructor(windowSize = 100) {
    this.windowSize = windowSize
    this.hashtable = {}
    this.ptrHead = 0
    this.ptrTail = 0
  }

  cutList() {
    while (this.ptrTail < (this.ptrHead - this.windowSize)) {
      delete this.hashtable[this.ptrTail++]
    }
  }

  push(value) {
    this.hashtable[this.ptrHead++] = value
    this.cutList()
  }

  setAtIndex(idx, value) {
    if (idx >= this.ptrHead)
      throw 'Can\'t insert outside window range'

    this.hashtable[idx] = value
  }

  getAtIndex(idx) {
    return this.hashtable[idx] ?? null
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
      const rowAtHeight = positions.getAtIndex(this.y - 1 + i)
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
      if (null != positions.getAtIndex(this.y + i)) {
        const rowAtIndex = positions.getAtIndex(this.y + i)
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

      if (null == positions.getAtIndex(this.y + i))
        positions.push(this.shape[i])
      else {
        const rowAtIndex = positions.getAtIndex(this.y + i)
        positions.setAtIndex(this.y + i, rowAtIndex | this.shape[i])
      }

    }

    Rock.maximumHeight = Math.max(Rock.maximumHeight, this.y + this.shape.length - 1)
  }

}

///////////////////////////////////////////////////////////////

function print(rockCurrent, positions) {

  const emptyGrid = Array.from(positions.windowSize).fill(0b0000000)

  const positionsArray = positions.asArray
  for (const index in positionsArray) {
    emptyGrid[index] = (positionsArray[index] | 0b10000000).toString(2).substring(1)
      .split('').map(bit => bit == '0' ? BoundedShape.EMPTY : BoundedShape.ROCK.STILL)
  }

  for (let i = 0; i < rockCurrent.shape.length; i++) {
    const bitstring = (rockCurrent.shape[i] | 0b10000000).toString(2).substring(1)
      .split('').map(bit => bit == '0' ? BoundedShape.EMPTY : BoundedShape.ROCK.MOVE)

    const index = (rockCurrent.y + i) % emptyGrid.length
    emptyGrid[index] = emptyGrid[index].map((char, idx) => char == BoundedShape.EMPTY ? bitstring[idx] : char)
  }

  console.log('Window-End ==> Height:', positions.ptrHead)
  console.log(Utils.Print.fromMatrix(emptyGrid.reverse(), 2))
  console.log('Window-Start ==> Height: ', positions.ptrTail)
}


///////////////////////////////////////////////////////////////

const Cache = {}
const positions = new WindowList(100)
const rocksToSimulate = 1_000_000_000_000 // 1_000_000_000_000 //1_000_000
let patternSkippedHeight = 0
let currentRock = Rock.nextRock
let alternate = 0 /// 0 => jetpush, 1 => fall down

let test = 0

console.log()
console.group()
while (Rock.rockCount <= rocksToSimulate) {

  //print(rockCurrent)
  //console.log('------------------------------------')
  if (Rock.rockCount % 500 == 0 && test != Rock.rockCount) {
    test = Rock.rockCount
    console.log(`Processed ${Rock.rockCount.toLocaleString()} - ${(Rock.rockCount / rocksToSimulate * 100).toLocaleString()}% - rocks - h: ${(patternSkippedHeight + Rock.maximumHeight + 1).toLocaleString()}`)
  }

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
      const cacheKey = positions.asArray.join(',')
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

//print(currentRock, positions)
console.log(`\nAfter ${(Rock.rockCount - 1).toLocaleString()} fallen rocks the height of the tower is ${(patternSkippedHeight + Rock.maximumHeight + 1).toLocaleString()}\n`)
console.groupEnd()