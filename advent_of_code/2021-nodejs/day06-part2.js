const fs = require('fs');
const readline = require('readline');

// const input = fs.readFileSync('input/day06-input-test.txt', 'utf-8').split(',').map(v => Number(v));
const input = fs.readFileSync('input/day06-input.txt', 'utf-8').split(',');

const timers = new Array(9).fill(0);

for (const fish of input)
  timers[fish]++;

for (let days = 256; days > 0; days--) {

  const spawningFishes = timers[0];
  for (let i = 0; i < 8; i++)
    timers[i] = timers[i + 1];

  timers[6] += spawningFishes;
  timers[8] = spawningFishes;

  if (days < 20) console.log(19-days, timers.reduce((acc, v) => acc + v), timers)

}