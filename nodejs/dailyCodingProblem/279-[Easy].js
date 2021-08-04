const Inout = new (require("../Inout"))("Daily Coding Problem --- Construct all possible binary trees");
const { BinaryTree } = require("../datastructures/bTree");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Amazon.

    Given an integer N, construct all possible binary search trees with N nodes.

*/

Inout.result_Converter = arg => arg.map(v => BinaryTree.FromNode(v).toString() + '\n');

Inout.push(2, Inout.static.None);
Inout.push(3, Inout.static.None);
Inout.push(4, Inout.static.None);
Inout.push(5, Inout.static.None);

Inout.solvers = [constructBSearchTrees]
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


// Constructs all binary subtrees in between a specific range.
function constructTree(start, end) {

    if (start > end) return [null];

    const allTrees = [];
    for (let i = start; i <= end; i++) {

        // Construct all left and right subtrees for a specific pivot.
        // For example range 1-3 and Pivot 2, generates all left and right subtrees for root 2.
        // The same logic is applied on all subtrees recursivley.
        const leftSubtrees = constructTree(start, i - 1);
        const rightSubtrees = constructTree(i + 1, end);

        for (const left of leftSubtrees) {
            for (const right of rightSubtrees) {

                // Left subtree gets reused as part of several trees.
                // Can be copied to make all of them unique.
                const root = new BinaryTree.Node(i);
                root.right = right;
                root.left = left;
                allTrees.push(root);
            }
        }
    }

    return allTrees;
}

function constructBSearchTrees(n) {
    return constructTree(1, n);
}