const Inout = new (require ('../Inout'))('Daily Coding Problem --- Find Path with Minimum Sum');
const { BinaryTree } = require('../datastructures/bTree')

/*

    Good morning! Here's your coding interview problem for today.

    This question was asked by Apple.

    Given a binary tree, find a minimum path sum from root to a leaf.

    For example, the minimum path in this tree is [10, 5, 1, -1], which has sum 15.

    10
    /  \
    5    5
    \     \
     2    1
         /
       -1

*/

Inout.push('&BT %10,5,/,$2,5,/,1,-1', 15);

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

BinaryTree.Node.prototype.find_path_with_minimum_sum_recursive = function() {

    let left = this.left ? this.left.find_path_with_minimum_sum_recursive() : null;
    let right = this.right ? this.right.find_path_with_minimum_sum_recursive() : null;

    let min = (left && left <= right) ? left : right;

    return this.val + (min ?? 0);
}

function find_path_with_minimum_sum_recursive(tree) {
    return tree.root.find_path_with_minimum_sum_recursive();
}

Inout.solvers = [find_path_with_minimum_sum_recursive];
Inout.solve();