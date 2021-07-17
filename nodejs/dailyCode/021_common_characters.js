const Helper = require('../Helper');

const Inout = new (require('../Inout'))('DailyCode --- Common Characters');

/*
    Hi, here's your problem today. This problem was recently asked by Apple:

    Given a list of strings, find the list of characters that appear in all strings.

    Here's an example and some starter code:

    def common_characters(strs):
    # Fill this in.

    print(common_characters(['google', 'facebook', 'youtube']))
    # ['e', 'o']

*/

Inout.result_Equals = Helper.hasArray_sameValues;
Inout.push('&NA google facebook youtube', '&NA e o')

Inout.solvers = [find_common_characters];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function find_common_characters(words) {

    const dict = {}
    const start = 'a'.charCodeAt(0);
    const common = [];

    for (let word of words) {
        const localdict = {}
        for (let char of word) {
            if (char in localdict) continue;
            else {
                localdict[char] = 0;
                if (char in dict) dict[char]++;
                else dict[char] = 1;
                if (dict[char] == words.length)
                    common.push(char);
            }
        }
    }

    return common;
}