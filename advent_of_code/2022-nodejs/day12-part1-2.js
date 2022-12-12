const { NodeQueue } = require('../../nodejs/datastructures/queue')
const Helper = require('../../nodejs/Helper')
const process = require('process')
const fs = require('fs');

// NOTE:
//  node .\day12-part1-2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day12-part1-2.js INPUT'    to process Todays input from 'day12-input.txt'.
//
//  Enter:
//    'node .\day12-part1-2.js INPUT'    to process Todays Testinput from 'day12-input-test.txt'.
//    'node .\day12-part1-2.js'          to process Todays Testinput from 'day12-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day12-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day12-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

const input = fileContent.split('\r\n').map(v => v.split(''))

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

class Vector {

  #x;
  #y;

  static add(vector0, vector1) {
    return vector0.copy.add(vector1)
  }

  get x() {
    return this.#x
  }

  get y() {
    return this.#y
  }

  get copy() {
    return new Vector(this.#y, this.#x)
  }

  constructor(y, x) {
    this.#y = y
    this.#x = x
  }

  is(vector) {
    return this.#x == vector.#x && this.#y == vector.#y
  }

  add(vector) {
    this.#y += vector.#y
    this.#x += vector.#x
    return this
  }

}

// Find Ending Position
function* matrixIterator(mat) {
  for (let row = 0; row < mat.length; row++) {
    for (let col = 0; col < mat[0].length; col++) {
      yield [row, col, mat[row][col]]
    }
  }
}

///////////////////////////////////////////////////////////////



// Go through all nodes breadth first
// get distance from predecessor to current
// if dist smaller, then update and add to queue else don't do further

const END = 'E'
const START = 'S'
let startVector;
let endVector;

const matrix = Array(input.length).fill(0).map(v => Array(input[0].length))
const vectors = []


for (const [row, col, val] of matrixIterator(input)) {
  matrix[row][col] = Infinity

  if (val == END)
    endVector = new Vector(row, col)

  if (val == START) {
    startVector = new Vector(row, col)
    matrix[row][col] = 0
    vectors.push(startVector)
  }
}

///////////////////////////////////////////////////////////////

const queue = new NodeQueue(startVector)

input[startVector.y][startVector.x] = 'a' // String.fromCharCode('a'.charCodeAt(0) - 1) <== NOTE Causes off by two, because S should be able to reach b | And it's not even needed anymore for Version this Solution. Dumb me
input[endVector.y][endVector.x] = 'z' // String.fromCharCode('z'.charCodeAt(0) + 1) <== NOTE Causes off by two, because y should be able to reach E | And it's not even needed anymore for Version this Solution. Dumb me


while (!queue.isEmpty) {

  const posCurr = queue.dequeue()
  const weightCurr = matrix[posCurr.y][posCurr.x]

  // Walk all directions
  const directions = Array(4).fill(0)
    .map((v, i) => Math.PI / 2 * i)
    .map(v => new Vector(
      Math.round(Math.sin(v)), // vert
      Math.round(Math.cos(v))  // hori
    ))

  for (let i = 0; i < directions.length; i++) {

    const posNew = Vector.add(posCurr, directions[i])

    // Out of Bounds
    if (posNew.y < 0 || posNew.x < 0 || posNew.y >= matrix.length || posNew.x >= matrix[0].length)
      continue

    // Too Steep
    if (input[posNew.y][posNew.x].charCodeAt(0) - input[posCurr.y][posCurr.x].charCodeAt(0) > 1)
      continue

    const weightNew = weightCurr + 1

    // Won't walk backwards since weight keeps increasing 
    // Also no issues with cycles, since weight would be increasing per step and therefore stopping
    if (weightNew >= matrix[posNew.y][posNew.x])
      continue

    matrix[posNew.y][posNew.x] = weightNew
    queue.enqueue(posNew)
  }

}

///////////////////////////////////////////////////////////////


console.log('\n///////////////////////////////////////////////////////////////')

const printMatrix = matrix.map(v => v.map(v => v == Infinity ? `-` : v))
printMatrix[endVector.y][endVector.x] = END
printMatrix[startVector.y][startVector.x] = START

if (argument.includes('TEST'))
  console.log(Helper.printMatrix(printMatrix))
else
  fs.writeFileSync(`./day12-part1-2.${argument.toLowerCase()}.txt`, Helper.printMatrix(printMatrix, true, 6), 'utf-8')

console.log(`\n The shortest Path from Start to End involves ${matrix[endVector.y][endVector.x]} Steps.\n`)
