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

// Calculate from a z-state all different possible z-states by digit and collapse equal ones.

function solve() {

  console.log();
  for (let i = 1; i <= 14; i++) {

    prevStates = BLOCKS[i - 1]
    currentStates = {};
    BLOCKS[i] = currentStates;

    const timeStart = Date.now();
    for (const key of Object.keys(prevStates)) {

      const zState = Number(key);
      for (let d = 1; d <= 9; d++) {
        const zRes = parse(i - 1, d, zState);

        if (!(zRes in currentStates)) {
          currentStates[zRes] = {
            min: prevStates[zState].min * 10 + d,
            max: prevStates[zState].max * 10 + d,
          }
        } else {

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

    delete BLOCKS[i - 1];
    const timestamp = Date.now() - timeStart;
    const seconds = timestamp / 1000 % 60
    const minutes = Math.floor(timestamp / 1000 / 60);
    console.log(
      '   ', 'Processed Digit Block ', i,
      '   ', ' States: ', Object.keys(BLOCKS[i]).length,
      '   - in', minutes, ' minutes ', seconds, ' seconds');
  }

  delete BLOCKS[13] // Release Memory
  console.log();
  // console.log(Object.entries(BLOCKS[14])) // Console.loggin it can also cause reaching heap limit.
  console.log('Number of z-states left', Object.keys(BLOCKS[14]).length)
  console.log(BLOCKS[14][0])
  //console.log(Object.entries(BLOCKS[Object.keys(BLOCKS).sort()[0]]))
  //console.log(BLOCKS[Object.keys(BLOCKS).sort()[0]][0])

}


solve();




