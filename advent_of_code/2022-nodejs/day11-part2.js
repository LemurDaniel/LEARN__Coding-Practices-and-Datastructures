const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day11-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day11-part2.js INPUT'    to process Todays input from 'day11-input.txt'.
//
//  Enter:
//    'node .\day11-part2.js TEST'     to process Todays Testinput from 'day11-input-test.txt'.
//    'node .\day11-part2.js'          to process Todays Testinput from 'day11-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day11-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day11-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

const input = fileContent.split('\r\n\r\n')

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

class Monkey {

  static #ROUND = 0
  static #MONKEY_ARMY = {}
  static #COMMON_MULTIPLE = 1

  static get Round() {
    return Monkey.#ROUND
  }

  ///////////////////////////////////////////////////////

  static fromInput(input) {
    // Create all monkeys
    input.forEach(definition => new Monkey(definition))
  }

  static goOneRound(print = false) {

    // The Order is automatically Correct, since each monkey has a Number in it's name!
    for (const monkey of Object.values(Monkey.#MONKEY_ARMY)) {
      monkey.inspectItems(print)
    }

    return ++Monkey.#ROUND

  }

  static printCurrentMonkeyBags() {

    console.log(`The monkeys are holding following items:`)
    console.group()
    Object.values(Monkey.#MONKEY_ARMY).forEach(monkey => console.log(monkey))
    console.groupEnd()

  }

  static printMonkeyBusinessLevel() {

    console.log(`The monkeys have each inspected a total of:`)
    console.group()
    Object.values(Monkey.#MONKEY_ARMY).forEach(monkey =>
      console.log(`${monkey.name} inspected items ${monkey.totalInspections} times.`)
    )

    const monkeyLevelBusiness = Object.values(Monkey.#MONKEY_ARMY)
      .map(monkey => monkey.totalInspections)
      .sort((a, b) => b - a).slice(0, 2)
      .reduce((acc, a) => acc * a)

    console.log(`\nThe Current Monkey Business Level is at ${monkeyLevelBusiness}`)
    console.groupEnd()

  }

  ///////////////////////////////////////////////////////

  #name;
  #items;
  #operation;
  #selectMonkey;
  #totalInspections = 0;

  get name() {
    return this.#name
  }

  get totalInspections() {
    return this.#totalInspections
  }

  [Symbol.for('nodejs.util.inspect.custom')](depth, inspectOptions, inspect) {
    return `${this.name} ${this.#items.join(', ')}`
  }

  constructor(monkeyDefinition) {

    monkeyDefinition = monkeyDefinition.split('\r\n')

    this.#name = monkeyDefinition[0].replace(':', '')
    this.#items = monkeyDefinition[1].split(':')[1]
      .split(',').map(v => parseInt(v))

    // Creating Function dynamically by Calling new Function. 
    // Not recommended due to Secruity/Performance issues: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
    this.#operation = new Function('old', `return ${monkeyDefinition[2].split('=')[1].trim()}`)

    const divisor = parseInt(monkeyDefinition[3].match(/\d+/)[0])
    const trueMonkey = `Monkey ${monkeyDefinition[4].match(/\d+/)[0]}`
    const falseMonkey = `Monkey ${monkeyDefinition[5].match(/\d+/)[0]}`

    this.#selectMonkey = function (worry) {
      // Number converts true to 1 and false to 0
      return [falseMonkey, trueMonkey][Number(worry % divisor == 0)]
    }

    Monkey.#MONKEY_ARMY[this.#name] = this
    Monkey.#COMMON_MULTIPLE *= divisor
  }

  inspectItems() {

    for (let i = 0; i < this.#items.length; i++) {
      this.#totalInspections++

      const item = this.#operation(this.#items[i]) % Monkey.#COMMON_MULTIPLE
      const monkey = this.#selectMonkey(item)
      Monkey.#MONKEY_ARMY[monkey].#items.push(item)

    }

    // Avoid shift operations with for loop and simply droping the whole array
    this.#items = []
  }

}

//////////////////////////////////////////////////////

/*
  NOTE:
    The Main Problem is Numbers getting to big.
    => One way to handle it would be using something like BigInt to handle aribtary big numbers.

    However skimming through the Input, one Monkey has 'Old * Old', which means exponential Growth
    Not only that but it's every Round so actually '(((Old1 ^ 2) ^ 2) ^ 2) ^ 2) ^ ...) at 10_000 Rounds are uncomutalbe numbers.
    => Apperently there is a Word for it 'Tetration'

  To keep the numbers down a simple modulo can be performed after each operation. To don't mess with the correct divisibilty of the 
  the modulo should be a common multiple of the Test-Number to divide by. In case of the Test input would be: 96_577, 193_154, etc.

*/

Monkey.fromInput(input)

while (Monkey.Round < 10_000) {
  Monkey.goOneRound()
}

console.clear()
console.log('\n///////////////////////////////////////////////////////////////')
console.log(`After Round ${Monkey.Round}\n`)

Monkey.printCurrentMonkeyBags()
console.log()
Monkey.printMonkeyBusinessLevel()
console.log()