const Inout = new (require ('../../Inout'))('Coding Questions --- Add Two Numbers I - [difficulty: Medium]');
const LinkedList = require('../../datastructures/linkedList');
const Helper = require('../../Helper');

/*
    You are given two non-empty linked lists representing two non-negative integers. 
    The digits are stored in reverse order and each of their nodes contain a single digit.
    Add the two numbers and return it as a linked list.

    You may assume the two numbers do no contain any leading zero, except the number 0  itself.
*/

Inout.input_string_converter = arg => '(' + arg.list.toString() + ') + (' + arg.list_2.toString() + ')';

Inout.push( { list: '243', list_2: '&LL 564' } , '&LL 708' );
Inout.push( { list: '243', list_2: '&LL 566' } , '&LL 7001' );
Inout.push( { list: '243', list_2: '&LL 5669' } , '&LL 70001' );
Inout.push( { list: '24333', list_2: '&LL 564' } , '&LL 70833' );
Inout.push( { list: '243', list_2: '&LL 56444' } , '&LL 70844' );

Inout.solvers = [add_two_numbers];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

// no new linked list is created, all values are stored in first linked list 'num'
function add_two_numbers (num, num2)  {

    let node_1 = num.head;
    let node_2 = num2.head;

    let carry = 0;
    while(node_1 && node_2) {
        const sum   = node_1.val + node_2.val + carry;
        node_1.val  = sum % 10;
        carry = Math.floor(sum / 10)

        if(carry && !node_1.next) {
            node_1.next = new LinkedList.Node(1);
            num.tail = node_1.next;
            carry = 0;
        }

        node_1 = node_1.next;
        node_2 = node_2.next;
    }

    // handle additional nodes if num2 is bigger than num 
    while(node_2) {
        num.tail.next = new LinkedList.Node(node_2.val);
        num.tail = num.tail.next;
        node_2 = node_2.next;
    }

    return num;
}