const Inout = new (require ('../Inout'))('DailyCode --- Reverse Polish Notation Calculator');
const Stack = new require('../datastructures/stack')





Inout.testcases.push({input: [1, 2, 3, '+', 2, '*', '-'], output: -9});
Inout.solvers = [evaluate];

Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function evaluate (expression)  {
    stack = new Stack();

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
