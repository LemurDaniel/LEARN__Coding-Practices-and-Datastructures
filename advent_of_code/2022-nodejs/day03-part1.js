const fs = require('fs');

const input = fs.readFileSync('input/day03-input.txt', 'utf-8').split('\r\n');
// const input = fs.readFileSync('input/day03-input-test.txt', 'utf-8').split('\r\n');

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

const doubleItemPriorities = input
  .map(v => v.split(''))
  .map(v => [
    v.slice(0, v.length / 2),
    v.slice(v.length / 2, v.length)
  ])
  .map(v =>
    v[0].filter(char => v[1].includes(char))[0]
  )
  .map(
    v => v.charCodeAt(0) - (v.charCodeAt(0) < 97 > 0 ? 38 : 96)
  )
  .reduce((acc, a) => acc + a)


console.log(`The Sum of Priorites of all double items is: ${doubleItemPriorities}`)