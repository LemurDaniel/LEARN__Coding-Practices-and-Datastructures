const Inout = new (require("../Inout"))("Daily Coding Problem --- Arrange numbers into largest Integer");
const LinkedList = require("../datastructures/linkedList");
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Twitter.

    Given a list of numbers, create an algorithm that arranges them in order to form the largest possible integer. 
    For example, given [10, 7, 76, 415], you should return 77641510.

*/


Inout.push( '&AR 10,7,76,415', 77641510 )

Inout.solvers = [rearrange_numbers_1, rearrange_numbers_2];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*

    The algorithm puts the first value at the top of the linked list and compares 
    each following value in a while loop with every node in the linkedList.

    The comparison combines the 'to be inserted number' and the current node value 
    with one at the front and the other at the back and vice versa.

    If the 'to be inserted number' coming before the node value results in a overall
    bigger number it'll get inserted as a node before the current node,

    else the 'to be inserted number' is compared with the next node the same way.

    1. Create LinkedList with fake head.
    2. Insert first number in list after the fake head.
    3. Iterate through all remaining numbers in the list

        3.1 Compare the inserted number with the current node value
        3.2 If the overall number is bigger when inserted at the front then insertd it as a node in between.
        3.3 Else if the list end is reached, insert it as a node at the end.
        3.4 Else move to next node and repeat 3.1



*/

function rearrange_numbers_1( list ) {

    const ll = new LinkedList('HEAD', new LinkedList.Node(list[0]));

    for(let i=1; i<list.length; i++) {

        const insert = list[i];
        let node = ll.head.next;
      
        while(node) {
            const order_of_magnitude_a = Math.floor(Math.log10(insert)) + 1;
            const order_of_magnitude_b = Math.floor(Math.log10(node.val)) + 1;
        
            const a_then_b = insert * Math.pow(10, order_of_magnitude_b) + node.val 
            const b_then_a = node.val * Math.pow(10, order_of_magnitude_a) + insert

            // If the number is bigger with the to be inserted value at the front, then
            // insert a dubplicate of the current node after it and replace the value of the
            // original with the to be inserted value.
            if(a_then_b > b_then_a) {
                node.next = new LinkedList.Node(node.val, node.next);
                node.val = insert;
                break;
            } else if(node.next === null){
                // If the current node is the tail of the list, then append the value as a node after it.
                node.next = new LinkedList.Node(insert);
                break;
            }
            else node = node.next; 
    
        }
        //console.log(ll.toString())
        //console.log('----------------------')
    }

    console.log(ll.toString())

    let num = 0;
    for(let val of ll.head.next) 
        num = num * Math.pow(10, 1 + Math.floor(Math.log10(val))) + val;

    return num;
}



function rearrange_numbers_2( list ) {

    const ll = new LinkedList('HEAD', new LinkedList.Node(list[0]));

    for(let i=1; i<list.length; i++) {

        const insert = list[i];
        let node = ll.head.next;
      
        while(node) {
            
            const a_then_b = parseInt(insert + '' + node.val);
            const b_then_a = parseInt(node.val + '' +insert);

            // If the number is bigger with the to be inserted value at the front, then
            // insert a dubplicate of the current node after it and replace the value of the
            // original with the to be inserted value.
            if(a_then_b > b_then_a) {
                node.next = new LinkedList.Node(node.val, node.next);
                node.val = insert;
                break;
            } else if(node.next === null){
                // If the current node is the tail of the list, then append the value as a node after it.
                node.next = new LinkedList.Node(insert);
                break;
            }
            else node = node.next; 
    
        }
    }


    let num = '';
    for(let val of ll.head.next) num  = num + val.toString();

    return parseInt(num);
}