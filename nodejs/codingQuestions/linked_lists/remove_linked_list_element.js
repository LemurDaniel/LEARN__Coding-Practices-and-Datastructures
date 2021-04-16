const Inout = new (require ('../../Inout'))('DailyCode --- Remove Linked List elements');
const LinkedList = require('../../datastructures/linkedList');
const Helper = require('../../Helper');

/*
    Remove all elements from a linked list of integers that have value val.

    Given: 1 ==> 2 ==> 7 ==> 3 ==> 4 ==> 5 ==> 7, val: 7
    Return: 1 ==> 2 ==> 3 ==> 4 ==> 5
*/

Inout.push( { input: { list: '12443143324', val: 3 } , output: '&LL'+'12441424' } );

Inout.solvers = [remove_elements_iterative, remove_elements_recursive];


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function remove_elements_iterative (list, val)  {

    let prev = null;
    let node = list.head;

    while(node) {

        if(node.val == val) {
            if(prev == null) list.head = node.next;
            else prev.next = node.next;
        }
        else 
            prev = node;

        node = node.next

    }

    return list
}




LinkedList.Node.prototype.remove_elements_recursive = function (prev, val, list) {

    if(prev == null) list.head = this;
    else prev.next = this;

    if(this.val != val || !prev) prev = this;
    
    if(this.next)
        this.next.remove_elements_recursive(prev, val, list);

    return list;
}

function remove_elements_recursive(list, val) {
    return list.head.remove_elements_recursive(null, val, list);
}

Inout.solve();