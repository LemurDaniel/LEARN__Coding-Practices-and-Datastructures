const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day11-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day11-part1.js INPUT'    to process Todays input from 'day11-input.txt'.
//
//  Enter:
//    'node .\day11-part1.js TEST'     to process Todays Testinput from 'day11-input-test.txt'.
//    'node .\day11-part1.js'          to process Todays Testinput from 'day11-input-test.txt'.

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

    this.#selectMonkey = function (worry, print) {
      if (worry % divisor == 0) {
        if (print) console.log(`Current worry level IS divisible by ${divisor}`)
        return trueMonkey
      } else {
        if (print) console.log(`Current worry level IS NOT divisible by ${divisor}`)
        return falseMonkey
      }
    }

    Monkey.#MONKEY_ARMY[this.#name] = this
  }

  inspectItems(print = false) {

    if (print) console.log(`\n${this.name}:`)
    console.group()
    while (this.#items.length > 0) {
      const initialItem = this.#items.shift()
      this.#totalInspections++

      let item = initialItem
      if (print) console.log(`Monkey inspects an item with a worry level of ${item}.`)
      console.group()

      item = this.#operation(item)
      if (print) console.log(`Worry level changes from ${initialItem} to ${item}.`)

      item = Math.floor(item / 3)
      if (print) console.log(`Monkey gets bored with item.Worry level is divided by 3 to ${item}.`)

      const monkey = this.#selectMonkey(item, print)
      if (print) console.log(`Item with worry level ${item} is thrown to ${monkey}`)
      Monkey.#MONKEY_ARMY[monkey].#items.push(item)

      console.groupEnd()
    }
    console.groupEnd()

  }

}

//////////////////////////////////////////////////////
console.clear()

Monkey.fromInput(input)
Monkey.goOneRound(true)
Monkey.printCurrentMonkeyBags()

while (Monkey.Round < 20) {
  Monkey.goOneRound()
  if (Monkey.Round % 5 == 0)
    Monkey.printCurrentMonkeyBags()
}

console.log('\n///////////////////////////////////////////////////////////////')
console.log(`After Round ${Monkey.Round}\n`)

Monkey.printCurrentMonkeyBags()
console.log()
Monkey.printMonkeyBusinessLevel()
console.log()