const fs = require('fs');

let input = fs.readFileSync('input/day02-input.txt', 'utf-8').split('\r\n');
// input = fs.readFileSync('input/day02-input-test.txt', 'utf-8').split('\r\n');

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


console.log(`Your Score after following the strategy is: ${score}`)
