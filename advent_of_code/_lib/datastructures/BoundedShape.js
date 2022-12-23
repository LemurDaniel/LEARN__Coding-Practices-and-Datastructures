const { Print } = require('../utils/Print')
const { Vector2D } = require('./Vector')
const crypto = require('crypto')

class UniqueObjectId {

  static Ids = {}

  #id
  get id() {
    return this.#id
  }

  constructor() {
    do {
      this.#id = crypto.randomUUID()
    }
    while (this.#id in UniqueObjectId.Ids)
  }

}

class BoundedShape extends UniqueObjectId {

  static EMPTY = '.'
  static WALL = {
    CORNER: '+',
    VERTICAL: '|',
    HORIZONTAL: '—'
  }
  static ROCK = {
    STILL: '#',
    MOVE: '@'
  }
  static MOVE = {
    UP: 'UP',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN'
  }
  static ITERATION = {
    NORMAL: 'NORMAL',
    TRANSLATED: 'TRANSLATED'
  }


  static Position = class Position extends Vector2D {

    kind

    get copy() {
      return new Position(this.x, this.y, this.kind)
    }

    constructor(x, y, kind) {
      super(x, y)
      this.kind = kind
    }

  }

  min
  max
  positions
  [Symbol.iterator]() {
    return this.iterator(BoundedShape.ITERATION.NORMAL)
  }
  *iterator(mode = BoundedShape.ITERATION.TRANSLATED) {
    for (const pos of Object.values(this.positions)) {
      if (BoundedShape.ITERATION.TRANSLATED == mode)
        yield pos.copy.add(this.translation)
      else
        yield pos
    }
  }

  enableWalls
  translation
  rotation

  // Other BoundedShapes with offest drawn when drawing this one.
  // Must be withing Bounds off this shape or else not drawn.
  referencedShapes

  constructor() {
    super()
    this.min = Vector2D.NULL
    this.max = Vector2D.NULL
    this.positions = {}

    // Up, Right, Down, Left
    this.enableWalls = [false, false, false, false]
    this.translation = Vector2D.NULL
    this.rotation = 0
    this.referencedShapes = {}
  }

  extendBoundsMultiple(...vector) {
    this.max.x = Math.max(this.max.x, ...vector.map(v => v.x))
    this.min.y = Math.min(this.min.y, ...vector.map(v => v.y))
    this.max.x = Math.max(this.min.x, ...vector.map(v => v.x))
    this.min.y = Math.min(this.min.y, ...vector.map(v => v.y))
    return this
  }

  extendBounds(vector) {

    if (vector instanceof BoundedShape) {
      this.max.x = Math.max(this.max.x, vector.max.x + vector.translation.x)
      this.max.y = Math.max(this.max.y, vector.max.y + vector.translation.y)
      this.min.x = Math.min(this.min.x, vector.min.x + vector.translation.x)
      this.min.y = Math.min(this.min.y, vector.min.y + vector.translation.y)
    } else {
      this.max.x = Math.max(this.max.x, vector.x)
      this.max.y = Math.max(this.max.y, vector.y)
      this.min.x = Math.min(this.min.x, vector.x)
      this.min.y = Math.min(this.min.y, vector.y)
    }
    return this
  }

  hitsBounds(argument) {

    if (argument instanceof BoundedShape) {
      const shape = argument
      const [wup, wright, wdown, wleft] = this.enableWalls
      return (wright && shape.max.x + shape.translation.x > this.max.x) ||
        (wleft && shape.min.x + shape.translation.x < this.min.x) ||
        (wup && shape.max.y + shape.translation.y > this.max.y) ||
        (wdown && shape.min.y + shape.translation.y < this.min.y)
    }
    else {
      const vector = argument
      return vector.x > this.max.x || vector.y < this.min.x
        || vector.y > this.max.y || vector.y < this.min.y
    }

  }

  add(argument, kind = BoundedShape.ROCK.STILL) {

    if (argument instanceof BoundedShape.Position)
      this.positions[argument] = argument
    else {
      const position = new BoundedShape.Position(argument.x, argument.y, kind)
      this.positions[argument] = position
    }

    this.extendBounds(argument)
    return this
  }

  mergeShape(boundedShape, kind = BoundedShape.ROCK.STILL) {
    delete this.referencedShapes[boundedShape.id]
    this.extendBounds(boundedShape)
    for (const pos of boundedShape.iterator(BoundedShape.ITERATION.TRANSLATED)) {
      pos.kind = kind ?? pos.kind
      this.positions[pos] = pos
    }
  }

