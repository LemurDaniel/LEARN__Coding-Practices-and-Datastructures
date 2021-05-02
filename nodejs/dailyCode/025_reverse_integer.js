const Inout = new (require ('../Inout'))('DailyCode --- Reverse Integer');
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Amazon:

    Given an integer, reverse the digits. 
    Do not convert the integer into a string and reverse it.

    Here's some examples and some starter code.

    def reverse_integer(num):
    # Fill this in.
    
    print(reverse_integer(135))
    # 531

    print(reverse_integer(-321))
    # -123

*/

Inout.push(135, 531);
Inout.push(-321, -123)

Inout.solvers = [reverse_integer_without_string_conversion];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function reverse_integer_without_string_conversion(num) {

    // indicates whether the number is negative or not
    let flag_neg = num < 0;

    // use the absolute value since flooring leads to undesired results with negativ numbers.
    // Example: Flooring -0.1 equals -1 instead of the desired 0.
    // This can also be prevented by ceiling the number instead when it's negative. 
    num = Math.abs(num);

    let reversed = 0;

    while(num) {

        // 'num mod 10' returns the last digit of the number since it's not dividable by 10.
        // Multiplying the currently reversed part each iteration by 10 moves all their digits
        // on to the left and then simply adding the currently last digit.
        reversed = reversed * 10 + (num % 10);

        // 'num / 10' moves last digit beyond the decimal point and 
        // flooring it cuts of the digits after the decimal point.
        // Example: '135 / 10' = '13.5'
        // Via this the last digit of the number gets cut each iteration and the number shrinks down to zero.
        num = Math.floor( num / 10 );
    }

    return flag_neg ? -reversed : reversed;
}