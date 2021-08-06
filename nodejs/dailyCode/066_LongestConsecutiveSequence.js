const Inout = new (require('../Inout'))('DailyCode --- Find non duplicate number')
const { BinaryTree } = require('../datastructures/bTree');
const LinkedList = require('../datastructures/linkedList');
const { CustomError } = require('../Helper');
const Helper = require('../Helper');


/*

    Hi, here's your problem today. This problem was recently asked by Amazon:

    You are given an array of integers. Return the length of the longest consecutive elements sequence in the array.

    For example, the input array [100, 4, 200, 1, 3, 2] has the longest consecutive sequence 1, 2, 3, 4, and thus, you should return its length, 4.

    def longest_consecutive(nums):
    # Fill this in.

    print longest_consecutive([100, 4, 200, 1, 3, 2])
    # 4

    Can you do this in linear time?

*/

Inout.push('&AR 100,4,200,1,3,2', '&AR 1,2,3,4')

Inout.solvers = [longestConsecutiveSequence];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function longestConsecutiveSequence(list) {

   const head = new LinkedList.Node('HEAD');

    for(const num of list) {

        let node = head;
        while(node.next !== null) {
            
        }
    }

}