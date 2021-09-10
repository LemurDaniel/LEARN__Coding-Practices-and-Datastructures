const Inout = new (require('../Inout'))('DailyCode --- Convert fraction to decimal')

/*

    Hi, here's your problem today. This problem was recently asked by Facebook:

    Given a numerator and a denominator, find what the equivalent decimal representation is as a string. 
    If the decimal representation has recurring digits, then put those digits in brackets (ie 4/3 should be represented by 1.(3) to represent 1.333...). 
    Do not use any built in evaluator functions like python's eval. You can also assume that the denominator will be nonzero.

    Here's some examples and some starter code:

    def frac_to_dec(numerator, denominator):
    # Fill this in.

    print(frac_to_dec(-3, 2))
    # -1.5

    print(frac_to_dec(4, 3))
    # 1.(3)

    print(frac_to_dec(1, 6))
    # 0.1(6)

*/

Inout.input_Converter = arg => ({ numerator: arg[0], denominator: arg[1] })

Inout.push([-3, 2], '-1.5');
Inout.push([4, 3], '1.(3)');
Inout.push([1, 6], '0.1(6)');
Inout.push([3, 20], '0.15');
Inout.push([1, 7], '0.(142857)');
Inout.push([1, Math.PI], Inout.static.None);

Inout.solvers = [fractionToDecimal];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/




function fractionToDecimal(numerator, denominator, maxDecimals = 10e2) {

    const dict = {};
    const decimals = [];

    let index = 0;

    let remainder = Math.abs(numerator % denominator * 10);
    while (remainder !== 0 && --maxDecimals >= 0) {

        // Store remainder with index in dictionary.
        dict[remainder] = index++;

        // Calculate next digit.
        decimals.push(
            Math.floor(remainder / denominator)
        )

        // Calculate next remainder.
        remainder = remainder % denominator * 10;

        // Check if remainder is alread in dict and therefore a loop is found.
        if (remainder in dict) {
            const recurringAtIndex = dict[remainder];
            decimals[recurringAtIndex] = '(' + decimals[recurringAtIndex];
            decimals.push(')');
            break;
        }
    }

    let result = numerator / denominator;
    result = result > 0 ? Math.floor(result) : Math.ceil(result);
    result += '.' + decimals.join('');

    if (maxDecimals < 0)
        result += ` /${decimals.length} decimal places calculated ...)`;

    return result;
}