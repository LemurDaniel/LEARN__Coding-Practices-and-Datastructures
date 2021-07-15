const Inout = new (require("../Inout"))("Daily Coding Problem --- Rearrange linked list");
const { NodeQueue } = require("../datastructures/queue");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Morgan Stanley.

    In Ancient Greece, it was common to write text with the first line going left to right, the second line going right to left, and continuing to go back and forth. This style was called "boustrophedon".

    Given a binary tree, write an algorithm to print the nodes in boustrophedon order.

    For example, given the following tree:

           1
        /     \
      2          3
     / \        / \
    4   5      6   7
    You should return [1, 3, 2, 4, 5, 6, 7].


    Same as Binary Tree ZigZag levelorder:   ../dailyCode/045_binary_tree_zigZag.js

*/

Inout.push('&BT 1,2,$4,$5,3,$6,$7', '&AR 1,3,2,4,5,6,7');
Inout.push('&BT 1,2,4,$8,$9,5,$10,$11,3,6,$12,$13,7,$14,$15', '&AR 1,3,2,4,5,6,7,15,14,13,12,11,10,9,8');

Inout.solvers = [printBoustrophedon];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function printBoustrophedon(tree) {

    let reverse = false;
    const result = [];
    const temp = [];

    const queue = new NodeQueue();
    queue.enqueue(tree.root);
    queue.enqueue(null)

    while (queue.count > 1) {

        const node = queue.dequeue();

        if (node.left) queue.enqueue(node.left);
        if (node.right) queue.enqueue(node.right);

        if (reverse)
            temp.push(node.val);
        else
            result.push(node.val);

        if (queue.peek() === null) {
            while (temp.length > 0)
                result.push(temp.pop());

            queue.dequeue();
            queue.enqueue(null)
            reverse = !reverse;
        }
    }

    return result;
}

