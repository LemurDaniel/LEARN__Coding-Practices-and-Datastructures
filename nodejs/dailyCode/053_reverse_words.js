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

Inout.solvers = [reverseWords, reverseWords2];
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


function reverseWords2(str) {

    const arr = (str + ' ').split('');
    for (let i = 0, start = -1; i < arr.length; i++) {

        if (arr[i] !== ' ' && start === -1) start = i;
        else if(arr[i] === ' ' && start !== -1) {
            const len = Math.floor((i - start) / 2);
            for (let j = 0; j < len; j++) 
                [ arr[start + j], arr[i - j - 1] ] = [ arr[i - j - 1], arr[start + j] ]
            start = -1;
        }

    }

    arr.pop();
    return arr.join('')
}