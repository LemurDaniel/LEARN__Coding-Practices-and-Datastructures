using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Microsoft:

        A unival tree is a tree where all the nodes have the same value. Given a binary tree, return the number of unival subtrees in the tree.

        For example, the following tree should return 5:

           0
          / \
         1   0
            / \
           1   0
          / \
         1   1

        The 5 trees are:
        - The three single '1' leaf nodes. (+3)
        - The single '0' leaf node. (+1)
        - The [1, 1, 1] tree at the bottom. (+1)
    */

    class Count_Number_of_Unival_Subtrees : Testable
    {
        private class InOut<V> : InOutBase<IBTree<V>, int>
        {
            public InOut(IBTree<V> tree, int outp) : base(tree, outp, true)
            {
                inputStringConverter = arg => "Eingabe: " + arg.PrintIterative(TraverseType.LevelOrder);
                AddSolver( (arg, erg) => erg.Setze(arg.GetNumberOfUnivalSubtreesRecursive()) ,"Rekursiv");
                AddSolver((arg, erg) => erg.Setze(arg.GetNumberOfUnivalSubtreesRecursiveMethod2()), "Rekursiv2");
                HasMaxDur = false;
            }
        }

        public Count_Number_of_Unival_Subtrees()
        {
            testcases.Add(new InOut<int>(Helfer.AssembleBTree("0102210222211", new BinaryCompleteTree<int>(), true), 5));
            testcases.Add(new InOut<char>(Helfer.AssembleBTreeChar("aaa//aa///////A", new BinaryCompleteTree<char>()), 3));
            testcases.Add(new InOut<char>(Helfer.AssembleBTreeChar("acb//bb///////b", new BinaryCompleteTree<char>()), 5));
        }
    }
}
