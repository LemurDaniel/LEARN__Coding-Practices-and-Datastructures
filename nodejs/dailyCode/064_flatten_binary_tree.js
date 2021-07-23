const Inout = new (require('../Inout'))('DailyCode --- Find non duplicate number')
const { BinaryTree } = require('../datastructures/bTree');


/*

    Hi, here's your problem today. This problem was recently asked by Amazon:

    Given a binary tree, flatten the binary tree using inorder traversal. Instead of creating a new list, reuse the nodes, where the list is represented by following each right child. As such the root should always be the first element in the list so you do not need to return anything in the implementation, just rearrange the nodes such that following the right child will give us the list.

    Here's an example and some starter code.

    class Node:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

    def __repr__(self):
        return f"({self.value}, {self.left}, {self.right})"

    def flatten_bst(root):
    # Fill this in.
    
    n5 = Node(5)
    n4 = Node(4)
    n3 = Node(3, n4)
    n2 = Node(2, n5)
    n1 = Node(1, n2, n3)

    #      1
    #    /   \
    #   2     3
    #  /     /
    # 5     4

    flatten_bst(n1)
    print(n1)

    # n1 should now look like
    #   1
    #    \
    #     2
    #      \
    #       5
    #        \
    #         3
    #          \
    #           4

*/

Inout.output_Converter = (out, { input }) => {
    return BinaryTree.GenerateIntPreorderFromString(
        input.traverse(BinaryTree.TraverseType.PRE_ORDER).join(',/,')
    )
}

Inout.push('&BT 1,2,$5,/,3,$4', null);
Inout.push('&BT 1,2,$5,$7,3,4,/,$9,2,/,8', null);

// Assign prototype methods before calling solve
BinaryTree.Node.prototype.flatten_recursive = flatten_recursive_prototype;
BinaryTree.Node.prototype.flatten_recursive2 = flatten_recursive2_prototype;

Inout.solvers = [
    flatten_static_recursive, flatten_static_recursive2,
    flatten_recursive, flatten_recursive2,
    obnoxiousWay_iterative
];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function flatten_static_recursive(node, prevRight) {

    if (node instanceof BinaryTree)
        return flatten_static_recursive(node.root);

    if (node == null)
        return null;

    if (node.right == null)
        node.right = prevRight;
    else
        flatten_static_recursive(node.right, prevRight);

    if (node.left != null) {
        flatten_static_recursive(node.left, node.right);
        node.right = node.left;
        node.left = null;
    }

}


function flatten_static_recursive2(node, prevRight = null) {

    if (node instanceof BinaryTree) {
        flatten_static_recursive2(node.root);
        return null;
    }

    // Return the previous right subtree as the node, if the current node is null.
    // This ensure that any right subtree will eventually be assigned to a node with an empty right child.
    if (node === null) return prevRight;

    // Flatten the right subtree with the previous right subtree and aassign it to the right child.
    node.right = flatten_static_recursive2(node.right, prevRight); // <== The right subtree of the parent node.
    // Flatten the left subtree with the now flattened right subtree and assign it to the right child.
    node.right = flatten_static_recursive2(node.left, node.right);

    // Set left child to null and return itself.
    node.left = null;
    return node;
}


// prototype methods.
function flatten_recursive_prototype(prevRight) {

    if (this.right !== null)
        this.right.flatten_recursive(prevRight);
    else
        this.right = prevRight;

    if (this.left !== null) {
        this.left.flatten_recursive(this.right);
        this.right = this.left;
        this.left = null;
    }

}

function flatten_recursive2_prototype(prevRight = null) {

    // If right is not null then flatten it recursivley with the parent's right subtree else assign the parent's right subtree as the right node.
    this.right = this.right ? this.right.flatten_recursive2(prevRight) : prevRight;
    // If left is not null then flatten it recursivley with the right child else assign the right child as the right node.
    this.right = this.left ? this.left.flatten_recursive2(this.right) : this.right;

    // Set left child to null and return itself.
    this.left = null;
    return this;
}

// Call prototype methods.
function flatten_recursive(tree) {
    tree.root.flatten_recursive();
}
function flatten_recursive2(tree) {
    tree.root.flatten_recursive2();
}




function obnoxiousWay_iterative(tree) {

    const preorder = [];

    const stack = [];
    let node = tree.root;

    while (node || stack.length > 0) {

        if (node === null) {
            node = stack.pop().right;
        } else {
            preorder.push(node);
            stack.push(node);
            node = node.left;
        }

    }
    
    let prevNode = null;
    while (preorder.length > 0) {
        const node = preorder.pop();
        node.right = prevNode;
        node.left = null;
        prevNode = node;
    }

}