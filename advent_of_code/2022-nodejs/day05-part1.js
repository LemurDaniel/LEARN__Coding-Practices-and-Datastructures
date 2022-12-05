const fs = require('fs')

var fileContent = fs.readFileSync('input/day05-input-test.txt', 'utf-8')
fileContent = fs.readFileSync('input/day05-input.txt', 'utf-8')

const input = fileContent.split('\r\n\r\n').map(v => v.split('\r\n'))

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


// Convert Upper input in map of stacked crates => { '1': ['Z', 'N'], etc. } // Stacks stored as arrays reversed
const stacks =
  // Get all stacks (1 - n)
  input[0][input[0].length - 1]
    .trim().split(/\s+/)
    .map(stack =>
      // Convert each stack (1 - n) in array of input lines without last line (1:  [['D'],['N','C'], ['Z','M','P']])
      input[0].slice(0, input[0].length - 1)
    )
    .map(
      (stack, idx) =>
        // Get vertical Crosssection of lines for each stack
        stack.map(line => line[1 + idx * 4])
          .filter(crate => crate.trim().length > 0)
          .reverse()
    )
    // Convert to objects {{1: ['Z', 'N'}}}
    .map(
      (stack, idx) => ({ [idx + 1]: stack })
    )
    // Reduce to one object
    .reduce((acc, a) => ({ ...acc, ...a }))



// Convert second part into Array like [ [count, from, to], etc. ]
const operations = input[1]
  .map(line => line.split(/[^\d]+/)
    .filter(v => v.length > 0)
    .map(v => parseInt(v))
  )


// Using fancy destructuring syntax
for (const [count, from, to] of operations) {

  // Using splice instead of slice, so original array is also cut by same operation.
  const cratesToMove = stacks[from].splice(stacks[from].length - count, count)
  stacks[to] = [...stacks[to], ...cratesToMove.reverse()]

  console.log(`Move ${count} Crate(s) - (${cratesToMove}) from Stack ${from} to Stack ${to}`)
  // console.log(stacks)

}

const topCrates = Object.values(stacks).map(stack => stack.pop()).join('')

console.log(`The Topmost crates on Stack after all Operations are: ${topCrates}`)