

class Stack {

  #size

  get size() {
    return this.#size
  }

  get isEmpty() {
    return this.#size == 0
  }

  constructor() {
    this.#size = 0
  }

  push() {
    this.#size++
  }

  peek() {
    if (this.#size == 0)
      throw 'Invalid Operation: Stack is Empty'
  }

  pop() {
    if (this.#size == 0)
      throw 'Invalid Operation: Stack is Empty'
    else
      this.#size--
  }

}

///////////////////////////////////////////////////////////////

class NodeStack extends Stack {

  static Node = class {

    constructor(next, value) {
      this.next = next
      this.value = value
    }

  }

  constructor() {
    super()
    this.root = null
  }

  push(value) {
    super.push()
    this.root = new NodeStack.Node(this.root, value)
  }

  peek() {
    super.peek()
    return this.root.value
  }

  pop() {
    super.pop()
    const value = this.peek()
    this.root = this.root.next
    return value
  }
}

///////////////////////////////////////////////////////////////

class FixedStack extends Stack {

  #stack
  #ptr

  get capacity() {
    return this.#stack.length
  }

  get isFull() {
    return this.#ptr >= this.#stack.length - 1
  }

  constructor(capacity = 100) {
    super()
    this.#stack = Array(capacity)
    this.#ptr = -1
  }

  push(value) {
    super.push()

    if (this.isFull)
      throw 'Invalid Operation: Stack is Full'

    this.#stack[++this.#ptr] = value
  }

  peek() {
    super.peek()
    return this.#stack[this.#ptr]
  }

  pop() {
    super.pop()
    const value = this.#stack[this.#ptr--]
    this.#stack[this.#ptr--] = undefined
    return value
  }
}

///////////////////////////////////////////////////////////////

class Shiftlist extends Stack {

  *[Symbol.iterator]() {
    for (let i = this.tail; i <= this.head; i++) {
      yield this.dictionary[i]
    }
  }

  constructor() {
    this.dictionary = {}
    this.head = -1
    this.tail = 0
  }

  // Index is zerobase, so on length 10 with shift operations will get correct underlying index.
  get(index) {
    return this.dictionary[this.tail + idx]
  }

  set(index, value) {
    this.dictionary[this.tail + idx] = value
  }

  push(value) {
    super.push()
    this.dictionary[++this.head] = value
  }

  peek() {
    super.peek()
    return this.dictionary[this.head]
  }

  pop() {
    super.pop()
    const value = this.dictionary[this.head]
    delete this.dictionary[this.head--]
    return value
  }

  shift() {
    super.pop()
    const value = this.dictionary[this.tail]
    delete this.dictionary[this.tail++]
    return value
  }

  unshift(value) {
    super.push()
    this.dictionary[--this.tail] = value
  }

}

///////////////////////////////////////////////////////////////

module.exports = {
  NodeStack,
  FixedStack,
  Shiftlist
}