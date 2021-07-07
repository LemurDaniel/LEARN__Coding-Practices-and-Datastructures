const Inout = new (require("../Inout"))("DailyCode --- Remove duplicates from Linked List");
const LinkedList = require("../datastructures/linkedList");
const { NodeQueue } = require("../datastructures/queue");
const Helper = require('../Helper');

/*
Hi, here's your problem today. This problem was recently asked by Apple:

Given a binary tree, return the list of node values in zigzag order traversal. Here's an example

# Input:
#         1
#       /   \
#      2     3
#     / \   / \
#    4   5 6   7
#
# Output: [1, 3, 2, 4, 5, 6, 7]

Here's some starter code

class Node:
  def __init__(self, value, left=None, right=None):
    self.value = value
    self.left = left
    self.right = right

def zigzag_order(tree):
  # Fill this in.

n4 = Node(4)
n5 = Node(5)
n6 = Node(6)
n7 = Node(7)
n2 = Node(2, n4, n5)
n3 = Node(3, n6, n7)
n1 = Node(1, n2, n3)

print(zigzag_order(n1))
# [1, 3, 2, 4, 5, 6, 7]


                #           1
                #       /       \
                #      2           3
                #     / \        /   \
                #    4   5      6     7
                   / \  / \    / \   / \
                  8  9 10 11  12 13 14  15


       1,3,2,4,5,6,7,15,14,13,12,11,10,9,8

*/

Inout.push('&BT 1,2,$4,$5,3,$6,$7', '&AR 1,3,2,4,5,6,7');
Inout.push('&BT 1,2,4,$8,$9,5,$10,$11,3,6,$12,$13,7,$14,$15', '&AR 1,3,2,4,5,6,7,15,14,13,12,11,10,9,8');

Inout.solvers = [zigZag_levelorder_reverse_list, zigZag_levelorder_two_queues];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function zigZag_levelorder_two_queues(tree) {

    const zig = new NodeQueue();
    const zag = new NodeQueue();

    zig.enqueue(tree.root)
    zag.enqueue(tree.root)
    zig.enqueue(null);
    zag.enqueue(null);


    const list = [];
    let zig_or_zag = true;

    while (zig.count > 1) {

        const node_zig = zig.dequeue();
        const node_zag = zag.dequeue();

        if (node_zig.left) zig.enqueue(node_zig.left);
        if (node_zig.right) zig.enqueue(node_zig.right);

        if (node_zag.right) zag.enqueue(node_zag.right);
        if (node_zag.left) zag.enqueue(node_zag.left);

        list.push(zig_or_zag ? node_zig.val : node_zag.val);

        if (zig.peek() == null) {
            zig.enqueue(zig.dequeue());
            zag.enqueue(zag.dequeue());
            zig_or_zag = !zig_or_zag;
        }

    }

    return list;

}

function zigZag_levelorder_reverse_list(tree) {

    const q = new NodeQueue();
    q.enqueue(tree.root)
    q.enqueue(null);


    const list = [];
    const temp = [];
    let zig_or_zag = true;

    while (q.count > 1) {

        const node = q.dequeue();

        if (node.left) q.enqueue(node.left);
        if (node.right) q.enqueue(node.right);

        if (zig_or_zag) list.push(node.val);
        else temp.push(node.val);

        if (q.peek() == null) {
            q.enqueue(q.dequeue());
            zig_or_zag = !zig_or_zag;
            while (temp.length > 0) list.push(temp.pop());
        }

    }

    return list;

}

