const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day1-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day1-part2.js INPUT'    to process Todays input from 'day01-input.txt'.
//
//  Enter:
//    'node .\day1-part2.js TEST'     to process Todays Testinput from 'day01-input-test.txt'.
//    'node .\day1-part2.js'          to process Todays Testinput from 'day01-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync(`${__dirname}/input/day01-input-test2.txt`, 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync(`${__dirname}/input/day01-input.txt`, 'utf-8'); break

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

const numbers = {
  'zero': 0,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
}


const solution = Input.map(line =>
  [
    Object.keys(numbers).concat(Object.values(numbers)).filter(num => line.includes(num)).map(num => [line.indexOf(num), num]).reduce((num, acc) => num[0] > acc[0] ? acc : num, [Infinity]),
    Object.keys(numbers).concat(Object.values(numbers)).filter(num => line.includes(num)).map(num => [line.lastIndexOf(num), num]).reduce((num, acc) => num[0] > acc[0] ? num : acc, [-1])
  ]
    .map(arr => arr[1] in numbers ? numbers[arr[1]] : arr[1])
    .reduce((num, acc) => num + acc, '')
).map(num => parseInt(num)).reduce((num, acc) => parseInt(num) + acc, 0)







///////////////////////////////////////////////////////////////

console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`The Solution is: '${solution.toLocaleString()}'`)
console.log()
console.groupEnd()