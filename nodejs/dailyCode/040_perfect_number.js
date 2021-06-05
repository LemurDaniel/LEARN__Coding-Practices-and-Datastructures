const Inout = new (require("../Inout"))("DailyCode --- Perfect number");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Facebook:

    A Perfect Number is a positive integer that is equal to the sum of all its positive divisors except itself.

    For instance,
    28 = 1 + 2 + 4 + 7 + 14

    Write a function to determine if a number is a perfect number.

    class Solution(object):
    def checkPerfectNumber(self, num):
        # Fill this in.

    print(Solution().checkPerfectNumber(28))
    # True
    # 28 = 1 + 2 + 4 + 7 + 14

*/

Inout.result_comparer = (arg, arg2) =>typeof arg == 'object' ? ( Helper.Array_has_same_values(arg.divisors, arg2.divisors) ) : ( arg == arg2.perfect );

Inout.push( 28, { divisors: '&AR 1,2,4,7,14' } );
Inout.push( 82, false );
Inout.push( 8128, { divisors: '&AR 1,2,4,8,16,32,64,127,254,508,1016,2032,4064' } );

Inout.solvers = [isPerfectNumber];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function isPerfectNumber(num) {

    let divisors = [];
    let divisor  = Math.floor(num / 2);

    let sum = 0;
    do {
        if( num % divisor != 0 ) continue; 
        divisors.push(divisor);
        sum += divisor;
        if(sum > num) break;;
    } while(--divisor)

    return { sum: sum, divisors: divisors, perfect: sum == num }
}