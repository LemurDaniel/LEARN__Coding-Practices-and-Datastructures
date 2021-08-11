const Inout = new (require("../Inout"))("Daily Coding Problem --- Phytagorean triplet");
const { NodeQueue } = require("../datastructures/queue");

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Yext.

    Two nodes in a binary tree can be called cousins if they are on the same level of the tree but have different parents. 
    For example, in the following diagram 4 and 6 are cousins.

        1
       / \
      2   3
     / \   \
    4   5   6
    Given a binary tree and a particular node, find all cousins of that node.

*/

Inout.input_Copy = arg => arg;
Inout.push({ tree: '&BT *1,2,$4,$5,3,/,6', node: '&RF input.tree.node' }, '&AR 1');
Inout.push({ tree: '&BT 1,2,*$4,$5,3,/,6', node: '&RF input.tree.node' }, '&AR 4,6');
Inout.push({ tree: '&BT 1,2,4,$8,$9,5,$10,$11,3,6,$12,$13,7,$14,*$15', node: '&RF input.tree.node' }, '&AR 15,8,9,10,11,12,13');

Inout.solvers = [findAllCousins_levelOrder]
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function findAllCousins_levelOrder(tree, node) {

    const q = new NodeQueue();
    q.enqueue(tree.root);
    q.enqueue(null)

    const cousins = [node.val];
    let parent = null;

    while (q.count > 1) {

        const n = q.dequeue();

        // Enqueue nodes of next level and search for parent.

        if (n.left === node || n.right === node)
            parent = n;
        else {
            if (n.left)
                q.enqueue(n.left);
            if (n.right)
                q.enqueue(n.right);
        }

        if (q.peek() === null) {
            q.enqueue(q.dequeue());
            if (parent !== null) break;
        }
    }

    // All nodes of the same level of another parent are now left in the queue.
    // The last element of the queue will always be null.
    while (q.count > 1)
        cousins.push(q.dequeue().val)

    return cousins;
}


/// Todo: wrapper object for childnodes.