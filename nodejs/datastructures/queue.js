// Queue implementation using nodes
// Start <== val <== val <== val <== end
class NodeQueue {

    static newNode(val, next) {
        return { val: val, next: next };
    }

    constructor(val) {
        this.start = null;
        this.end = null;
        this.count = 0;
        if (val) this.enqueue(val);
    }

    get isEmpty() {
        return this.end == null;
    }

    enqueue(val) {

        const insert = NodeQueue.newNode(val);

        if (!this.start)
            this.start = this.end = insert;
        else {
            this.start.next = insert;
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


    print() {
        return this.toString()
    };
}


// Queue implementation using an array with a fixed length
class ArrayQueue {

    constructor(len = 100) {
        this.arr = [];
        this.arr.length = len + 1;

        this.ptr_start = 0;
        this.ptr_end = 0;
    }

    get isEmpty() {
        return this.ptr_start == this.ptr_end;
    }

    get isFull() {
        return (this.ptr_start + 1) % this.arr.length == this.ptr_end;
    }

    count() {
        let ptr_start = this.ptr_start;
        if (ptr_start < this.ptr_end) ptr_start += this.arr.length;
        return ptr_start - this.ptr_end;
    }

    enqueue(val) {
        if (this.isFull) throw 'Queue is Full';

        this.arr[this.ptr_start] = val;
        this.ptr_start = (this.ptr_start + 1) % this.arr.length
    }

    peek() {
        if (this.isEmpty) throw 'Queue is Empty';
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

    print() {
        return this.toString()
    };
}


// Implementation of a priority Queue via a linked list / using nodes
// Start <== val <== val <== val <== end

class PriorityNodeQueue extends NodeQueue {

    constructor(val, reversePriority) {
        super(val);
        this.reversePriority = reversePriority;
    }

    enqueue(val, priority = 0) {

        this.count++;
        const insert = NodeQueue.newNode(
            { val: val, prio: priority }
        );


        if (!this.start) {
            this.start = this.end = insert;
            return;
        }


        let PrioComparison = this.start.val.prio >= priority;
        if (this.reversePriority) PrioComparison = !PrioComparison;

        if (PrioComparison) {
            this.start.next = insert;
            this.start = this.start.next;

        } else {
            let prev = null
            let curr = this.end;


            while (curr) {
                let comparsion = curr.val.prio < priority;
                if (this.reversePriority) comparsion = !comparsion;

                if (comparsion) {
                    if (prev == null) this.end = insert;
                    else prev.next = insert;
                    insert.next = curr;
                    break;
                }
                prev = curr;
                curr = curr.next;
            }
        }
    }

    getHighestPriority() {
        return super.peek().val;
    }

    deleteHighestPriority() {
        return super.dequeue().val;
    }

    toString() {
        return super.toString(v => `{${v.val.toString()}}/(${v.prio})`);
    }
}

// Note https://www.geeksforgeeks.org/binary-heap/
// Note https://www.geeksforgeeks.org/priority-queue-set-1-introduction/

module.exports = {
    ArrayQueue,
    NodeQueue,
    PriorityNodeQueue
};