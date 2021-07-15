const Inout = new (require("../Inout"))("Daily Coding Problem --- Rearrange linked list");
const LinkedList = require("../datastructures/linkedList");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Fitbit.

    Given a linked list, rearrange the node values such that they appear in alternating low -> high -> low -> high ... form. 
    
    For example, given 1 -> 2 -> 3 -> 4 -> 5, you should return 1 -> 3 -> 2 -> 5 -> 4.

*/


Inout.push('&LL 12345', '&LL 13254');
Inout.push('&LL 123456', '&LL 132546');
Inout.push('&LL 34512', '&LL 13254');
Inout.push('&LL 345126', '&LL 132546');
Inout.solvers = [rearrangeLinkedList, rearrangeLinkedList2];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function rearrangeLinkedList(list) {

    Helper.MergeSort.sort(list);

    let prev = list.head;
    let curr = prev.next;

    while(curr !== null && curr.next !== null) {

        const next = curr.next;

        curr.next = next.next;
        next.next = curr;
        prev.next = next;

        // Curr is now the last of the three nodes, therefor curr.next is two nodes ahead of the original curr.
        prev = curr;
        curr = curr.next;
    }

    list.tail = curr ?? prev;
}


function rearrangeLinkedList2(list) {

    Helper.MergeSort.sort(list);

    let node = list.head.next;

    while(node !== null && node.next !== null) {

        const next = node.next
        const temp = next.val;

        next.val = node.val;
        node.val = temp;
        
        node = next.next;
    }

}