const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


class Inout {

    constructor(description) {
        this.description = description ?? 'No Description';
        this.testcases = []
        this.solvers = []

        this.map_input = (input, solver) => solver(input) 
        this.map_result = res => res;

        this.input_string_converter = arg => arg;
        this.output_string_converter = arg => arg;
        this.result_string_converter = arg => arg;

        this.input_copy_method = (arg) => JSON.parse(JSON.stringify(arg));
        this.result_comparer = (arg1, arg2) => JSON.stringify(arg1) == JSON.stringify(arg2);
    }

    solve (i){
        
        if(!i) i = 0;
        if(i == 0) console.log(' ===> ' + this.description + ' <=== ');

        const test = this.testcases[i];

        console.log('\n--------------------------------')
        console.log('Testcase '+i+':\n');

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

            try{
                result = this.map_input(test.input, solver); 
                result = this.map_result(result);
            }catch(exp){
                result = exp;
            }

            const success = this.result_comparer(test.output, result)
            console.log('\nSolver: '+ solver.name + '  ---  '+  (success ? 'Success':'Failure') );
            console.log('  Result: '+this.result_string_converter(result));
        }
    }
}


module.exports = Inout;













