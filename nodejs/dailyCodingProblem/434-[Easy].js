const Inout = new (require("../Inout"))("Daily Coding Problem --- Find Floor and Ceiling of binary search tree");
const { BinaryTree } = require("../datastructures/bTree");
const { MinHeap, MaxHeap } = require("../datastructures/heap");;
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Oracle.

    Given a binary search tree, find the floor and ceiling of a given integer. The floor is the highest element in the tree less than or equal to an integer, while the ceiling is the lowest element in the tree greater than or equal to an integer.

    If either value does not exist, return None.


    Example from: https://www.geeksforgeeks.org/floor-and-ceil-from-a-bst/


              8
            /   \    
          4      12
        /  \    /  \
       2    6  10   14

        Key: 11  Floor: 10  Ceil: 12
        Key: 1   Floor: -1  Ceil: 2
        Key: 6   Floor: 6   Ceil: 6
        Key: 15  Floor: 14  Ceil: -1

    
    Note:   
    - If there is no floor or ceil than their respective values become -1.
    - If the key itself exist, then the floor and ceil is euqal to the key itself.
    - If there is no right child when going right, the result is: floor=currentChild, ceil=-1
    - If there is no left child when going left, the result is: floor=-1, ceil=currentChild

*/


Inout.input_Converter = arg => Helper.default_Converter({ tree: arg[0], key: arg[1] })
Inout.output_stringConverter = arg => Helper.default_StringConverter({ Floor: arg[0], Ceil: arg[1] })

Inout.push(['&BT 8,4,$2,$6,12,$10,14', 11], [10, 12]);
Inout.push(['&BT 8,4,$2,$6,12,$10,14', 1], [-1, 2]);
Inout.push(['&BT 8,4,$2,$6,12,$10,14', 6], [6, 6]);
Inout.push(['&BT 8,4,$2,$6,12,$10,14', 15], [14, -1]);

Inout.solvers = [findCeilFloor_recursive, findCeilFloor_iterative];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function findCeilFloor_recursive(node, key, wrapper) {
    if (node instanceof BinaryTree)
        return findCeilFloor_recursive(node.root, key, [-1, -1]);

    // wrapper[0] ==> Floor, wrapper[1] ==> Ceil.
    if (node === null) return wrapper;
    if (node.val === key) return [key, key];

    // If node is smaller than the key, the ceil must be in the right subtree.
    if (node.val < key) {
        wrapper[0] = node.val // Set floor to current value.
        return findCeilFloor_recursive(node.right, key, wrapper);
    }

    // If node is bigger than the key, the floor must be in the left subtree.
    if (node.val > key) {
        wrapper[1] = node.val // Set ceil to current value.
        return findCeilFloor_recursive(node.left, key, wrapper);
    }
}





function findCeilFloor_iterative(tree, key) {

    const floorCeil = [-1, -1];
    let node = tree.root;

    while (node !== null) {
        if (node.val === key) return [key, key];

        // If node is smaller than the key, the ceil must be in the right subtree.
        if (node.val < key) {
            floorCeil[0] = node.val // Set floor to current value.
            node = node.right;
        }
        // If node is bigger than the key, the floor must be in the left subtree.
        else if (node.val > key) {
            floorCeil[1] = node.val // Set ceil to current value.
            node = node.left;
        }
        else
            return [key, key]
    }

    // wrapper[0] ==> Floor, wrapper[1] ==> Ceil.
    return floorCeil;

}
