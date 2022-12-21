const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day21-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day21-part2.js INPUT'    to process Todays input from 'day21-input.txt'.
//
//  Enter:
//    'node .\day21-part2.js TEST'     to process Todays Testinput from 'day21-input-test.txt'.
//    'node .\day21-part2.js'          to process Todays Testinput from 'day21-input-test.txt'.

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
const Human = 'humn'

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

function calculate(operand0, operand1, operation) {

  switch (operation) {

    case '+':
      return operand0 + operand1
    case '-':
      return operand0 - operand1
    case '/':
      return operand0 / operand1
    case '*':
      return operand0 * operand1
    case '=':
      return operand0 == operand1

    default:
      throw 'Not supported'
  }

}

///////////////////////////////////////////////////////////////

// Create an RPN stack of the expression, to see how far it can be evaluated,
// without added complexity of Parenthesises and Precedence
function expressionToRPN(name) {

  // Simpy return number, if monkey says a number.
  if (typeof dictionary[name] == 'number' || name == Human)
    return dictionary[name]

  // Get expression
  let [operand0, operation, operand1] = dictionary[name].split(' ')

  // Call itself recursivley, to get expression evaluated.
  operand0 = expressionToRPN(operand0)
  operand1 = expressionToRPN(operand1)

  // If expression can be evaluated, evaluate expression, else push to stack.
  if (typeof operand0 == 'number' && typeof operand1 == 'number') {
    const result = calculate(operand0, operand1, operation)
    dictionary[name] = result
    return result
  } else {
    return [operand0, operand1, operation].flat()
  }
}

///////////////////////////////////////////////////////////////

// Correct root-monkey behaviour:
dictionary['root'] = dictionary['root'].replace(/[+-\/*]{1}/, '=')
dictionary[Human] = Human


const stack = expressionToRPN('root')

const expressionRPN = stack.join(' ')
const equalsOperator = stack.pop()
const numberToBeEqual = stack.pop()

console.log(expressionRPN)

// Note: Needs to be somehow resolved in reverse ???
/*

4 2 humn 3 - * +

4 2 humn 3 - * + 4 / 150 =     150 *4 -4 / 2 +3
4 2 humn 3 - * + 600 =
2 humn 3 - * 596 =
humn 3 - 298
humn 301 = 

*/



return
///////////////////////////////////////////////////////////////

const solution = evaluateMonkey('root')
console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`After evaluating all Expressions the monkey 'root' yells: '${solution.toLocaleString()}'`)
console.log()
console.groupEnd()


