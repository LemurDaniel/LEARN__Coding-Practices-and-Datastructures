const Inout = new (require('../Inout'))('DailyCode --- Remove kth node from linked list')
const { BinaryTree } = require('../datastructures/bTree');
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
Inout.push({ k: 3, list: '&LL 12345' }, '&LL 1245');
Inout.push({ k: 5, list: '&LL 12345' }, new CustomError('Out-of-Bounds', 'Kth element from the last node is not a valid index'));
Inout.push({ k: 3, list: '&LL 0123456789' }, '&LL 012345689');

Inout.solvers = [removeKthLastElement];
Inout.solve(0);


function removeKthLastElement(list, k) {

    let walker = list.head;
    let runner = list.head.next;

    // Move Runner kth+1 nodes ahead of walker.
    while (k-- && runner) runner = runner.next;
    if (runner == null)
        throw new CustomError('Out-of-Bounds', 'Kth element from the last node is not a valid index')

    // For each iteration both walker and runner move aheah by one node.
    // When the runner reached the end of the list then the walker is still kth+1 nodes behind it
    // which is exactly one node before the to be removed node.
    while (runner) {
        runner = runner.next;
        walker = walker.next;
    }

    // Remove the node after the walker by pointing its pointer to the node after it.
    walker.next = walker.next.next;
}