const Inout = new (require("../Inout"))("DailyCode --- Remove duplicates from Linked List");
const LinkedList = require("../datastructures/linkedList");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Twitter:

    Given a linked list, remove all duplicate values from the linked list.

    For instance, given 1 -> 2 -> 3 -> 3 -> 4, then we wish to return the linked list 1 -> 2 -> 4.

    class Node(object):
    def __init__(self, val, next=None):
        self.val = val
        self.next = next
    def __str__(self):
        if not self.next:
        return str(self.val)
        return str(self.val) + " " + str(self.next)

    class Solution(object):
    def deleteDuplicates(self, node):
        # Fill this in.


    n = Node(1, Node(2, Node(3, Node(3, Node(4)))))
    print(n)
    # 1 2 3 3 4
    Solution().deleteDuplicates(n)
    print(n)
    # 1 2 4

*/

Inout.push( '&LL 12334', '&LL 124' );
Inout.push( '&LL 12334355333', '&LL 124' );
Inout.push( '&LL 33125334335', '&LL 124' );

Inout.solvers = [remove_duplicates_two_passes];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function remove_duplicates_two_passes( list ) {

    const dict = {};
    let node = list.head;

    while(node) {

        if( node.val in dict ) dict[node.val]++;
        else dict[node.val] = 1;

        node = node.next;
    }


    const head   = new LinkedList.Node('HEAD');
    let new_list = head; 
    node = list.head;

    while(node) {

        if( dict[node.val] == 1 ) {
            new_list.next = node;
            new_list = new_list.next;
        }

        node = node.next;
    }

    new_list.next = null;
    list.tail = new_list;
    list.head = head.next;
}