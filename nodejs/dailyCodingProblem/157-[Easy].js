const Inout = new (require ('../Inout'))('Daily Coding Problem --- Is any permutation a palindrom');
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Amazon.

    Given a string, determine whether any permutation of it is a palindrome.

    For example, 'carrace' should return 'true', since it can be rearranged to form 'racecar', which is a palindrome. 
    'daily' should return 'false', since there's no rearrangement that can form a palindrome.

*/

Inout.convert_input = inp => inp.toLowerCase();

Inout.push( { input: 'carrace', output: true } );
Inout.push( { input: 'daily', output: false } );

Inout.solvers = [Is_permutation_palindrom_dict, Is_permutation_palindrom_arr];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*
    if a char is encountered it gets saved into a dictionary. 
    if the same char is already present it gets removed from the dictionary.

    After passing the string all chars appearing an even number of times will
    be added removed again. All chars appearing an uneven number of times will
    remain in the dictionary.

    To create a palindrom or to have point symmetry to the middle of the string,
    non characters can appear an uneven number of times, except in case of a string 
    with an uneven length at most one character can appear an unveven amount
    of times, namles the one in the middle of the string

    ==> a b c b a            // a: 2, b: 2, c: 1 times 
    ==> a a b b c b b a a    // a: 4, b: 4, c: 1 times 
    ==> a a b b c c b b a a  // a: 4, b: 4, c: 2 times
*/
function Is_permutation_palindrom_dict(str) {
    
    const dict = {};

    for(let c of str) {
        if( c in dict ) delete dict[c];
        else dict[c] = 0;
    };

    return Object.keys(dict).length <= 1;
}



function Is_permutation_palindrom_arr(str) {
    
    const arr = new Array(26);
    const start = 'a'.charCodeAt(0);

    for(let i=0; i<str.length; i++){
        const index = str.charCodeAt(i) - start; 
        if(arr[index]) arr[index]++;
        else arr[index] = 1;
    }

    let flag = false;
    for(let i=0; i<str.length; i++) {
        if(!arr[i] || arr[i] % 2 == 0) continue;
        if(flag) return false;
        else flag = true;
    }

    return true;
}
