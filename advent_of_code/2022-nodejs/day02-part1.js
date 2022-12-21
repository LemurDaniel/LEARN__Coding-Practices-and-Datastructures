const fs = require('fs');

const argument = process.argv[2] ?? 'TEST'
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day02-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day02-input.txt', 'utf-8'); break

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

// Rock Paper Scissors
const chars = {
  'A': 1,
  'X': 1,
  'B': 2,
  'Y': 2,
  'C': 3,
  'Z': 3,
}

const score = input.map(v => v.split(' ').map(v => chars[v]))
  .map(v =>
    v[1] + (v[1] == v[0] ? 3 : 0) + (v[1] == v[0] + 1 || (v[1] == 1 && v[0] == 3) ? 6 : 0)
  ).reduce((acc, a) => acc + a)


console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.log(`Your Score after following the strategy is: ${score}\n`)
