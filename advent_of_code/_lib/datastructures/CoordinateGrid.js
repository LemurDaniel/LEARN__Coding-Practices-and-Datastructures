const { Print } = require("../utils/Print")

class CoordinateGrid {

  static Default = '.'


  get size() {
    return Object.keys(this.positions).length
  }

  constructor() {
    this.positions = {}
    this.boundsMin = null
    this.boundsMax = null
  }

  reset() {
    this.positions = {}
  }

  remove(pos) {
    delete this.positions[pos]
  }

  exists(pos) {
    return pos in this.positions
  }

  get(pos) {
    return this.positions[pos]
  }

  set(pos, value) {
    if (null == this.boundsMin)
      this.boundsMin = pos.copy
    else
      this.boundsMin.transform(Math.min, pos)

    if (null == this.boundsMax)
      this.boundsMax = pos.copy
    else
      this.boundsMax.transform(Math.max, pos)

    this.positions[pos] = value ?? pos
  }

  toString(padding = 1) {
    return Print.fromCoordinates(this.positions, padding, CoordinateGrid.Default,
      this.boundsMax.y, this.boundsMax.x, this.boundsMin.y, this.boundsMin.x
    )
  }

}

module.exports = {
  CoordinateGrid
}