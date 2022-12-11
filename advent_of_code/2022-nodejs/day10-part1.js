const Helper = require('../../nodejs/Helper')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day10-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day10-part1.js INPUT'    to process Todays input from 'day10-input.txt'.
//
//  Enter:
//    'node .\day10-part1.js TEST'     to process Todays Testinput from 'day10-input-test.txt'.
//    'node .\day10-part1.js'          to process Todays Testinput from 'day10-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day10-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day10-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

const input = fileContent.split('\r\n')

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


class CPU {

  // Instruction Set for CPU
  ///////////////////////////////////////////////////

  static INSTRUCTION_SET = class INSTRUCTION_SET {

    #register;

    constructor(register) {
      this.#register = register
    }

    GET(args) {
      const operation = args[0].toUpperCase()
      const values = args.slice(1).map(v => v.match(/-{0,1}\d+/)?.length > 0 ? parseInt(v) : v)

      if (operation in this)
        return this[operation](...values)
      else
        throw `Instruction '${args[0]}' doesn't exist`
    }

    *NOOP() {
      // Simulating Cycles via Yield 
      // Function is run every Cycle until next yield!
      yield 1
    }

    // Not a Generator function, since just a Wrapper-Function to call another Generator Function!
    ADDX(literal) {
      return this.ADD('X', literal)
    }

    *ADD(reg, literal) {

      // Start Cycle 1 
      yield 1 // During Cycle 1

      // End of Cycle 1
      const result = this.#register[reg] + literal

      // Start Cycle 2 
      yield 2 // During Cycle 2

      // End of Cycle 2, value is saved
      this.#register[reg] = result

    }
  }


  // Instance Variables
  ///////////////////////////////////////////////////

  // Testing some new Syntax
  #intstructionSet;

  // programm (Input) as Array of Codelines
  #programm;
  #process;

  #clockCycles;
  #registers;

  get process() {
    if (!this.#process)
      this.#process = this.#executeCycles()

    return this.#process
  }

  get signalStrength() {
    return this.#registers['SIGNAL_STRENGTH']
  }

  get #programmCounter() {
    return this.#registers['PROGRAMM_COUNTER']
  }

  set #programmCounter(value) {
    return this.#registers['PROGRAMM_COUNTER'] = value
  }

  constructor(programm) {
    // Initialize Registers
    this.#registers = {
      'PROGRAMM_COUNTER': 0,
      'SIGNAL_STRENGTH': 0,
      'X': 1
    }

    this.#programm = programm

    this.#clockCycles = 1
    this.#intstructionSet = new CPU.INSTRUCTION_SET(this.#registers)

  }

  // Methods
  ///////////////////////////////////////////////////

  nextCycle() {
    return !this.process.next().done
  }

  * #executeCycles() {

    let programmCounter = this.#programmCounter
    const programm = this.#programm
    const instructionSet = this.#intstructionSet

    // Execute until CPU is at end of Programm
    // With the programm counter and that any loop instructions should work too!
    while (programmCounter <= programm.length - 1) {

      // Get Code Line
      const lineOfCode = programm[programmCounter]

      // Get Corressponding Instruction
      const instruction = instructionSet.GET(lineOfCode.split(/\s+/))

      if (argument.includes('TEST'))
        console.log(`\nExecuting Instruction '${lineOfCode.toUpperCase()}'`)
      console.group()
      // Executes Current Instruction Until all needed Cycles
      for (const cycle of instruction) {

        // During Cycle
        if (this.#clockCycles % 40 == 20) {
          console.log(`Caluclate Signal Strength at Cycles ${this.#clockCycles}:  ${this.#registers['X']} * ${this.#clockCycles} == ${this.#registers['X'] * this.#clockCycles}`)
          this.#registers['SIGNAL_STRENGTH'] += this.#registers['X'] * this.#clockCycles
        }

        // End of Cycle
        if (argument.includes('TEST')) console.log(`Executed Cycle: ${cycle}`)
        yield this.#clockCycles++// <== Only Exectues on Cycle on Iterator-Call
      }
      console.groupEnd()

      // Increase Programm Counter
      programmCounter = ++this.#programmCounter
    }

  }

}


//////////////////////////////////////////////

// Create CPU with provided Programm.
const cpu = new CPU(input)

console.log('\n== CPU Start Executing ==\n')
while (cpu.nextCycle()) { }
console.log('\n== CPU Finised Executing ==\n')

console.log(` The Signal Strenght after executing every Instruction is: ${cpu.signalStrength}\n`)