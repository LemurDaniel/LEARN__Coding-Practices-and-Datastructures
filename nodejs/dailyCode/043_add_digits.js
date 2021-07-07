const Inout = new (require("../Inout"))("DailyCode --- Add Digits");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Amazon:

    Given a number like 159, add the digits repeatedly until you get a single number.

    For instance, 1 + 5 + 9 = 15.
    1 + 5 = 6.

    So the answer is 6.

    class Solution(object):
    # Fill this in.

    print(Solution().addDigits(159))
    # 1 + 5 + 9 = 15
    # 1 + 5 = 6
    # 6

*/

Inout.push(159, 6);


Inout.solvers = [add_digits, add_digits_to_string_recursive];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function add_digits_to_string_recursive(num) {

    return num > 10 ? add_digits_to_string_recursive(num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b))) : num;
}

function add_digits(num) {

    while (num > 10) {

        let temp = 0;

        while (num) {
            temp += num % 10;
            num = Math.floor(num / 10);
        }

        num = temp;
    }

    return num;
}