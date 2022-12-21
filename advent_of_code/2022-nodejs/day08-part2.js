const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
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
// 16 ||| 672280


const EMPTY = '.'
const [PI, TAU] = [Math.PI, Math.PI * 2]

//  Some garbage code function
function processScenicScore(solution, row, col, dunnoHowToName = 4) {

  // The Fraction-Amount of circle-circumference => angle == 2PI / dunnoHowToName
  return Array(dunnoHowToName)
    .fill(TAU / dunnoHowToName)
    .map((v, idx) => [
      Math.round(Math.sin(v * idx)), // vertical
      Math.round(Math.cos(v * idx)) // horizontal
    ])
    // Upper Code returns polar-coords of going round a circle in vectors like: [0,1], [1,0], etc.
    .map(
      ([vertical, horizontal]) => {

        // console.log(`Process Tree ${solution[row][col]}`)
        for (let viewingDistance = 1; ; viewingDistance++) {

          const nextRow = row + viewingDistance * vertical
          const nextCol = col + viewingDistance * horizontal

          if (null == solution[nextRow])
            return viewingDistance - 1

          if (null == solution[nextRow][nextCol])
            return viewingDistance - 1

          if (solution[nextRow][nextCol] >= solution[row][col])
            return viewingDistance

        }

      }
    )
    .filter(Boolean).reduce((acc, a) => acc * a, 1)

}


// Assumption: Input is a square
const ScenicMap = Array(input.length).fill(EMPTY)
  .map(col => Array(input.length).fill(EMPTY))
  //
  .map((row, rowIdx) =>
    row.map((col, colIdx) => processScenicScore(input, rowIdx, colIdx))
  )

const heighestPossibleScore = ScenicMap.flat().reduce((max, score) => Math.max(max, score))


console.clear()
console.log('\n///////////////////////////////////////////////////////////////')
console.log('\n Map of trees with their Heighest Scenic Score: ')
console.log(Utils.Print.fromMatrix(ScenicMap))

console.log(` Heighest Scenic Score in Treescape: ${heighestPossibleScore}\n`)