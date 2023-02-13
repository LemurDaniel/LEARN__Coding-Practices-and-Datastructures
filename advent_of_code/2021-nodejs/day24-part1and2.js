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


const zDeltas = []
const xDeltas = []
const wDeltas = [];

for (const block of inputBlocks) {
  zDeltas.push(Number(block[3][2]));
  xDeltas.push(Number(block[4][2]));
  wDeltas.push(Number(block[14][2]));
}


function parse(i, w, zPast) {

  const x = zPast % 26 + xDeltas[i] !== w ? 1 : 0;
  const z = Math.floor(zPast / zDeltas[i]);
  return z * (25 * x + 1) + x * (w + wDeltas[i])

}


// At Block 0, z-state is null
const BLOCKS = {
  0: { 0: { z: 0, max: 0, min: 0 } }
};

// Takes a few minutes and around 3 Gigs (at peak nearly 4) of RAM,
// may run in memory issues on smaller machines,
// but it does still work with enough memory and bruteforces even though 9^14 possibilities 
// (shrunk by z-state collapsing)
//
// Nodejs can also be run with more allocated memory by:
//    - node --max-old-space-size=4096 day24-part1and2.js
//    - node --max-old-space-size=8192 day24-part1and2.js
//
//  ==> Output: At Block 14 with z-state 0: { min: 11419161313147, max: 36969794979199 }

//  It does work because even though 9^14 is in the trillions (in german Billionen)
//  after z-state collapsing only around 5.8 million are left.

// The z-state collapse means that several sequences can result in one state and can be continued as one calculation.
//    Example with random numbers
//       1466
//       1238   => same z-state => all subsequent calculations the same and need only be done once.
//       6799

//  Since each block is only dependant on the z-stat inpute,
//  it can be concluded that all those sequences will result in the same numbers in the next block.
//  I'm shitty at explaining things via text. But this means those 3 Caculaions become one
//  with all blocks 9^14 possibilities go down to a few million calculations.
//  Makes bruteforce possible and it does work.

// Calculate from a z-state all different possible z-states by digit and collapse equal ones.

function solve() {

  console.log();
  console.group()
  // Iterate over all 14-Blocks
  for (let i = 1; i <= 14; i++) {

    prevStates = BLOCKS[i - 1]
    currentStates = {};
    BLOCKS[i] = currentStates;

    const timeStart = Date.now();
    // Iterate over all collapsed Z-states in the previous Block.
    for (const key of Object.keys(prevStates)) {

      const zState = Number(key);
      // Calculate all possible next z-states for digits 1-9 and collapse equal ones.
      for (let d = 1; d <= 9; d++) {
        const zRes = parse(i - 1, d, zState);

        // Of all collapsed z-states, it only keeps the sequence of digits for the minimum and the maximum number.

        // check if the z-state result is in current results.
        // Keep only max and min to calculate in the next block.
        if (!(zRes in currentStates)) {
          currentStates[zRes] = {
            min: prevStates[zState].min * 10 + d,
            max: prevStates[zState].max * 10 + d,
          }
        } else {
          // If its in the z-states, adjust stored max, min sequence, since those are wanted by the puzzle.
          if (d >= currentStates[zRes].max % 10) {
            currentStates[zRes].max =
              prevStates[zState].max * 10 + d;
          }
          if (d <= currentStates[zRes].min % 10) {
            currentStates[zRes].min =
              prevStates[zState].min * 10 + d;
          }

        }

      }

    }

    const zStates = Object.keys(BLOCKS[i]).length
    const actualIncrease = zStates - Object.keys(BLOCKS[i - 1]).length
    delete BLOCKS[i - 1]; // Release memory

    const timestamp = Date.now() - timeStart;
    const seconds = timestamp / 1000 % 60
    const minutes = Math.floor(timestamp / 1000 / 60);

    // Since on eacht Iteration of a Block, all equal Calculations are collapsed into one, and continued as one z-state => one calculation
    // the numbers don't increase anymore exponentially, which is the main hinderence of a bruteforce approach for this.
    // Below the the increase on each Block after z-state collapse is shown, as well as the the amount of states the normal exponatial growth would have been.
    console.log(
      `${minutes} m ${seconds.toString().substring(0, 3).padStart(5, " ")} s | `,
      `Digit Block ${`${i}`.padStart(2, " ")}   `,
      `${zStates.toLocaleString().padStart(10, " ")} States`,
      ` - ${actualIncrease <= 0 ? "decrease" : "increase"} ${actualIncrease.toLocaleString().padStart(10, " ")}`,
      ` - exponantial Growth ${Math.pow(9, i).toLocaleString().padStart(18, " ")} (9^${i})`
      );
  }
  console.groupEnd()

  delete BLOCKS[13] // Release Memory

  console.log()
  console.log('Number of z-states left', Object.keys(BLOCKS[14]).length.toLocaleString())
  console.log(BLOCKS[14][0])

}


solve();




