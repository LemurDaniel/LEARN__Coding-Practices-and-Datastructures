const fs = require('fs');

// const input = fs.readFileSync('input/day14-input-test.txt', 'utf-8').split('\n\r\n');
const input = fs.readFileSync('input/day14-input.txt', 'utf-8').split('\n\r\n');

const STATISTICS = {};
const CURRENT_STATE = {};
const POLYMER_SPLITTING = {}
const POLYMER_TEMPLATE = input[0].trim();

// initalize
for (const [key, value] of input[1].split('\r\n').map(rule => rule.split(' -> '))) {
  POLYMER_SPLITTING[key] = [key[0] + value, value + key[1], value];
  CURRENT_STATE[key] = 0;
  STATISTICS[key[0]] = 0;
  STATISTICS[key[1]] = 0;
}

for (let i = 1; i < POLYMER_TEMPLATE.length; i++) {
  const atom1 = POLYMER_TEMPLATE[i - 1];
  const atom2 = POLYMER_TEMPLATE[i];
  const pair = atom1 + atom2;
  CURRENT_STATE[pair]++;
  STATISTICS[atom1]++;
}
const lastAtom = POLYMER_TEMPLATE[POLYMER_TEMPLATE.length - 1];
STATISTICS[lastAtom]++;



// do stuff
console.log();
// console.log(CURRENT_STATE)
console.log(STATISTICS)

for (let step = 0; step < 40; step++) {
  const entries = Object.entries(CURRENT_STATE);
  // Each pair gets destroyed and splits into two different: CH with B inserted becomes => CH--, CB++, BH++,
  for (const [pairIn, amount] of entries) {
    const [pairOut1, pairOut2, atom] = POLYMER_SPLITTING[pairIn];
    CURRENT_STATE[pairOut1] += amount;
    CURRENT_STATE[pairOut2] += amount;
    CURRENT_STATE[pairIn] -= amount;

    // Only one new Atom gets inserted between each pair equals to the amount of pairs.
    STATISTICS[atom] += amount;
  }
}

// console.log(CURRENT_STATE)
console.log(STATISTICS)
let sorted = Object.values(STATISTICS).sort((a, b) => b - a)
console.log('\n   Difference between highest and lowest atom count: ' + (sorted[0] - sorted.pop()) + '\n')