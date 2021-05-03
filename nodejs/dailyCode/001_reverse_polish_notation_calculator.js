const Inout = new (require ('../Inout'))('DailyCode --- Reverse Polish Notation Calculator');


Inout.push([5, 3, '+'], 8);
Inout.push([1, 2, 3, '+', 2, '*', '-'], -9);
Inout.push([15, 7, 1, 1, '+', '-', '/', 3, '*', 2, 1, 1, '+', '+', '-'], 5)


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

const evaluate_oneliner = (exp, sp = -1) => exp.forEach( v => !('-+*/').includes(v) ? (exp[++sp] = v) : (exp[sp-1] = parseInt(eval( exp[sp-1] + v + exp[sp--] ))) ) == null ? exp[sp] : null; // ForEach has no return value and is always null. By using an inline if statement checking for null, the forEach can be evaluated and than on the same line the correct element in the array returned.

const evaluate_oneliner_2 = (exp, sp = -1) => exp.forEach( v => !('-+*/').includes(v) ? (exp[++sp] = v) : (exp[sp-1] = parseInt(eval( exp[sp-1] + v + exp[sp--] ))) ) ?? exp[sp]; // instead of inline if, Nullish coalescing can also be used.

// Another Version with the array.map function. The correct value always ends up on the last index of the map array.
const evaluate_oneliner_3 = (exp, sp = -1) => exp.map( v => !('-+*/').includes(v) ? (exp[++sp] = v) : (exp[sp-1] = parseInt(eval( exp[sp-1] + v + exp[sp--] ))) )[exp.length-1];

// stack pointer is saved at the end of the array and the maping function uses it's arr reference.
const evaluate_oneliner_spointer_saved_in_array = exp => (exp.join(',') + ',-1').split(',').map( (v,i,arr) => !('-+*/').includes(v) ? (arr[++arr[arr.length-1]] = v) : (arr[arr[arr.length-1]-1] = parseInt(eval( arr[arr[arr.length-1]-1] + v + arr[arr[arr.length-1]--] ))) ).splice(-2,1).reduce(v=>v);

Inout.solvers = [evaluate, evaluate_2, evaluate_oneliner, evaluate_oneliner_2, evaluate_oneliner_3, evaluate_oneliner_spointer_saved_in_array];
Inout.solve();




// Improved oneliner, stack_pointer in array is saved as the last element of the array.
// Joining to string, then adding ',-1' and spliting it again, initializes the stack_pointer at the end of the array to -1.
([15, 7, 1, 1, '+', '-', '/', 3, '*', 2, 1, 1, '+', '+', '-'].
    join(',') + ',-1').split(',').
    map( (v,i,arr) => !('-+*/').includes(v) ? 
            (arr[++arr[arr.length-1]] = v) : 
            (arr[arr[arr.length-1]-1] = parseInt(eval( arr[arr[arr.length-1]-1] + v + arr[arr[arr.length-1]--] ))) ).
            splice(-2,1).reduce( v => v );
// splicing cuts out the secondlast to elements wich is the result
// reduce, reduces the spliced array consisting of a single value to an integer with the result
