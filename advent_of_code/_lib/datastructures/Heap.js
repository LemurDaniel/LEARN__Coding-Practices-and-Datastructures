
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

class BaseHeapPayload {

  #priority;
  #payload;

  get payload() {
    return this.#payload
  }

  get priority() {

    switch (typeof this.#priority) {

      case 'number':
        return this.#priority

      case 'function':
        return this.#priority(this.payload)

      default:
        throw 'Not Supported'
    }

  }

  [Symbol.for('nodejs.util.inspect.custom')](depth, inspectOptions, inspect) {
    return this.toString()
  }

  toString() {
    return this.#payload
  }

  constructor(payload, priority) {
    this.#payload = payload;
    this.#priority = priority;
  }

}

class BaseHeap {

  getleftChildIndex(parentIndex) {
    const left = parentIndex * 2 + 1;
    if (left >= this.size) return -1;
    else return left;
  }
  getRightChildIndex(parentIndex) {
    const right = parentIndex * 2 + 2;
    if (right >= this.size) return -1;
    else return right;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  getleftChild(idx) {
    return idx => this.heap[this.getleftChildIndex(idx)]
  }
  getRightChild(idx) {
    return this.heap[this.getRightChildIndex(idx)]
  }
  getParent(idx) {
    return this.heap[this.getParentIndex(idx)]
  }

  hasleftChild(idx) {
    return this.getleftChildIndex(idx) > 0
  }
  hasRightChild(idx) {
    return this.getRightChildIndex(idx) > 0
  }
  hasParent(idx) {
    return this.getParentIndex(idx) > 0
  }

  comparePriority(idx, idx2) {
    if (idx < 0 || idx >= this.size) throw 'Illegal Operation'
    if (idx2 < 0 || idx2 >= this.size) throw 'Illegal Operation'

    const priority = this.heap[idx].priority;
    const priority2 = this.heap[idx2].priority;

    const comparison = priority - priority2;
    if (comparison === 0) return comparison;
    else if (comparison > 0) return 1;
    else return -1;
  }

  [Symbol.for('nodejs.util.inspect.custom')](depth, inspectOptions, inspect) {
    return this.toString()
  }

  toString() {
    return this.heap
  }

  get size() {
    return this.heap.length;
  }

  heap;
  defaultPiotizer;

  constructor(defaultPiotizer) {
    this.heap = []
    this.defaultPiotizer = defaultPiotizer
  }

  swap(idx, idx2) {
    const heap = this.heap;
    [heap[idx], heap[idx2]] = [heap[idx2], heap[idx]];
  }

  peek() {
    if (this.heap.length === 0) throw 'Empty'
    else return this.heap[0].payload;
  }

  // Remove root value an set last added value as root.
  poll() {
    const payload = this.peek();
    const last = this.heap.pop();

    if (this.size > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }

    return payload;
  }

  add(payload, priority = null) {
    const insert = new BaseHeapPayload(payload, priority ?? this.defaultPiotizer ?? payload);
    this.heap.push(insert);
    this.heapifyUp();
  }

  heapifyDown() {
    throw new 'Not Implemented'
  }

  heapifyUp() {
    throw new 'Not Implemented'
  }
}

class MinHeap extends BaseHeap {

  // Start from the bottom last inserted node and move upwards comparing it to its parent.
  // If it is smaller than its parent, swap both values else return.
  // If it became the root node and therefore no parents are left then return.
  heapifyUp() {

    const heap = this.heap;
    let idx = super.size - 1;
    while (idx > 0) {
      const parentIdx = this.getParentIndex(idx);
      if (this.comparePriority(idx, parentIdx) >= 0)
        return;

      this.swap(parentIdx, idx);
      idx = parentIdx;
    }
  }

  // Start from the root and swap it with the node with the smaller priority.
  // If both childs are of higher priority or there are no child then return.
  heapifyDown() {

    const heap = this.heap;
    let idx = 0;
    while (this.hasleftChild(idx)) {
      const idxLeft = this.getleftChildIndex(idx);
      const idxRight = this.getRightChildIndex(idx);
      let smallerIndex = idxLeft;

      if (idxRight !== -1 && this.comparePriority(idxRight, idxLeft) < 0)
        smallerIndex = idxRight

      if (this.comparePriority(idx, smallerIndex) > 0)
        this.swap(idx, smallerIndex);
      else
        return;

      idx = smallerIndex;
    }
  }

}

class MaxHeap extends BaseHeap {

  heapifyUp() {

    const heap = this.heap;
    let idx = super.size - 1;
    while (idx > 0) {
      const parentIdx = this.getParentIndex(idx);
      if (this.comparePriority(idx, parentIdx) <= 0)
        return;

      this.swap(parentIdx, idx);
      idx = parentIdx;
    }
  }

  heapifyDown() {

    let idx = 0;

    while (this.hasleftChild(idx)) {
      const idxLeft = this.getleftChildIndex(idx);
      const idxRight = this.getRightChildIndex(idx);
      let biggerIndex = idxLeft;

      if (idxRight !== -1 && this.comparePriority(idxRight, idxLeft) > 0)
        biggerIndex = idxRight

      if (this.comparePriority(idx, biggerIndex) < 0)
        this.swap(idx, biggerIndex);
      else
        return;

      idx = biggerIndex;
    }
  }
}


module.exports = {
  MinHeap,
  MaxHeap,
}