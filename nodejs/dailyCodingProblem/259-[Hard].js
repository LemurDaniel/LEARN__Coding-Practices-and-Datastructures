const Inout = new (require("../Inout"))("Daily Coding Problem --- Rearrange linked list");
const { uptime } = require("process");
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

*/

Inout.result_Comparator = (oup, res) => res.some(v => v.letter === oup.letter);
Inout.result_Converter = result => {

    const convert = [];
    for (const res of result) {
        const stats = res.stats;
        const words = stats.words;
        const length = words.length;
        if (length > 10) {
            words.length = 9;
            words.push(`... >>> ${(length - 9)} more`);
        }
        stats.winToPathsRatio = Math.floor(stats.winToPathsRatio * 10000) / 100 + '%';

        convert.push(res);
        convert.push('\n')
    }
    return convert;
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

    return OptimalPlayTree.createRoot()
        .addWords(words).getAllPlays()
        .filter(({ stats }) => stats.isWinAlwaysPossible)
        .sort((a, b) => b.stats.winToPathsRatio - a.stats.winToPathsRatio)
}




function initialize() {
    return class Node {

        static createRoot() {
            return new Node('', 0);
        }

        get isLeaf() {
            return this.nodes === null;
        }

        constructor(val, player) {
            this.player = (player + 1) % 2;
            this.nodes = null;
            this.val = val;
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
                nodes[char] = new Node(char, this.player);

            nodes[char].addWord(word, idx + 1);

            return this;
        }

        getAllPlays() {
            const results = [];
            for (const [char, node] of Object.entries(this.nodes)) {
                // isWinAlwaysPossible determines if player one can always force a win with optimal play regardless of the opponent's moves.
                const localRes = {
                    isWinAlwaysPossible: false,
                    possiblePaths: 0,
                    winningPaths: 0,
                    loosingPaths: 0,
                    winToPathsRatio: 0,
                    words: []
                };
                localRes.isWinAlwaysPossible = node.__getAllPlays(localRes);
                results.push({ letter: char, stats: localRes });
            }
            return results;
        }
        __getAllPlays(result, prefix = '') {

            if (this.isLeaf) {
                const isWin = this.player === 1;
                result.loosingPaths += isWin ? 0 : 1;
                result.winningPaths += isWin ? 1 : 0;
                result.winToPathsRatio = result.winningPaths / ++result.possiblePaths;
                result.words.push(prefix + this.val);

                return isWin;
            } else {

                let hasLoosingBranch = false;
                let hasWinningBranch = false;
                for (const [char, node] of Object.entries(this.nodes)) {
                    const isWin = node.__getAllPlays(result, prefix + this.val);

                    if (isWin) hasWinningBranch = true;
                    else hasLoosingBranch = true;
                }

                // player 1 => 0 ||| player 2 => 1
                // If it's the second players turn then optimal play is assumed which
                // will lead to player 2 choosing a branch resulting in a possible loss for player 1.
                const choosingPlayer = (this.player + 1) % 2;
                return (choosingPlayer === 1 && !hasLoosingBranch) ||
                    (choosingPlayer === 0 && hasWinningBranch)
            }
        }
    }
}