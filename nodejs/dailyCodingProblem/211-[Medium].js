const Inout = new (require ('../Inout'))('Daily Coding Problem --- Get indices of all occurences of a pattern');
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Microsoft.

    Given a string and a pattern, find the starting indices of all occurrences of the pattern in the string. 
    For example, given the string "abracadabra" and the pattern "abr", you should return [0, 7].

*/

Inout.push( { String: 'abracadabra', pattern: 'abr' } , [0, 7] );


Inout.solvers = [find_starting_indices];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function find_starting_indices(str, pattern) {

    const indices = [];
    for(let i=0; i<str.length; i++){

        if( str[i] != pattern[0] ) continue;

        // If first character matches then check in a second loop whether the pattern matches.
        let matches = true;
        for(let j=1; j<pattern.length; j++) {
            const index = j + i;
            if( index > str.length || pattern[j] != str[index] ) {
                matches = false;
                break;
            }
        }

        // Continue if pattern doesn't match.
        if(!matches) continue;

        // Push indice and increase i when matching.
        indices.push(i);
        i += pattern.length;

    }

    return indices;
}