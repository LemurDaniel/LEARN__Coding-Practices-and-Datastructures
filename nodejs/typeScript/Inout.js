"use strict";
exports.__esModule = true;
exports.Inout = exports.Testcase = void 0;
var Helper_1 = require("./Helper");
var rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
var Testcase = /** @class */ (function () {
    function Testcase(input, output) {
        this.input = input;
        this.output = output;
    }
    return Testcase;
}());
exports.Testcase = Testcase;
var Inout = /** @class */ (function () {
    function Inout(description) {
        this.testcases = [];
        this.solvers = [];
        this.description = description !== null && description !== void 0 ? description : 'No Description';
        this.map_input = Helper_1.Helper.default_mapper;
        this.convert_input = Helper_1.Helper.convert_strings_in_object;
        this.convert_output = Helper_1.Helper.convert_strings_in_object;
        this.convert_result = function (res) { return res; };
        this.input_string_converter = Helper_1.Helper.default_converter;
        this.output_string_converter = Helper_1.Helper.default_converter;
        this.result_string_converter = Helper_1.Helper.default_converter;
        this.input_copy_method = Helper_1.Helper.default_copy;
        this.result_comparer = function (arg1, arg2) { return JSON.stringify(arg1) == JSON.stringify(arg2); };
    }
    Inout.prototype.push = function (arg, arg1) {
        if (arguments.length == 2)
            this.testcases.push(new Testcase(arg, arg1));
        else
            this.testcases.push(arg);
    };
    Inout.prototype.solve = function (i) {
        var _this = this;
        if (i === void 0) { i = 0; }
        if (i == 0)
            console.log(' ===> ' + this.description + ' <=== ');
        var test = this.testcases[i];
        test.input = this.convert_input(test.input, test);
        test.output = this.convert_output(test.output, test);
        console.log('\n--------------------------------');
        console.log('Testcase ' + (i + 1) + ':');
        console.log('\n---Input:  ' + this.input_string_converter(test.input));
        console.log('\n---Output: ' + this.output_string_converter(test.output));
        this.Apply_solvers(test);
        console.log('--------------------------------\n');
        if (i + 1 >= this.testcases.length)
            process.exit(1);
        rl.question('///', function (userInput) {
            rl.close;
            return _this.solve(i + 1);
        });
    };
    Inout.prototype.Apply_solvers = function (test) {
        for (var _i = 0, _a = this.solvers; _i < _a.length; _i++) {
            var solver = _a[_i];
            var result = void 0;
            var exception = void 0;
            var input = this.input_copy_method(test.input);
            try {
                result = this.map_input(input, solver);
                result = this.convert_result(result !== null && result !== void 0 ? result : input);
            }
            catch (exp) {
                exception = exp;
                console.log(exp);
            }
            var success = (typeof test.output == 'function') ? test.output(test, result) : this.result_comparer(test.output, result);
            console.log('\nSolver: ' + solver.name + '  ---  ' + (success ? 'Success' : 'Failure'));
            if (exception)
                console.log('   Exception: ' + exception);
            else
                console.log('  Result: ' + this.result_string_converter(result));
        }
    };
    Inout.Testcase = Testcase;
    return Inout;
}());
exports.Inout = Inout;
module.exports = {
    Testcase: Testcase,
    Inout: Inout
};
