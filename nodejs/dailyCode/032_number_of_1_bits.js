const Inout = new (require("../Inout"))("DailyCode --- Number of 1 Bits");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Google:

    Given an integer, find the number of 1 bits it has.

    Here's an example and some starting code.

    def one_bits(num):
    # Fill this in.

    print(one_bits(23))
    # 4
    # 23 = 0b10111

*/

Inout.input_string_converter = arg  =>  arg + '  ---  ' +(arg >>> 0).toString(2);

Inout.push(23, 4);
Inout.push(-23, 29);
Inout.push(1, 1);
Inout.push(-1, 32);

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

const one_line_to_string = num => (num >>> 0).toString(2).split('').filter( v => v == 1 ).length;

Inout.solvers = [one_line_to_string, number_of_1_bits_math];
Inout.solve();

function number_of_1_bits_math(num) {

    if(num < 0) num >>>= 0;

    let count = 0;
    while(num) {
        count += num % 2;
        num    = Math.floor( num / 2 );
    }

    return count;
}