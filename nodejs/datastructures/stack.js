

// Stack implementation using nodes
class NodeStack {

    constructor(){
        this.root = null;
    }

    push(val){
        if(!this.root)  this.root = { next: null, val: val }
        else this.root = { next: this.root, val: val }
    }

    peek() {
        if(!this.root) throw 'Stack is empty';
        else return this.root.val;
    }

    pop() {
        const val = this.peek();
        this.root = this.root.next;
        return val;
    }
}

module.exports = { Stack };