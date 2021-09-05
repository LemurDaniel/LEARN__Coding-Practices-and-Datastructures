const Inout = new (require("../Inout"))("Daily Coding Problem --- Find ceil and floor in BST");
const { BinaryTree } = require("../datastructures/bTree");
const Helper = require("../Helper");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Oracle.

    Given a binary search tree, find the floor and ceiling of a given integer. 
    The floor is the highest element in the tree less than or equal to an integer, while the ceiling is the lowest element in the tree greater than or equal to an integer.

    If either value does not exist, return None.
*/

Inout.push({ tree: new BinaryTree(), key: 7 }, [-1, -1]);

Inout.push({ tree: '&BT 8', key: 7 }, [-1, 8]);
Inout.push({ tree: '&BT 8', key: 9 }, [8, -1]);

Inout.push({ tree: '&BT 8,4,$2,$6,12,$10,$14', key: 11 }, [10, 12]);
Inout.push({ tree: '&BT 8,4,$2,$6,12,$10,$14', key: 1 }, [-1, 2]);
Inout.push({ tree: '&BT 8,4,$2,$6,12,$10,$14', key: 6 }, [6, 6]);
Inout.push({ tree: '&BT 8,4,$2,$6,12,$10,$14', key: 15 }, [14, -1]);

BinaryTree.Node.prototype.floorCeil_recursive_prototype = floorCeil_recursive_prototype;


Inout.solvers = [floorCeil_recurive]
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function floorCeil_recursive_prototype(num, parentVal = -1) {

    if (this.val === num)
        return [num, num];

    if (num < this.val) {

        if (this.left)
            return this.left.floorCeil_recursive_prototype(num, this.val);

        ///  If left is null and parent is smaller, then we are on the right node of the parent.
        // Therefore the biggest floor is the parent and the smallest ceil is this node.
        else if (num > parentVal)
            return [parentVal, this.val];

        // else we are on the left node of the parent and the smallest ceil is this node.
        else
            return [-1, this.val];

    }

    else {

        if (this.right)
            return this.right.floorCeil_recursive_prototype(num, this.val);

        ///  If right is null and parent is bigger, then we are on the left node of the parent.
        // Therefore the biggest floor is the parent and the smallest ceil is this node.
        else if (num < parentVal)
            return [this.val, parentVal];

        // else we are on the right node of the parent and the biggest floor is this node.
        else
            return [this.val, -1];

    }

}


function floorCeil_recurive(tree, num) {
    if (tree.root === null) return [-1, -1];
    return tree.root.floorCeil_recursive_prototype(num);
}

