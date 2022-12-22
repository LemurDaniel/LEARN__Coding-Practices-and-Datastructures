const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day22-part2.js [INPUT|TEST]
//
//  Enter:
//    'node .\day22-part2.js INPUT'    to process Todays input from 'day22-input.txt'.
//
//  Enter:
//    'node .\day22-part2.js TEST'     to process Todays Testinput from 'day22-input-test.txt'.
//    'node .\day22-part2.js'          to process Todays Testinput from 'day22-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day22-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day22-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const Input = fileContent.split('\r\n\r\n')

const board = Input[0].split('\r\n').map(v => v.split(''))
const instructions = Input[1].replace(/([RL]{1})/g, `-$1-`).split('-')
  .map(v => 'LR'.includes(v) ? v : parseInt(v))
const sideLength = Input[0].split('\r\n').map(v => v.trim().length)
  .reduce((acc, a) => Math.min(acc, a))

const Characters = {
  WALL: '#',
  EMPTY: ' ',
  FIELD: '.'
}

// Get Needed Classes
const Vector2D = Datastructures.Vector2D
const VectorBase = Datastructures.VectorBase

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/

///////////////////////////////////////////////////////////////

let startPosition = null
const Positions = {}

for (let row = 0; row < board.length; row++) {

  for (let col = 0; col < board[row].length; col++) {
    if (board[row][col] != Characters.EMPTY) {
      // Make a dictionary for all Positions.
      const pos = new Vector2D(col, row)
      Positions[pos] = board[row][col]
      startPosition = startPosition ?? pos
    }
  }
}

///////////////////////////////////////////////////////////////

class Mover extends Vector2D {

  get direction() {
    const [PI, TAU] = [Math.PI, 2 * Math.PI]
    //const angle = (TAU - (PI/2) * this.facing) % TAU
    // Because in grid moving down is down and down is up.
    // Moving down is increasing row, means Plus.
    const angle = PI / 2 * this.facing
    return Vector2D.fromAngle(angle).round()
  }

  constructor(x, y, cube) {
    super(x, y)
    this.cube = cube
    this.facing = 0
    this.cubeFaceCurr = cube.layout[1] // Will always be first cubeface, regardless of layout
  }

  rotate(direction) {
    switch (direction) {
      case 'R':
        this.facing = (this.facing + 1) % 4; break;
      case 'L':
        this.facing = (this.facing + 4 - 1) % 4; break;
      default:
        throw `Invalid Operation: ${direction}`
    }
  }

