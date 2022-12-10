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

      const result = this.#register[reg] + literal

      yield 1 // End of first cycle still not finished

      this.#register[reg] = result

      yield 2 // End of second cylce, value is saved
    }
  }


  // Instance Variables
  ///////////////////////////////////////////////////

  // Testing some new Syntax
  #intstructionSet;

  // programm Counter and cpuProgramm (Input) as Array of Codelines
  #cpuProgramm;
  #executor;

  #clockCycles;
  #registers;

  get signalStrength() {
    return this.#registers['SIGNAL_STRENGTH']
  }

  get #programmCounter() {
    return this.#registers['PROGRAMM_COUNTER']
  }

  set #programmCounter(value) {
    return this.#registers['PROGRAMM_COUNTER'] = value
  }

  constructor(cpuProgramm) {
    // Initialize Registers
    this.#registers = {
      'PROGRAMM_COUNTER': 0,
      'SIGNAL_STRENGTH': 0,
      'X': 1
    }

    this.#executor = this.#executeCycles()
    this.#cpuProgramm = cpuProgramm

    this.#clockCycles = 1
    this.#intstructionSet = new CPU.INSTRUCTION_SET(this.#registers)

  }

  // Methods
  ///////////////////////////////////////////////////

  nextCycle() {
    if (this.#executor.next().done)
      return false
    else
      return true
  }

  * #executeCycles() {

    let programmCounter = this.#programmCounter
    const cpuProgramm = this.#cpuProgramm
    const instructionSet = this.#intstructionSet

    // Execute until CPU is at end of Programm
    // With the programm counter and that any loop instructions should work too!
    while (programmCounter <= cpuProgramm.length - 1) {

      // Get Code Line
      const lineOfCode = cpuProgramm[programmCounter]

      // Get Corressponding Instruction
      const instruction = instructionSet.GET(lineOfCode.split(/\s+/))

      if (argument.includes('TEST'))
        console.log(`\nExecuting Instruction '${lineOfCode.toUpperCase()}'`)
      console.group()
      // Executes Current Instruction Until all needed Cycles
      for (const cycle of instruction) {
        if (argument.includes('TEST'))
          console.log(`Executed Cycle: ${cycle}`)

        // Increase Cylce by one
        this.#clockCycles++

        // It is importan to places block after cycle increase => so that at end of Cycle 1, increase to 2, means that the following is executed DURING the Cycle, not after the Cylce!
        // Calculate signal Strength every 20, 60, 100, 140, etc. Cylce
        if (this.#clockCycles % 40 == 20) {
          console.log(`Caluclate Signal Strength at Cycles ${this.#clockCycles}:  ${this.#registers['X']} * ${this.#clockCycles} == ${this.#registers['X'] * this.#clockCycles}`)
          this.#registers['SIGNAL_STRENGTH'] += this.#registers['X'] * this.#clockCycles
        }

        yield // <== Only Exectues on Cycle on Iterator-Call
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