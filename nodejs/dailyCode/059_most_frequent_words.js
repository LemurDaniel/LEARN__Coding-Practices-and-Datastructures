const Inout = new (require("../Inout"))("DailyCode --- Find non duplicate number");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by AirBNB:

    Given a non-empty list of words, return the k most frequent words. 
    The output should be sorted from highest to lowest frequency, and if two words have the same frequency, the word with lower alphabetical order comes first. 
    Input will contain only lower-case letters.

    Example:
    Input: ["daily", "interview", "pro", "pro", 
    "for", "daily", "pro", "problems"], k = 2
    Output: ["pro", "daily"]
    class Solution(object):
    def topKFrequent(self, words, k):
        # Fill this in.

    words = ["daily", "interview", "pro", "pro", "for", "daily", "pro", "problems"]
    k = 2
    print(Solution().topKFrequent(words, k))
    # ['pro', 'daily']

*/

Inout.push({ words: '&AR daily interview pro pro for daily pro problems', k: 2 }, '&AR pro,3|daily,2');
Inout.push({ words: '&AR daily interview pro pro for daily pro daily problems', k: 2 }, '&AR daily,3|pro,3');

Inout.solvers = [mostFrequentWords];
Inout.solve();





function mostFrequentWords(words, k) {

    const dict = {};

    for (const word of words) {
        if (!(word in dict)) dict[word] = 0;
        dict[word]++;
    }

    const res = Object.keys(dict);
    res.sort((w, w2) => -dict[w] + dict[w2])

    return res.slice(0, k).map(v => [v, dict[v]]);
}