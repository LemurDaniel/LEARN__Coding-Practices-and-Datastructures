using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Root_to_Leaf_numbers_summed : Testable
    {
        /*
         * Hi, here's your problem today. This problem was recently asked by Amazon:

            A number can be constructed by a path from the root to a leaf. Given a binary tree, sum all the numbers that can be constructed from the root to all leaves.

            Here's an example and some starter code.

            class Node:
              def __init__(self, value, left=None, right=None):
                self.value = value
                self.left = left
                self.right = right

              def __repr__(self):
                return f"({self.value}, {self.left}, {self.right})"


            def bst_numbers_sum(root, num=0):
              # Fill this in.

            n5 = Node(5)
            n4 = Node(4)
            n3 = Node(3)
            n2 = Node(2, n4, n5)
            n1 = Node(1, n2, n3)

            #      1
            #    /   \
            #   2     3
            #  / \
            # 4   5

            print(bst_numbers_sum(n1))
            # 262
            # Explanation: 124 + 125 + 13 = 262

    */
        public class InOut : InOutBase<IBTree<int>, int>
        {
            public InOut(string tree, int outp) : base(Helfer.AssembleBTreePreOrder(tree), outp, true)
            {
                AddSolver((arg, erg) => erg.Setze(arg.GetRoot().SumRootToLeafRecursive(i => i)), "SumRootToLeaf");
            }
        }

        public Root_to_Leaf_numbers_summed()
        {
            testcases.Add(new InOut("1,2,4,/,/,5,/,/,3", 262));
        }
    }
}
