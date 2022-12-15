
class Vector {

  ////// Static Methods, Attributes, Getters, Setters

  static get NULL() {
    return new Vector(0, 0)
  }

  static add(vector0, ...args) {
    return vector0.copy.add(Vector.#processArgs(...args))
  }

  static sub(vector0, ...args) {
    return vector0.copy.sub(Vector.#processArgs(...args))
  }

  static #processArgs(...args) {

    if (args[0] instanceof Vector)
      return args[0]
    else if (typeof args[0] == 'number')
      return new Vector(...args)
    else
      throw `Error with Type: '${args[0].constructor.name}' || '${typeof args[0]}'`

  }

  ////// Instance Methods, Attributes, Getters, Setters

  #x;
  #y;

  set x(value) {
    this.#x = value
  }

  set y(value) {
    this.#y = value
  }

  get x() {
    return this.#x
  }

  get y() {
    return this.#y
  }

  get copy() {
    return new Vector(this.#x, this.#y)
  }

  get magnitue() {
    return Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2))
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

  [Symbol.for('nodejs.util.inspect.custom')](depth, inspectOptions, inspect) {
    return this.toString()
  }

  toString() {
    return `(${this.#x.toLocaleString()}, ${this.#y.toLocaleString()})`
  }


  ////// constructors

  constructor(x, y) {
    this.#y = parseFloat(y ?? 0)
    this.#x = parseFloat(x ?? 0)
  }


  ////// Instance Methods

  is(...args) {
    const vector = Vector.#processArgs(...args)
    return this.#x == vector.#x && this.#y == vector.#y
  }

  set(...args) {
    const vector = Vector.#processArgs(...args)
    this.#y = vector.#y
    this.#x = vector.#x
    return this
  }

  add(...args) {
    const vector = Vector.#processArgs(...args)
    this.#y += vector.#y
    this.#x += vector.#x
    return this
  }

  sub(...args) {
    const vector = Vector.#processArgs(...args)
    this.#y -= vector.#y
    this.#x -= vector.#x
    return this
  }

  mul(...args) {
    const vector = Vector.#processArgs(...args)
    this.#y *= vector
    this.#x *= vector
    return this
  }


  round() {
    this.#y = Math.round(this.#y)
    this.#x = Math.round(this.#x)
    return this
  }

  limit(limit = 1) {
    this.#y = this.#y > limit ? limit : (this.#y < -limit ? -limit : this.#y)
    this.#x = this.#x > limit ? limit : (this.#x < -limit ? -limit : this.#x)
    return this
  }

  dist(vector) {
    return Vector.sub(this, vector).magnitue
  }

  manhattenDist(vector) {
    return Math.abs(this.x - vector.x) + Math.abs(this.y - vector.y)
  }

}


module.exports = Vector