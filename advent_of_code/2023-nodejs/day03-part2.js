const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day3-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day3-part2.js INPUT'    to process Todays input from 'day03-input.txt'.
//
//  Enter:
//    'node .\day3-part2.js TEST'     to process Todays Testinput from 'day03-input-test.txt'.
//    'node .\day3-part2.js'          to process Todays Testinput from 'day03-input-test.txt'.

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
  .map(match =>

    [
      parseInt(match),

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
          // filter if position is a gear
          .filter(index => match.input[index] == '*')

      )

        // reduce array to single values, since each number maximally has one gear adjacent
        .flat().reduce((acc, val) => val ?? acc, -1)
    ]

  )

  // filter number matches  that have an adjacent gear
  .filter(match => match[1] != -1)

  // map numbers with gear on same index together
  .reduce((map, match) =>
    [{ ...map[0], [match[1]]: [match[0]].concat(map[0][match[1]] ?? []) }], [{}]
  )
  .map(result =>
    Object.values(result)
      // from the map of gears, filter out all gears that have only one number
      .filter(numbers => numbers.length == 2)
      // multiply all number pairs
      .map(numbers => numbers.reduce((acc, val) => acc * val))
  )

  // finally sum up all gear ratios
  .flat().reduce((acc, gearRatio) => acc + gearRatio, 0)


//
//
// Everything that is explained above here again in one line
const result = [...Input.join('\n').matchAll(/\d+/g)].map(match => [parseInt(match), Array(match[0].length).fill(0).map((matchLength, offsetIdx) => Array(8).fill(Math.PI / 4).map((angle, angleIdx) => [Math.floor((match.index + offsetIdx) / (match.input.indexOf('\n') + 1)) + Math.round(Math.sin(angle * angleIdx)), Math.floor((match.index + offsetIdx) % (match.input.indexOf('\n') + 1)) + Math.round(Math.cos(angle * angleIdx))]).filter(pos => pos.filter(num => num < 0).length == 0).map(pos => pos[0] * (match.input.indexOf('\n') + 1) + pos[1]).filter(index => match.input[index] == '*')).flat().reduce((acc, val) => val ?? acc, -1)]).filter(match => match[1] != -1).reduce((map, match) => [{ ...map[0], [match[1]]: [match[0]].concat(map[0][match[1]] ?? []) }], [{}]).map(result => Object.values(result).filter(numbers => numbers.length == 2).map(numbers => numbers.reduce((acc, val) => acc * val))).flat().reduce((acc, gearRatio) => acc + gearRatio, 0)

///////////////////////////////////////////////////////////////

const solution = sum
console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`The Sum of all gear ratios in engine schematic is: '${solution.toLocaleString()}'`)
console.log()
console.groupEnd()