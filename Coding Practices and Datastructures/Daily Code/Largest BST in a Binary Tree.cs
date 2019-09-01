using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Twitter:

       You are given the root of a binary tree. 
       Find and return the largest subtree of that tree, which is a valid binary search tree.
    */
    class Largest_BST_in_a_Binary_Tree : Testable
    {
        private class InOut : InOutBase<IBTree<int>, string>
        {
            public InOut(string s, string s2) : base(Helfer.AssembleBTree(s, new BinaryCompleteTree<int>(), true, -1),s2, true)
            {
                AddSolver((arg, erg) => erg.Setze(arg.PrintIterative(TraverseType.LevelOrder, arg.GetLargestBst((i, i2) => i.CompareTo(i2)), "")), "Rekursiv");
            }
        }

        public Largest_BST_in_a_Binary_Tree()
        {
            testcases.Add(new InOut("5,6,7,2,-1,4,9","749"));
        }

    }
}
