const Inout = new (require("../Inout"))("DailyCode --- Autocompletion");
const { BinaryTree } = require("../datastructures/bTree");
const { Trie }  = require('../datastructures/tree') 
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Facebook:

    Given two binary trees that are duplicates of one another, and given a node in one tree, find that correponding node in the second tree.

    For instance, in the tree below, we're looking for Node #4.

    For this problem, you can assume that:
    - There can be duplicate values in the tree (so comparing node1.value == node2.value isn't going to work).

    Can you solve this both recursively and iteratively?

    class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def findNode(a, b, node):
    # Fill this in.

    #  1
    # / \
    #2   3
    #   / \
    #  4*  5
    a = Node(1)
    a.left = Node(2)
    a.right = Node(3)
    a.right.left = Node(4)
    a.right.right = Node(5)

    b = Node(1)
    b.left = Node(2)
    b.right = Node(3)
    b.right.left = Node(4)
    b.right.right = Node(5)

    print(findNode(a, b, a.right.left))
    # 4

*/

Inout.push( {
    tree:   '&BT% 1,$2,3,*$4',
    clone:  '&BT% 1,$2,3,*$4',
    node: '&RF input.tree.node'
}, '&RF input.clone.node');

Inout.input_copy_method = arg => arg;
Inout.solvers = [find_node_recursive];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function find_node_recursive(tree, clone, node) {
    if(!tree || !clone) return null;
    if(tree instanceof BinaryTree) 
        return find_node_recursive(tree.root, clone.root, node);
    

    if(node == tree) return clone;

    const node_right = find_node_recursive(tree.right, clone.right, node);
    const node_left  = find_node_recursive(tree.left , clone.left , node);

    return node_right ?? node_left ?? null;
}