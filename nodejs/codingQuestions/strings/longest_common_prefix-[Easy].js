const Inout = new (require ('../../Inout'))('DailyCode --- Longest Common Prefix');
const Helper = require('../../Helper');

/*

    Write a function to find the longest common prefix string amongst an array of strings.

*/

Inout.convert_output = arg => arg == '' ? '[None]' : arg;
Inout.convert_result = Inout.convert_output;

Inout.push('&NA catfood caterpillar catalyst', 'cat');
Inout.push('&NA olaf ice snowman', '');

Inout.solvers = [find_longest_common_prefix];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function find_longest_common_prefix(words) {

    let prefix = '';

    // Parse through every char in the first word.
    for(let i=0; i<words[0].length; i++){

        // Get the position of the current char of the first word.
        const current_char = words[0][i];

        // Check whether this char exists at the same position in every word.
        for(let word of words){
            if(word.length < i) return prefix;              // The prefix can only be as long as the longest word, so if the end of a word is reached, the longest prefix is found and returned.
            else if(word[i] != current_char) return prefix; // If one word has a not matching char, then the longest common prefix is found an returned.
        }

        // If all words have the same character at the same postion, then add it to the longest common prefix string.
        prefix += current_char;
    }

    return prefix;
}
