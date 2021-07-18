const Inout = new (require('../Inout'))('DailyCode --- Full binary tree')
const { BinaryTree } = require('../datastructures/bTree');


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

        # Given this tree:
    #      1
    #     / \ 
    #    2   3
    #   /   / \
    #  0   9   4
      /
    -1

    # We want a tree like:
    #     1
    #    / \ 
    #  -1   3
    #      / \
    #     9   4


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
Inout.push('&BT 1,2,0,$-1,/,/,3,$9,4', '&BT 1,$-1,3,$9,4');
Inout.push('&BT 0,1,3,/,$5,/,2,/,4,$6,$7', '&BT 0,$5,4,$6,$7')

// Prototype method needs to be added before calling solve.
BinaryTree.Node.prototype.fullBinaryTree_recursive = fullBinaryTree_recursive_prototype;

Inout.solvers = [fullBinaryTree_recursive, fullBinaryTree_recursive_static,
    fullBinaryTree_preorder_iterative, fullBinaryTree_postorder_iterative,
    fullBinaryTree_preorder_helper_iterative, fullBinaryTree_postorder_helper_iterative];
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


// Method 3 iterative preorder traversal.
function fullBinaryTree_preorder_iterative(tree) {

    const stack = [tree.root];

    let isLeft = true;
    let parent = tree.root;
    let node = tree.root.left;

    // Preorder traversal of the binary tree.
    while (node || stack.length > 0) {

        if (node === null) {

            // If node is null pop last node from stack, set it as parent and move to the right node of it.
            parent = stack.pop();
            node = parent.right;
            isLeft = false;
            continue;
        }
        
        const child = node.left ?? node.right;
        const isOneChildedNode =
            node.left === null && node.right !== null ||
            node.left !== null && node.right === null

        if (isOneChildedNode) {

            // If the current node is to be removed, 'isLeft' indicates
            // whether the right or left node of the parent needs to be reassigned
            if (isLeft) parent.left = child;
            else parent.right = child;

            // Since a childnode move up in the tree don't push to stack or change the parent variable, also keep the isLeft indicator to the same value.
            // The childnode will be processed next iteration and if it's also a onechilded node reassigned to the left or right of the same parent.
            node = child;

        } else {
            // Move forwad in preorder fashion and update all variables.
            stack.push(node);
            node = node.left;
            parent = node;
            isLeft = true;
        }

    }

}



// Method 4 iterative postorder traversal.
function fullBinaryTree_postorder_iterative(tree) {

    const stack = [];
    const postorder = [];
    let node = tree.root;

    // Preorder traversal in reverse (Root,right,left) of the binary tree.
    while (node || stack.length > 0) {

        if (node !== null) {
            stack.push(node);
            postorder.push(node);
            node = node.right;
        } else {
            node = stack.pop().left;
        }

    }

    while (postorder.length > 0) {

        const node = postorder.pop();
        const isOneChildedNode =
            node.left === null && node.right !== null ||
            node.left !== null && node.right === null

        if (isOneChildedNode) {
            const child = node.left ?? node.right;
            node.val = child.val;
            node.left = child.left;
            node.right = child.right;
        }

    }

}




// Helper method
function processNode(node) {
    if (node === null) return null;

    const isOneChilded =
        node.left === null && node.right !== null ||
        node.left !== null && node.right === null

    if (isOneChilded)
        return node.left ?? node.right;
    else
        return node;
}

// Method 5 iterative preorder traversal helper method.
function fullBinaryTree_preorder_helper_iterative(tree) {

    const stack = [];
    let node = tree.root;

    // Preorder traversal of the binary tree.
    while (node || stack.length > 0) {

        if (node === null) {
            node = stack.pop();
            node.left = processNode(node.left);
            node.right = processNode(node.right);
            node = node.right;
        } else {
            stack.push(node);
            node = node.left;
        }

    }

}


// Method 6 iterative postorder traversal helper method.
function fullBinaryTree_postorder_helper_iterative(tree) {

    const stack = [];
    const postorder = [];
    let node = tree.root;

     // Preorder traversal in reverse (Root,right,left) of the binary tree.
    while (node || stack.length > 0) {

        if (node !== null) {
            stack.push(node);
            postorder.push(node);
            node = node.right;
        } else {
            node = stack.pop().left;
        }

    }

    while (postorder.length > 0) {

        const node = postorder.pop();
        node.left = processNode(node.left);
        node.right = processNode(node.right);

    }

}