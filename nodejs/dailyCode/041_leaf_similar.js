const Inout = new (require("../Inout"))("DailyCode --- Is Leaf similar");
const LinkedList = require("../datastructures/linkedList");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Microsoft:

    Given a tree, the leaves form a certain order from left to right. Two trees are considered "leaf-similar" if their leaf orderings are the same.

    For instance, the following two trees are considered leaf-similar because their leaves are [2, 1]:
         3
        / \ 
       5   1
        \
         2 

        7
       / \ 
      2   1
       \
        2 
    Our job is to determine, given two trees, whether they are "leaf similar."

    class Node(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None
    
    class Solution(object):
    def leafSimilar(self, root1, root2):
        # Fill this in.

    #    3
    #   / \ 
    #  5   1
    #   \
    #    2 

    t1 = Node(3)
    t1.left = Node(5)
    t1.right = Node(1)
    t1.left.left = Node(6)
    t1.left.right = Node(2)

    #    7
    #   / \ 
    #  2   1
    #   \
    #    2 
    t2 = Node(7)
    t2.left = Node(2)
    t2.right = Node(1)
    t2.left.left = Node(6)
    t2.left.right = Node(2)

    print(Solution().leafSimilar(t1, t2))
    # True

          3
        /   \
      5       1
     / \     / \
    #6  2   #9  #8
       / \
      #7  #4


          3
        /   \
      5       1
     / \     / \
    #6  #7  #4  2
               / \
              #8  #8

    --------------

          3
        /   \
      5       1
     / \     / \
    #6  2   #9  #8
       / \
      #7  #4


          3
        /   \
      5       1
     / \     / \
    #6  #7  #4  2
               / \
              #9  #8


*/

Inout.result_comparer = (arg, arg2) => typeof arg2 == 'object' ? arg2.isSimilar == arg : arg2 == arg; 

Inout.push({
    tree_1: '&BT% 7,2,/,$2,1',
    tree_2: '&BT% 3,5,/,$2,1'
}, true)

Inout.push({
    tree_1: '&BT% 7,2,/,$2,1',
    tree_2: '&BT% 3,5,/,$1,1'
}, false)

Inout.push({
    tree_1: '&BT% 3,5,$6,2,$7,$4,1,$9,$8',
    tree_2: '&BT% 3,5,$6,$7,1,$4,2,$8,$8'
}, false)

Inout.push({
    tree_1: '&BT% 3,5,$6,2,$7,$4,1,$9,$8',
    tree_2: '&BT% 3,5,$6,$7,1,$4,2,$9,$8'
}, true)

Inout.solvers = [isLeafSimilar];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function isLeafSimilar(tree_1, tree_2) {

    let node_1 = tree_1.root;
    let node_2 = tree_2.root;

    const stack_1 = [node_1];
    const stack_2 = [node_2];

    const leafs_1 = new LinkedList();
    const leafs_2 = new LinkedList();

    while(stack_1.length > 0 && stack_2.length > 0) {

        if( stack_1.length > 0 ) node_1 = stack_1.pop();
        if( stack_2.length > 0 ) node_2 = stack_2.pop();

        if(node_1) {
            if(node_1.isLeaf()) leafs_1.Append(node_1);
 
            if(node_1.right) stack_1.push(node_1.right);
            if(node_1.left)  stack_1.push(node_1.left);
        }

        if(node_2) {
            if(node_2.isLeaf()) leafs_2.Append(node_2);
 
            if(node_2.right) stack_2.push(node_2.right);
            if(node_2.left)  stack_2.push(node_2.left);
        }
        
        if(leafs_1.head && leafs_2.head){
            if(leafs_1.head.val.val != leafs_2.head.val.val) 
                return { isSimilar: false, unmatchingLeafs: [leafs_1.head.val, leafs_2.head.val] };
            leafs_1.Remove_head();
            leafs_2.Remove_head();
        } 
    }

    return true;
}