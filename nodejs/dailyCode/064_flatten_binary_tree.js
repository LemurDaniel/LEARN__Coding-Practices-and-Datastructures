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
Inout.push('&BT 1,2,$5,$7,3,4,/,$9,2,/,8', '&BT 1,/,2,/,5,/,7,/,3,/,4,/,9,/,2,/,8');

// Assign prototype methods before calling solve
BinaryTree.Node.prototype.flatten_recursive = flatten_recursive_prototype;

Inout.solvers = [flatten_static_recursive, flatten_recursive];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


// Assumes no circular dependencies in Input.

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

// Call prototype methods.
function flatten_recursive(tree) {
    tree.root.flatten_recursive();
}
