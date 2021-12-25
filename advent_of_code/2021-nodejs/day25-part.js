const fs = require('fs');
const readline = require('readline');
const { stdin, stdout } = require('process');
const rl = readline.createInterface({ input: stdin, output: stdout });

let input;
input = fs.readFileSync('./input/day25-input-test.txt', 'utf-8').split('\r\n').map(v => v.split(''));
input = fs.readFileSync('./input/day25-input-test2.txt', 'utf-8').split('\r\n').map(v => v.split(''));
input = fs.readFileSync('./input/day25-input.txt', 'utf-8').split('\r\n').map(v => v.split(''));

const EAST_CUCUMBERS = {};
const SOUTH_CUCUMBERS = {};
const DEBUG = false;
const BOUNDS = {
  x: input[0].length,
  y: input.length
}
const SYMBOLS = {
  cEast: '>',
  cSouth: 'v',
  empty: '.',
}


for (let y = 0; y < BOUNDS.y; y++) {
  for (let x = 0; x < BOUNDS.x; x++) {
    const pos = [y, x];
    const el = input[y][x];

    if (el === SYMBOLS.cEast)
      EAST_CUCUMBERS[pos] = pos;
    else if (el === SYMBOLS.cSouth)
      SOUTH_CUCUMBERS[pos] = pos;

  }
}



function processStep() {

  let movements = 0;

  // Move East cucumbers
  let pendingRemoval = [];
  for (const [y, x] of Object.values(EAST_CUCUMBERS)) {
    const original = [y, x];
    const newPos = [y, (x + 1) % BOUNDS.x];

    if (newPos in EAST_CUCUMBERS || newPos in SOUTH_CUCUMBERS) continue;

    EAST_CUCUMBERS[newPos] = newPos;
    pendingRemoval.push(original);
    movements++;
  }

  pendingRemoval.forEach(pos => delete EAST_CUCUMBERS[pos]);

  // Move South cucumbers
  pendingRemoval = [];
  for (const [y, x] of Object.values(SOUTH_CUCUMBERS)) {
    const original = [y, x];
    const newPos = [(y + 1) % BOUNDS.y, x];

    if (newPos in EAST_CUCUMBERS || newPos in SOUTH_CUCUMBERS) continue;

    SOUTH_CUCUMBERS[newPos] = newPos;
    pendingRemoval.push(original);
    movements++;
  }

  pendingRemoval.forEach(pos => delete SOUTH_CUCUMBERS[pos]);

  return movements;
}



function printCucumbers(text = '') {

  console.log(' ', text)
  for (let y = 0; y < BOUNDS.y; y++) {

    const line = [];
    for (let x = 0; x < BOUNDS.x; x++) {
      const pos = [y, x];

      if (pos in SOUTH_CUCUMBERS)
        line.push(SYMBOLS.cSouth)
      else if (pos in EAST_CUCUMBERS)
        line.push(SYMBOLS.cEast)
      else
        line.push(SYMBOLS.empty)

    }
    console.log('   ', line.join(''))
  }
  console.log();
}


console.log()
printCucumbers('Initial: ');

let steps = 0;
for (; steps < 10e3; steps++) {
  const movements = processStep();
  if (movements === 0) break;

  if (steps < 3 || steps % 20 === 0) {
    if (DEBUG) printCucumbers('After Step: ' + (steps + 1));
    else console.log('  ', 'Processed ' + steps + ' Steps - ' + movements + ' cucumbers moved.')
  }
}
console.log('\n  ', 'No movements left after ' + (steps + 1) + ' Steps.\n')
rl.question('   Press anything to print endstate: ', (res) => {
  printCucumbers('\n  Endstate After Step: ' + (steps + 1));
  rl.close();
});