  refrenceShape(boundedShape) {
    this.referencedShapes[boundedShape.id] = boundedShape
  }

  // Only collisions for non-referenced shapes
  collisions(boundedShape) {
    for (const pos of boundedShape.iterator(BoundedShape.ITERATION.TRANSLATED)) {
      if (pos in this.positions && this.positions[pos] != BoundedShape.EMPTY)
        return true
    }
    return false
  }

  canTranslate(units, direction, boundedShape = null, collisions = true) {

    const [x, y] = [this.translation.x, this.translation.y]
    const success = this.translate(units, direction, boundedShape, collisions)
    this.translation.x = x
    this.translation.y = y
    return success

  }

  // translate the boundedShape within the bounds of another shape and any collisions with objects by other bounded shape
  translate(units, direction, boundedShape = null, collisions = true) {

    const [x, y] = [this.translation.x, this.translation.y]
    switch (direction) {

      case BoundedShape.MOVE.DOWN:
        this.translation.y -= units
        break

      case BoundedShape.MOVE.RIGHT:
        this.translation.x += units
        break

      case BoundedShape.MOVE.UP:
        this.translation.y += units
        break

      case BoundedShape.MOVE.LEFT:
        this.translation.x -= units
        break

      default:
        throw `Not Supported: ${direction}`
    }

    const movementBlocked = null != boundedShape && (boundedShape.hitsBounds(this) || (collisions && boundedShape.collisions(this)))
    if (movementBlocked) {
      this.translation.x = x
      this.translation.y = y
      return false
    }
    else
      return true

  }

  toString() {

    const [wup, wright, wdown, wleft] = this.enableWalls.map(Number)
    let [max, min] = [this.max.copy, this.min.copy]

    for (const refShape of Object.values(this.referencedShapes)) {
      if (!wup && refShape.max.y + refShape.translation.y > max.y) max.y = refShape.max.y + refShape.translation.y
      if (!wdown && refShape.min.y + refShape.translation.y > min.y) min.y = refShape.min.y + refShape.translation.y
      if (!wleft && refShape.min.x + refShape.translation.x > min.x) min.x = refShape.min.x + refShape.translation.y
      if (!wright && refShape.max.x + refShape.translation.x > max.x) max.x = refShape.max.x + refShape.translation.y
    }

    const emptyGrid = Array(max.y - min.y + 1 + wup + wdown).fill(BoundedShape.EMPTY)
      .map(row => Array(max.x - min.x + 1 + wleft + wright).fill(BoundedShape.EMPTY))

    // Draw Positions // On grid everything starting from zero at highest grid row
    for (const pos of this) {
      emptyGrid[max.y - pos.y - wup][pos.x + wleft + min.x] = pos.kind
    }

    // Draw referenced bounded Shapes
    for (const refShape of Object.values(this.referencedShapes)) {
      for (const pos of refShape.iterator(BoundedShape.ITERATION.TRANSLATED)) {
        emptyGrid[max.y - pos.y - wup][pos.x + wleft + min.x] = pos.kind
      }
    }

    // Draw Walls left and right
    if (wleft || wright) {
      for (let row = 0; row < emptyGrid.length; row++) {
        if (wleft) emptyGrid[row][0] = BoundedShape.WALL.VERTICAL
        if (wright) emptyGrid[row][max.x + wleft + wright] = BoundedShape.WALL.VERTICAL
      }
    }
    // Draw Walls up and down
    if (wup || wdown) {
      for (let col = 0; col < emptyGrid[0].length; col++) {
        if (wup && col == 0 && wleft)
          emptyGrid[0][col] = BoundedShape.WALL.CORNER
        else if (wup && col == max.x + wleft + wright && wright)
          emptyGrid[0][col] = BoundedShape.WALL.CORNER
        else if (wup)
          emptyGrid[0][col] = BoundedShape.WALL.HORIZONTAL

        if (wdown && col == 0 && wleft)
          emptyGrid[emptyGrid.length - 1][col] = BoundedShape.WALL.CORNER
        else if (wdown && col == max.x + wleft + wright && wright)
          emptyGrid[emptyGrid.length - 1][col] = BoundedShape.WALL.CORNER
        else if (wdown)
          emptyGrid[emptyGrid.length - 1][col] = BoundedShape.WALL.HORIZONTAL
      }
    }

    return Print.fromMatrix(emptyGrid, 2)
  }

}

module.exports = {
  BoundedShape
}