const { Datastructures, Utils } = require('../_lib/lib.js')
const process = require('process')
const fs = require('fs')

// NOTE:
//  node .\day24-part1.js [INPUT|TEST]
//
//  Enter:
//    'node .\day24-part1.js INPUT'    to process Todays input from 'day24-input.txt'.
//
//  Enter:
//    'node .\day24-part1.js TEST'     to process Todays Testinput from 'day24-input-test.txt'.
//    'node .\day24-part1.js'          to process Todays Testinput from 'day24-input-test.txt'.

const argument = (process.argv[2] ?? 'TEST').toUpperCase()
switch (argument.toUpperCase()) {
  case 'TEST':
    fileContent = fs.readFileSync('input/day24-input-test.txt', 'utf-8'); break
  case 'INPUT':
    fileContent = fs.readFileSync('input/day24-input.txt', 'utf-8'); break

  default:
    throw 'Argument not Valid'
}

// Prepare Input
const Input = fileContent.split('\r\n').map(v => v.split(''))

// Get Needed Classes
const Vector2D = Datastructures.Vector2D
const CoordinateGrid = Datastructures.CoordinateGrid
const Queue = Datastructures.NodeQueue

/*
    ###########################################################################################
    ###########################################################################################
    ####################               Solve AOC below                  #######################
    ###########################################################################################
*/


class Blizzard extends CoordinateGrid {

  static Wall = class Wall extends Vector2D {
    static Character = '#'
    constructor(x, y) {
      super(x, y)
    }
    print() {
      return Wall.Character
    }
  }

  //////////////////

  static Snow = class Snow extends Vector2D {
    static Directions = {
      '>': new Vector2D(1, 0),
      '<': new Vector2D(-1, 0),
      '^': new Vector2D(0, -1),
      'v': new Vector2D(0, 1),
    }
    constructor(x, y, char) {
      super(x, y)
      this.char = char
      this.direction = Blizzard.Snow.Directions[char].copy
    }
    print() {
      return this.char
    }
  }

  constructor(input) {
    super()

    this.walls = []
    this.snow = []
    this.entry = null
    this.exit = null

    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[0].length; col++) {

        const value = input[row][col]
        if ('.' == value) {
          this.entry = this.entry ?? new Vector2D(col, row)
          this.exit = new Vector2D(col, row)
        } else if (Blizzard.Wall.Character == value) {
          const wall = new Blizzard.Wall(col, row)
          this.walls.push(wall)
          this.set(wall)
        } else {
          const snow = new Blizzard.Snow(col, row, value)
          this.snow.push(snow)
          this.set(snow)
        }
      }
    }

  }

  cacheProgess() {
    this.initial = this.snow.join('-')
    this.cache = []
    do {
      const currentState = new CoordinateGrid()
      currentState.boundsMax = this.boundsMax.copy
      currentState.boundsMin = this.boundsMin.copy
      currentState.positions = {}
      Object.keys(this.positions).map(
        key => currentState.positions[key] = this.get(key)
      )

      this.cache.push(currentState)
      this.#progress()
    } while (this.snow.join('-') != this.initial)

    //console.log(this.toString())
    //console.log(this.initial)
  }

  #progress() {

    this.snow.forEach(snow => this.remove(snow))

    for (const snow of this.snow) {

      snow.add(snow.direction)
      if (snow.x >= this.boundsMax.x)
        snow.x = this.boundsMin.x + 1
      else if (snow.y >= this.boundsMax.y)
        snow.y = this.boundsMin.y + 1
      else if (snow.x <= this.boundsMin.x)
        snow.x = this.boundsMax.x - 1
      else if (snow.y <= this.boundsMin.y)
        snow.y = this.boundsMax.y - 1


      const current = this.get(snow)
      if (null == current)
        this.set(snow)
      else if (typeof current == 'number')
        this.set(snow, current + 1)
      else
        this.set(snow, 2)
    }

  }

  getTime(time) {
    return this.cache[time % this.cache.length]
  }

}

///////////////////////////////////////////////////////////////

class Node extends Vector2D {

  constructor(x, y, steps = 0) {
    super(x, y)
    this.steps = steps
  }

}

///////////////////////////////////////////////////////////////

const blizzard = new Blizzard(Input)
console.log('Creating Cache')
blizzard.cacheProgess()
console.log('Finished Cache')

///////////////////////////////////////////////////////////////

const start = new Node(blizzard.entry.x, blizzard.entry.y)
const directions = Array(4).fill(Math.PI / 2)
  .map((angle, idx) => Vector2D.fromAngle(angle * idx).round())
  .concat(new Vector2D(0, 0)) // Add possibility for no movement

let minimum = null
const exit = blizzard.exit
const queue = new Queue()
queue.enqueue(start)
const visited = {}

while (!queue.isEmpty && null == minimum) {

  const node = queue.dequeue()
  const key = [node.steps, node]

  // visited dependent on position and steps to stop revisiting
  if (key in visited)
    continue
  else
    visited[key] = true

  // Check if exit was reached.
  // Since breadth first search, first hit should be shortest path
  if (node.is(exit))
    minimum = node


  // Consider one time ahead of where the Blizzard will be.
  const nextBlizzard = blizzard.getTime(node.steps + 1)

  for (const direction of directions) {

    // Next node for direction
    const next = new Node(node.x + direction.x, node.y + direction.y, node.steps + 1)

    // Skip if node is Out Of Bounds
    if (next.x > nextBlizzard.boundsMax.x || next.x < nextBlizzard.boundsMin.x
      || next.y > nextBlizzard.boundsMax.y || next.y < nextBlizzard.boundsMin.y)
      continue

    // If it's blocked, then skip position
    if (nextBlizzard.exists(next)) continue

    // else enque positions in queue
    queue.enqueue(next)
  }

}

///////////////////////////////////////////////////////////////

const solution = minimum.steps
console.clear()
console.log('\n///////////////////////////////////////////////////////////////\n')
console.group()
console.log(`The shortest path to exit involves '${solution.toLocaleString()}' steps.`)
console.log()
console.groupEnd()