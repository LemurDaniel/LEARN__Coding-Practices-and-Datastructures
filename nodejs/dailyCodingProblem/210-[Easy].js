const Inout = new (require ('../Inout'))('Daily Coding Problem --- Collatz Sequences');
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Apple.

    A Collatz sequence in mathematics can be defined as follows. Starting with any positive integer:

    if n is even, the next number in the sequence is n / 2
    if n is odd, the next number in the sequence is 3n + 1
    It is conjectured that every such sequence eventually reaches the number 1. Test this conjecture.

    Bonus: What input n <= 1000000 gives the longest sequence?

*/

Inout.push( 5, () => true );


Inout.solvers = [collatz_sequence_iterative, collatz_sequence_recursive, longest_sequence];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function longest_sequence() {

    let longest_sequence = [];
    let longest_sequence_n = -1;

   for(let i=1; i<= 10e5; i++) {
        if(i%10e4 == 0) console.log('   ' + i + ' -- ' + ( i / 10e5 * 100 ) + '%')
        const sequence = collatz_sequence_iterative(i);
        if(sequence.length < longest_sequence.length) continue;
        longest_sequence   = sequence;
        longest_sequence_n = i;
   }

   return { Longest_Sequence: longest_sequence, Longest_Sequence_N: longest_sequence_n, Sequence_length: longest_sequence.length };
}

function collatz_sequence_recursive(n, list = []) {

    list.push(n);
    if( n == 1 )          return list;
    else if( n % 2 == 0 ) return collatz_sequence_recursive( Math.floor(n/2), list );
    else                  return collatz_sequence_recursive( 3 * n + 1, list );

}


function collatz_sequence_iterative(n, list = []) {

    while( n != 1 ) {
        list.push(n);
        if( n % 2 == 0 ) n = Math.floor(n/2);
        else             n = 3 * n + 1;
    }

    list.push(1);
    
    return list;
}