  move(number) {
    const nextPos = this.copy

    while (number--) {
      const face = this.cubeFaceCurr
      const direction = this.direction
      nextPos.add(direction)

      // tempory cubeFaceNext and facingNext, which get disregarded, when the next movement was invalid.
      let cubeFaceNext = null
      let facingNext = null
      let distToLow = null

      if (nextPos.x > face.rightMax) {
        cubeFaceNext = face.right
        distToLow = nextPos.y - this.cubeFaceCurr.upMin  // Dist to Low is on Y-Axis, since walking out on X-Axis.
      } else if (nextPos.x < face.leftMin) {
        cubeFaceNext = face.left
        distToLow = nextPos.y - this.cubeFaceCurr.upMin  // Dist to Low is on Y-Axis, since walking out on X-Axis.
      } else if (nextPos.y > face.downMax) {
        cubeFaceNext = face.down
        distToLow = nextPos.x - this.cubeFaceCurr.leftMin // Dist to Low is on X-Axis, since walking out on Y-Axis.
      } else if (nextPos.y < face.upMin) {
        cubeFaceNext = face.up
        distToLow = nextPos.x - this.cubeFaceCurr.leftMin // Dist to Low is on X-Axis, since walking out on Y-Axis.
      }

      // When walking right outside of the face, you might be walking down in the next cubeface, etc.
      // To Account for that, check which side the current side connects to:
      //  - Up
      //  - Down
      //  - Left
      //  - Right
      // Then change direction an position based on that information.
      // 


      // Changing the the Y-Axis, when walking in Down or UP is easy, since its then maxDown or minUp.
      // Changing the X-Axis when walking in Right or Left is easy to, since its then maxRight or minLeft.
      // The upper too are simply dependent on which side of the face we are walking into.


      // When Moving in from Down or Up, the X-Axis needs to be changed, depending on the layout and and how it connects to the other side. 
      // The Face, which is unfolded the Y-Axis, might also be connecting to a side of a Face, which is unfolded the X-Axis!
      // This is then calculated depending on which Side of the Face we are walking out of.
      // The what the 'distToLow' is calculated for. It's depending on the side the difference of the Point to either minUp or minLeft.



      /// If no next face was entered, skip every check.
      if (null != cubeFaceNext) {


        if (cubeFaceNext.right == this.cubeFaceCurr) {
          // When walking in from the right, then movment changes to left.
          // (In case we are not moving from a left-side to right, but for example an up-side)
          facingNext = 2
          // X is now leftmost-side of new face
          nextPos.x = cubeFaceNext.rightMax

          // The position on the Y-Axis is calculated depending on the previous face distance to either minLeft or minUp.
          // Depending how the face is oriented and connected in 3D-Space,
          //  => the Lowest and Highest Point of both Faces might be connect in Reverse to each other or not. 
          //  => This is what the 'true' and 'false' on each side in the Layout refers to.
          if (cubeFaceNext.rightLowToLow)
            nextPos.y = cubeFaceNext.upMin + distToLow
          else
            nextPos.y = cubeFaceNext.downMax - distToLow

        }


        else if (cubeFaceNext.left == this.cubeFaceCurr) {
          // When walking in from the right, then movment changes to left.
          // (In case we are not moving from a right-side to left, but for example an up-side)
          facingNext = 0
          // X is now rightmost-side of new face
          nextPos.x = cubeFaceNext.leftMin

          // The position on the Y-Axis is calculated depending on the previous face distance to either minLeft or minUp.
          // Depending how the face is oriented and connected in 3D-Space,
          //  => the Lowest and Highest Point of both Faces might be connect in Reverse to each other or not. 
          //  => This is what the 'true' and 'false' on each side in the Layout refers to.
          if (cubeFaceNext.leftLowToLow)
            nextPos.y = cubeFaceNext.upMin + distToLow
          else
            nextPos.y = cubeFaceNext.downMax - distToLow
        }


        else if (cubeFaceNext.up == this.cubeFaceCurr) {
          // When walking in from up, then movment changes to down.
          // (In case we are not moving from a down-side to up, but for example an left-side)
          facingNext = 1
          // Y is now upper-side of new face
          nextPos.y = cubeFaceNext.upMin

          // The position on the X-Axis is calculated depending on the previous face distance to either minLeft or minUp.
          // Depending how the face is oriented and connected in 3D-Space,
          //  => the Lowest and Highest Point of both Faces might be connect in Reverse to each other or not. 
          //  => This is what the 'true' and 'false' on each side in the Layout refers to.
          if (cubeFaceNext.upLowToLow)
            nextPos.x = cubeFaceNext.leftMin + distToLow
          else
            nextPos.x = cubeFaceNext.rightMax - distToLow
        }


        else if (cubeFaceNext.down == this.cubeFaceCurr) {
          // When walking in from down, then movment changes to up.
          // (In case we are not moving from a up-side to down, but for example an left-side)
          facingNext = 3
          // Y is now lower-side of new face
          nextPos.y = cubeFaceNext.downMax

          // The position on the X-Axis is calculated depending on the previous face distance to either minLeft or minUp.
          // Depending how the face is oriented and connected in 3D-Space,
          //  => the Lowest and Highest Point of both Faces might be connect in Reverse to each other or not. 
          //  => This is what the 'true' and 'false' on each side in the Layout refers to.
          if (cubeFaceNext.downLowToLow)
            nextPos.x = cubeFaceNext.leftMin + distToLow
          else
            nextPos.x = cubeFaceNext.rightMax - distToLow
        }

      }


      // If the next calucalted positon, even after switching faces, is hindered by a wall.
      // => then stop moving and remain on the previous field.
      if (Positions[nextPos] == Characters.WALL)
        return

      // The cubeface and and facing, as well as the x and y, only need to be updated
      // => when the movement was valid and not hindered by a wall.

      this.x = nextPos.x
      this.y = nextPos.y

      this.cubeFaceCurr = cubeFaceNext ?? this.cubeFaceCurr
      this.facing = facingNext ?? this.facing
    }
  }
}

///////////////////////////////////////////////////////////////

/*
 There are eleven unqiue ways to unfold a cube:
  - All of them can be rotated by 90° around the clock
  - Some of which have mirror

  The Cube for this Input is:

    [][]
    []
  [][]
  []

  The Cube for test-input is:

      []
  [][][]
      [][]

  Programm doesn't analyze which cube it is.
  Done before executing and fed then into the programm
*/


class Cube {

  static Face = class Face {
    constructor(right, rightLowToLow, down, downLowToLow, left, leftLowToLow, up, upLowToLow) {
      this.right = right
      this.rightLowToLow = rightLowToLow // I can't think of something else to do it right now. 
      this.down = down
      this.downLowToLow = downLowToLow
      this.left = left
      this.leftLowToLow = leftLowToLow
      this.up = up
      this.upLowToLow = upLowToLow

      this.rightMax = null
      this.downMax = null
      this.leftMin = null
      this.upMin = null // Up Min, since up is down in Grid, increases when moving down
    }
  }

