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

        You are given the root of a binary tree. Return the deepest node (the furthest node from the root).

        Example:

            a
           / \
          b   c
         /
        d

        The deepest node in this tree is d at depth 3.

    */

    class Deepest_Node_in_a_Binary_Tree : Testable
    {
        private class InOut : InOutBase<IBTree<char>, char>
        {
            public InOut(string s, char c) : base (Helfer.AssembleBTreeChar(s, new BinaryCompleteTree<char>()), c, true)
            {
                inputStringConverter = arg => "Binary Tree: " + arg.PrintIterative(TraverseType.LevelOrder);
                AddSolver((arg, erg) => erg.Setze(arg.GetDeepestNodeIt().Val), "Iterativ");
                AddSolver((arg, erg) => erg.Setze(arg.GetDeepestNodeRecursive().Val), "Recursive");
            }
        }

        public Deepest_Node_in_a_Binary_Tree()
        {
            testcases.Add(new InOut("abcd", 'd'));
            testcases.Add(new InOut("abcdefgh", 'h'));
        }
    }
}
