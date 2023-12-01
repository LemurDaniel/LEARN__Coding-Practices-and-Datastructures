const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day1-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day1-part1.js INPUT'    to process Todays input from 'day01-input.txt'.
//
//  Enter:
//    'node .\day1-part1.js TEST'     to process Todays Testinput from 'day01-input.txt-test'.
//    'node .\day1-part1.js'          to process Todays Testinput from 'day01-input.txt-test'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync(`${__dirname}/input/day01-input-test.txt`, 'utf-8'); break
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

const solution = Input.map(line =>
  line.split('')
    .filter(v => '0123456789'.includes(v))
    .map((v, idx, arr) =>
      parseInt(`${arr[0]}${arr.reverse()[0]}`)
    )[0]
).reduce((v, acc) => acc + v)


///////////////////////////////////////////////////////////////

console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`The Solution is: '${solution.toLocaleString()}'`)
console.log()
console.groupEnd()