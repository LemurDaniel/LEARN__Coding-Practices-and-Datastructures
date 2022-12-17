
const { Converter } = require("../utils/Print")

// A heap is a binary tree like structure that either stores the minimum value as a root node, called a min heap, or the maximum value as a max heap.
// Insertion:
//      Every new value gets inserted at the bottom of the tree after the lefmost node.
//      Then it gets traversed up the tree until its correct spot is found.      


// Deletion of the top node:
//      The top value gets replaced by the last inserted value.
//      The value now at the top gets traversed down the heap to its correct spot.

// A heap could technically be implemented via a node class, but the proper way is to use an array.
// Each node can be found via the equation:
//      - Parent = (childIndex - 1) / 2
//      - LeftChild = ParentIndex * 2 + 1;
//      - RightChild = ParentIndex * 2 + 2;

class BaseHeap {

  static Node = class Node {

    priority
    payload

    toString() {
      return Converter.toString(this.payload)
    }

    constructor(payload, priority) {
      this.payload = payload
      this.priority = priority
    }

  }

  ///////////////////////////////////////////////////////////////


  // Get Index
  leftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }
  rightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }
  parentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  // Get Node by Index
  leftChild(idx) {
    return this.heap[this.leftChildIndex(idx)]
  }
  rightChild(idx) {
    return this.heap[this.rightChildIndex(idx)]
  }
  parent(idx) {
    return this.heap[this.parentIndex(idx)]
  }

  // Has Node by Index
  hasLeftChild(idx) {
    return null != this.leftChild(idx)
  }
  hasRightChild(idx) {
    return null != this.rightChild(idx)
  }
  hasParent(idx) {
    return null != this.parent(idx)
  }

  comparePriority(idx, idx2) {
    if (idx < 0 || idx >= this.count) throw 'Invalid Operation: Index Out of Bounds'
    if (idx2 < 0 || idx >= this.count) throw 'Invalid Operation: Index Out of Bounds'

    const comparison = this.heap[idx].priority - this.heap[idx2].priority
    if (comparison === 0)
      return 0
    else if (comparison > 0)
      return 1
    else
      return -1
  }

  toString() {
    return this.heap
  }


  ///////////////////////////////////////////////////////////////

  heap
  count

  get length() {
    return this.count
  }

  constructor() {
    this.heap = []
    this.count = 0
    this.heap.length = 100
  }

  swap(idx, idx2) {
    // Destructuring syntax throws errors
    // [this.heap[idx], this.heap[idx2]] = [this.heap[idx2], this.heap[idx]]
    const temp = this.heap[idx]
    this.heap[idx] = this.heap[idx2]
    this.heap[idx2] = temp
  }

  peek() {
    if (null == this.heap[0])
      throw 'Invalid Operation: Heap is Empty!'
    else
      return this.heap[0].payload
  }

  // Remove root value an set last added value as root.
  extract() {
    const payload = this.peek()
    const heap = this.heap
    const last = heap[this.count - 1]
    delete heap[--this.count]

    // When heap still has elements, then heapify down.
    if (this.count > 0) {
      this.heap[0] = last
      this.heapifyDown()
    }

    return payload
  }

  // When adding numbers priorty is set to the number itself
  insert(payload, priority = null) {
    if (this.count >= this.heap.length)
      this.heap.length = this.heap.length * 2

    const node = new BaseHeap.Node(payload, priority ?? payload)
    this.heap[this.count++] = node
    this.heapifyUp()
  }

  // TODO
  // changePriority(i,p)

  heapifyDown() {
    throw new 'Not Implemented'
  }

  heapifyUp() {
    throw new 'Not Implemented'
  }
}


///////////////////////////////////////////////////////////////

class MinHeap extends BaseHeap {

  getMin() {
    return super.peek()
  }

  extractMin() {
    return super.extract()
  }

  // Start from the bottom last inserted node and move upwards comparing it to its parent.
  // If it is smaller than its parent, swap both values else return.
  // If it became the root node and therefore no parents are left then return.
  heapifyUp() {

    let index = this.count - 1
    while (this.hasParent(index)) {
      const parentIdx = this.parentIndex(index)
      if (this.comparePriority(index, parentIdx) < 0) {
        this.swap(parentIdx, index)
        index = parentIdx
      }

      // Stop heapinfying up, when parent is already smaller than the child node.
      else return
    }
  }

  // Start from the root and swap it with the node with the smaller priority.
  // If both childs are of higher priority or there are no child then return.
  heapifyDown() {

    let parentIndex = 0
    // If no left child is present, then there can't be a right child then, so additional check would be redundant.
    while (this.hasLeftChild(parentIndex)) {

      const indexLeft = this.leftChildIndex(parentIndex)
      const indexRight = this.rightChildIndex(parentIndex)

      let lowestPriorityIndex = indexLeft
      if (this.hasRightChild(parentIndex) && this.comparePriority(indexRight, indexLeft) < 0)
        lowestPriorityIndex = indexRight

      // Switch parent with smaller of both child nodes.
      if (this.comparePriority(parentIndex, lowestPriorityIndex) > 0) {
        this.swap(parentIndex, lowestPriorityIndex)
        parentIndex = lowestPriorityIndex
      }

      else return
    }
  }

}


///////////////////////////////////////////////////////////////

class MaxHeap extends BaseHeap {

  getMax() {
    return super.peek()
  }

  extractMax() {
    return super.extract()
  }

  heapifyUp() {

    let index = this.count - 1
    while (this.hasParent(index)) {
      const parentIdx = this.parentIndex(index)
      if (this.comparePriority(index, parentIdx) > 0) {
        this.swap(parentIdx, index)
        index = parentIdx
      }

      // Stop heapinfying up, when parent is already smaller than the child node.
      else return
    }
  }

  heapifyDown() {

    let parentIndex = 0
    // If no left child is present, then there can't be a right child then, so additional check would be redundant.
    while (this.hasLeftChild(parentIndex)) {

      const indexLeft = this.leftChildIndex(parentIndex)
      const indexRight = this.rightChildIndex(parentIndex)

      let lowestPriorityIndex = indexLeft
      if (this.hasRightChild(parentIndex) && this.comparePriority(indexRight, indexLeft) > 0)
        lowestPriorityIndex = indexRight

      // Switch parent with smaller of both child nodes.
      if (this.comparePriority(parentIndex, lowestPriorityIndex) < 0) {
        this.swap(parentIndex, lowestPriorityIndex)
        parentIndex = lowestPriorityIndex
      }

      else return
    }
  }

}


module.exports = {
  MinHeap,
  MaxHeap,
}