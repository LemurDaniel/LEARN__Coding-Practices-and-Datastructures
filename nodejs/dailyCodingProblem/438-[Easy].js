const Inout = new (require("../Inout"))("Daily Coding Problem --- Construct huffman tree");
const { MinHeap, MaxHeap } = require("../datastructures/heap");;
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Amazon.


    Implement a stack API using only a heap. A stack implements the following methods:

    push(item), which adds an element to the stack
    pop(), which removes and returns the most recently added element (or throws an error if there is nothing on the stack)
    Recall that a heap has the following operations:

    push(item), which adds a new key to the heap
    pop(), which removes and returns the max value of the heap

*/


class StackHeap extends MaxHeap {

    constructor() {
        super()
        this.order = 0;
    }

    push(val) {
        super.add(val, this.order++);
    }

    pop() {
        return super.poll();
    }
}

function print_operations(operations) {

    let str = '';
    for (op of operations) {
        str += '\n        ';
        if (op[0] == 'PUSH') str += 'Push(' + (op[1] >= 0 ? ' ' : '') + op[1] + ')';
        else if (op[0] == 'POP') str += 'Pop => ' + (op[1] >= 0 ? ' ' : '') + op[1];
        else str += op;
    }
    return str;
}

Inout.output_stringConverter = print_operations;
Inout.result_stringConverter = print_operations;

Inout.push(
    '&AR PUSH -2, PUSH 0, PUSH 4, PUSH -3, POP, POP, POP, POP',
    '&AR PUSH -2|PUSH 0|PUSH 4|PUSH -3|POP -3|POP 4|POP 0|POP -2'
);

Inout.solvers = [stack_usingHeap];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function stack_usingHeap(operations) {

    const stack = new StackHeap();
    const log = [];
    let order = 0;

    try {
        // Apply operations.
        for (let op of operations) {

            if (op.includes('PUSH')) {
                const val = parseInt(op.split(' ')[1]);
                stack.add(val, order++);
                log.push(['PUSH', val]);
            }
            else if (op.includes('POP'))
                log.push(['POP', stack.pop()]);

        }
    }
    catch (exp) { log.push(exp); }

    return log;
}
