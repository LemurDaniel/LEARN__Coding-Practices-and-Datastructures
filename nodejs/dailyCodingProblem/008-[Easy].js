const { count } = require('console');
const { BinaryTree } = require('../datastructures/bTree');
const Helper = require('../Helper');

const Inout = new (require('../Inout'))('Daily Coding Problem --- Count number of unival subtrees')

/*

        Good morning! Here's your coding interview problem for today.

        This problem was asked by Google.

        A unival tree (which stands for "universal value") is a tree where all nodes under it have the same value.

        Given the root to a binary tree, count the number of unival subtrees.

        For example, the following tree has 5 unival subtrees:

              0
             / \
            1   0
               / \
              1   0
             / \
            1   1


*/



Inout.push('&BT 0,$1,0,1,$1,$1,0', 5)

Inout.solvers = [unvialSubtrees_recursive_static];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function unvialSubtrees_recursive_static(node, isUnvial = { unival: false, value: null }) {

    if (node instanceof BinaryTree)
        return unvialSubtrees_recursive_static(node.root);

    if (node === null || node === undefined) return 0;

    const leftUnival = { unival: true, value: node.val };
    const rightUnival = { unival: true, value: node.val };

    let count = 0;
    count += unvialSubtrees_recursive_static(node.left, leftUnival);
    count += unvialSubtrees_recursive_static(node.right, rightUnival);

    isUnvial.value = node.val;
    isUnvial.unival =
        node.val === rightUnival.value &&
        node.val === leftUnival.value &&
        leftUnival.unival && rightUnival.unival;

    return count + (isUnvial.unival ? 1 : 0);
}