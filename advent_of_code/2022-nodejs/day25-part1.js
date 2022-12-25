const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day25-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day25-part1.js INPUT'    to process Todays input from 'day25-input.txt'.
//
//  Enter:
//    'node .\day25-part1.js TEST'     to process Todays Testinput from 'day25-input-test.txt'.
//    'node .\day25-part1.js'          to process Todays Testinput from 'day25-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day25-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day25-input.txt', 'utf-8'); break

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

SNAFU_BASE = 5
const SNAFUCHAR = ['=', '-', '0', '1', '2']
const BASE10EQUAL = [-2, -1, 0, 1, 2]
const Base10ToSNAFU_lookup = SNAFUCHAR.reduce((obj, char, idx) => ({ ...obj, [BASE10EQUAL[idx]]: char }), new Object())
const SNAFUtoBase10_lookup = SNAFUCHAR.reduce((obj, char, idx) => ({ ...obj, [char]: BASE10EQUAL[idx] }), new Object())


// Simply add their base10 values multiplied by the digit place power 5.
function convertSNAFUtobase10(snafuNum) {
  return snafuNum.split('')
    .map((digit, idx) => SNAFUtoBase10_lookup[digit] * Math.pow(SNAFU_BASE, snafuNum.length - idx - 1))
    .reduce((acc, digit) => acc + digit)
}


/// Standard base Conversion, but with twist of negative number.
function convertBase10toSNAFU(base10) {

  const snafuConverted = []
  while (base10 > 0) {

    const remainder = base10 % SNAFU_BASE
    if (remainder <= 2)
      snafuConverted.push(Base10ToSNAFU_lookup[remainder])
    else {
      snafuConverted.push(Base10ToSNAFU_lookup[remainder - SNAFU_BASE])
      base10 += remainder
    }

    base10 = Math.floor(base10 / SNAFU_BASE)
  }

  return snafuConverted.reverse().join('')
}

///////////////////////////////////////////////////////////////

const base10SumOfFuel = Input
  .map(snafu => convertSNAFUtobase10(snafu))
  .reduce((acc, b10) => acc + b10)

const solution = convertBase10toSNAFU(base10SumOfFuel)
console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`The Sum of all Fuels is:\n`)
console.group()
console.log(`Base10:  ${base10SumOfFuel.toLocaleString()}`)
console.log(` SNAFU:  ${solution.toLocaleString()}`)
console.log()
console.groupEnd()
console.groupEnd()