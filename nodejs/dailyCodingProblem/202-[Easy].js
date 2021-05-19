const Inout = new (require ('../Inout'))('Daily Coding Problem --- Check if integer is a palindrome without converting it to a String');
const { BinaryTree } = require('../datastructures/bTree');
const { NodeQueue } = require('../datastructures/queue');
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Palantir.

    Write a program that checks whether an integer is a palindrome. 
    For example, 121 is a palindrome, as well as 888. 678 is not a palindrome. 
    Do not convert the integer into a string.

*/

Inout.push(121, true);
Inout.push(888, true);
Inout.push(678, false);
Inout.push(11222222222211, true);

Inout.solvers = [is_Integer_a_palindrome_compare_digits];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function is_Integer_a_palindrome_compare_digits(num) {

    const number = num;
    let reversed = 0;

    while(num) {

        const order_of_magnitude = Math.pow(10, Math.floor(Math.log10(num)))
        const most_significant_digit  = Math.floor( num / order_of_magnitude ); 
        const least_significant_digit = num % 10;

        // console.log('Num: ' + num + '  --  highest_digit: ' + most_significant_digit + '   lowest_digit: ' + least_significant_digit);
        if( most_significant_digit != least_significant_digit ) return false;

        // Remove most significant and least significant digit.
        num %= order_of_magnitude;
        num = Math.floor( num / 10 );

    }

    return true;
}