const fs = require('fs');

const argument = process.argv[2] ?? 'TEST'
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day03-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day03-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

const input = fileContent.split('\r\n')

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


const doubleItemPriorities = input
  .reduce(
    // Group every three iterations then split
    (acc, a, i) => acc + (i % 3 != 0 ? '#' : '###') + a)
  .split('###').map(v => v.split('#'))
  .map(arr => arr.map(v => v.split('')))
  .map(arr =>
    arr[0].filter(
      v => arr[1].includes(v) && arr[2].includes(v)
    )[0]
  )
  .map(
    v => v.charCodeAt(0) - (v.charCodeAt(0) < 97 > 0 ? 38 : 96)
  )
  .reduce((acc, a) => acc + a)


console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.log(`The Sum of Priorites of all double items per three-Elf-Group is: ${doubleItemPriorities}\n`)
