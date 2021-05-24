const Inout = new (require("../Inout"))("DailyCode --- Autocompletion");
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

Inout.push( { prefix: 'do', words: '&AR dog dark cat cat door dodge' }, '&AR dog door dodge' );
Inout.push( { prefix: 'c', words: '&AR dog dark cat cat door dodge' }, '&AR cat' );
Inout.push( { prefix: 'el', words: '&FS ./dailyCode/038_words.txt &AR' }, function for_testing () {return true} );
Inout.push( { prefix: 'test', words: '&FS ./dailyCode/038_10.000_words.txt &AR' }, function for_testing () {return true} );

Inout.solvers = [autocomplete_trie_implementation];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function autocomplete_trie_implementation(prefix, words) {

    const trie = new Trie();
    trie.add_words(words);

    return trie.get_words(prefix);
    
}