const { Converter } = require("../utils/Print")
const { MinHeap, MaxHeap } = require("./Heap")

class Queue {

  #count

  get count() {
    return this.#count
  }

  get length() {
    return this.#count
  }

  get isEmpty() {
    return this.#count === 0
  }

  get isFull() {
    throw 'Not Implemented'
  }

  constructor() {
    this.#count = 0
  }

  enqueue() {
    this.#count++
  }

  peek() {
    if (this.#count <= 0) throw 'Invalid Operation: Queue is Empty!'
  }

  dequeue() {
    this.peek()
    this.#count--
  }

}

///////////////////////////////////////////////////////////////

// Queue implementation using nodes
// Head <== val <== val <== val <== Tail
class NodeQueue extends Queue {

  static #Node = class Node {
    constructor(value, next = null) {
      this.value = value
      this.next = next
    }
  }

  constructor() {
    super()
    // Follows FiFo
    this.head = null  // <== Elements get enqueued to head
    this.tail = null  // <== Elements get dequeued from tail
  }

  enqueue(value) {
    super.enqueue()

    if (null === this.head) {
      this.head = new NodeQueue.#Node(value)
      this.tail = this.head
    } else {
      this.head.next = new NodeQueue.#Node(value)
      this.head = this.head.next
    }
  }

  peek() {
    super.peek()
    return this.tail.value
  }

  dequeue() {
    super.dequeue()
    const value = this.tail.value

    this.tail = this.tail.next
    this.head = this.tail === null ? null : this.head

    return value
  }

  toString() {
    const array = ['<OUT']

    let node = this.tail
    while (null != node) {
      const str = Converter.toString(node.value)
      array.push(str)
      node = node.next
    }

    array.push('<IN')
    return array.join(' <= ')
  }

}

///////////////////////////////////////////////////////////////

// Queue implementation using a Dictionary/Hashtable
class DictionaryQueue extends Queue {

  constructor(length = 100) {
    super()
    this.dictionary = {}
    this.ptrHead = 0
    this.ptrTail = 0
  }

  enqueue(value) {
    super.enqueue()
    this.dictionary[this.ptrHead++] = value
  }

  peek() {
    super.peek()
    return this.dictionary[this.ptrTail]
  }

  dequeue() {
    super.dequeue()
    const value = this.dictionary[this.ptrTail]
    delete this.dictionary[this.ptrTail++]
    return value
  }

  toString() {
    const array = ['<OUT']
    for (const key of Object.keys(this.dictionary)) {
      const str = Converter.toString(this.dictionary[key])
      array.push(str)
    }
    array.push('<IN')
    return array.join(' <= ')
  }

}

///////////////////////////////////////////////////////////////

// Queue implementation using an array with a fixed length
class ArrayQueue extends Queue {

  get isFull() {
    // head + 1 accounting for wrapping from array end to start
    return (this.ptrHead + 1) % this.array.length == this.ptrTail
  }

  constructor(length = 100) {
    super()
    this.array = []
    this.array.length = length + 1

    this.ptrHead = 0
    this.ptrTail = 0
  }

  enqueue(value) {
    if (this.isFull) throw 'Queue is Full'
    super.enqueue()

    this.array[this.ptrHead] = value
    this.ptrHead = (this.ptrHead + 1) % this.array.length
  }

  peek() {
    super.peek()
    return this.array[this.ptrTail]
  }

  dequeue() {
    super.dequeue()
    const value = this.array[this.ptrTail]
    this.ptrTail = (this.ptrTail + 1) % this.array.length
    return value
  }

  toString() {

    let ptrHead = this.ptrHead
    let ptr = this.ptrTail

    const array = ['<OUT']
    while (ptr != ptrHead) {
      const str = Converter.toString(this.array[ptr])
      ptr = (ptr + 1) % this.array.length
      array.push(str)
    }

    array.push('<IN')
    return array.join(' <= ')
  }

}

///////////////////////////////////////////////////////////////

class PriorityQueue extends Queue {

  static ASCENDING_ORDER = 'ASCENDING_ORDER'
  static DESCENDING_ORDER = 'DESCENDING_ORDER'

  constructor(mode = PriorityQueue.ASCENDING_ORDER) {
    super()
    this.heap

    if (mode === PriorityQueue.ASCENDING_ORDER)
      this.heap = new MinHeap()
    else if (mode === PriorityQueue.DESCENDING_ORDER)
      this.heap = new MaxHeap()
  }

  enqueue(value, priority) {
    super.enqueue()
    this.heap.insert(value, priority)
  }

  peek() {
    super.peek()
    return this.heap.peek()
  }

  dequeue() {
    super.dequeue()
    return this.heap.extract()
  }
}


module.exports = {
  PriorityQueue,
  DictionaryQueue,
  ArrayQueue,
  NodeQueue
}