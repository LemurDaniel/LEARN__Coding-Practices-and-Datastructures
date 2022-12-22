

class VectorBase {

  ////// Static Methods, Attributes, Getters, Setters

  static get NULL() {
    throw 'Not Implemented'
  }

  static add(vector0, ...args) {
    return vector0.copy.add(...args)
  }

  static sub(vector0, ...args) {
    return vector0.copy.sub(...args)
  }

  ////// Instance Methods, Attributes, Getters, Setters

  get copy() {
    return new this.constructor(...this.dimension)
  }

  get magnitue() {
    return Math.sqrt(
      this.dimension.reduce((acc, num) => acc + (num * num), 0) // Needs to be initalized at 0, or first value won't be squared
    )
  }

  [Symbol.for('nodejs.util.inspect.custom')](depth, inspectOptions, inspect) {
    return this.toString()
  }

  toString() {
    return `(${this.dimension.join(', ')})`
  }


  ////// constructors

  constructor(...args) {
    this.dimension = args.map(num => num.constructor == String ? parseFloat(num) : num)
  }


  ////// Instance Methods

  #processArgs(...args) {
    if (args[0] instanceof VectorBase)
      return args[0].dimension
    else if (args.length <= this.dimension.length)// && args.reduce((bool, v) => bool = bool && (typeof v == 'number'), true))
      return args

    throw `Not supporrted ${args}`
  }

  manhattenDist(vector) {
    return this.dimension
      .map((num, idx) => Math.abs(num - vector.dimension[idx]))
      .reduce((acc, a) => acc + a)
  }

  dist(vector) {
    return this.constructor.sub(this, vector).magnitue
  }

  is(...args) {
    const vector = this.#processArgs(...args)
    for (let i = 0; i < this.dimension.length; i++) {
      if (this.dimension[i] != vector[i]) return false
    }
    return true
  }

  set(...args) {
    const vector = this.#processArgs(...args)
    for (let i = 0; i < this.dimension.length; i++) {
      this.dimension[i] = vector[i]
    }
    return this
  }

  add(...args) {
    const vector = this.#processArgs(...args)
    for (let i = 0; i < this.dimension.length; i++) {
      this.dimension[i] += vector[i]
    }
    return this
  }

  sub(...args) {
    const vector = this.#processArgs(...args)
    for (let i = 0; i < this.dimension.length; i++) {
      this.dimension[i] -= vector[i]
    }
    return this
  }

  mul(...args) {
    const vector = this.#processArgs(...args)
    for (let i = 0; i < this.dimension.length; i++) {
      this.dimension[i] *= vector[i]
    }
    return this
  }

  round() {
    for (let i = 0; i < this.dimension.length; i++) {
      this.dimension[i] = Math.round(this.dimension[i])
    }
    return this
  }

  limit(limit = 1) {
    for (let i = 0; i < this.dimension.length; i++) {
      this.dimension[i] = this.dimension[i] > limit ? limit : (this.dimension[i] < -limit ? -limit : this.dimension[i])
    }
    return this
  }

  transform(method, ...vectors) {
    const dimensions = Array(this.dimension.length).fill(0)
      .map((d, idx) => vectors.map(vector => vector.dimension[idx]))

    for (let i = 0; i < this.dimension.length; i++) {
      this.dimension[i] = method(this.dimension[i], ...dimensions[i])
    }
    return this
  }
}


///////////////////////////////////////////////////////////////


class Vector2D extends VectorBase {

  ////// Static Methods, Attributes, Getters, Setters

  static get NULL() {
    return new Vector2D(0, 0)
  }

  static fromAngle(angle, magnitue = 1) {
    return new Vector2D(
      Math.cos(angle) * magnitue,
      Math.sin(angle) * magnitue
    )
  }

  ////// Instance Methods, Attributes, Getters, Setters

  get copy() {
    return new Vector2D(...this.dimension)
  }

  set x(value) {
    this.dimension[0] = value
  }

  set y(value) {
    this.dimension[1] = value
  }

  get x() {
    return this.dimension[0]
  }

  get y() {
    return this.dimension[1]
  }

  get heading() {
    const [PI, TAU] = [Math.PI, Math.PI * 2]

    if (this.x == 0)
      return this.y > 0 ? (PI / 2) : (3 * PI / 2)

    if (this.x > 0)
      // Add TAU and do Modulo to not get the negative angle like -90, but 270 instead as radians in this case.
      return (TAU + Math.atan(this.y / this.x)) % TAU

    if (this.x < 0)
      return Math.PI + Math.atan(this.y / this.x)
  }


  ////// constructors

  constructor(x, y) {
    super(x, y)
  }

}


class Vector3D extends VectorBase {

  ////// Static Methods, Attributes, Getters, Setters

  static get NULL() {
    return new Vector3D(0, 0, 0)
  }

  ////// Instance Methods, Attributes, Getters, Setters

  get copy() {
    return new Vector3D(...this.dimension)
  }

  set x(value) {
    this.dimension[0] = value
  }

  set y(value) {
    this.dimension[1] = value
  }

  set z(value) {
    this.dimension[2] = value
  }

  get x() {
    return this.dimension[0]
  }

  get y() {
    return this.dimension[1]
  }

  get z() {
    return this.dimension[2]
  }

  ////// constructors

  constructor(x, y, z) {
    super(x, y, z)
  }

}


module.exports = {
  VectorBase,
  Vector2D,
  Vector3D
}