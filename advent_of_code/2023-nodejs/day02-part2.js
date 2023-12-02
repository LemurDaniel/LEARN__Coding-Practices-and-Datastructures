const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day2-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day2-part2.js INPUT'    to process Todays input from 'day02-input.txt'.
//
//  Enter:
//    'node .\day2-part2.js TEST'     to process Todays Testinput from 'day02-input-test.txt'.
//    'node .\day2-part2.js'          to process Todays Testinput from 'day02-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync(`${__dirname}/input/day02-input-test.txt`, 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync(`${__dirname}/input/day02-input.txt`, 'utf-8'); break

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
  .map((line, idx) => ({
    id: idx + 1,
    max: line
      .split(':')[1].split(';')
      // Convert string into array of cube maps for each game set
      .map(sets => sets.split(',')
        .map(cube => ({
          [cube.match(/[a-z]+/)[0]]: parseInt(cube.match(/\d+/)[0])
        }))
        .reduce((obj, acc) => ({ ...obj, ...acc }), {})
      )
      // Get map of max cubes from set of games
      .reduce((set, acc) => ({
        ...Object.keys(set).concat(Object.keys(acc))
          .map(color => ({ [color]: Math.max(acc[color] ?? 0, set[color] ?? 0) }))
          .reduce((obj, acc) => ({ ...obj, ...acc }), {})
      }), {})
  }))

  .map(game =>
    Object.values(game.max).reduce((count, acc) => count * acc, 1)
  )
  .reduce((product, acc) => product + acc)


///////////////////////////////////////////////////////////////

const solution = sum
console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`The Solution is: '${solution.toLocaleString()}'`)
console.log()