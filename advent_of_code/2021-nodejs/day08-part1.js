const fs = require('fs');
const readline = require('readline');

// const input = fs.readFileSync('input/day08-input-test.txt', 'utf-8').split('\r\n');
const input = fs.readFileSync('input/day08-input.txt', 'utf-8').split('\r\n');


const segmentsPerDigit = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]

const uniqueSegmentsDigits = {
  2: 1,
  4: 4,
  3: 7,
  7: 8
}

let appearancesOf1478 = 0;
for (const line of input) {

  for (const output of line.split(' | ')[1].split(' ')) {
    if (output.length in uniqueSegmentsDigits) appearancesOf1478++;
  }

  console.log(appearancesOf1478)
}