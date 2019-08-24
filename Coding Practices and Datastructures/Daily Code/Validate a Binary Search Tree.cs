using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Facebook:

        You are given the root of a binary search tree. 
        Return true if it is a valid binary search tree, and false otherwise. 
        Recall that a binary search tree has the property that all values in the left subtree are less than or equal to the root, and all values in the right subtree are greater than or equal to the root.

    */
    class Validate_a_Binary_Search_Tree : Testable
    {
        private class InOut : InOutBase<BinarySearchTree<int>, bool>
        {
            public InOut(string s, bool inverted, bool outp) : base (BinarySearchTree<int>.GenerateFromLevelOrder(Helfer.Assemble(s), inverted), outp, true)
            {
                inputStringConverter = arg => (inverted ? "Inverted":"Normal") + "\nEingabe: " + arg.PrintIterative(TraverseType.LevelOrder);
                AddSolver((arg, erg) => erg.Setze(arg.ValidateRecursive(), Complexity.QUADRATIC, Complexity.QUADRATIC, "Where n is height of Tree"), "Rekursiv");
                AddSolver((arg, erg) => erg.Setze(arg.ValidateIt(), Complexity.QUADRATIC, Complexity.QUADRATIC, "Where n is height of Tree"), "Iterativ");
            }

        }

        public Validate_a_Binary_Search_Tree()
        {
            testcases.Add(new InOut("5,3,7,1,4,6,8", false, true));
            testcases.Add(new InOut("5,6,7,1,4,6,8", false, false));
            testcases.Add(new InOut("5,7,3,8,6,4,1", true, true));
            testcases.Add(new InOut("5,4,3,8,6,4,1", true, false));
        }
    }
}