  static Layouts = [
    /*

      All Faces are simply named after the ordering of the Faces as they appear in the layout from Up-Left to Down-Right.
      Thats also how the Input is parsed, naming the Faces in the order they appear.

            [1]
      [2][3][4]
            [5][6]

    */
    {
      1: new Cube.Face(6, false, 4, true, 3, true, 2, false),
      2: new Cube.Face(3, true, 5, false, 6, false, 2, false),
      3: new Cube.Face(4, true, 5, false, 2, true, 1, true),
      4: new Cube.Face(6, false, 5, true, 3, true, 1, true),
      5: new Cube.Face(6, true, 2, false, 3, false, 4, true),
      6: new Cube.Face(1, false, 2, false, 5, true, 4, false)
    },
    /*
           [1][2]
           [3]
        [4][5]
        [6]
    */
    {
      1: new Cube.Face(2, true, 3, true, 4, false, 6, true),
      2: new Cube.Face(5, false, 3, true, 1, true, 6, true),
      3: new Cube.Face(2, true, 5, true, 4, true, 1, true),
      4: new Cube.Face(5, true, 6, true, 1, false, 3, true),
      5: new Cube.Face(2, false, 6, true, 4, true, 3, true),
      6: new Cube.Face(5, true, 2, true, 1, true, 4, true)
    }
  ]

  // A static block, replacing the numbers on the Faces, with the actual reference to the Cube.Face Objects.
  // This can obviously only be done, after they have been created first.
  static {
    for (const layout of Cube.Layouts) {
      for (const face of Object.values(layout)) {
        face.right = layout[face.right]
        face.left = layout[face.left]
        face.up = layout[face.up]
        face.down = layout[face.down]
      }
    }
  }



  constructor(layout) {
    // The chosen Layout for the cube.
    this.layout = layout


    // Calculating for each face the corresponding portions of the X-Axis on the Y-Axis.
    //  ==> The minLeft, maxRight, minUp, maxDown.

    // Starting at Up-Right with Face 1.
    let currentCubeface = 1 

    // Parsing down through the board, starting an null, and then jumping columns by the 'sidelength' down to the Y-Start of the next Face.
    for (let row = 0; row < board.length; row += sideLength) {

      // Starting and ending for the current Face.
      let startCol = null
      let endCol = null

      // Goging through the current Y-Axis left to rigth and cutting all Faces.
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] != Characters.EMPTY) {

          // Startcol ist first non empty Character, endcol gets continuosly updated.
          startCol = startCol ?? col
          endCol = col

          //console.log(row, startCol, endCol, endCol-startCol, sideLength)
          // If a block has ended, becauso of the caluclated sidelength is reach.
          // => Set the upMin, downMax, rightMax, leftMins on the Face to the correct Y and X-Axis portions.
          if (endCol - startCol == sideLength - 1) {
            //console.log(currentCubeface, row, startCol, endCol)

            // Up is the current top-Row (The jumps are in the increments of the sidelenght)
            // down is the toprow + sidelength - 1, to get the last index.
            this.layout[currentCubeface].upMin = row
            this.layout[currentCubeface].downMax = row + sideLength - 1
            // Left and right are the start and end of the column.
            this.layout[currentCubeface].rightMax = endCol
            this.layout[currentCubeface].leftMin = startCol

            // If a cubeface is found, increment to the next cubeface. (There are always 6)
            currentCubeface++
            // Start the next to the endcol+1, if there is no more, the loop will end and jump down by a sidelength to the next starting row.
            startCol = endCol + 1
          }
        }
      }
      //console.log('####################')
      //console.log(this.layout)
    }

  }

}


///////////////////////////////////////////////////////////////

// Choose the Layount. Solution only works for Inputs with the specific layout of 'Test' or 'Input'!
const layout = argument.includes('TEST') ? Cube.Layouts[0] : Cube.Layouts[1]

// Create Cube based on layout and then mover along the cube.
const cube = new Cube(layout)
const mover = new Mover(startPosition.x, startPosition.y, cube)


// Go through all instructions.
for (const instr of instructions) {

  if ('LR'.includes(instr))
    mover.rotate(instr)
  else
    mover.move(instr)

}

///////////////////////////////////////////////////////////////

// Plus 1, since Puzzle expects Row and Column starting at 1 not 0, but grid here is zero-based.
const finalCol = mover.x + 1
const finalRow = mover.y + 1
const solution = 1_000 * finalRow + 4 * finalCol + mover.facing
console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`After following the Monkeys' notes, the resulting password is: '${solution.toLocaleString()}'`)
console.log(`Your final Position is at (${finalCol}, ${finalRow})`)
console.log()
console.groupEnd()