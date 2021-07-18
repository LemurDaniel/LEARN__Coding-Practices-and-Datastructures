const { CustomError } = require('../Helper');

const Inout = new (require('../Inout'))('DailyCode --- Reverse Polish Notation Calculator');


Inout.push({
    description: 'Basic RPN Calculation',
    calculation: '12 4 / 1 -',
}, 2);
Inout.push({
    description: 'Basic RPN Calculation',
    calculation: '12 4 1 - /',
}, 4);
Inout.push({
    description: 'Basic RPN Calculation',
    calculation: '15 7 1 1 + - / 3 * 2 1 1 + + -',
}, 5);
Inout.push({
    description: 'Save 2 to in var1, then save var1 in var2, then show value of var2',
    calculation: '2 var1 =   var1 var2 =    var2 ',
}, 2);
Inout.push({
    description: 'Save 2 in var1, 4 in var2, then add both together',
    calculation: '2 var1 =   4 var2 =   var1 var2 + ',
}, 6);
Inout.push({
    description: 'Save 2 in var1, var1 in var2, 4 in var3, then add var2 to var3',
    calculation: '2 var1 =   var1 var2 =   4 var3 =    var2 var3 + ',
}, 6);
Inout.push({
    description: 'Save 2 in var1, var1 in var2, 4 in var3 \n --- Then reassign existing var1 with value 6 \n --- Finally add var2 to var3 \n --- since var2 references var1 it should use the new value of 6',
    calculation: '2 var1 =   var1 var2 =   4 var3 =   6 var1 =   var2 var3 + ',
}, 10);
Inout.push({
    description: 'Save (2 + 4)*6 in var1 \n --- save var1 * 2 in var2 \n --- add var1 and var2',
    calculation: '2 4 + 6 * var1 =    var1 2 * var2 =   var1 var2 +',
}, 108);

Inout.solvers = [rpnSolver]
Inout.solve(4)

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function rpnSolver(calculation) {

    const OPERATIONS = '+-*/:=';
    const DIGITS = '0123456789';

    const RPN = {
        stack: [],
        vars: {},

        popVar() {
            const variable = this.stack.pop();
            if (typeof variable !== 'string')
                throw new CustomError('Invalid Operation');
            return variable;
        },

        popNum() {
            let arg = this.stack.pop();
            while (typeof arg === 'string')
                arg = this.vars[arg];
            return arg;
        },

        calc(opcode, arg, arg2) {
            switch (opcode) {
                case '+': return arg2 + arg;
                case '-': return arg2 - arg;
                case '*': return arg2 * arg;
                case '/': ;
                case ':': return arg2 / arg;
                default:
                    throw new CustomError('Invalid Operation');
            }
        }
    }


    let flag_num = false;
    let token = '';

    for (const char of calculation + ' ') {

        const isTokenEmpty = token === '';
        const isWhitespace = char === ' ';
        const isOpcode = OPERATIONS.includes(char);
        const isDigit = DIGITS.includes(char);

        // Vars can have numbers, but must start with a non numeric value.
        const NumEnded = flag_num && (!isDigit || isOpcode);
        const varEnded = !isTokenEmpty && (isOpcode || isWhitespace)
        const tokenEnded = NumEnded || varEnded;

        if (tokenEnded) {
            if (flag_num) token = parseInt(token);
            RPN.stack.push(token);
            flag_num = false;
            token = '';
        }

        // If whitespace no further processing needed.
        if (isWhitespace) continue;
        if (isTokenEmpty) flag_num = isDigit;
        if (!isOpcode) token += char;

        // Process opcodes
        else if (char === '=') {
            const variable = RPN.popVar();
            const argument = RPN.stack.pop();
            RPN.vars[variable] = argument;
        } else {
            arg = RPN.popNum();
            arg2 = RPN.popNum();
            RPN.stack.push(
                RPN.calc(char, arg, arg2)
            )
        }
    }

    return RPN.popNum();

}