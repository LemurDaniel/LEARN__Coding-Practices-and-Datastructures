
module.exports = class Vector {

  ////// Static Methods, Attributes, Getters, Setters

  static get NULL() {
    return new Vector(0, 0)
  }

  static add(vector0, vector1) {
    return vector0.copy.add(vector1)
  }

  static sub(vector0, vector1) {
    return vector0.copy.sub(vector1)
  }

  ////// Instance Methods, Attributes, Getters, Setters

  #x;
  #y;

  get x() {
    return this.#x
  }

  get y() {
    return this.#y
  }

  get copy() {
    return new Vector(this.#y, this.#x)
  }

  get magnitue() {
    return Math.sqrt(Math.pow(this.y - this.y, 2))
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
    return `(${this.#y}, ${this.#x})`
  }


  ////// constructors

  constructor(y, x) {
    this.#y = parseInt(y)
    this.#x = parseInt(x)
  }


  ////// Instance Methods

  is(vector) {
    return this.#x == vector.#x && this.#y == vector.#y
  }

  set(vector) {
    this.#y = vector.#y
    this.#x = vector.#x
    return this
  }

  add(vector) {
    this.#y += vector.#y
    this.#x += vector.#x
    return this
  }

  sub(vector) {
    this.#y -= vector.#y
    this.#x -= vector.#x
    return this
  }

  mul(vector) {

    switch (vector.constructor) {

      case Number:
        this.#y *= vector
        this.#x *= vector
        break

      case Vector:
        this.#y *= vector.#y
        this.#x *= vector.#x
        break
    }
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
    return Math.sqrt(Math.pow(this.y - vector.y, 2) + Math.pow(this.x - vector.x, 2))
  }

}
