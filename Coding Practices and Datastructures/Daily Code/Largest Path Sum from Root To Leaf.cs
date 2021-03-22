using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Google:

        Given a binary tree, find and return the largest path from root to leaf.

        Here's an example and some starter code:

        class Node:
          def __init__(self, value, left=None, right=None):
            self.value = value
            self.left = left
            self.right = right

        def largest_path_sum(tree):
          # Fill this in.

        tree = Node(1)
        tree.left = Node(3)
        tree.right = Node(2)
        tree.right.left = Node(4)
        tree.left.right = Node(5)
        #    1
        #  /   \
        # 3     2
        #  \   /
        #   5 4
        print(largest_path_sum(tree))
        # [1, 3, 5]
    */
    class Largest_Path_Sum_from_Root_To_Leaf : Testable
    {
        public class InOut : InOutBase<IntBinaryTree, int[]>
        {
            public InOut(string tree, string arr) : 
                base(Helfer.AssembleBTreePreOrder(tree, new IntBinaryTree()) as IntBinaryTree, Helfer.Assemble(arr), true)
            {
                ergStringConverter = arg => Helfer.Arrayausgabe<int>("Ausgabe: ", arg);
                outputStringConverter = arg => Helfer.Arrayausgabe<int>("Erwartet: ", arg);
                CompareOutErg = Helfer.ArrayVergleich;

                AddSolver( (arg, erg) => erg.Setze(arg.LargestPathSumfromRootToLeafRecursive()), "Recursive");
            }
        }
        public Largest_Path_Sum_from_Root_To_Leaf()
        {
            testcases.Add(new InOut("1,3,/,5,/,/,2,4","1,3,5"));
        }
    }
}
