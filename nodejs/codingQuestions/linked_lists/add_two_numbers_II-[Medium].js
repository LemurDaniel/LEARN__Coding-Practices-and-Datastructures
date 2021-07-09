const Inout = new (require('../../Inout'))('Coding Questions --- Add Two Numbers II - [difficulty: Medium]');
const LinkedList = require('../../datastructures/linkedList');
const Helper = require('../../Helper');

/*
    You are given two non-empty linked lists representing two non-negative integers. 
    The most significant digit comes first and each of their nodes contain a single digit. 
    Add the two numbers and return it as a linked list.

    You may assume the two numbers do no contain any leading zero, except the number 0  itself.

    Follow up:
    What if you cannot modify the input lists? In other words, reversng the list is not allowed

    Example:
        Input:  (7 => 2 => 4 => 3) + (5 => 6 => 4)
        Output: 7 => 8 => 0 => 7
*/

Inout.input_stringConverter = arg => '(' + arg.list.toString() + ') + (' + arg.list_2.toString() + ')';

Inout.push({ list: '&LL 1', list_2: '&LL 999999' }, '&LL 1000000');
Inout.push({ list: '&LL 999999', list_2: '&LL 1' }, '&LL 1000000');
Inout.push({ list: '&LL 7243', list_2: '&LL 564' }, '&LL 7807');
Inout.push({ list: '&LL 7243', list_2: '&LL 3564' }, '&LL 10807');
Inout.push({ list: '&LL 7243', list_2: '&LL 993564' }, '&LL 1000807');
Inout.push({ list: '&LL 7243', list_2: '&LL 122993564' }, '&LL 123000807');
Inout.push({ list: '&LL 564', list_2: '&LL 7243' }, '&LL 7807');
Inout.push({ list: '&LL 564', list_2: '&LL 3237243' }, '&LL 3237807');

Inout.solvers = [add_two_number_with_a_stack, add_two_number_with_a_stack_in_new_ll];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function add_two_number_with_a_stack(num, num2) {

    const stack_1 = [];
    const stack_2 = [];

    // store nodes in stacks
    let node = num.head;
    while (node) {
        stack_1.push(node);
        node = node.next;
    }
    // store only the values of the second list in the stack
    node = num2.head;
    while (node) {
        stack_2.push(node.val);
        node = node.next;
    }

    // new number is added to/stored in first linked list
    let carry = 0;
    while (stack_1.length > 0 || stack_2.length > 0 || carry) {

        // add new nodes to head of num to account for carries and num2 being bigger
        if (stack_1.length == 0) {
            num.head = new LinkedList.Node(0, num.head);
            stack_1.push(num.head);
        }

        const node_1 = stack_1.pop();
        const val_2 = stack_2.length > 0 ? stack_2.pop() : 0;

        const sum = node_1.val + val_2 + carry;
        node_1.val = sum % 10;
        carry = Math.floor(sum / 10)
    }

    return num;
}



function add_two_number_with_a_stack_in_new_ll(num, num2) {

    const stack_1 = [];
    const stack_2 = [];
    const result = new LinkedList();

    // store values in stacks
    let node = num.head;
    while (node) {
        stack_1.push(node.val);
        node = node.next;
    }
    node = num2.head;
    while (node) {
        stack_2.push(node.val);
        node = node.next;
    }


    // Start adding the content of the stacks
    let carry = 0;
    while (stack_1.length > 0 || stack_2.length > 0 || carry) {
        const val_1 = stack_1.length > 0 ? stack_1.pop() : 0;
        const val_2 = stack_2.length > 0 ? stack_2.pop() : 0;

        const sum = val_1 + val_2 + carry;
        carry = Math.floor(sum / 10);

        result.head = new LinkedList.Node(sum % 10, result.head);
        if (result.tail == null) result.tail = result.head;
    }

    return result;
}