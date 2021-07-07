const Inout = new (require('../Inout'))('Daily Coding Problem --- Check if integer is a palindrome without converting it to a String');
const fs = require('fs');
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
Inout.push(10221, false);
Inout.push(10022001, true);
Inout.push(1122222211, true);

const palindromes_lookup_dict = {}
fs.readFileSync('./dailyCodingProblem/202-palindrome_integers.txt', 'utf-8').split('\r\n').forEach(i => palindromes_lookup_dict[i] = 1);

Inout.solvers = [is_Integer_a_palindrome_reverse_integer, is_Integer_a_palindrome_compare_digits, is_Integer_a_palindrome_lookup_table];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function is_Integer_a_palindrome_lookup_table(num) {
    return Math.abs(num) in palindromes_lookup_dict;
}

function is_Integer_a_palindrome_compare_digits(num) {

    let leading_zero = false;

    while (num) {

        const order_of_magnitude = Math.pow(10, Math.floor(Math.log10(num)))
        const most_significant_digit = leading_zero ? 0 : Math.floor(num / order_of_magnitude);
        const least_significant_digit = num % 10;

        // console.log('Num: ' + num + '  --  highest_digit: ' + most_significant_digit + '   lowest_digit: ' + least_significant_digit);
        if (most_significant_digit != least_significant_digit) return false;

        // To account for numbers like 10221. The leading zero gets removed when the most significant digit is removed: 0221 becomes 221
        leading_zero = Math.floor(num / order_of_magnitude * 10) % 10 == 0;

        // Replace the leading zero with a one to prevent deletion.
        if (leading_zero) num += order_of_magnitude / 10;

        // Remove most significant and least significant digit.
        num %= order_of_magnitude;
        num = Math.floor(num / 10);

    }

    return true;
}
console.log(is_Integer_a_palindrome_compare_digits(10022001))

function is_Integer_a_palindrome_reverse_integer(num) {

    const number = num;
    let reversed = 0;

    while (num) {

        reversed = reversed * 10 + (num % 10);
        num = Math.floor(num / 10);

    }

    return number == reversed
}