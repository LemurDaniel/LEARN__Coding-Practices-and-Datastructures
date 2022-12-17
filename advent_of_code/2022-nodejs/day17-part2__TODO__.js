const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day17-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day17-part2.js INPUT'    to process Todays input from 'day17-input.txt'.
//
//  Enter:
//    'node .\day17-part2.js TEST'     to process Todays Testinput from 'day17-input-test.txt'.
//    'node .\day17-part2.js'          to process Todays Testinput from 'day17-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day17-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day17-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const Input = fileContent.split('\r\n')

// Get Needed Classes
// const Vector = Datastructures.Vector

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/