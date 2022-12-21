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

// Find the Elf carrying the most Calories.

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


const mostCalories = input
  .map(elf => elf.reduce((acc, a) => acc + a)).reduce((a, b) => Math.max(a, b))

console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.log(`The elf with the most calories carries a total of ${mostCalories} calories.\n`)
