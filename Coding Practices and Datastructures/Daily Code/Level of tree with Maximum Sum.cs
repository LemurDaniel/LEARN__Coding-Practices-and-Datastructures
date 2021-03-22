using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Level_of_tree_with_Maximum_Sum : Testable
    {
        /*
         * Hi, here's your problem today. This problem was recently asked by Microsoft:

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
        */
        public class InOut : InOutBase<IBTree<int>, int>
        {
            public InOut(string preOrder, int i) : base(Helfer.AssembleBTreePreOrder(preOrder), i, true)
            {
                AddSolver( (arg, erg) => erg.Setze(arg.GetLevelOfTreeSum(), Complexity.LINEAR, Complexity.LINEAR) );
            }
        }

        public Level_of_tree_with_Maximum_Sum()
        {
            testcases.Add(new InOut("1,4,3,/,/,2,/,/,5,4,/,/,-1", 1));
        }
    }
}
