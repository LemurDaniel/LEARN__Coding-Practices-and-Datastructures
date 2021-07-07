const Inout = new (require("../Inout"))("DailyCode --- Longest substring without any repeating characters");
const { BinaryTree } = require("../datastructures/bTree");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Microsoft:

    Given a string, find the length of the longest substring without repeating characters.

    Here is an example solution in Python language. (Any language is OK to use in an interview, though we'd recommend Python as a generalist language utilized by companies like Google, Facebook, Netflix, Dropbox, Pinterest, Uber, etc.,)

    class Solution:
    def lengthOfLongestSubstring(self, s):
        # Fill this in.

    print Solution().lengthOfLongestSubstring('abrkaabcdefghijjxxx')
    # 10

*/

Inout.output_Converter = str => ({ substring: str, length: str.length });
Inout.result_Converter = Inout.output_Converter;

Inout.push('abrkaabcdefghijjxxx', 'abcdefghij');

Inout.solvers = [longest_substring];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*

    time complexity: linear ==> one pass.
    space complexity: linear

*/

function longest_substring(str) {


    let dict = {};
    let start = 0; // Starting index of the current substring sequence
    let longest = '';

    for (let i = 0; i < str.length; i++) {

        const c = str[i];

        // If character is in dicitonary and is in the current sequence (index bigger or euqal than startindex).
        if ((c in dict) && dict[c] >= start) {

            // Calculate length of substring and check if it's longer.
            const len = i - start;
            if (longest.length < len) longest = str.substr(start, len);

            // Start the sequence one index after the doubley appeared character and keep the current index the same.
            // In case of: 'abrka' <== a appeared a second time ==> New Sequence is 'brka'.
            // This ensures that the new Sequence holds unique characters without iterating again from the start of the new sequence.
            start = dict[c] + 1;
        }

        // Save character and its index in the dicionary.
        dict[c] = i;
    }

    return longest;

}