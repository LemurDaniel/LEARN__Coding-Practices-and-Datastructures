const Inout = new (require('../Inout'))('DailyCode --- Remove kth node from linked list')
const { BinaryTree } = require('../datastructures/bTree');
const LinkedList = require('../datastructures/linkedList');
const { CustomError } = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by AirBNB:

    You are given a singly linked list and an integer k. 
    Return the linked list, removing the k-th last element from the list.

    Try to do it in a single pass and using constant space.

    Here's a starting point:

    class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next
    def __str__(self):
        current_node = self
        result = []
        while current_node:
        result.append(current_node.val)
        current_node = current_node.next
        return str(result)

    def remove_kth_from_linked_list(head, k):
    # Fill this in

    head = Node(1, Node(2, Node(3, Node(4, Node(5)))))
    print(head)
    # [1, 2, 3, 4, 5]
    head = remove_kth_from_linked_list(head, 3)
    print(head)
    # [1, 2, 4, 5]

*/

Inout.result_Converter = res => res.list;
Inout.push({ k: 0, list: '&LL 1' }, '&LL ');
Inout.push({ k: 3, list: '&LL 12345' }, '&LL 1245');
Inout.push({ k: 5, list: '&LL 12345' }, '&LL 2345');
Inout.push({ k: 0, list: '&LL 12345' }, '&LL 1234');
Inout.push({ k: 3, list: '&LL 0123456789' }, '&LL 012345689');
Inout.push({ k: 7, list: '&LL 12345' }, new CustomError('Out-of-Bounds', 'Kth element from the last node is not a valid index'));

Inout.solvers = [removeKthLastElement_fakeHead];
Inout.solve();


function removeKthLastElement_fakeHead(list, k) {

    const fakeHead = new LinkedList.Node('HEAD', list.head);

    let walker = fakeHead;
    let runner = fakeHead.next;

    while (--k > 0) {
        if (runner === null && k > 0)
            throw new CustomError('Out-of-Bounds', 'Kth element from the last node is not a valid index');
        else if (runner !== null)
            runner = runner.next;
    }
    while (runner && runner.next) {
        runner = runner.next;
        walker = walker.next;
    }

    const toRemoveNode = walker.next;
    walker.next = toRemoveNode.next;


    // Take care of head and tail.
    list.head = fakeHead.next;
    list.tail = runner;

    // No elements left in list.
    if(fakeHead.next === null)
        list.tail = null;
    else if(toRemoveNode === list.tail)
        list.tail = walker;

}

function removeKthLastElement(list, k) {

    if (k === 0 && list.head === list.tail) {
        list.head = null;
        list.tail = null
        return;
    }


    let walker = list.head;
    let runner = list.head.next;

    // Move Runner kth+1 nodes ahead of walker.
    while (--k > 0) {
        if (runner === null && k > 0)
            throw new CustomError('Out-of-Bounds', 'Kth element from the last node is not a valid index');
        else if (runner !== null)
            runner = runner.next;
    }

    // For each iteration both walker and runner move ahead by one node.
    // When the runner reached the end of the list then the walker is still kth+1 nodes behind it
    // which is exactly one node before the to be removed node.
    while (runner && runner.next) {
        runner = runner.next;
        walker = walker.next;
    }

    // Remove the node and cover cases where node is head or tail.
    if (walker.next === list.tail)
        list.tail = walker;
    else if (runner !== null)
        walker.next = walker.next.next;
    else if (walker === list.head)
        list.head = walker.next;

    list.tail.next = null;
}