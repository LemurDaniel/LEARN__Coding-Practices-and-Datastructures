const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

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
    fileContent = fs.readFileSync(`${__dirname}/input/${{INPUT_TEST}}`, 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync(`${__dirname}/input/${{INPUT_NORMAL}}`, 'utf-8'); break

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












///////////////////////////////////////////////////////////////

return
const solution = 0
console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`The Solution is ...: '${solution.toLocaleString()}'`)
console.log()
console.groupEnd()