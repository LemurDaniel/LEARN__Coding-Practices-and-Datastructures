const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day12-part1-1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day12-part1-1.js INPUT'    to process Todays input from 'day12-input.txt'.
//
//  Enter:
//    'node .\day12-part1-1.js TEST'     to process Todays Testinput from 'day12-input-test.txt'.
//    'node .\day12-part1-1.js'          to process Todays Testinput from 'day12-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day12-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day12-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const input = fileContent.split('\r\n').map(v => v.split(''))

// Get Needed Classes
const Vector2D = Datastructures.Vector2D

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


// Find Ending Position
function* matrixIterator(mat) {
  for (let row = 0; row < mat.length; row++) {
    for (let col = 0; col < mat[0].length; col++) {
      yield [row, col, mat[row][col]]
    }
  }
}

///////////////////////////////////////////////////////////////


const END = 'E'
const START = 'S'
let startVector;
let endVector;

const matrix = Array(input.length).fill(0).map(v => Array(input[0].length))
const vectors = []


for (const [row, col, val] of matrixIterator(input)) {
  matrix[row][col] = Infinity

  if (val == START)
    startVector = new Vector2D(col, row)

  if (val == END) {
    endVector = new Vector2D(col, row)
    matrix[row][col] = 0
    vectors.push(endVector)
  }
}

///////////////////////////////////////////////////////////////

function getValidNextMoves(pos) {

  // Walk all directions
  const directions = Array(4).fill(0)
    .map((v, i) => Math.PI / 2 * i)
    .map(v => new Vector2D(
      Math.round(Math.cos(v)),  // hori
      Math.round(Math.sin(v)) // vert
    ))

  const moves = []
  const positions = []

  for (let i = 0; i < directions.length; i++) {

    const posNew = Vector2D.add(pos, directions[i])

    // Out of Bounds
    if (posNew.y < 0 || posNew.x < 0 || posNew.y >= matrix.length || posNew.x >= matrix[0].length)
      continue

    // Too Steep
    if (input[pos.y][pos.x].charCodeAt(0) - input[posNew.y][posNew.x].charCodeAt(0) > 1)
      continue

    moves.push(directions[i])
    positions.push(posNew)

  }

  return { positions, moves }
}


///////////////////////////////////////////////////////////////

const visited = {}
vectors.push(endVector)
input[startVector.y][startVector.x] = 'a' // String.fromCharCode('a'.charCodeAt(0) - 1) <== NOTE Causes off by two, because S should be able to reach b | And it's not even needed anymore for Version this Solution. Dumb me
input[endVector.y][endVector.x] = 'z' // String.fromCharCode('z'.charCodeAt(0) + 1) <== NOTE Causes off by two, because y should be able to reach E | And it's not even needed anymore for Version this Solution. Dumb me

while (vectors.length > 0) {

  vectors.sort((a, b) => matrix[b.y][b.x] - matrix[a.y][a.x])
  const posCurr = vectors.pop()

  const weightPosCurr = matrix[posCurr.y][posCurr.x]
  const weightPosNew = weightPosCurr + 1
  const { positions } = getValidNextMoves(posCurr)

  for (const posNew of positions) {

    const visit = [posCurr.y, posCurr.x, posNew.y, posNew.x]

    if (visit in visited)
      continue
    else
      visited[visit] = true

    if (weightPosNew <= matrix[posNew.y][posNew.x]) {
      matrix[posNew.y][posNew.x] = weightPosNew
      vectors.push(posNew)
    }

  }

}

///////////////////////////////////////////////////////////////

// NOTE:
//  - There are two Solutions, because the first Solution was off by two.
//  - The second I wrote was consistently off by two too, until I found the error. 

///////////////////////////////////////////////////////////////


console.log('\n///////////////////////////////////////////////////////////////')

const printMatrix = matrix.map(v => v.map(v => v == Infinity ? `-` : v))
printMatrix[endVector.y][endVector.x] = END
printMatrix[startVector.y][startVector.x] = START

if (argument.includes('TEST'))
  console.log(Utils.Print.fromMatrix(printMatrix))
else
  fs.writeFileSync(`./day12-part1-1.${argument.toLowerCase()}.txt`, Utils.Print.fromMatrix(printMatrix, 6), 'utf-8')

console.log(`\n The shortest Path from Start to End involves ${matrix[startVector.y][startVector.x]} Steps.\n`)

