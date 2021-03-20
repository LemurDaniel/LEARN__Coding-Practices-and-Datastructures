using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
        Hi, here's your problem today. This problem was recently asked by Twitter:

        Given a binary tree and an integer k, filter the binary tree such that its leaves don't contain the value k. Here are the rules:

        - If a leaf node has a value of k, remove it.
        - If a parent node has a value of k, and all of its children are removed, remove it.

        Here's an example and some starter code:

        class Node:
          def __init__(self, value, left=None, right=None):
            self.value = value
            self.left = left
            self.right = right

          def __repr__(self):
            return f"value: {self.value}, left: ({self.left.__repr__()}), right: ({self.right.__repr__()})"

        def filter(tree, k):
          # Fill this in.

        #     1
        #    / \
        #   1   1
        #  /   /
        # 2   1
        n5 = Node(2)
        n4 = Node(1)
        n3 = Node(1, n4)
        n2 = Node(1, n5)
        n1 = Node(1, n2, n3)

        print(filter(n1, 1))
        #     1
        #    /
        #   1
        #  /
        # 2
        # value: 1, left: (value: 1, left: (value: 2, left: (None), right: (None)), right: (None)), right: (None)
        .

     /////
        ///Testcase 2:
                5,4,4,null,null,4,null,null,4,null,7

                    5
                  /  \
                 4    4
                / \    \
               4   4    7
          
            Result:
                 5,null,4,null,7

                    5
                   / \
                  n   4
                     / \
                    n   7

        /////
        ///Testcase 3:
        
                    5
                  /  \
                 4    4
                / \    \
               4   4    4

            Result:
                    5

    ///Testcase 4:
        
                    4
                  /  \
                 4    4
                / \    \
               4   4    4

            Result: 
                   root == null
        */
    class Filter_Binary_Tree_Leaves : Testable
    {
        public class Input
        {
            private IBTree<int> tree;
            public IBTree<int> Tree { get => tree.CopyIt(); }
            public int k;
            public Input(string s, int k)
            {
                this.k = k;
                this.tree = Helfer.AssembleBTreePreOrder(s);
            }
            public override string ToString() => "\n  --Element K: " + k + "\n  --Tree: " + tree;
            public override bool Equals(object obj) => (obj as IBTree<int>).Equals(tree); 
        }


        public class InOut : InOutBase<Input, IBTree<int>>{
            public InOut(string s, int k, string s2) : base(new Input(s, k), Helfer.AssembleBTreePreOrder(s2), true)
            {
                AddSolver((arg, erg) => erg.Setze(arg.Tree.RemoveLeavesK_Recursive(arg.k)), "Recursive" );
                AddSolver((arg, erg) => erg.Setze(arg.Tree.RemoveLeavesK_Iterative(arg.k)), "Iterative");
            }
        }


        public Filter_Binary_Tree_Leaves()
        {
            testcases.Add(new InOut("1,1,2,/,/,/,1,1", 1, "1,1,2"));
            testcases.Add(new InOut("5,4,4,/,/,4,/,/,4,/,7", 4, "5,/,4,/,7"));
            testcases.Add(new InOut("5,4,4,/,/,4,/,/,4,/,4", 4, "5"));
            testcases.Add(new InOut(" 4,4,4,/,/,4,/,/,4,/,4", 4, ""));
        }


    }
}
