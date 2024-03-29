const { CustomError } = require('./Helper');
const Helper = require('./Helper');
const rl = require('readline');


class Inout {

    static None = '%NONE%';

    constructor(description) {
        this.description = description ?? 'No Description';
        this.testcases = []
        this.solvers = []

        this.static = Inout;

        this.env = {
            config: {
                stringConverter: {}
            }
        };

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

    async solve() {

        this.input_stringConverter = this.input_stringConverter.bind(this.env);
        this.output_stringConverter = this.output_stringConverter.bind(this.env);
        this.result_stringConverter = this.result_stringConverter.bind(this.env);

        console.log(' ===> ' + this.description + ' <=== ');

        for (let i = 0; i < this.testcases.length; i++) {

            const test = this.testcases[i];
            test.input = this.input_Converter(test.input, test);
            test.output = this.output_Converter(test.output, test);

            const results = await this.applySolvers(test);
            this.printTestcase(i, test, results)

            if (i < this.testcases.length - 1)
                await this.wait();
            else
                process.exit(1);
        }
    }


    async applySolvers(test) {

        let resultArray = [];
        for (let solver of this.solvers) {

            let result;
            let exception;
            const input = this.input_Copy(test.input);

            try {
                result = this.map_input(input, solver);
                result = this.result_Converter(result ?? input, test);
                if (result instanceof Promise)
                    result = await result;

            } catch (exp) {
                if (!(exp instanceof CustomError))
                    console.log(exp)
                exception = { [exp.name]: exp };
            }

            resultArray.push({ solver, result, exception });
        };

        return resultArray;
    }

    wait() {
        const userInterface = rl.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve, reject) => {
            userInterface.question('///', userInput => {
                userInterface.close();
                resolve(userInput);
            })
        })
    }

    printTestcase(i, test, results) {

        console.log('\n--------------------------------\n')
        console.group();
        console.log('\x1b[42m', 'Testcase ' + (i + 1) + ':', '\x1b[0m');

        console.log()
        console.group();

        const input_String = this.input_stringConverter(test.input) ?? '<Undefined>';
        const output_String = Inout.None === test.output ?
            '(No validation Function or Object)' :
            this.output_stringConverter(test.output) ?? '<Undefined>';

        if (input_String.includes('\n')) {
            console.log('Input: ');
            console.group();
            console.log(input_String);
            console.groupEnd();
        } else
            console.log('Input: ' + input_String + '\n')

        if (output_String.includes('\n')) {
            console.log('Output: ');
            console.group();
            console.log(output_String);
            console.groupEnd();
        } else
            console.log('Output: ' + output_String + '\n')

        console.log('\x1b[42m', ' ---- Solving below ---- ', '\x1b[0m', '\n')

        for (const { solver, exception, result } of results) {
            this.printSolver(test, solver, exception, result);
        }

        console.groupEnd();
        console.groupEnd();
        console.log('\x1b[0m')
        console.log('--------------------------------\n')
    }

    printSolver(test, solver, exception, result) {

        const isOutputFunction = typeof test.output === 'function';
        const euqalsFunc = isOutputFunction ? test.output : this.result_Equals;
        const euqalsParam = isOutputFunction ? test : test.output

        const success = euqalsFunc(euqalsParam, exception ?? result);
        const hasOutputValidator = Inout.None !== test.output;

        let color = '\x1b[32m';
        if (!hasOutputValidator) color = '\x1b[35m';
        else if (exception) color = '\x1b[33m';
        else if (success) color = '\x1b[32m';
        else color = '\x1b[31m';

        let successState = 'Pending';
        if (!hasOutputValidator) successState = 'Pending';
        else if (success) successState = 'Success';
        else successState = 'Failure';


        console.log(color, `Solver: ${solver.name}  ---  ${successState}`);

        console.group();
        console.log(exception ? 'Exception: ' : 'Result: ');
        console.group();
        console.log(this.result_stringConverter(exception ?? result));
        console.log();
        console.groupEnd();
        console.groupEnd();
    }


}

module.exports = Inout;