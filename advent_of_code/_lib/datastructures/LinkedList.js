

class LinkedList {

  static connectorString = ' => '

  static Node = class Node {

    constructor(value, next) {
      this.value = value
      this.next = next
    }

    // inserts new Node after node
    insert(value) {
      this.next = new this.constructor(value, this.next)
      return this.next
    }

  }

  ////////////////////////////////

  constructor() {
    this.head = null
    this.tail = null
  }



  // Inserts to end of list
  insert(value) {
    if (null == this.head) {
      this.head = new this.constructor.Node(value)
      this.tail = this.head
    }
    else {
      this.tail = this.tail.insert(value)
    }

    return this.tail
  }

  traverse() {

  }

  insertAfter(node) { }

  // returns a reference to a node with the specified value
  search(value) {
    for (const node of this) {
      if (node.value == value)
        return node
    }
    return null
  }

  delete() { }

  merge() { }

  sort() { }

  toString() {
    return ['<HEAD>', ...Array.from(this).map(node => node.value), '<TAIL>']
      .join(this.constructor.connectorString)
  }

  *[Symbol.iterator]() {
    if (null == this.head) return

    let node = this.head
    do {
      yield node
      node = node.next
    } while (null != node && node != this.head)
    // this works also with circular linkedlist.
  }

}

///////////////////////////////////////////////////////////////

class CircularLinkedList extends LinkedList {

  insert(value) {
    const node = super.insert(value)

    // Add circularity, this will then automatically be maintained, when adding new Node anywhere or at the Tail
    if (this.tail.next == null)
      this.tail.next = this.head

    return node
  }

}

///////////////////////////////////////////////////////////////

class DoubleLinkedList extends LinkedList {

  static connectorString = ' <=> '

  static Node = class Node {

    constructor(value, next, prev) {
      this.value = value
      this.next = next
      this.prev = prev
    }

    // inserts new Node after node
    insert(value) {
      const node = new this.constructor(value, this.next, this)
      if (this.next?.prev)
        this.next.prev = node

      this.next = node
      return node
    }

    removeNode() {

      const prevOfThis = this.prev
      const nextOfThis = this.next

      if (null != nextOfThis.prev)
        nextOfThis.prev = prevOfThis

      if (null != prevOfThis.next)
        prevOfThis.next = nextOfThis

      this.next = null
      this.prev = null

      return this
    }

    appendNode(node) {

      const nextOfThis = this.next

      this.next = node
      node.prev = this
      node.next = nextOfThis

      if (null != nextOfThis.prev)
        nextOfThis.prev = node

    }

    shiftBy(num) {

      if (num == 0) return

      let node = this
      let direction = num > 0 ? -1 : 1
      for (let i = num; i != 0; i += direction) {
        node = num > 0 ? node.next : node.prev
      }

      // Goging from right to left, needs an additional one
      if (num < 0) node = node.prev
      this.removeNode()
      node.appendNode(this)
    }

  }

}

///////////////////////////////////////////////////////////////

class DoubleCircularLinkedList extends DoubleLinkedList {

  insert(value) {
    const node = super.insert(value)

    // Add circularity, this will then automatically be maintained, when adding new Node anywhere or at the Tail
    if (this.tail.next == null) {
      this.tail.next = this.head
      this.head.prev = this.tail
    }

    return node
  }

}

module.exports = {
  LinkedList,
  CircularLinkedList,
  DoubleLinkedList,
  DoubleCircularLinkedList
}