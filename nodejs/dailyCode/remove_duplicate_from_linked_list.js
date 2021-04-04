const Inout = new (require ('../Inout'))('DailyCode --- Remove Duplicates from sorted linked List');
const LinkedList = require('../datastructures/linkedList');
const Helper = require('../Helper');

/*
    Hi, here's your problem today. This problem was recently asked by Amazon:

    Given a sorted linked list of integers, remove all the duplicate elements in the linked list so that all elements in the linked list are unique.

    Here's an example and some starter code:

    class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

    def __repr__(self):
        return f"({self.value}, {self.next})"


    def remove_dup(lst):
    # Fill this in.

    lst = Node(1, Node(2, Node(2, Node(3, Node(3)))))

    remove_dup(lst)
    print(lst)
    # (1, (2, (3, None)))
*/

Inout.convert_input = LinkedList.LinkedListFromString_Int;
Inout.convert_output = LinkedList.LinkedListFromString_Int;

//Inout.result_string_converter = LinkedList.toString;

Inout.push( { input: '12233', output: '123' } );
Inout.push( { input: '111223334444445555', output: '12345' } );

Inout.solvers = [remove_duplicates_iterative, remove_duplicates_recursive];


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function remove_duplicates_iterative(list) {

    let prev = null;
    let curr = list.root;

    while(curr) {

        // if the value of the previous node equals the value of the current node
        // then point the previous node to the current node's next node
        // else move forward in linkedlist by one node
        if(prev && prev.val == curr.val)
            prev.next = curr.next;
        else
            prev = curr;

        curr = curr.next;
    }
}


// Apply recursive method as prototype to all LinkedList.Node objects
LinkedList.Node.prototype.remove_duplicates_recursive = function(prev) {

    // if the previous node is not null and its value equals the previous one then point the previous node to 
    // the current's next node therefore unlinking the current node
    if (prev && prev.val == this.val) 
        prev.next = this.next;
    // else set the prev variable to this node so that the next node 
    // considers the current node as its predecessor
    else 
        prev = this;
       
    if(this.next)
        this.next.remove_duplicates_recursive(prev);
}

function remove_duplicates_recursive(list) {
    list.root.remove_duplicates_recursive();
}

Inout.solve();