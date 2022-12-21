const fs = require('fs');

const argument = process.argv[2] ?? 'TEST'
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day01-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day01-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

const input = fileContent.split('\r\n\r\n')
  .map(elf => elf.split('\r\n').map(cals => parseInt(cals)))

// Find the top three Elf carrying the most Calories.

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


const totalCaloriesTopThree = input
  .map(elf => elf.reduce((acc, a) => acc + a))
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, a) => acc + a)

console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.log(`The top three elfs with the most calories carry a total of ${totalCaloriesTopThree} calories.\n`)