const fs = require('fs');
const readline = require('readline');

// const input = fs.readFileSync('input/day06-input-test.txt', 'utf-8').split(',');
const input = fs.readFileSync('input/day06-input.txt', 'utf-8').split(',');


for (let days = 80; days > 0; days--) {

  let newFishCount = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i]-- === 0) {
      input[i] = 6;
      newFishCount++;
    }
  }

  for (; newFishCount > 0; newFishCount--) {
    input.push(8);
  }

  console.log(days, input.length, input)

}