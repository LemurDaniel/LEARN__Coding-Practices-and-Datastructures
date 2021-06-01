const Inout = new (require ('../Inout'))('Daily Coding Problem --- Consecutive ones in binary number');
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Stripe.

    Given an integer n, return the length of the longest consecutive run of 1s in its binary representation.

    For example, given 156, you should return 3.

*/

Inout.input_string_converter = arg => ' Num: ' + arg + ' -- ' + (arg >>> 0).toString(2);

Inout.push( 156, 3 );
Inout.push( -156, 24 );

Inout.solvers = [consecutive_ones_to_string, consecutive_ones_bitshift];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function consecutive_ones_to_string( num ) {

    let longest_streak   = 0;
    let consecutive_ones = 0;

    for(let bit of (num >>> 0).toString(2)) {
        if( bit == '1' ) consecutive_ones++;
        else {
            longest_streak   = Math.max(longest_streak, consecutive_ones);
            consecutive_ones = 0;
        }
    }

    return Math.max(longest_streak, consecutive_ones);
}


function consecutive_ones_bitshift( num ) {

    let longest_streak   = 0;
    let consecutive_ones = 0;

    while(num) {

        if( num & 0b1 ) consecutive_ones++;
        else {
            longest_streak   = Math.max(longest_streak, consecutive_ones);
            consecutive_ones = 0;
        }

        num >>>= 1;
    }

    return Math.max(longest_streak, consecutive_ones);
}