const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


class Inout {

    constructor(description) {
        this.description = description ?? 'No Description';
        this.testcases = []
        this.solvers = []
    }

    solve (i){
        
        if(!i) i = 0;
        if(i == 0) console.log(' ===> ' + this.description + ' <=== ');

        const test = this.testcases[i];

        console.log('\n--------------------------------')
        console.log('Testcase '+i+':\n');

        if(this.input_string_converter)     console.log('  '+this.input_string_converter(test.input));
        else    console.log('  Input: '+test.input);

        if(this.output_string_converter)     console.log('  '+this.output_string_converter(test.output));
        else    console.log('  Output: '+test.output);


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
            let success = false;
            try{
                if(this.map_input) result = this.map_input(test.input, solver); 
                else result = solver(test.input);
            }catch(exp){
                result = exp;
            }

            if(this.result_comparer) success = this.result_comparer(test.output, result)
            else success = test.output == result;

            console.log('\nSolver: '+ solver.name + '  ---  '+  (success ? 'Success':'Failure') );

            if(this.result_string_converter)     console.log('  '+this.result_string_converter(result));
            else    console.log('  Result: '+result);
        }
    }
}


module.exports = Inout;













