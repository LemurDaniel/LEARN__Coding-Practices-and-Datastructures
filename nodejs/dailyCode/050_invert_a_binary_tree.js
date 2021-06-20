const Inout = new (require("../Inout"))("DailyCode --- Invert a Binary Tree");
const { BinaryTree } = require("../datastructures/bTree");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Twitter:

    You are given the root of a binary tree. Invert the binary tree in place. That is, all left children should become right children, and all right children should become left children.

    Example:

            a
           / \
          b   c
         / \  /
        d   e f

    a,b,$d,$e,c,$f

    The inverted version of this tree is as follows:

             a
           /   \ 
          c      b 
          \     / \
           f   e  d

    a,c,/,$f,b,$e,$d

    Here is the function signature:

    class Node:
    def __init__(self, value):
        self.left = None
        self.right = None
        self.value = value
    def preorder(self):
        print self.value,
        if self.left: self.left.preorder()
        if self.right: self.right.preorder()

    def invert(node):
    # Fill this in.

    root = Node('a') 
    root.left = Node('b') 
    root.right = Node('c') 
    root.left.left = Node('d') 
    root.left.right = Node('e') 
    root.right.left = Node('f') 

    root.preorder()
    # a b d e c f 
    print "\n"
    invert(root)
    root.preorder()
    # a c f b e d

*/


Inout.push('&BT% a,b,$d,$e,c,$f', '&BT% a,c,/,$f,b,$e,$d')

Inout.solvers = [invert_recursive, invert_recursive_static, invert_iterative];

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

BinaryTree.Node.prototype.invert = function () {

    if(this.right) this.right.invert();
    if(this.left) this.left.invert();

    [this.left, this.right] = [this.right, this.left]
}
Inout.solve();

function invert_recursive(tree) {
    tree.root.invert();
}

function invert_recursive_static(node) {

    if(node instanceof BinaryTree) invert_recursive_static(node.root);

    if(node.left) invert_recursive_static(node.left);
    if(node.right) invert_recursive_static(node.right);

    [node.right, node.left] = [node.left, node.right];

}




function invert_iterative(tree) {

    const stack = [];
    let node = tree.root

    while(stack.length > 0 || node) {

        if(!node) {
            node = stack.pop();

            // Swap child nodes with the fancy destructuring syntax.
            [node.left, node.right] = [node.right, node.left];

            // Since the left and right node have been swaped 
            // it must now traverse down the left node, 
            // which was previously the right one.
            node = node.left;
        }
        else {
            stack.push(node)
            node = node.left;
        }

    }
}
