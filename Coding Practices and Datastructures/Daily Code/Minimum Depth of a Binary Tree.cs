using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by LinkedIn:

        Given a binary tree, find the minimum depth of the binary tree. The minimum depth is the shortest distance from the root to a leaf.

        Here's an example and some starter code.

        class Node:
          def __init__(self, value, left=None, right=None):
            self.value = value
            self.left = left
            self.right = right

        def min_depth_bst(root):
          # Fill this in.
  
        n3 = Node(3, None, Node(4))
        n2 = Node(2, Node(3))
        n1 = Node(1, n2, n3)

        #     1
        #    / \
        #   2   3
        #        \
        #         4
        print(min_depth_bst(n1))
        # 2
       
    */

    class Minimum_Depth_of_a_Binary_Tree : Testable
    {
        public class InOut : InOutBase<IBTree<int>, int>
        {
            public InOut(string tree, int level) : base (Helfer.AssembleBTreePreOrder(tree), level, true)
            {
                AddSolver((arg, erg) => erg.Setze(arg.GetMinimumDepthIt()), "Iterativ");
                AddSolver((arg, erg) => erg.Setze(arg.GetMinimumDepthRecursive()), "Rekursiv");
                HasMaxDur = false;
            }

        }

        public Minimum_Depth_of_a_Binary_Tree()
        {
            testcases.Add(new InOut("1,2,/,/,3,/,4", 2));
        }
    }
}
