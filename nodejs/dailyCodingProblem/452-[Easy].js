const Inout = new (require("../Inout"))("Daily Coding Problem --- Add two Linked Lists");
const LinkedList = require("../datastructures/linkedList");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Microsoft.

    Let's represent an integer in a linked list format by having each node represent a digit in the number. The nodes make up the number in reversed order.

    For example, the following linked list:

    1 -> 2 -> 3 -> 4 -> 5
    is the number 54321.

    Given two linked lists in this format, return their sum in the same linked list format.

    For example, given

    9 -> 9
    5 -> 2
    return 124 (99 + 25) as:

    4 -> 2 -> 1

    (Note: numbers are read from left to right. 4 -> 2 -> 1 => 124)
*/




Inout.input_stringConverter = arg => '(' + arg.list.toString() + ') + (' + arg.list2.toString() + ')';

Inout.push({ list: '&LL 99', list2: '&LL 52' }, '&LL 421');
Inout.push({ list: '&LL 99', list2: '&LL 52' }, '&LL 421');
Inout.push({ list: '&LL 9999999', list2: '&LL 1' }, '&LL 00000001');
Inout.push({ list: '&LL 243', list2: '&LL 564' }, '&LL 708');
Inout.push({ list: '&LL 243', list2: '&LL 566' }, '&LL 7001');
Inout.push({ list: '&LL 243', list2: '&LL 5669' }, '&LL 70001');
Inout.push({ list: '&LL 24333', list2: '&LL 564' }, '&LL 70833');
Inout.push({ list: '&LL 243', list2: '&LL 56444' }, '&LL 70844');

Inout.solvers = [addNumbers];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function addNumbers(num1, num2) {

    const resultList = new LinkedList('<EMPTY HEAD>');

    let result = resultList.head;
    let sum = 0, carry = 0;
    let [node1, node2] = [num1.head, num2.head];
    while (node1 || node2) {

        const digit1 = node1 ? node1.val : 0;
        const digit2 = node2 ? node2.val : 0;

        sum = digit1 + digit2 + carry;
        carry = Math.floor(sum / 10);

        result.next = new LinkedList.Node(sum % 10);

        node1 = node1?.next;
        node2 = node2?.next;
        result = result.next;
    }

    if (carry > 0)
        result.next = new LinkedList.Node(carry);

    resultList.tail = result.next ?? result;
    resultList.head = resultList.head.next;
    return resultList;
}