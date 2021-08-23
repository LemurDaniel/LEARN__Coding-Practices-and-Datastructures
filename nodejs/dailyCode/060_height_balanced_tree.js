const Inout = new (require('../Inout'))('DailyCode --- Find non duplicate number')
const Helper = require('../Helper');


/*

    Hi, here's your problem today. This problem was recently asked by Twitter:

    Given a tree, find if the binary tree is height balanced or not. A height balanced binary tree is a tree where every node's 2 subtree do not differ in height by more than 1.

    Here's some starter code:

    class Node:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

    def is_height_balanced(tree):
    # Fill this in.

    #     1
    #    / \
    #   2   3
    #  /
    # 4  
    n4 = Node(4)
    n3 = Node(3)
    n2 = Node(2, n4)
    n1 = Node(1, n2, n3)

    print(is_height_balanced(n1))
    # True

    #     1
    #    / 
    #   2   
    #  /
    # 4  
    n1 = Node(1, n2)
    print(is_height_balanced(n1))
    # False


                   1
                 /   \
                2      3
              /  \    /
             4    5  6
            /
           7 
           
           
                    1
                 /    \
                2      3
              /       /
             4       6
            /
           7      
*/

Inout.push('&BT 1,2,$4,/,3', true);
Inout.push('&BT 1,2,$4', false);
Inout.push('&BT 1,2,4,$7,/,$5,3,$6', true);
Inout.push('&BT 1,2,4,$7,/,/,3,$6', false);

Inout.solvers = [solver1, solver2];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/



function recursive_static(node, height = { val: 0 }) {

    // console.log(node)
    if (node === null) return true;

    // Wrapper objects to pass height by reference.
    const heightL = { val: 0 };
    const heightR = { val: 0 };

    // Return value determines if balanced.
    const left = recursive_static(node.left, heightL);
    const right = recursive_static(node.right, heightR);

    // Determine whether the difference in height is less than or equal to one.
    const balanced = Math.abs(heightL.val - heightR.val) <= 1;

    // Set the heigt of the value passed by reference to the furthest height of both subtrees.
    height.val = Math.max(heightL.val, heightR.val) + 1;

    // console.log('VAL  ' +  node.val + '   LEFT ' + heightL.val + '    RIGHT ' + heightR.val + ' BAL ' + balanced)

    // Check if both subtrees and the current subtree is balanced.
    return left && right && balanced;
}

function solver1(tree) {
    return recursive_static(tree.root);
}

function solver2(tree) {
    return tree.isHeightBalanced;
}