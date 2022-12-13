const Helper = require('../../nodejs/Helper')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day13-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day13-part1.js INPUT'    to process Todays input from 'day13-input.txt'.
//
//  Enter:
//    'node .\day13-part1.js INPUT'    to process Todays Testinput from 'day13-input-test.txt'.
//    'node .\day13-part1.js'          to process Todays Testinput from 'day13-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day13-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day13-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

const input = fileContent.split('\r\n\r\n')
  .map(packetPair =>
    packetPair.split('\r\n')
      // Using JSON.parse to convert string input to Array of ints/Arrays
      .map(packet => JSON.parse(packet))
  )

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

// Expand Number prototype with additional 'compareTo'-Function
Number.prototype.compareTo = function (num) {
  if (this.valueOf() > num)
    return 1
  else if (this.valueOf() < num)
    return -1
  else
    return 0
}

///////////////////////////////////////////////////////////////

function comparePackets(packetLeft, packetRight, print = false, depth = 0) {

  if (print)
    console.log(Helper.uniformString('', depth * 2), '- Compare: ',
      Helper.printArray(packetLeft), ' vs ', Helper.printArray(packetRight))

  // Check what type each packet is
  const packetTypes = [
    packetLeft?.constructor.name ?? 'undefined',
    packetRight?.constructor.name ?? 'undefined'
  ].join('-')

  switch (packetTypes) {

    // Return 1/-1 based on which packet is undefined (Left/Right list respectivly run out of values)
    case 'undefined-Array':
    case 'undefined-Number':
      return -1

    case 'Array-undefined':
    case 'Number-undefined':
      return 1

    // Recall function again, but with the other 'Number'-part converted to a list.
    case 'Number-Array':
      return comparePackets([packetLeft], packetRight, print, depth + 1)
    case 'Array-Number':
      return comparePackets(packetLeft, [packetRight], print, depth + 1)

    // Check two Numbers against each other.
    case 'Number-Number':
      return packetLeft.compareTo(packetRight)

    // Breack from switch, skipping default and continuing to loop in function.
    case 'Array-Array':
      break

    default:
      throw packetTypes

  }


  // Loop through two Lists comparing their size by rules specified.
  // Take bigger length of both, two compare later wich runs out of values first.
  const maxIndex = Math.max(packetLeft.length, packetRight.length)
  for (let index = 0; index < maxIndex; index++) {

    // Compare elements at that index.
    const result = comparePackets(packetLeft[index], packetRight[index], print, depth + 1)

    // console.log(result)
    // If either element is bigger or smaller, return that results.
    if (result == 0)
      continue

    return result
  }

  // If neither bigger nor smaller element found, both list are equals, according to the rules specified.
  return 0
}

///////////////////////////////////////////////////////////////


// The actual puzzle solution.

const sumOfCorrectOrderPairs = input.map((packetPair, index) => [packetPair, index + 1])
  // Filter out all who are already sorted meaning:
  //  - those evaluating '-1' follow order left < right
  //  - those evaluating '0' are left == right and in order either way
  .filter(([packetPair, actualIndex]) => comparePackets(...packetPair) != 1)
  .map(([packetPair, actualIndex]) => actualIndex)
  .reduce((sum, index) => sum + index)

///////////////////////////////////////////////////////////////



// Some visually nice output for the Testdata and Debugging.

if (argument.includes('TEST')) {

  const sortedInput = input.map((packetPair, index) => {
    console.log(`\n== Pair ${index + 1} ==`)

    // Using ArraySort, but providing packetComparison-Function as custom comparator and Invert Output, to sort smaller first
    return packetPair.sort((right, left) => -comparePackets(left, right, true))

  })

  sortedInput.forEach(packetPair => {
    console.log('------------------------------------')
    console.log(Helper.printArray(packetPair[0]))
    console.log(Helper.printArray(packetPair[1]))
  })
  console.log('------------------------------------')
}

console.log(`\n The Sum of All Packet Pair indexes with correct ordering is ${sumOfCorrectOrderPairs}\n`)