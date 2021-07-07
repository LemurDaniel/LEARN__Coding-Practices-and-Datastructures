const Inout = new (require ('../Inout'))('Daily Coding Problem --- Find first recurring Character');
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Google.

    Given a string, return the first recurring character in it, or null if there is no recurring character.

    For example, given the string "acbbac", return "b". Given the string "abcdef", return null.

*/

Inout.input_Converter = inp => inp.toLowerCase();

Inout.push( { input: 'acbbac', output: 'b' } );
Inout.push( { input: 'abcdef', output: 'None' } );

Inout.solvers = [first_recurring_character, first_recurring_character_arr];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function first_recurring_character(str) {
    
    const dict = {};

    for(let c of str) {
        if( c in dict ) return c;
        else dict[c] = 0;
    };

    return 'None';
}


function first_recurring_character_arr(str) {
    
    const arr = new Array(26);
    const start = 97 // 'a'.charCodeAt(0);

    for(let i=0; i<str.length; i++){
        const index = str.charCodeAt(i) - start; 
        if(arr[index]) return str[i];
        else arr[index] = 1;
    }

    return 'None';
}
