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

class Node {

  // Build a tree and solve every possible expression that can already be solved.
  // The puzzle is seemingly always in a way, where on side evaluates to a number, 
  // while the other side contains 'humn' only once down the tree
  static solveFor(name) {

    if (typeof dictionary[name] == 'number' || name == Human)
      return dictionary[name]

    let [operandLeft, operation, operandRight] = dictionary[name].split(' ')

    operandLeft = Node.solveFor(operandLeft)
    operandRight = Node.solveFor(operandRight)

    if (typeof operandLeft == 'number' && typeof operandRight == 'number')
      return calculate(operandLeft, operandRight, operation)

    return new Node(operation, operandLeft, operandRight)
  }

  constructor(operation, operandLeft, operandRight) {
    this.operation = operation
    this.operandLeft = operandLeft
    this.operandRight = operandRight
  }



  reversePathDown(number) {

    let followNode = null
    let result = null

    /// If it is: number = operandLeft(num)  - operandRight(node) => operandRight(node)         = operandLeft(num)  - number
    /// If it is: number = operandLeft(node) - operandRight(num)  => number + operandRight(num) = operandLeft(node) + 0

    /// If it is: number = operandLeft(num)  / operandRight(node) => operandRight(node)         = operandLeft(num) / number
    /// If it is: number = operandLeft(node) / operandRight(num)  => number * operandRight(num) = operandLeft(node)

    /// If it is: number = operandLeft(num)  * operandRight(node) => number / operandLeft(num)  = operandRight(node)
    /// If it is: number = operandLeft(node) * operandRight(num)  => number / operandRight(num) = operandLeft(node)

    /// If it is: number = operandLeft(num)  + operandRight(node) => number - operandLeft(num)  = operandRight(node) 
    /// If it is: number = operandLeft(node) + operandRight(num)  => number - operandRight(num) = operandLeft(node)

    if (typeof this.operandLeft == 'number') {
      followNode = this.operandRight
      if (this.operation == '-') {
        result = calculate(this.operandLeft, number, '-')
      }
      else if (this.operation == '/') {
        result = calculate(this.operandLeft, number, '/')
      }
      else if (this.operation == '*') {
        result = calculate(number, this.operandLeft, '/')
      }
      else if (this.operation == '+') {
        result = calculate(number, this.operandLeft, '-')
      }
    }

    else if (typeof this.operandRight == 'number') {
      followNode = this.operandLeft
      if (this.operation == '-') {
        result = calculate(number, this.operandRight, '+')
      }
      else if (this.operation == '/') {
        result = calculate(number, this.operandRight, '*')
      }
      else if (this.operation == '*') {
        result = calculate(number, this.operandRight, '/')
      }
      else if (this.operation == '+') {
        result = calculate(number, this.operandRight, '-')
      }
    }

    if (followNode == Human)
      return result
    else
      return followNode.reversePathDown(result)
  }

}

///////////////////////////////////////////////////////////////

// Correct root-monkey behaviour:
dictionary['root'] = dictionary['root'].replace(/[+-\/*]{1}/, '=')
dictionary[Human] = Human

// Solve with tree
const node = Node.solveFor('root')

// Reverse Operations down
const result = node.operandLeft.reversePathDown(node.operandRight)

// Check again if really evaluates to true
dictionary[Human] = result
if (Node.solveFor('root') != true)
  throw 'Error: I dunno something went 💩'

///////////////////////////////////////////////////////////////

console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`In order to solve the monkeys riddle you have to yell: '${result.toLocaleString()}'`)
console.log()
console.groupEnd()