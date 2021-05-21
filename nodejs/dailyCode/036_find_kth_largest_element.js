const Inout = new (require('../Inout'))('DailyCode --- Find Closest Points');
const LinkedList = require('../datastructures/linkedList');
const Queue = require('../datastructures/queue');
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Twitter:

    Find the k-th largest number in a sequence of unsorted numbers.

    def findKthLargest(arr, k):
    # Fill this in.
    
    print(findKthLargest([8, 7, 2, 3, 4, 1, 5, 6, 9, 0], 3))
    # 7

*/

Inout.push( { nums: '8,7,2,3,4,1,5,6,9,0', k: 3 } , 7 )

Inout.solvers = [find_nearest_points, find_nearest_points_prio_node_queue];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


/*
    Similar to 017_find_closest_point

*/

function find_nearest_points(nums, k) {

    const largest_elements    = new LinkedList.Node('Head');
    let   kth_largest_element = null;

    for (let num of nums) {

        let prev     = largest_elements;
        let node     = largest_elements.next;
        let inserted = false;
        let depth    = 0;


        while (depth++ < k) {
            // If no node is present or the element is bigger than the one of the current node
            // then insert the current point at this place in the Linked List
            if (!inserted && (node == null || num >= node.val) ) {

                inserted = true;
                prev.next = new LinkedList.Node(num, node);
                node = prev.next;

            }

            // console.log(LinkedList.toString(largest_elements));


            // break when end of list is reached
            if (node == null) break;
            // keep the linked list the size of k
            else if (depth >= k) node.next = null;

            kth_largest_element = node;

            // move forward in linked list by one node
            prev = node;
            node = node.next;
        }
    }


    return kth_largest_element.val;
}



function find_nearest_points_prio_node_queue(nums, k) {

    const queue = new Queue.PriorityNodeQueue();

    for (let num of nums)   queue.enqueue(num, num)

    while (--k) queue.deleteHighestPriority();

    return queue.deleteHighestPriority();
}