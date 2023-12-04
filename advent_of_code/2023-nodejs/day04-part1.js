const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day4-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day4-part1.js INPUT'    to process Todays input from 'day04-input.txt'.
//
//  Enter:
//    'node .\day4-part1.js TEST'     to process Todays Testinput from 'day04-input-test.txt'.
//    'node .\day4-part1.js'          to process Todays Testinput from 'day04-input-test.txt'.

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


const points = Input
  .map(line =>
    line.split(/:\s+|\s+\|\s+/).slice(1)
  )
  .map(array => [
    // split scratchcard in two arrays of numbers
    array[0].split(/\s+/).map(num => parseInt(num.trim())),
    array[1].split(/\s+/).map(num => parseInt(num.trim()))
  ])
  .map(array =>
    // get set of matching numbers
    [... new Set(array[1].filter(num => array[0].includes(num)))]
  )
  .map(matches =>
    // calculate points
    Math.floor(Math.pow(2, matches.length - 1))
  )
  // sum up
  .reduce((acc, points) => acc + points)


///////////////////////////////////////////////////////////////

const solution = points
console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`The Sum of all points is: '${solution.toLocaleString()}'`)
console.log()
console.groupEnd()