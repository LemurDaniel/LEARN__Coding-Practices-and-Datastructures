const Helper = require('../../nodejs/Helper')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day10-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day10-part2.js INPUT'    to process Todays input from 'day10-input.txt'.
//
//  Enter:
//    'node .\day10-part2.js TEST'     to process Todays Testinput from 'day10-input-test.txt'.
//    'node .\day10-part2.js'          to process Todays Testinput from 'day10-input-test.txt'.

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

  // programm Counter and cpuProgramm (Input) as Array of Codelines
  #cpuProgramm;
  #executor;

  #clockCycles;
  #registers;

  // CRT Screen from puzzle
  static CRT_EMPTY = '.'
  static CRT_DRAWN = '#'
  #CRTScreen;


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


    // Initalize Screen at 40 with and 6 height
    this.#CRTScreen = Array(6).fill(0)
      .map(v => Array(40).fill(CPU.CRT_EMPTY))
  }

  // Methods
  ///////////////////////////////////////////////////

  nextCycle() {
    if (this.#executor.next().done)
      return false
    else
      return true
  }

  printCurrentCRT() {
    console.log(Helper.printMatrix(this.#CRTScreen, true, 2))
  }
  // Called 
  #drawOnCRT() {
    const CRTScreen = this.#CRTScreen
    const currentPixelCRT = (this.#clockCycles - 1) % CRTScreen[0].length
    const currentRowCRT = Math.floor((this.#clockCycles - 1) / CRTScreen[0].length)

     // Subtract spritelength to middle, so it points to sprite position from very left
    const currentSpritePosition = this.#registers['X'] - 1 
    const spritePositionsCovered = Array(3).fill(currentSpritePosition).map((pos,idx) => pos + idx)

    // Draw when part of the Sprite is in the current CRT Pixel
    if(spritePositionsCovered.includes(currentPixelCRT)) 
      this.#CRTScreen[currentRowCRT][currentPixelCRT] = CPU.CRT_DRAWN

    if(argument.includes('TEST')) {
      console.log(`/////////////////////////////////////////////\nClock Cycle: ${this.#clockCycles}`)
      this.printCurrentCRT()
    }
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

      console.group()
      // Executes Current Instruction Until all needed Cycles
      for (const cycle of instruction) {
             
        // During Cycle
        this.#drawOnCRT()

        // End of Cycle
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

if(argument.includes('TEST'))
  console.log('\n== CPU Start Executing ==\n')

while (cpu.nextCycle()) { }

if (argument.includes('TEST'))
  console.log('\n== CPU Finised Executing ==')

console.log('\n/////////////////////////////////////////////\n')

console.log('=== CRT Screen After all Processed Instructions === ')
cpu.printCurrentCRT()

/*

/////////////////////////////////////////////

=== CRT Screen After all Processed Instructions === 

# # # . . # . . . . . # # . . # # # # . # . . # . . # # . . # # # # . . # # . .
# . . # . # . . . . # . . # . # . . . . # . # . . # . . # . . . . # . # . . # .
# . . # . # . . . . # . . . . # # # . . # # . . . # . . # . . . # . . # . . . .
# # # . . # . . . . # . # # . # . . . . # . # . . # # # # . . # . . . # . # # .
# . . . . # . . . . # . . # . # . . . . # . # . . # . . # . # . . . . # . . # .
# . . . . # # # # . . # # # . # . . . . # . . # . # . . # . # # # # . . # # # .

*/