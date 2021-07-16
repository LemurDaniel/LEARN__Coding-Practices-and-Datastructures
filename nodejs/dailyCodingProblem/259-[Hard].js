const Inout = new (require("../Inout"))("Daily Coding Problem --- Rearrange linked list");
const { NodeQueue } = require("../datastructures/queue");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Two Sigma.

    Ghost is a two-person word game where players alternate appending letters to a word. 
    The first person who spells out a word, or creates a prefix for which there is no possible continuation, loses. Here is a sample game:

    Player 1: g
    Player 2: h
    Player 1: o
    Player 2: s
    Player 1: t [loses]
    Given a dictionary of words, determine the letters the first player should start with, such that with optimal play they cannot lose.

    For example, if the dictionary is ["cat", "calf", "dog", "bear"], the only winning start letter would be b.

    Build a tree structure with all possible ways of playing the game and take the branch with the most possible win scenarios.

*/

Inout.result_Comparator = (oup, res) => oup.letter === res.letter;
Inout.result_Converter = res => {
    res.ratio = Math.floor(res.ratio * 10000) / 100 + '%';
    return res;
}

Inout.push('&AR cat calf dog bear', { letter: 'b' });
Inout.push('&FS ./dailyCode/038_words.txt &AR', () => true);
Inout.push('&FS ./dailyCode/038_41.284_words.txt &AR', () => true);

const OptimalPlayTree = initialize();
Inout.solvers = [optimalPlay_TreeStructure];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function optimalPlay_TreeStructure(words) {

    const plays = OptimalPlayTree.createRoot().addWords(words).getAllPlays();
    
    const max = Object.keys(plays).reduce(
        (a, b) => plays[a].ratio > plays[b].ratio ? a : b
    )

    return { letter: max, ...plays[max] };
}





function initialize() {
    return class Node {

        static createRoot() {
            return new Node('', 0);
        }

        get isLeaf() {
            return this.nodes === null;
        }

        constructor(val, num) {
            this.num = num;
            this.val = val;
            this.nodes = null;
        }


        addWords(words) {
            words.forEach(word => this.addWord(word));
            return this;
        }
        addWord(word, idx = 0) {

            if (idx >= word.length) return;
            if (this.nodes === null)
                this.nodes = {};

            const nodes = this.nodes;
            const char = word[idx];

            if (!(char in nodes))
                nodes[char] = new Node(char, this.num + 1);

            nodes[char].addWord(word, idx + 1);

            return this;
        }

        getAllPlays() {
            const result = {};
            Object.entries(this.nodes).forEach(
                ([char, node]) => result[char] = node.__getAllPlays()
            )
            return result;
        }
        __getAllPlays(prefix = '', result = { wins: 0, loses: 0, diff: 0, plays: 0, ratio: 0, words: [] }) {

            if (this.isLeaf) {
                result.words.push(prefix + this.val);
                result.wins += 1 - this.num % 2;
                result.loses += this.num % 2;
                result.plays = result.wins + result.loses;
                result.diff = result.wins - result.loses;
                result.ratio = result.wins / (result.wins + result.loses);
            } else {
                for (const [char, node] of Object.entries(this.nodes)) {
                    node.__getAllPlays(prefix + this.val, result);
                }
            }

            return result;
        }
    }

}