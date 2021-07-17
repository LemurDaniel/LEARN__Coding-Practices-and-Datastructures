const { CustomError } = require('./Helper');
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

        this.result_Equals = Helper.default_Equals;
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


        console.log('\n--------------------------------\n')
        console.group();
        console.log('\x1b[42m', 'Testcase ' + (i + 1) + ':', '\x1b[0m');


        console.log()
        console.group();

        console.log(this.input_stringConverter({ Input: test.input }));
        console.log(this.input_stringConverter({ Output: test.output }));
        console.log('\x1b[42m', ' ---- Solving below ---- ', '\x1b[0m', '\n')
        this.applySolvers(test)

        console.groupEnd();


        console.groupEnd();
        console.log('\x1b[0m')
        console.log('--------------------------------\n')


        if (i + 1 >= this.testcases.length) process.exit(1);
        rl.question('///', (userInput) => {
            rl.close;
            return this.solve(i + 1);
        });
    }

    applySolvers(test) {
        for (let solver of this.solvers) {

            let result;
            let exception;
            const input = this.input_Copy(test.input);

            try {
                result = this.map_input(input, solver);
                result = this.result_Converter(result ?? input, test);
            } catch (exp) {
                exception = { [exp.name]: exp };
            }

            const isOutputFunction = typeof test.output === 'function';
            const comparator = isOutputFunction ? test.output : this.result_Equals;
            const success = comparator(isOutputFunction ? test : test.output, exception ?? result);
            const color = exception ? '\x1b[33m' : (success ? '\x1b[32m' : '\x1b[31m');
            console.log(color, `Solver: ${solver.name}  ---  ${(success ? 'Success' : 'Failure')}`);

            console.group();
            console.log(exception ? 'Exception: ' : 'Result: ');
            console.group();
            console.log(this.result_stringConverter(exception ?? result));
            console.log();
            console.groupEnd();
            console.groupEnd();
        }
    }
}

module.exports = Inout;