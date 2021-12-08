const fs = require('fs');
const readline = require('readline');

// const input = fs.readFileSync('input/day07-input-test.txt', 'utf-8').split(',').map(v => Number(v));
const input = fs.readFileSync('input/day07-input.txt', 'utf-8').split(',').map(v => Number(v));

let min = Infinity;
let max = -Infinity;

for (const num of input) {
  if (num < min) min = num;
  if (num > max) max = num;
}

console.log(min, max)

const array = new Array(max + 1).fill(0);
const fuel = new Array(max + 1).fill(0);

for (const num of input) {
  array[num]++;
}
console.log(array)

for (let i = 0, last = 0, crabs = 0; i < array.length; i++) {
  fuel[i] += crabs + last;
  last += crabs;
  crabs += array[i];
}

for (let i = array.length - 1, last = 0, crabs = 0; i >= 0; i--) {
  fuel[i] += crabs + last;
  last += crabs;
  crabs += array[i];
}

console.log(fuel)
console.log(fuel.reduce((prev, v) => prev >= v ? v : prev))