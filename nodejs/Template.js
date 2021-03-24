
// Create object of class Inout
const Inout = new (require ('./Inout'))('Blablabla');

// Optional
Inout.map_input = (input, solver) => solver(input[0], input[1]) 
Inout.input_string_converter = arg => 'Input: '+arg;
Inout.output_string_converter = arg => 'Output: '+arg;
Inout.result_string_converter = arg => 'Result: '+arg;
Inout.result_comparer = (arg1, arg2) => arg1 == arg2;


// testcase + solvers
Inout.testcases.push({input: input, output: output});
Inout.solvers = [method1, method2];

Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

//Solvers
function method1 (var1)  {
    return var1;
}

function method2 (var2)  {
    return var2;
}
