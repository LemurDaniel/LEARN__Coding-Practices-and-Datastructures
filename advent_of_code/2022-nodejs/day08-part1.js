const { Datastructures, Utils } = require('../_lib/lib.js')
const fs = require('fs');

const argument = process.argv[2] ?? 'TEST'
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day08-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day08-input.txt', 'utf-8'); break

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

const EMPTY = '.'


//  Some garbage code function
function processDirection(solution, direction) {
  for (let row = 0; row < solution.length; row++) {

    let highest
    switch (direction) {
      case 'top':
        highest = input[0][row]; break

      case 'bottom':
        highest = input[input.length - 1][row]; break

      case 'left':
        highest = input[row][0]; break

      case 'right':
        highest = input[row][input.length - 1]; break

      default:
        throw 'Error'
    }

    // console.log(highest)

    for (let col = 0; col < solution.length; col++) {

      let pos
      switch (direction) {
        case 'top':
          pos = [col, row]; break

        case 'bottom':
          pos = [solution.length - col - 1, row]; break

        case 'left':
          pos = [row, col]; break

        case 'right':
          pos = [row, solution.length - col - 1]; break

        default:
          throw 'Error'
      }

      const [rowSol, colSol] = pos
      const current = input[rowSol][colSol]

      // Edges are always visible
      if (col == 0 || row == 0)
        solution[rowSol][colSol] = current
      else
        solution[rowSol][colSol] = current > highest ? current : solution[rowSol][colSol]

      highest = Math.max(current, highest)
    }
  }
}


// Assumption: Input is a square
const solution = Array(input.length).fill(EMPTY)
  .map(v => Array(input.length).fill(EMPTY))

processDirection(solution, 'left')
processDirection(solution, 'right')
processDirection(solution, 'bottom')
processDirection(solution, 'top')

const visibleEdge = input.length * 4 - 4
const visibleInteror = solution.flat().filter(v => v != EMPTY).length - visibleEdge


console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.log(Utils.Print.fromMatrix(solution))
console.log(` There are a total of ${visibleEdge + visibleInteror} Trees visible. (Edge: ${visibleEdge}, Interior ${visibleInteror})\n`)