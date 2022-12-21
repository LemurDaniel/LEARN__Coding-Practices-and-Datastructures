const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day21-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day21-part1.js INPUT'    to process Todays input from 'day21-input.txt'.
//
//  Enter:
//    'node .\day21-part1.js TEST'     to process Todays Testinput from 'day21-input-test.txt'.
//    'node .\day21-part1.js'          to process Todays Testinput from 'day21-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day21-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day21-input.txt', 'utf-8'); break

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

// Convert monkey Input to dictionary
const dictionary = {}
Input
  .map(monkey => monkey.split(':'))
  .map(([name, expression]) =>
    dictionary[name] = Number.isNaN(parseInt(expression)) ? expression.trim() : parseInt(expression)
  )

///////////////////////////////////////////////////////////////

function evaluateMonkey(name) {

  if (!(name in dictionary))
    throw `Monkey ${name} doesn't exist`

  // Simpy return number, if monkey says a number.
  if (typeof dictionary[name] == 'number')
    return dictionary[name]


  // Get expression
  let [operand0, operation, operand1] = dictionary[name].split(' ')

  // Call itself recursivley, to get expression evaluated.
  operand0 = evaluateMonkey(operand0)
  operand1 = evaluateMonkey(operand1)

  // Evaluate expression
  switch (operation) {

    case '+':
      dictionary[name] = operand0 + operand1; break;
    case '-':
      dictionary[name] = operand0 - operand1; break;
    case '/':
      dictionary[name] = operand0 / operand1; break;
    case '*':
      dictionary[name] = operand0 * operand1; break;

  }

  return dictionary[name]
}

///////////////////////////////////////////////////////////////

const solution = evaluateMonkey('root')
console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`After evaluating all Expressions the monkey 'root' yells: '${solution.toLocaleString()}'`)
console.log()
console.groupEnd()