const Inout = new (require('../Inout'))('DailyCode --- Find Subtree');
const Tree = new require('../datastructures/bTree')

/*

        Hi, here's your problem today. This problem was recently asked by Apple:

        Given 2 binary trees t and s, find if s has an equal subtree in t, where the structure and the values are the same. Return True if it exists, otherwise return False.

        Here's some starter code and an example:

        class Node:
        def __init__(self, value, left=None, right=None):
            self.value = value
            self.left = left
            self.right = right

        def __repr__(self):
            return f"(Value: {self.value} Left: {self.left} Right: {self.right})"

        def find_subtree(s, t):
        # Fill this in.

        t3 = Node(4, Node(3), Node(2))
        t2 = Node(5, Node(4), Node(-1))
        t = Node(1, t2, t3)

        s = Node(4, Node(3), Node(2))
        """
        Tree t:
             1
            / \
           4   5 
          / \ / \
         3  2 4 -1

        Tree s:
           4 
          / \
         3   2 
        """

        print(find_subtree(s, t))
        # True



        ///// Assumption ////
        following case evaluates to true as well

        Tree t:
             1
            / \
           4   5 
          / \ / \
         3  2 4 -1
        /
       5

        Tree s:
           4 
          / \
         3   2 
*/

Inout.push(
    { tree: '&BT 1,4,3,/,/,2,/,/,5,4,/,/,-1', subtree: '&BT 4,3,/,/,2' },
    true
);
Inout.push(
    { tree: '&BT 1,4,3,5,/,/,/,2,/,/,5,4,/,/,-1', subtree: '&BT 4,3,/,/,2' },
    true
);
Inout.push(
    { tree: '&BT 1,4,5,/,/,2,/,/,5,4,/,/,-1', subtree: '&BT 4,3,/,/,2' },
    false
);

Inout.solvers = [find_subtree];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


// Find subtree
function find_subtree(tree, subtree) {

    // initialize variables
    let node = tree.root;
    let sub_root = subtree.root;
    let stack = [tree.root];

    // Preorder traverse main tree
    while (stack.length > 0) {

        if (node) {

            // if a node value of the main tree matches the root of the subtree,
            // call another method to check whether the complete subtree exists in 
            // the main tree or not.
            if (node.val == sub_root.val &&
                Check_for_subtree(node, sub_root)) return true;

            // push current node to stack and move down the left node in preorder fashion (Root => Left => Right)
            stack.push(node);
            node = node.left;
        } else
            // if node is null, jump to the right node of the previous parents
            node = stack.pop().right;

    }

    // return false when no matching subtree is found
    return false;
}

// Submethod for checking whether the subtree exists at the current node of the whole tree
function Check_for_subtree(node, sub_node) {

    // Preorder Traverse both tree using stacks
    let stack = [sub_node];
    let stack2 = [node];

    while (stack.length > 0) {

        if (sub_node) {
            // When unmatching nodes are found return false
            if (!node || node.val != sub_node.val) return false;

            // Push both nodes to their stack and traverse to the left
            stack.push(sub_node);
            stack2.push(node);
            sub_node = sub_node.left;
            node = node.left;

        } else {
            // if subnode is null, jump to the right node of the previous parents
            // the main tree can still have left nodes to go, but the method only
            // considers the structure of the target subtree
            sub_node = stack.pop().right;
            node = stack2.pop().right;
        }

    }

    // if all nodes match each other, return true
    return true;
}
