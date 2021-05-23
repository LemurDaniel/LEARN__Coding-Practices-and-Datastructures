const Inout = new (require("../Inout"))("DailyCode --- Index of larger next number");
const { Trie }  = require('../datastructures/tree') 
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by AirBNB:

    Implement auto-completion. Given a large set of words (for instance 1,000,000 words) and then a single word prefix, find all words that it can complete to.

    class Solution:
    def build(self):
        # Fill this in.
        
    def autocomplete(self, word):
        # Fill this in.

    s = Solution()
    s.build(['dog', 'dark', 'cat', 'door', 'dodge'])
    print(s.autocomplete('do'))
    # ['dog', 'door', 'dodge']

    Can you solve this optimally (in linear time with regards to the result set)?

*/

Inout.push( { words: '&AR dog dark cat door dodge', prefix: 'do' }, '&AR dog door dodge' );

Inout.solvers = [autocomplete_trie_implementation];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function autocomplete_trie_implementation(words, prefix) {

    const trie = new Trie();
    trie.add_words(words);

    return trie.get_words(prefix);
    
}