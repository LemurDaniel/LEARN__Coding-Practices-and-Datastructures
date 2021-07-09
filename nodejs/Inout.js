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

        this.map_input = Helper.default_Mapper;
        this.input_Copy = Helper.default_Copy;
        this.input_Converter = Helper.default_Converter;
        this.output_Converter = Helper.default_Converter;
        this.result_Converter = res => res;

        this.input_stringConverter = Helper.default_StringConverter;
        this.output_stringConverter = Helper.default_StringConverter;
        this.result_stringConverter = Helper.default_StringConverter;

        this.result_Comparator = Helper.default_Comparator;
    }

    push(arg, arg1) {
        if (arguments.length == 2) this.testcases.push({ input: arg, output: arg1 });
        else this.testcases.push(arg);
    }

    solve(i = 0) {

        if (i == 0) console.log(' ===> ' + this.description + ' <=== ');

        const test = this.testcases[i];
        test.input = this.input_Converter(test.input, test);
        test.output = this.output_Converter(test.output, test);

        console.log('\n--------------------------------')
        console.log('Testcase ' + (i + 1) + ':');

        console.log('\n---Input:  ' + this.input_stringConverter(test.input));
        console.log('\n---Output: ' + this.output_stringConverter(test.output));

        this.Apply_solvers(test)

        console.log('--------------------------------\n')


        if (i + 1 >= this.testcases.length) process.exit(1);
        rl.question('///', (userInput) => {
            rl.close;
            return this.solve(i + 1);
        });
    }

    Apply_solvers(test) {
        for (let solver of this.solvers) {

            let result;
            let exception;
            const input = this.input_Copy(test.input);

            try {
                result = this.map_input(input, solver);
                result = this.result_Converter(result ?? input, test);
            } catch (exp) {
                exception = exp;
                console.log(exp)
            }

            const success = (typeof test.output === 'function') ? test.output(test, result) : this.result_Comparator(test.output, result)
            console.log('\nSolver: ' + solver.name + '  ---  ' + (success ? 'Success' : 'Failure'));
            if (exception) console.log('   Exception: ' + exception);
            else console.log('  Result: ' + this.result_stringConverter(result));
        }
    }
}

module.exports = Inout;