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

let rockIndex = -1
rockFastFor = (height) => {
  rockIndex = (rockIndex + 1) % 5
  switch (rockIndex) {
    case 0:
      return [[2, 0 + height + 4], [3, 0 + height + 4], [4, 0 + height + 4], [5, 0 + height + 4]]
    case 1:
      return [[2, 1 + height + 4], [3, 1 + height + 4], [4, 1 + height + 4], [3, 2 + height + 4], [3, 0 + height + 4]]
    case 2:
      return [[4, 2 + height + 4], [4, 1 + height + 4], [4, 0 + height + 4], [3, 0 + height + 4], [2, 0 + height + 4]]
    case 3:
      return [[2, 3 + height + 4], [2, 2 + height + 4], [2, 1 + height + 4], [2, 0 + height + 4]]
    case 4:
      return [[2, 1 + height + 4], [3, 1 + height + 4], [2, 0 + height + 4], [3, 0 + height + 4]]

    default:
      throw 'bla'
  }
}

///////////////////////////////////////////////////////////////

// Only keep the last x amount of rocks as positions saved
const queue = new ArrayQueue(50)
const positions = {
  [[0, -1]]: BoundedShape.ROCK.STILL,
  [[1, -1]]: BoundedShape.ROCK.STILL,
  [[2, -1]]: BoundedShape.ROCK.STILL,
  [[3, -1]]: BoundedShape.ROCK.STILL,
  [[4, -1]]: BoundedShape.ROCK.STILL,
  [[5, -1]]: BoundedShape.ROCK.STILL,
  [[6, -1]]: BoundedShape.ROCK.STILL
}

function fallDown(rock) {
  const array = Array(rock.length)
  for (let i = 0; i < rock.length; i++) {
    array[i] = [rock[i][0], rock[i][1] - 1]
    if (array[i] in positions)
      return null
  }
  return array
}

function pushSideways(rock) {
  const array = Array(rock.length)
  const direction = JetPattern.next
  for (let i = 0; i < rock.length; i++) {
    array[i] = [rock[i][0] + direction, rock[i][1]]
    if (array[i][0] < 0 || array[i][0] > 6 || array[i] in positions)
      return rock
  }
  return array
}

function mergeRock(rock, positions, test = false) {

  let height = 0
  //if (!test) console.log(rock)
  if (!test) queue.enqueue(rock)
  for (let i = 0; i < rock.length; i++) {
    height = Math.max(height, rock[i][1])
    positions[rock[i]] = test ? BoundedShape.ROCK.MOVE : BoundedShape.ROCK.STILL
  }
  return height
}

function print(positions, rockCurrent, height) {
  const copy = { ...positions }
  height = Math.max(height, mergeRock(rockCurrent, copy, true))

  const emptyGrid = Array(height + 1).fill(BoundedShape.EMPTY)
    .map((row, rowIdx) => Array(7).fill(BoundedShape.EMPTY)
      .map((col, colIdx) => [[colIdx, height - rowIdx]] in copy ? copy[[colIdx, height - rowIdx]] : BoundedShape.EMPTY)
    )

  console.log(Utils.Print.fromMatrix(emptyGrid, 2))
}


///////////////////////////////////////////////////////////////

let test = 0
let height = -1
let rockCount = 0
let alternate = 0 /// 0 => jetpush, 1 => fall down
let rockCurrent = rockFastFor(height)
let iteration = 0
const fallenRocks = 2022 //1_000_000

console.log()
while (rockCount < fallenRocks) {

  if (rockCount % 100_000 == 0 && test != rockCount) {
    test = rockCount
    console.log(` Processed ${rockCount.toLocaleString()} - ${(rockCount / fallenRocks * 100).toLocaleString()}% - rocks - h: ${height.toLocaleString()} - ${Object.keys(positions).length.toLocaleString()}`)
  }

  if (queue.isFull) {
    const delRock = queue.dequeue()
    for (let i = 0; i < delRock.length; i++) {
      delete positions[delRock]
    }
  }

  if (alternate == 0) {
    rockCurrent = pushSideways(rockCurrent)
    alternate = (alternate + 1) % 2
  } else {
    const res = fallDown(rockCurrent)
    if (null != res) {
      rockCurrent = res
      alternate = (alternate + 1) % 2
    }
    else {
      height = Math.max(height, mergeRock(rockCurrent, positions))
      rockCurrent = rockFastFor(height, positions)
      alternate = 0
      rockCount++
    }
  }

}

//print(positions, rockCurrent, height)
console.log(`\n After ${fallenRocks} fallen rocks the height of the tower is ${(height + 1).toLocaleString()}\n`)
