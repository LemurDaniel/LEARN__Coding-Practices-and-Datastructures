// Queue implementation using nodes
// Start <== val <== val <== val <== end
class Queue {

    constructor(){
        this.start = null;
        this.end = null;
        this.count = 0;
    }

    isEmpty = () => this.end == null;

    enqueue(val){
        if(!this.start) 
            this.start = this.end = { val: val };
        else {
            this.start.next = { val: val };
            this.start = this.start.next;
        }
        this.count++;
    }

    peek() {
        if(!this.end) throw 'Queue is empty';
        else return this.end.val;
    }

    dequeue() {
        const val = this.peek();
        this.end = this.end.next;
        this.count--;
        return val;
    }
}

module.exports = Queue;