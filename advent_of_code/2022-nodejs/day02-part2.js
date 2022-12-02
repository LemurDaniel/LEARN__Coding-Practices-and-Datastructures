const fs = require('fs');

const input = fs.readFileSync('input/day02-input.txt', 'utf-8').split('\r\n');
// const input = fs.readFileSync('input/day02-input-test.txt', 'utf-8').split('\r\n');

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

// Quick garbage Code
const score = input.map(v => v.split(' ')
  .map(v => chars[v]))
  .map(v => {
    if (v[1] == 2)
      return [v[0], v[0]]
    else if (v[1] == 1) {
      if (v[0] == 3) return [v[0], 2]
      else if (v[0] == 2) return [v[0], 1]
      else if (v[0] == 1) return [v[0], 3]
    }
    else if (v[1] == 3) {
      if (v[0] == 3) return [v[0], 1]
      else if (v[0] == 2) return [v[0], 3]
      else if (v[0] == 1) return [v[0], 2]
    }
  })
  .map(v =>
    v[1] + (v[1] == v[0] ? 3 : 0) + (v[1] == v[0] + 1 || (v[1] == 1 && v[0] == 3) ? 6 : 0)
  ).reduce((acc, a) => acc + a)

console.log(`Your Score after following the strategy is: ${score}`)