const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day${{DAY}}-part${{PART}}.js [INPUT|TEST]
//
//  Enter:
//    'node .\day${{DAY}}-part${{PART}}.js INPUT'    to process Todays input from '${{INPUT_NORMAL}}'.
//
//  Enter:
//    'node .\day${{DAY}}-part${{PART}}.js TEST'     to process Todays Testinput from '${{INPUT_TEST}}'.
//    'node .\day${{DAY}}-part${{PART}}.js'          to process Todays Testinput from '${{INPUT_TEST}}'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/${{INPUT_TEST}}', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/${{INPUT_NORMAL}}', 'utf-8'); break

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