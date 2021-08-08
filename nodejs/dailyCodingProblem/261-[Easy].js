const Inout = new (require("../Inout"))("Daily Coding Problem --- Construct huffman tree");
const { BinaryTree } = require("../datastructures/bTree");
const HuffmanTree = require("../datastructures/huffmanTree");
const { PriorityNodeQueue } = require("../datastructures/queue");
const { MergeSort } = require("../Helper");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Amazon.

    Huffman coding is a method of encoding characters based on their frequency. 
    Each letter is assigned a variable-length binary string, such as 0101 or 111110, where shorter lengths correspond to more common letters. 
    To accomplish this, a binary tree is built such that the path from the root to any leaf uniquely maps to a character. 
    When traversing the path, descending to a left child corresponds to a 0 in the prefix, while descending right corresponds to 1.

    Here is an example tree (note that only the leaf nodes have letters):

           *
        /     \
       *       *
      / \     / \
     *   a   t   *
    /             \
   c               s

    With this encoding, cats would be represented as 0000110111.

    Given a dictionary of character frequencies, build a Huffman tree, and use it to determine a mapping between characters and their encoded binary strings.

*/

Inout.result_Converter = arg => ({ HuffmanTree: arg, HuffmanCodes: arg.getHuffmanCodes() })

Inout.push('CCCAATTSS', Inout.static.None)
Inout.push('CCCCCAAATTSS', Inout.static.None)
Inout.push({
    text: 'cats', frequencies: {
        c: 0.15,
        s: 0.15,
        a: 0.35,
        t: 0.35,
    }
}, Inout.static.None);

Inout.solvers = [buildHuffmanTree]
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


// Not the nicest code, but works.
function buildHuffmanTree(text, frequencies = null) {

    if (frequencies === null || Object.keys(frequencies).length === 0) {

        frequencies = {};
        for (const char of text) {
            if (char in frequencies)
                frequencies[char]++;
            else
                frequencies[char] = 1;
        }

        for (const key of Object.keys(frequencies))
            frequencies[key] = frequencies[key] / text.length;

    }

    const sorted = MergeSort.sort(Object.entries(frequencies), (a, b) => a[1] - b[1])
    ////////////////////////////////////////////////////////////////////

    const prioQueue = new PriorityNodeQueue(null);
    while (sorted.length > 0) {
        const [char, freq] = sorted.pop();
        prioQueue.enqueue(new HuffmanTree.Node(char, freq), 1 - freq)
    }


    while (prioQueue.count > 1) {

        const n1 = prioQueue.deleteHighestPriority();
        const n2 = prioQueue.deleteHighestPriority();

        const summedFreq = n1.freq + n2.freq;

        const node = new HuffmanTree.Node(HuffmanTree.Empty, summedFreq);
        node.left = n1.freq > n2.freq ? n2 : n1;
        node.right = n1.freq > n2.freq ? n1 : n2;

        prioQueue.enqueue(node, 1 - summedFreq)
    }


    const huffManTree = new HuffmanTree();
    huffManTree.root = prioQueue.deleteHighestPriority();

    return huffManTree;
}




// TODO: better solution https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/