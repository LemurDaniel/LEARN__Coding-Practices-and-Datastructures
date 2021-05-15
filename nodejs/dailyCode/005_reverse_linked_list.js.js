const Inout = new (require ('../Inout'))('DailyCode --- Reverse Linked List');
const LinkedList = require('../datastructures/linkedList');


Inout.push( '&LL 1234567', '&LL 7654321');
Inout.push( '&LL 12, 34, 8, 9', '&LL 9, 8, 34, 12');

Inout.solvers = [Reverse_iterative, Reverse_recursive]



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function Reverse_iterative(list) {
    
    let prev, next;
    let curr = list.head;

    // swap root and last pointer of linkend list
    list.head = list.tail;
    list.tail = curr;

    while(curr){

        // save current pointer to the next linked element
        next = curr.next;

        // reverse the pointer of the current element to the previous linked element
        curr.next = prev;

        // move forward to the next nodes
        prev = curr;
        curr = next;
    }

    list.tail.next = null;
}



// Reverse linked list recursively
function Reverse_recursive(list) {

    const head = list.head;

    // swap root and last pointer of linkend list
    list.head = list.tail;
    list.tail = head;

    // there is no previous node and so it points to null
    head.Reverse_recursive(null);
}

// recursive prototype method for all nodes of the linked list
LinkedList.Node.prototype.Reverse_recursive = function(prev_node){

    // if a next node is present, call it with a reference to this node
    if(this.next) this.next.Reverse_recursive(this);
    // point the next reference to the previous node
    this.next = prev_node;

}



Inout.solve();