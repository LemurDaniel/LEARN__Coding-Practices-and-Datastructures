using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * Hi, here's your problem today. This problem was recently asked by Apple:

        Given 2 binary trees t and s, find if s has an equal subtree in t, where the structure and the values are the same. Return True if it exists, otherwise return False.

        Here's some starter code and an example:

        class Node:
          def __init__(self, value, left=None, right=None):
            self.value = value
            self.left = left
            self.right = right

          def __repr__(self):
            return f"(Value: {self.value} Left: {self.left} Right: {self.right})"

        def find_subtree(s, t):
          # Fill this in.

        t3 = Node(4, Node(3), Node(2))
        t2 = Node(5, Node(4), Node(-1))
        t = Node(1, t2, t3)

        s = Node(4, Node(3), Node(2))
        """
        Tree t:
            1
           / \
          4   5 
         / \ / \
        3  2 4 -1

        Tree s:
          4 
         / \
        3  2 
        """

        print(find_subtree(s, t))
        # True

    */
    class Find_Subtree : Testable
    {
        public class Input
        {
            public readonly IBTree<int> tree;
            public readonly IBTree<int> sub;

            public Input(string preorder, string preorder2)
            {
                tree = Helfer.AssembleBTreePreOrder(preorder);
                sub = Helfer.AssembleBTreePreOrder(preorder2);
            }

            public override string ToString() => "\nTree: " + tree.ToString() + "\nSubTree: " + sub.ToString();
        }
        public class InOut : InOutBase<Input, bool>
        {
            public InOut(string preorder1, string preorder2, bool b) : base (new Input(preorder1, preorder2), b, true)
            {
                AddSolver( (arg, erg) => erg.Setze(arg.tree.GetRoot().CheckForSubtree(arg.sub) ));
            }
        }

        public Find_Subtree()
        {
            testcases.Add(new InOut("1,4,3,/,/,2,/,/,5,4,/,/,-1", "4,3,/,/,2", true));
        }

    }
}
