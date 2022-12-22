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
      const direction = this.direction
      nextPos.add(direction)
      console.log('------')
      console.log(nextPos, this.facing)
      const face = this.cubeFaceCurr
      let cubeFaceNext = null
      let facingNext = null
      let distToLow = null

      if (nextPos.x > face.rightMax) {
        cubeFaceNext = face.right
        distToLow = nextPos.y - this.cubeFaceCurr.upMin
      } else if (nextPos.x < face.leftMin) {
        cubeFaceNext = face.left
        distToLow = nextPos.y - this.cubeFaceCurr.upMin
      } else if (nextPos.y > face.downMax) {
        cubeFaceNext = face.down
        distToLow = nextPos.x - this.cubeFaceCurr.leftMin
      } else if (nextPos.y < face.upMin) {
        cubeFaceNext = face.up
        distToLow = nextPos.x - this.cubeFaceCurr.leftMin
      }

      // When walking right outside of the face, you might be walking down in the next cubeface, etc.
      // To Account for that, check which side the current side connects to:
      //  - Up
      //  - Down
      //  - Left
      //  - Right
      // Then change direction an position based on that information.
      if (null != cubeFaceNext) {

        // When walking in from the right, then need to walk left.
        if (cubeFaceNext.right == this.cubeFaceCurr) {
          facingNext = 2
          nextPos.x = cubeFaceNext.rightMax // Y is now leftmost-side of new face
          if (cubeFaceNext.rightLowToLow) {
            nextPos.y = cubeFaceNext.upMin + distToLow
          }
          else {
            nextPos.y = cubeFaceNext.downMax - distToLow
          }
        }

        // When walking in from the left, then need to walk right.
        else if (cubeFaceNext.left == this.cubeFaceCurr) {
          facingNext = 0
          nextPos.x = cubeFaceNext.leftMin // Y is now rightmost-side of new face
          if (cubeFaceNext.leftLowToLow) {
            nextPos.y = cubeFaceNext.upMin + distToLow
          }
          else {
            nextPos.y = cubeFaceNext.downMax - distToLow
          }
        }

        // When walking in from up, then need to walk down.
        else if (cubeFaceNext.up == this.cubeFaceCurr) {
          facingNext = 1
          nextPos.y = cubeFaceNext.upMin // Y is now upper-side of new face
          if (cubeFaceNext.upLowToLow) {
            nextPos.x = cubeFaceNext.leftMin + distToLow
          }
          else {
            nextPos.x = cubeFaceNext.rightMax - distToLow
          }
        }

        // When walking in from down, then need to walk up.
        else if (cubeFaceNext.down == this.cubeFaceCurr) {
          facingNext = 3
          nextPos.y = cubeFaceNext.downMax // Y is now lower-side of new face
          if (cubeFaceNext.downLowToLow) {
            nextPos.x = cubeFaceNext.leftMin + distToLow
          }
          else {
            nextPos.x = cubeFaceNext.rightMax - distToLow
          }
        }

      }

      console.log(nextPos, this.facing)
      console.log('------')
      if (Positions[nextPos] == Characters.WALL)
        return

      this.x = nextPos.x
      this.y = nextPos.y
      // When movement to other cubeface occured, then change current to other cubeface. 
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
      1: new Cube.Face(6, 4, 3, 2),
      2: new Cube.Face(6, 4, 3, 2),
      3: new Cube.Face(6, 4, 3, 2),
      4: new Cube.Face(6, 4, 3, 2),
      5: new Cube.Face(6, 4, 3, 2),
      6: new Cube.Face(6, 4, 3, 2)
    }
  ]

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
    this.layout = layout


    // Calculate right and leftMin for cubeface, based on cube-length.
    let currentCubeface = 1
    for (let row = 0; row < board.length; row += sideLength) {

      let startCol = null
      let endCol = null
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] != Characters.EMPTY) {

          startCol = startCol ?? col
          endCol = col

          //console.log(row, startCol, endCol, endCol-startCol, sideLength)
          if (endCol - startCol == sideLength - 1) {
            console.log(currentCubeface, row, startCol, endCol)

            this.layout[currentCubeface].upMin = row
            this.layout[currentCubeface].downMax = row + sideLength - 1
            this.layout[currentCubeface].rightMax = endCol
            this.layout[currentCubeface].leftMin = startCol

            currentCubeface++
            startCol = endCol + 1
          }
        }
      }
      console.log('####################')
      console.log(this.layout)
    }

  }

}


///////////////////////////////////////////////////////////////

const cube = new Cube(Cube.Layouts[0])
const mover = new Mover(startPosition.x, startPosition.y, cube)


for (const instr of instructions) {

  if ('LR'.includes(instr)) {
    mover.rotate(instr)
    console.log(mover)
    console.log('######################################')
  } else
    mover.move(instr)

}

///////////////////////////////////////////////////////////////

// Plus 1, since Grid in Puzzle start at 1 not 0, but grid here is zerobased.
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