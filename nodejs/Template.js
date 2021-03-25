
// Create object of class Inout
const Inout = new (require ('./Inout'))('Blablabla');

// Optional
this.map_input = (input, solver) => solver(input);
this.convert_input = inp => inp;
this.convert_output = oup => oup;
this.convert_result = res => res;

this.input_string_converter = arg => arg;
this.output_string_converter = arg => arg;
this.result_string_converter = arg => arg;

this.input_copy_method = (arg) => JSON.parse(JSON.stringify(arg));
this.result_comparer = (arg1, arg2) => JSON.stringify(arg1) == JSON.stringify(arg2);

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
