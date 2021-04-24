const { BinaryTree } = require('../../datastructures/bTree');

const Inout = new (require ('../../Inout'))('DailyCode --- Same Tree - [difficulty: Easy]');

/*
    Given two binary trees, write a function to check if they are equal or not.

    Two binary trees are considered equal if they are structurally identical and the nodes
    have the same value.

             1
            / \
           4   5 
          / \ / \
         3  2 4 -1
        /
       5

             1
            / \
           4   5 
          / \ / \
         3  2 5 -1
        /
       5
*/

Inout.push( { 
    tree_1: '&BT %1,4,3,$5,$2,5,$4,-1',
    tree_2: '&BT %1,4,3,$5,$2,5,$4,-1' }, true );

Inout.push( { 
    tree_1: '&BT %1,4,3,$5,$2,5,$5,-1',
    tree_2: '&BT %1,4,3,$5,$2,5,$4,-1' }, false );

Inout.solvers = [same_tree_recursive, same_tree_iterative];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function same_tree_recursive (node_1, node_2) {
    if(node_1 instanceof BinaryTree) return same_tree_recursive(node_1.root, node_2.root);

    // if both nodes are null they are equal
    if( !node_1 && !node_2 ) return true;

    // if one node is null and the other isn't they are not equal
    if( !node_1 || !node_2 ) return false;

    if( node_1.val != node_2.val ) return false;

    return same_tree_recursive(node_1.left, node_2.left) &&
        same_tree_recursive(node_1.right, node_2.right);
}

function same_tree_iterative (tree_1, tree_2) {
    
    let node_1 = tree_1.root;
    let node_2 = tree_2.root;

    const stack_1 = [node_1];
    const stack_2 = [node_2];

    while(stack_1.length > 0) {

        if( !node_1 && !node_2 ) {
            node_1 = stack_1.pop().right;
            node_2 = stack_2.pop().right;
            continue;
        }

        // return false when only one node is null
        if( !node_1 || !node_2 ) return false;

        if(node_1.val != node_2.val) return false;

        stack_1.push(node_1);
        stack_2.push(node_2);

        node_1 = node_1.left;
        node_2 = node_2.left;
    }

    return stack_1.length == stack_2.length;
}