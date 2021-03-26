const Inout = new (require ('../Inout'))('DailyCode --- Level of Tree with Maximum Sum');
const BTree = new require('../datastructures/bTree');
const Queue = new require('../datastructures/queue');

/*
    Hi, here's your problem today. This problem was recently asked by Microsoft:

    Given a binary tree, find the level in the tree where the sum of all nodes on that level is the greatest.

    Here's an example and some starter code.

    class Node:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

    def __repr__(self):
        return f"(Value: {self.value} Left: {self.left} Right: {self.right})"


    def tree_level_max_sum(root):
    # Fill this in.

    n3 = Node(4, Node(3), Node(2))
    n2 = Node(5, Node(4), Node(-1))
    n1 = Node(1, n2, n3)

    """
         1          Level 0 - Sum: 1
        / \
       4   5        Level 1 - Sum: 9 
      / \ / \
     3  2 4 -1      Level 2 - Sum: 8

    """

    print(tree_level_max_sum(n1))
    # Should print 1 as level 1 has the highest level sum

    Testcase 2:
    """
         1          Level 0 - Sum: 1
        / \
       4   5        Level 1 - Sum: 9 
      / \ / \
     3  2 4  2      Level 2 - Sum: 11

    """
*/

Inout.convert_input = BTree.GenerateIntPreorderFromString;
Inout.output_string_converter = arg => '\n  -- Level: '+arg[0]+' Sum: '+arg[1];
Inout.result_string_converter = Inout.output_string_converter;

Inout.testcases.push({
    input: '%1,4,3,/,/,2,/,/,5,4,/,/,-1',
    output: [1,9]
})

Inout.testcases.push({
    input: '%1,4,$3,$2,5,$4,2',
    output: [2,11]
})

Inout.solvers = [find_level_with_maximum_sum];
Inout.solve();



function find_level_with_maximum_sum(tree) {

    // Levelorder traversal of tree with a queue
    const q = new Queue();
    q.enqueue(tree.root);
    q.enqueue(null);

    // initialize variables
    let curr_sum = 0;
    let curr_level = 0;
    let level_max_sum = 0;
    let max_sum = 0;

    while(!q.isEmpty()){

        const node = q.dequeue();
        curr_sum += node.val;

        if(node.right) q.enqueue(node.right);
        if(node.left) q.enqueue(node.left);

        // null encounter in queue marks the end of a level in the tree
        if(q.peek() == null){

            // compare levelsum with current maximum sum
            if(curr_sum > max_sum){
                max_sum = curr_sum;
                level_max_sum = curr_level;
            }

            // increase level and reset current sum
            q.enqueue(q.dequeue());
            curr_level++;
            curr_sum = 0;

            // return if no more element in queue, (except for null)
            if(q.count == 1) return [level_max_sum, max_sum];
        }
    }
}