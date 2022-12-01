const fs = require('fs');

const input = fs.readFileSync('input/day01-input.txt', 'utf-8');
// const input = fs.readFileSync('input/day01-input-test.txt', 'utf-8');

// Find the top three Elf carrying the most Calories.

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


const totalCaloriesTopThree = input.split('\r\n\r\n')
  .map(v => v.split('\r\n')
    .map(v => parseInt(v))
    .reduce(
      (acc, a) => acc + a)
  ).sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, a) => acc + a)

console.log(`The top three elfs with the most calories carry a total of ${totalCaloriesTopThree} calories.`)