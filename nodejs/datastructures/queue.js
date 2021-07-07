// Queue implementation using nodes
// Start <== val <== val <== val <== end
class NodeQueue {

    constructor(val) {
        this.start = null;
        this.end = null;
        this.count = 0;
        if (val) this.enqueue(val);
    }

    isEmpty = () => this.end == null;

    enqueue(val) {
        if (!this.start)
            this.start = this.end = { val: val };
        else {
            this.start.next = { val: val };
            this.start = this.start.next;
        }
        this.count++;
    }

    peek() {
        if (!this.end) throw 'Queue is empty';
        else return this.end.val;
    }

    dequeue() {
        const val = this.peek();
        if (this.end == this.start) this.start = null;
        this.end = this.end.next;
        this.count--;
        return val;
    }

    toString(converter = v => (v != null ? v.toString() : '<NULL>')) {
        let str = '<OUT';
        let node = this.end;
        while (node) {
            str += ' | ' + converter(node.val);
            node = node.next;
        }
        return str + ' | <IN';
    }
}


// Queue implementation using an array with a fixed length
class ArrayQueue {

    constructor(len = 100) {
        this.arr = [];
        this.arr.length = len + 1;

        this.ptr_start = 0;
        this.ptr_end = 0;
    }

    isEmpty = () => this.ptr_start == this.ptr_end;

    isFull = () => (this.ptr_start + 1) % this.arr.length == this.ptr_end;

    count() {
        let ptr_start = this.ptr_start;
        if (ptr_start < this.ptr_end) ptr_start += this.arr.length;
        return ptr_start - this.ptr_end;
    }

    enqueue(val) {
        if (this.isFull()) throw 'Queue is Full';

        this.arr[this.ptr_start] = val;
        this.ptr_start = (this.ptr_start + 1) % this.arr.length
    }

    peek() {
        if (this.isEmpty()) throw 'Queue is Empty';
        else return this.arr[this.ptr_end];
    }

    dequeue() {
        const val = this.peek();
        this.ptr_end = (this.ptr_end + 1) % this.arr.length;
        return val;
    }

    toString() {

        let end = this.ptr_end;
        let str = 'End';

        while (end != this.ptr_start) {
            str += ' | ' + this.arr[end].toString();
            end = (end + 1) % this.arr.length;
        }
        return str + ' | Start';
    }
}


// Implementation of a priority Queue via a linked list / using nodes
// Start <== val <== val <== val <== end

class PriorityNodeQueue extends NodeQueue {

    constructor(val) {
        super(val);
    }

    enqueue(val, priority = 0) {

        const insert = { val: val, prio: priority };

        if (!this.start)
            this.start = this.end = insert;
        else if (this.start.prio >= priority) {
            this.start.next = insert;
            this.start = this.start.next;
        } else {
            let prev = null
            let curr = this.end;
            while (curr) {
                if (curr.prio < priority) {
                    if (prev == null) this.end = insert;
                    else prev.next = insert;
                    insert.next = curr;
                    break;
                }
                prev = curr;
                curr = curr.next;
            }
        }

        this.count++;
    }

    getHighestPriority() {
        return super.peek();
    }

    deleteHighestPriority() {
        return super.dequeue();
    }

    toString() {
        return super.toString(v => v.val.toString() + '/(' + v.prio + ')');
    }
}

// Note https://www.geeksforgeeks.org/binary-heap/
// Note https://www.geeksforgeeks.org/priority-queue-set-1-introduction/

module.exports = {
    ArrayQueue,
    NodeQueue,
    PriorityNodeQueue
};