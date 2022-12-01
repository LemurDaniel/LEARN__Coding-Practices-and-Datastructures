const fs = require('fs');

const input = fs.readFileSync('input/day01-input.txt', 'utf-8')
// const input = fs.readFileSync('input/day01-input-test.txt', 'utf-8')


// Find the Elf carrying the most Calories.

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


const mostCalories = input.split('\r\n\r\n')
  .map(v => v.split('\r\n')
    .map(v => parseInt(v))
    .reduce(
      (acc, a) => acc + a)
  ).sort((a, b) => b - a)[0]

console.log(`The elf with the most calories carries a total of ${mostCalories} calories.`)
