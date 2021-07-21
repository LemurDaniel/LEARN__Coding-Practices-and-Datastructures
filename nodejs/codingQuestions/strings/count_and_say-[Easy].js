const Inout = new (require('../../Inout'))('DailyCode --- Longest Common Prefix');
const Helper = require('../../Helper');

/*

    The count-and-say sequence is the sequence of integers beginning as follows:
    1, 11, 21, 1211, 111221

    1 is read off as "one 1" or 11.
    11 is read off as "two 1's" or 21.
    21 is read off as "one 2, then one 1" or 1211.
    Given an integers n, generate the nth sequence.

    Note: The sequence of integers will be represented as a string.

*/


Inout.push(0, '1')
Inout.push(1, '11')
Inout.push(2, '21')
Inout.push(3, '1211')
Inout.push(4, '111221')
Inout.push(20, '-')


Inout.solvers = [getNthSequence];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function getNthSequence(n) {

    let sequence = '1';

    while (n-- > 0) {

        let newSeq = '';
        let count = 0;
        let say = sequence[0];

        for (const char of sequence) {
            if (char === say)
                count++;
            else {
                newSeq += count + say;
                count = 1;
                say = char;
            }
        }

        sequence = newSeq + count + say;

    }

    return sequence;
}