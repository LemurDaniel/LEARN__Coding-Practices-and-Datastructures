const { BinaryTree } = require('../datastructures/bTree');

const Inout = new (require('../Inout'))('DailyCode --- Full binary tree')

/*

    Hi, here's your problem today. This problem was recently asked by Google:

    Given a binary tree, remove the nodes in which there is only 1 child, so that the binary tree is a full binary tree.

    So leaf nodes with no children should be kept, and nodes with 2 children should be kept as well.

    Here's a starting point:

    from collections import deque

    class Node(object):
    def __init__(self, value, left=None, right=None):
        self.left = left
        self.right = right
        self.value = value
    def __str__(self):
        q = deque()
        q.append(self)
        result = ''
        while len(q):
        num = len(q)
        while num > 0:
            n = q.popleft()
            result += str(n.value)
            if n.left:
            q.append(n.left)
            if n.right:
            q.append(n.right)
            num = num - 1
        if len(q):
            result += "\n"

        return result

    def fullBinaryTree(node):
    # Fill this in.

    # Given this tree:
    #     1
    #    / \ 
    #   2   3
    #  /   / \
    # 0   9   4

    # We want a tree like:
    #     1
    #    / \ 
    #   0   3
    #      / \
    #     9   4

    tree = Node(1)
    tree.left = Node(2)
    tree.right = Node(3)
    tree.right.right = Node(4)
    tree.right.left = Node(9)
    tree.left.left = Node(0)
    print fullBinaryTree(tree)
    # 1
    # 03
    # 94

             0
          /     \
        1         2
      /            \
    3                4
     \             /   \
       5          6     7
    You should convert it to:

            0
          /   \
         5     4
              /  \
             6    7
*/

Inout.push('&BT 1,2,$0,/,3,$9,4', '&BT 1,$0,3,$9,4');
Inout.push('&BT 0,1,3,/,$5,/,2,/,4,$6,$7', '&BT 0,$5,4,$6,$7')

// Prototype method needs to be added before calling solve.
BinaryTree.Node.prototype.fullBinaryTree_recursive = fullBinaryTree_recursive_prototype;

Inout.solvers = [fullBinaryTree_recursive_static, fullBinaryTree_recursive];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

// Prototype method for binary tree nodes.
function fullBinaryTree_recursive_prototype() {

    // Recursively call method on childnodes.
    if (this.left) this.left = this.left.fullBinaryTree_recursive();
    if (this.right) this.right = this.right.fullBinaryTree_recursive();

    const isOneChildedNode =
        this.left === null && this.right !== null ||
        this.left !== null && this.right === null;

    // If the node has only one child then return the childnode,
    // thereby removing itself from the tree.
    if (isOneChildedNode)
        return this.left ?? this.right;
    // If the node is a Leaf or has two childnodes return itself again.
    else return this;
}


// Method 1 calls the prototype method recursively.
function fullBinaryTree_recursive(tree) {
    tree.root.fullBinaryTree_recursive();
}


// Method 2 calls itself recursively.
function fullBinaryTree_recursive_static(node) {

    if (node instanceof BinaryTree) {
        fullBinaryTree_recursive_static(node.root);
        return node;
    }

    // Return null if node is null.
    if (node === null) return null;

    // Recursively call method on child nodes.
    // The returned node will become the new child node.
    node.left = fullBinaryTree_recursive_static(node.left);
    node.right = fullBinaryTree_recursive_static(node.right);

    const isOneChildedNode =
        (node.left === null && node.right !== null) ||
        (node.left !== null && node.right === null)


    // If the node only has one child then return the child,
    // thereby removing the node from the tree.
    if (isOneChildedNode)
        return node.left ?? node.right;
    // If the node has no childs or two childs then return it again.
    else return node

}