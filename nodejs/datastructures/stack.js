

// Stack implementation using nodes
class NodeStack {

    constructor() {
        this.root = null;
    }

    push(val) {
        if (!this.root) this.root = { next: null, val: val }
        else this.root = { next: this.root, val: val }
    }

    peek() {
        if (!this.root) throw 'Stack is empty';
        else return this.root.val;
    }

    pop() {
        const val = this.peek();
        this.root = this.root.next;
        return val;
    }
}


class Min_Max_Stack {

    constructor() {
        this.stack = [];
        this.min_stack = [];
        this.max_stack = [];
    }

    isEmpty() {
        return this.stack.length == 0;
    }

    peek() {
        if (this.isEmpty()) throw 'Stack is Empty';
        return this.stack[this.stack.length - 1];
    }

    peek_Min() {
        if (this.isEmpty()) throw 'Stack is Empty';
        return this.min_stack[this.min_stack.length - 1];
    }

    peek_Max() {
        if (this.isEmpty()) throw 'Stack is Empty';
        return this.max_stack[this.max_stack.length - 1];
    }



    push(val) {
        if (this.isEmpty() || val <= this.peek_Min()) this.min_stack.push(val);
        if (this.isEmpty() || val >= this.peek_Max()) this.max_stack.push(val);
        this.stack.push(val);
    }

    pop() {
        const val = this.peek();
        if (this.peek_Min() == val) this.min_stack.pop();
        if (this.peek_Max() == val) this.max_stack.pop();
        return this.stack.pop();
    }

}

module.exports = {
    Min_Max_Stack,
    NodeStack
};