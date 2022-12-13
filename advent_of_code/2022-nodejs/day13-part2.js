const Helper = require('../../nodejs/Helper')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day13-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day13-part2.js INPUT'    to process Todays input from 'day13-input.txt'.
//
//  Enter:
//    'node .\day13-part2.js INPUT'    to process Todays Testinput from 'day13-input-test.txt'.
//    'node .\day13-part2.js'          to process Todays Testinput from 'day13-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day13-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day13-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

const dividerPackets = [
  [[2]],
  [[6]]
]

const input = fileContent.
  // regex replace blank lines with normal line endings
  replace(/\r\n\r\n/g, '\r\n')
  .split('\r\n')
  // Using JSON.parse to convert string input to Array of ints/Arrays. 
  .map(packet => JSON.parse(packet))
  // Add those two additional packets
  .concat(dividerPackets)

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

function comparePackets(packetLeft, packetRight) {

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
      return comparePackets([packetLeft], packetRight)
    case 'Array-Number':
      return comparePackets(packetLeft, [packetRight])

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
    const result = comparePackets(packetLeft[index], packetRight[index])

    // If either element is bigger or smaller, return that results.
    if (result != 0)
      return result

  }

  // If neither bigger nor smaller element found, both list are equals, according to the rules specified.
  return 0
}

///////////////////////////////////////////////////////////////


const dividerPacketSum = input
  // Using ArraySort, but providing packetComparison-Function as custom comparator and Invert Output, to sort smaller first
  .sort((right, left) => -comparePackets(left, right))
  .map((packet, index) => [packet, index + 1])
  .filter(([packet, actualIndex]) =>
    // Using JSON.stringify to compare Nested-Integer-Lists with each other. 
    JSON.stringify(packet) == JSON.stringify(dividerPackets[0])
    ||
    JSON.stringify(packet) == JSON.stringify(dividerPackets[1])
  )
  .map(([packet, actualIndex]) => actualIndex)
  .reduce((product, actualIndex) => product * actualIndex)


console.log(`\n The Decoder-Key for the Distress Signal is: ${dividerPacketSum}\n`)