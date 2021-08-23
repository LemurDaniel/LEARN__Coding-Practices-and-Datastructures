const Inout = new (require("../Inout"))("Daily Coding Problem --- Height balanced binary tree");
const { BinarySearchTree, BinaryTree } = require("../datastructures/bTree");
const Helper = require("../Helper");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Etsy.

    Given a sorted array, convert it into a height-balanced binary search tree.

*/

function checkIsHeightBalanced(test, tree) {
    return tree.isHeightBalanced;
}

Inout.push('&AR 1,2,3', checkIsHeightBalanced);
Inout.push('&AR 1,2,3,4', checkIsHeightBalanced);
Inout.push('&AR 1,2,3,4,5,6,7', checkIsHeightBalanced);
Inout.push('&AR 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16', checkIsHeightBalanced);

Inout.solvers = [createHeightBalancedTree]

Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*

    The input array is sorted, which makes it absolutly easy.
    A binarysearchtree consists of all left node being smaller and all right nodes being greater than the value of the current node.
    The middle of the array fullfills this requirement with all previous values being less and all following greater than, 
    which means it suits perfectly for the root of our tree.

    If we then consider the midvalue as our pivot we can do the same thing for the lower and upper range around our pivot,
    to create the left and right node of the root.

    For the subsequent left and right node of each subnode we can do the same thing.
    Consider the node as a pivot and take the mid value of both ranges around the pivot as the left and the right node.

*/

function getNodeOfRange(array, start = 0, end = null) {

    if(end === null) end = array.length - 1;

    // Return null if there are no subarrays around the pivot.
    if(start > end) return null;

    // Assign mid of current range as value of the new node.
    const mid = start + Math.round( (end - start) / 2);
    const node = new BinarySearchTree.Node(array[mid]);

    // The mid values of the upper and lower range around the pivot value mid,
    // will then became the left and right childnode of the current parentnode.
    node.left = getNodeOfRange(array, start, mid-1);
    node.right = getNodeOfRange(array, mid+1, end);

    return node;
}

function createHeightBalancedTree(sortedArray) {
    
    const tree = new BinarySearchTree();
    tree.root = getNodeOfRange(sortedArray);

    return tree;
}