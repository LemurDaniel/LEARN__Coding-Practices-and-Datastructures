const Inout = new (require('../Inout'))('DailyCode --- Swap every two nodes in a Linked List');
const LinkedList = require('../datastructures/linkedList');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Google.

    Given the head of a singly linked list, swap every two nodes and return its head.

    For example, given 1 -> 2 -> 3 -> 4, return 2 -> 1 -> 4 -> 3.

*/

Inout.push('&LL 1234', '&LL 2143');
Inout.push('&LL 12345', '&LL 21435');

Inout.solvers = [Swap_values_iterative, Swap_nodes_iterative, Swap_values_recursive]


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function Swap_values_iterative(list) {

    let prev = list.head;
    let curr = null;

    while (prev && prev.next) {

        curr = prev.next;

        // swap values
        const temp = prev.val;
        prev.val = curr.val;
        curr.val = temp;

        // move to next pair of nodes
        prev = curr.next;
    }

}

// 1 ==> 2 ==> 3 ==> 4 => 5
function Swap_nodes_iterative(list) {

    // pair of nodes that get swapped each iteration
    let prev = null;
    let curr = list.head;
    let next;

    if (curr.next) list.head = curr.next;

    while (curr && curr.next) {

        next = curr.next;

        //   2  ==>   3  ==>  4 ==> 5
        // prev ==> curr ==> next
        if (prev) prev.next = next; // 2 ==> 4 ==> 5

        const temp = next.next; // 5
        next.next = curr; // 2 ==> 4 ==> 3 ==> (NULL)
        curr.next = temp; // 2 ==> 4 ==> 3 ==> 5

        // move previous pointer forward to next pair of nodes
        prev = curr; // (3) ==> 5
        curr = prev.next; // 5
    }

    list.tail = curr ?? prev;
}


function Swap_values_recursive(list) {
    if (list.head) list.head.Swap_values_recursive();
}

// recursive prototype method for all nodes of the linked list
LinkedList.Node.prototype.Swap_values_recursive = function (prev_node) {

    if (!prev_node && this.next)
        return this.next.Swap_values_recursive(this);

    // swap values
    const temp = this.val;
    this.val = prev_node.val;
    prev_node.val = temp;

    if (this.next && this.next.next)
        this.next.next.Swap_values_recursive(this.next);
}

// TODO
function Swap_nodes_recursive(list) {
    if (list.head) list.head.Swap_values_recursive();
}



Inout.solve();