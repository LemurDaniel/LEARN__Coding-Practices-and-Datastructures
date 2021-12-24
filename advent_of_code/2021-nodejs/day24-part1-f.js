const fs = require('fs');

let input;
let monatIterator;

input = fs.readFileSync('./input/day24-input-test.txt', 'utf-8').split('\r\n').map(v => v.split(' '));
input = fs.readFileSync('./input/day24-input.txt', 'utf-8').split('\r\n').map(v => v.split(' '));


inputBlocks = [];
for (const ins of input) {
  if (ins[0] === 'inp')
    inputBlocks.push(new Array())

  else
    inputBlocks[inputBlocks.length - 1].push(ins)
}

const INSTRUCTION_SET = {

  isDigit: (str) => str != null && '-0123456789'.includes(str[0]),
  // reg1 is always a register not a number.
  calc: (opcode, reg1, reg2, STATE) => {
    const num1 = STATE[reg1];
    const num2 = INSTRUCTION_SET.isDigit(reg2) ? Number(reg2) : STATE[reg2];
    STATE[reg1] = INSTRUCTION_SET[opcode](num1, num2);
  },

  trunc: (num) => num >= 0 ? Math.floor(num) : Math.ceil(num),
  inp: (reg) => Number(monatIterator.next().value),
  eql: (a, b) => a === b ? 1 : 0,

  add: (a, b) => a + b,
  mul: (a, b) => a * b,
  mod: (a, b) => a % b,
  div: (a, b) => INSTRUCTION_SET.trunc(a / b),

}

// At Block 0, z-state is null
const BLOCKS = {
  0: { 0: { z: 0 } }
};

function parse(inpBlock, w, z) {

  const state = { w: w, z: z, x: 0, y: 0 };

  for (let i = 0; i < inpBlock.length; i++) {
    const [ins, a, b] = inpBlock[i];
    INSTRUCTION_SET.calc(ins, a, b, state);
  }

  return state.z;
}

function s() {

  for (let i = 1; i < inputBlocks.length; i++) {

    prevStates = BLOCKS[i - 1]
    currentStates = {};
    BLOCKS[i] = currentStates;

    for (const { z: zState } of Object.values(prevStates)) {

      // Calculate from a z-state all different possible z-states by digit and collapse equal ones.
      for (let d = 1; d <= 9; d++) {
        const zRes = parse(inputBlocks[i - 1], d, zState);
        const cacheKey = i + '-' + zRes;

        const min = zRes in prevStates ? prevStates[zRes].min : 9;
        const max = zRes in prevStates ? prevStates[zRes].max : 1;
        currentStates[zRes] = {
          z: zRes,
          zPrev: zState,
          min: Math.min(min, d),
          max: Math.max(max, d),
        }
      }
    }

    console.log('   ', 'Processed Digit Block ' + i, '   ', ' States: ' + Object.keys(BLOCKS[i]).length);
  }

}


console.log();
s();
console.log();

