const Inout = new (require('../Inout'))('DailyCode --- Count and say sequence');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Epic.

    The "look and say" sequence is defined as follows: beginning with the term 1, 
    each subsequent term visually describes the digits appearing in the previous term. The first few terms are as follows:

    1
    11
    21
    1211
    111221
    As an example, the fourth term is 1211, since the third term consists of one 2 and one 1.

    Given an integer N, print the Nth term of this sequence.

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