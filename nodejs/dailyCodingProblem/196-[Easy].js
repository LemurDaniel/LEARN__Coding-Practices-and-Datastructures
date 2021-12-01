const Inout = new (require ('../Inout'))('Daily Coding Problem --- Find the most frequent subtree sum');
const { BinaryTree } = require('../datastructures/bTree');
const { NodeQueue } = require('../datastructures/queue');
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Apple.

    Given the root of a binary tree, find the most frequent subtree sum. The subtree sum of a node is the sum of all values under a node, including the node itself.

    For example, given the following tree:

      5
     / \
    2  -5
    Return 2 as it occurs twice: once as the left leaf, and once as the sum of 2 + 5 - 5.

*/

Inout.result_comparer = (arg, arg2) => arg2.sum = arg;
Inout.push('&BT %5,$2,-5', 2);


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

BinaryTree.prototype.subtree_sum_recursive = function() {
    const dict = {};
    this.root.subtree_sum_full_recursive(dict);
    return { sum: dict.mf, frequence: dict[dict.mf] };
}

BinaryTree.Node.prototype.subtree_sum_full_recursive = function(dict) {

    let sum = this.val;

    if(this.left) sum += this.left.subtree_sum_full_recursive(dict);
    if(this.right) sum += this.right.subtree_sum_full_recursive(dict);

    dict[sum] = (sum in dict) ? (dict[sum]+1) : 1;

    if(dict.mf == null) dict.mf = sum;
    if(dict[sum] > dict[dict.mf]) dict.mf = sum;

    return sum;
}


BinaryTree.Node.prototype.subtree_sum = function() {

    let sum = this.val;

    if(this.left) sum += this.left.subtree_sum();
    if(this.right) sum += this.right.subtree_sum();

    return sum;
}

Inout.solvers = [most_frequent_subtree_sum_recursive, most_frequent_subtree_sum_queue];
Inout.solve();

function most_frequent_subtree_sum_recursive(tree) {
    return tree.subtree_sum_recursive();
}

function most_frequent_subtree_sum_queue(tree) {

    let mf = 0;
    const dict  = { 0: 0 };
    const stack = [];
    let node = tree.root;

    while(node || stack.length > 0) {

        if(node) {
            const sum = node.subtree_sum();
            if(sum in dict) dict[sum]++;
            else dict[sum] = 1;
            if(dict[sum] > dict[mf]) mf = sum;

            stack.push(node);
            node = node.left;
        } else 
            node = stack.pop().right;

    }

    return { sum: mf, frequence: dict[mf] };
}
