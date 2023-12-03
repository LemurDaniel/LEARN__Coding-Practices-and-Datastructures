const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day3-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day3-part1.js INPUT'    to process Todays input from 'day03-input.txt'.
//
//  Enter:
//    'node .\day3-part1.js TEST'     to process Todays Testinput from 'day03-input-test.txt'.
//    'node .\day3-part1.js'          to process Todays Testinput from 'day03-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync(`${__dirname}/input/day03-input-test.txt`, 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync(`${__dirname}/input/day03-input.txt`, 'utf-8'); break

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


const sum = [...Input.join('\n').matchAll(/\d+/g)]
  // filter array of all numbers in input
  .filter(match =>

    // Array of all digit offsets in a found number
    Array(match[0].length).fill(0).map((matchLength, offsetIdx) =>
      // Calculate positions for all 8 tiles around each digit 
      Array(8).fill(Math.PI / 4)
        .map((angle, angleIdx) => [
          Math.floor((match.index + offsetIdx) / (match.input.indexOf('\n') + 1)) + Math.round(Math.sin(angle * angleIdx)),
          Math.floor((match.index + offsetIdx) % (match.input.indexOf('\n') + 1)) + Math.round(Math.cos(angle * angleIdx))
        ])
        // filter out all negative positions
        .filter(pos => pos.filter(num => num < 0).length == 0)
        .map(pos => pos[0] * (match.input.indexOf('\n') + 1) + pos[1])
        .map(index => match.input[index]).join('')

      // join and filter if surroundings contain a symbol
    ).join('')?.replaceAll('\n', '').match(/[^\.0-9]+/) != null

  )
  .reduce((acc, match) => acc + parseInt(match), 0)


//
//
// Everything that is explained above here again in one line
const result = [...Input.join('\n').matchAll(/\d+/g)].filter(match => Array(match[0].length).fill(0).map((matchLength, offsetIdx) => Array(8).fill(Math.PI / 4).map((angle, angleIdx) => [Math.floor((match.index + offsetIdx) / (match.input.indexOf('\n') + 1)) + Math.round(Math.sin(angle * angleIdx)), Math.floor((match.index + offsetIdx) % (match.input.indexOf('\n') + 1)) + Math.round(Math.cos(angle * angleIdx))]).filter(pos => pos.filter(num => num < 0).length == 0).map(pos => pos[0] * (match.input.indexOf('\n') + 1) + pos[1]).map(index => match.input[index]).join('')).join('')?.replaceAll('\n', '').match(/[^\.0-9]+/) != null).reduce((acc, match) => acc + parseInt(match), 0)

///////////////////////////////////////////////////////////////

const solution = result
console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`The Sum of all parts in the engine schematic is: '${solution.toLocaleString()}'`)
console.log()
console.groupEnd()