const Inout = new (require ('../Inout'))('DailyCode --- Reverse Polish Notation Calculator');


Inout.push([5, 3, '+'], 8);
Inout.push([1, 2, 3, '+', 2, '*', '-'], -9);
Inout.push([15, 7, 1, 1, '+', '-', '/', 3, '*', 2, 1, 1, '+', '+', '-'], 5)

Inout.solvers = [evaluate_2];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function evaluate (expression)  {
    
    stack = [];

    operations = {
        '-': (a,b) => b-a,
        '+': (a,b) => b+a,
        '*': (a,b) => b*a,
        '/': (a,b) => b/a,
    }

    for(let token of expression){

        if(Object.keys(operations).includes(token)) 
            stack.push( operations[token](stack.pop(), stack.pop()) );
        else stack.push(token);
    }

    return stack.pop();
}


function evaluate_2 (exp, token)  {
    
    // Original array is simultaniously used as the stack.
    // Eval is NodeJs built-In method to evaluate expressions like eval( 5 + 3 ) = 8.
    let stack_pointer = -1;

    for(let i=0; i<exp.length; i++) {

        // Push num to stack when it's not an operand.
        if(!('-+*/'.includes(exp[i]))) exp[++stack_pointer] = exp[i];
        // Bulit an expression for eval function out of top two elements of the stack and decrement the stack pointer by one.
        else exp[stack_pointer-1] = parseInt(eval( exp[stack_pointer-1] + exp[i] + exp[stack_pointer--] ));
 
        // console.log('Stack_pointer: ' + stack_pointer + '  |  Element: ' + exp[stack_pointer] + '  |  Exp: ' + exp)
    }
    
    return exp[stack_pointer];
}
