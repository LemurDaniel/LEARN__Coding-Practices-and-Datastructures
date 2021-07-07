const Inout = new (require("../Inout"))("DailyCode --- Traverse tree inorder");
const { BinaryTree } = require("../datastructures/bTree");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by LinkedIn:

    Given a binary tree, perform an in-order traversal both recursively and iteratively.

    class Node:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


    def inorder(node):
    # Fill this in.

    def inorder_iterative(node):
    # Fill this in.

    #     12
    #    /  \
    #   6    4
    #  / \   / \
    # 2   3 7   8
    n = Node(12, Node(6, Node(2), Node(3)), Node(4, Node(7), Node(8)))

    inorder(n)
    # 2 6 3 12 7 4 8

    inorder_iterative(n)
    # 2 6 3 12 7 4 8


*/

Inout.push('&BT% 12,6,$2,$3,4,$7,$8', '&AR 2,6,3,12,7,4,8');


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


BinaryTree.Node.prototype.inorder_recursive = function (list = []) {

    if (this.left) inorder_recursive_static(this.left, list);    // Left
    list.push(this.val);                                        // Root
    if (this.right) inorder_recursive_static(this.right, list);  // Right

    return list;
}
Inout.solvers = [inorder_recursive_static, inorder_recursive_prototype, inorder_iteratvie, tree => tree.traverse(BinaryTree.TraverseType.IN_ORDER)];
Inout.solve();


function inorder_recursive_prototype(tree) {
    return tree.root.inorder_recursive();
}

function inorder_recursive_static(node, list = []) {
    if (node instanceof BinaryTree) return inorder_recursive_static(node.root);

    if (node.left) inorder_recursive_static(node.left, list);          // Left
    list.push(node.val);                                        // Root
    if (node.right) inorder_recursive_static(node.right, list);        // Right

    return list;
}


function inorder_iteratvie(tree) {


    const stack = [];
    let node = tree.root;
    const list = [];

    while (node || stack.length > 0) {

        if (!node) {
            node = stack.pop();
            list.push(node.val);
            node = node.right;
        } else {
            stack.push(node);
            node = node.left;
        }
    }

    return list;
}
