const Inout = new (require("../Inout"))("DailyCode --- Count Number of unival Subtrees");
const { BinaryTree } = require("../datastructures/bTree");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Microsoft:

    A unival tree is a tree where all the nodes have the same value. Given a binary tree, return the number of unival subtrees in the tree.

    For example, the following tree should return 5:

    0,$1,0,1,$1,$1,0

       0
      / \
     1   0
        / \
       1   0
     /  \
    1    1

    The 5 trees are:
    - The three single '1' leaf nodes. (+3)
    - The single '0' leaf node. (+1)
    - The [1, 1, 1] tree at the bottom. (+1)

    Here's a starting point:

    class Node(object):
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def count_unival_subtrees(root):
    # Fill this in.

    a = Node(0)
    a.left = Node(1)
    a.right = Node(0)
    a.right.left = Node(1)
    a.right.right = Node(0)
    a.right.left.left = Node(1)
    a.right.left.right = Node(1)

    print count_unival_subtrees(a)
    # 5


*/


Inout.push('&BT% 0,$1,0,1,$1,$1,0', 5)


Inout.solvers = [countUnivalSubtrees_recursive];


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


BinaryTree.Node.prototype.countUnivalSubtrees = function (topFunctionCall = true) {

    if(this.isLeaf()) return 1;

    const leftRes = this.left ? this.left.countUnivalSubtrees(false) : 0;
    const rightRes = this.right ? this.right.countUnivalSubtrees(false) : 0;

    const isUnvial = leftRes > 0 && rightRes > 0 && 
                     this.left.val === this.val && 
                     this.right.val === this.val;
    

    const res = Math.abs(leftRes) + Math.abs(rightRes) + (isUnvial ? 1 : 0);
    
    // Subtrees that aren't unival return a negative result.
    return (isUnvial || topFunctionCall) ? res : -res;
}
Inout.solve();

function countUnivalSubtrees_recursive(tree) {
    return tree.root.countUnivalSubtrees();
}