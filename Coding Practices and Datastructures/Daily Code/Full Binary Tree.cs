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
     * Hi, here's your problem today. This problem was recently asked by Google:

    Given a binary tree, remove the nodes in which there is only 1 child, so that the binary tree is a full binary tree.

    So leaf nodes with no children should be kept, and nodes with 2 children should be kept as well.
        # Given this tree:
        #     1
        #    / \ 
        #   2   3
        #  /   / \
        # 0   9   4

        # We want a tree like:
        #     1
        #    / \ 
        #   0   3
        #      / \
        #     9   4
         
         */
    class Full_Binary_Tree : Testable
    {
        public class InOut<V> : InOutBase<IBTree<V>, IBTree<V>>
        {
            public InOut(IBTree<V> a, IBTree<V> b) : base(a, b, true)
            {
                inputStringConverter = arg => "Eingabe: " + arg.SerializeIt();
                outputStringConverter = arg => "Erwartet: " + arg.SerializeIt();
                ergStringConverter = arg => "Ausgabe: " + arg.SerializeIt();
                copiedInputProvider = arg => arg.CopyIt();
  

                AddSolver( (arg, erg) => erg.Setze(arg.MakeCompleteIterative()), "Iterativ");
                AddSolver((arg, erg) => erg.Setze(arg.MakeCompleteRecursive()), "Rekursiv");
            }
        }

        public Full_Binary_Tree()
        {
            testcases.Add(new InOut<int>(Helfer.AssembleBTreePreOrder("1,2,0,/,/,/,3,9,/,/,4"), Helfer.AssembleBTreePreOrder("1,0,/,/,3,9,/,/,4")));
        }
    }
}
