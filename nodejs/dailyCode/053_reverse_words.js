const Inout = new (require("../Inout"))("DailyCode --- Reverse Words in a String");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Facebook:

    Given a string, you need to reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.

    Example 1:
    Input: "The cat in the hat"
    Output: "ehT tac ni eht tah"
    Note: In the string, each word is separated by single space and there will not be any extra space in the string.

    Here's a starting point:

    class Solution:
    def reverseWords(self, str):
        # Fill this in.

    print Solution().reverseWords("The cat in the hat")
    # ehT tac ni eht tah

*/


Inout.push('The cat in the hat', 'ehT tac ni eht tah')
Inout.push('The       cat in the hat', 'ehT       tac ni eht tah')

Inout.solvers = [reverseWords];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function reverseWords(str) {

    const res = [];
    str.split(' ').forEach(word => {
        if (word === '') res.push(' ');
        else {
            for (let i = word.length - 1; i >= 0; i--)
            res.push(word[i] + (i === 0 ? ' ' : ''));
        }
    });
    res.push(res.pop()[0]);
    return res.join('');

}
