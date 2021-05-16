const Inout = new (require ('../../Inout'))('Coding Questions --- Min Stack - [difficulty: Easy]');
const { Min_Max_Stack } = require('../../datastructures/stack');
const Helper = require('../../Helper');

/*

    Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

    push(x)  -- Push element x onto stack.
    pop()    -- Removes the element on top of the stack.
    top()    -- Get the top element.
    getMin() -- Retrieve the minimum element in the stack. 

    Example:
    MinStack minStack = new MinStack();
    minStack.push(-2);
    minStack.push(0);
    minStack.push(4);
    minStack.push(-3);
    minStack.getMin();      --> Returns -3.
    minStack.getMax();      --> Returns  4.

    minStack.Pop();         --> Returns -3.
    minStack.GetMin();      --> Returns -2.
    minStack.getMax();      --> Returns  4.
    
    minStack.Pop();         --> Returns  4.
    minStack.GetMin();      --> Returns -2.
    minStack.getMax();      --> Returns  0.
*/

function print_operations (operations) {
    
    let str = '';
    for(op of operations) {
        str += '\n        ';
        if(op[0] == 'PUSH') str += 'Push('+ (op[1] >= 0 ? ' ':'' ) + op[1] +')';
        else if(op[0] == 'POP') str += 'Pop => '+ (op[1] >= 0 ? ' ':'' ) + op[1];
        else if(op[0] == 'MIN') str += 'Min => '+ (op[1] >= 0 ? ' ':'' ) + op[1];
        else if(op[0] == 'MAX') str += 'Max => '+ (op[1] >= 0 ? ' ':'' ) + op[1];
        else str += op;
    }
    return str;
}

Inout.output_string_converter = print_operations;
Inout.result_string_converter = print_operations;

Inout.push( 
    '&AR PUSH -2, PUSH 0, PUSH 4, PUSH -3, MIN, MAX, POP, MIN, MAX, POP, MIN, MAX', 
    '&AR PUSH -2|PUSH 0|PUSH 4|PUSH -3|MIN -3|MAX 4|POP -3|MIN -2|MAX 4|POP 4|MIN -2|MAX 0'
);

Inout.solvers = [min_stack];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function min_stack( operations ) {

    const stack = new Min_Max_Stack();
    const log = [];

    try{
        // Apply operations.
        for(let op of operations) {
            if(op.includes('PUSH')) {
                const val = parseInt(op.split(' ')[1]);
                stack.push( val );
                log.push(['PUSH',val]);
            }
            else if(op.includes('POP')) log.push(['POP', stack.pop() ]);
            else if(op.includes('MIN')) log.push(['MIN', stack.peek_Min() ]);
            else if(op.includes('MAX')) log.push(['MAX', stack.peek_Max() ]);

        }
    } catch (exp) { log.push(exp); }

    return log;
}