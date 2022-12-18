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

let rockIndex = -1
rockFastFor = (height) => {
  rockIndex = (rockIndex + 1) % 5
  switch (rockIndex) {
    case 0:
      return {
        y: height + 4,
        shape: [
          0b0011110
        ].reverse() // so that y=0 starts at index 0
      }
    case 1:
      return {
        y: height + 4,
        shape: [
          0b0001000,
          0b0011100,
          0b0001000
        ].reverse() // so that y=0 starts at index 0
      }
    case 2:
      return {
        y: height + 4,
        shape: [
          0b0000100,
          0b0000100,
          0b0011100
        ].reverse() // so that y=0 starts at index 0
      }
    case 3:
      return {
        y: height + 4,
        shape: [
          0b0010000,
          0b0010000,
          0b0010000,
          0b0010000
        ].reverse() // so that y=0 starts at index 0
      }
    case 4:
      return {
        y: height + 4,
        shape: [
          0b0011000,
          0b0011000
        ].reverse() // so that y=0 starts at index 0
      }

    default:
      throw 'bla'
  }
}


///////////////////////////////////////////////////////////////

// Only keep the last x amount of rocks as positions saved
let currentMaximumHeight = -1
const positions = new WindowList(100)

function fallDown(rock) {

  if (rock.y == 0) return false

  for (let i = 0; i < rock.shape.length; i++) {
    const currentRowAtHeight = positions.getAtIndex(rock.y - 1 + i)
    if (null == currentRowAtHeight)
      break
    // If the  XOR is the NOT the same as OR then collision detected.
    if ((currentRowAtHeight ^ rock.shape[i]) != (currentRowAtHeight | rock.shape[i]))
      return false

  }
  rock.y -= 1
  return true
}

function pushSideways(rock) {
  const direction = JetPattern.next
  const copy = rock.shape.map(v => parseInt(v))
  for (let i = 0; i < copy.length; i++) {
    if (direction == -1) {
      //console.log('left', (copy[i] | 0b10000000).toString(2).substring(1), (copy[i] & 0b1000000) == 0b1000000)
      // When there is a leftmost bit set, can't shift into wall
      if ((copy[i] & 0b1000000) == 0b1000000) return rock
      else copy[i] <<= 1
    }
    else {
      //console.log('right', (copy[i] | 0b10000000).toString(2).substring(1), (copy[i] & 0b0000001) == 0b0000001)
      // When there is a rightmost bit set, can't shift into wall
      if ((copy[i] & 0b0000001) == 0b0000001) return rock
      else copy[i] >>= 1
    }

    // Check for collision with other elements.
    if (null != positions.getAtIndex(rock.y + i)) {
      const rowAtIndex = positions.getAtIndex(rock.y + i)
      //console.log('YYYY', (rowAtIndex | 0b10000000).toString(2).substring(1), (copy[i] | 0b10000000).toString(2).substring(1), (rowAtIndex ^ copy[i]) | 0b10000000).toString(2).substring(1), (rowAtIndex | copy[i]) | 0b10000000).toString(2).substring(1))
      if ((rowAtIndex ^ copy[i]) != (rowAtIndex | copy[i])) return rock
    }
  }

  //console.log(rock.shape.map(v => (v | 0b10000000).toString(2).substring(1)), copy.map(v => (v | 0b10000000).toString(2).substring(1)))
  rock.shape = copy
  return rock
}

function mergeRock(rock) {
  for (let i = 0; i < rock.shape.length; i++) {
    if (null == positions.getAtIndex(rock.y + i))
      positions.push(rock.shape[i])
    else {
      const rowAtIndex = positions.getAtIndex(rock.y + i)
      positions.setAtIndex(rock.y + i, rowAtIndex | rock.shape[i])
    }
  }

  return Math.max(currentMaximumHeight, rock.y + rock.shape.length - 1)
}

function print(rockCurrent) {

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

  console.log(Utils.Print.fromMatrix(emptyGrid.reverse(), 2))
}


function topRowFilled(height) {

  const row = filledRow(height)

  for (const array of row) {
    if (!(array in positions))
      return false
  }

  return true
}

///////////////////////////////////////////////////////////////

let rockCount = 0
let alternate = 0 /// 0 => jetpush, 1 => fall down
let rockCurrent = rockFastFor(currentMaximumHeight)
let iteration = 0
const fallenRocks = 1_000_000_000 //1_000_000
let test = 0

console.log()
while (rockCount < fallenRocks) {

  //print(rockCurrent)
  //console.log('------------------------------------')
  iteration++
  if (rockCount % 100_000 == 0 && test != rockCount) {
    test = rockCount
    console.log(` Processed ${rockCount.toLocaleString()} - ${(rockCount / fallenRocks * 100).toLocaleString()}% - rocks - h: ${currentMaximumHeight.toLocaleString()}`)
  }

  if (alternate == 0) {
    rockCurrent = pushSideways(rockCurrent)
    alternate = (alternate + 1) % 2
  } else {
    if (fallDown(rockCurrent)) {
      alternate = (alternate + 1) % 2
    }
    else {
      currentMaximumHeight = mergeRock(rockCurrent)
      rockCurrent = rockFastFor(currentMaximumHeight)
      alternate = 0
      rockCount++
    }
  }

}

print(rockCurrent)
//print(positions, rockCurrent, height)
console.log(`\n After ${fallenRocks} fallen rocks the height of the tower is ${(currentMaximumHeight + 1).toLocaleString()}\n`)
