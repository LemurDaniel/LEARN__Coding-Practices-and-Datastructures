const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day4-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day4-part2.js INPUT'    to process Todays input from 'day04-input.txt'.
//
//  Enter:
//    'node .\day4-part2.js TEST'     to process Todays Testinput from 'day04-input-test.txt'.
//    'node .\day4-part2.js'          to process Todays Testinput from 'day04-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync(`${__dirname}/input/day04-input-test.txt`, 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync(`${__dirname}/input/day04-input.txt`, 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const Input = fileContent.split('\r\n')

// Get Needed Classes
// const Vector2D = Datastructures.Vector2D

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


const sum = Input
  .map(line =>
    line.split(/:\s+|\s+\|\s+/).slice(1)
  )
  .map(array => [
    // split scratchcard in two arrays of numbers
    array[0].split(/\s+/).map(num => parseInt(num.trim())),
    array[1].split(/\s+/).map(num => parseInt(num.trim()))
  ])
  .map((array, cardNum) =>
    // get set of matching numbers
    [... new Set(array[1].filter(num => array[0].includes(num)))]
      // calculate array of next numbers
      .map((val, idx) => idx + cardNum + 1)
  )
  .map((card, idx) => ({
    cardNum: idx,
    instances: 1,
    nextCards: card
  }))
  .map((card, idx, arr) =>
    // add the number of instances to each card
    card.nextCards.forEach(nextCard =>
      arr[nextCard].instances += card.instances
    ) == 0 ? card : card
  )
  // sum up all instances of each card
  .reduce((acc, card) => acc + card.instances, 0)


///////////////////////////////////////////////////////////////

const solution = sum
console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`The total number of scratch cards is: '${solution.toLocaleString()}'`)
console.log()
console.groupEnd()