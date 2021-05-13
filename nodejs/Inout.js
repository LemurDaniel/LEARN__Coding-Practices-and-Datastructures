const Helper = require('./Helper');

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


class Inout {

    constructor(description) {
        this.description = description ?? 'No Description';
        this.testcases = []
        this.solvers = []

        this.map_input = Helper.default_mapper;
        this.convert_input = Helper.convert_strings_in_object;
        this.convert_output = Helper.convert_strings_in_object;
        this.convert_result = res => res;

        this.input_string_converter = Helper.default_converter;
        this.output_string_converter = Helper.default_converter;
        this.result_string_converter = Helper.default_converter;

        this.input_copy_method = Helper.default_copy;
        this.result_comparer = (arg1, arg2) => JSON.stringify(arg1) == JSON.stringify(arg2);
    }

    push(arg, arg1) {
        if(arguments.length == 2) this.testcases.push( { input: arg, output: arg1 } );
        else this.testcases.push(arg);
    }

    solve (i = 0) {
        
        if(i == 0) console.log(' ===> ' + this.description + ' <=== ');

        const test = this.testcases[i];
        test.input = this.convert_input(test.input);
        test.output = this.convert_output(test.output);

        console.log('\n--------------------------------')
        console.log('Testcase '+(i+1)+':\n');

        console.log('  Input:  '+this.input_string_converter(test.input));
        console.log('  Output: '+this.output_string_converter(test.output));

        this.Apply_solvers(test)
        
        console.log('--------------------------------\n')


        if(i+1 >= this.testcases.length) process.exit(1);
        rl.question('///', (userInput) => {
            rl.close;
            return this.solve(i+1);
        });
    }

    Apply_solvers(test){
        for(let solver of this.solvers){

            let result;
            let exception;
            const input = this.input_copy_method(test.input);

            try{
                result = this.map_input(input, solver); 
                result = this.convert_result(result ?? input);
            }catch(exp){
                exception = exp;
                console.log(exp)
            }

            const success = (typeof test.output == 'function') ?  test.output(test, result) : this.result_comparer(test.output, result)
            console.log('\nSolver: '+ solver.name + '  ---  '+  (success ? 'Success':'Failure') );
            if(exception) console.log('   Exception: '+exception);
            else console.log('  Result: '+this.result_string_converter(result));
        }
    }
}


module.exports = Inout;