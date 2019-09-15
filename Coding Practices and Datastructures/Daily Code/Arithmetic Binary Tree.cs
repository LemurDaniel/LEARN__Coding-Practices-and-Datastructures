using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Arithmetic_Binary_Tree_DailyCode : Testable
    {
        /*
         * Hi, here's your problem today. This problem was recently asked by Apple:

            You are given a binary tree representation of an arithmetic expression. In this tree, each leaf is an integer value,, and a non-leaf node is one of the four operations: '+', '-', '*', or '/'.

            Write a function that takes this tree and evaluates the expression.

            Example:

                *
               / \
              +    +
             / \  / \
            3  2  4  5

            This is a representation of the expression (3 + 2) * (4 + 5), and should return 45.
            */
        public class InOut : InOutBase<Binary_Arithmetic_Tree, long>
        {
            public InOut(string s, long l) : base (new Binary_Arithmetic_Tree().BuildTree(s), l, true)
            {
                AddSolver((arg, erg) => erg.Setze(arg.SolveRecursive(), Complexity.LINEAR, Complexity.LINEAR), "Rekursiv");
            }
        }

        public Arithmetic_Binary_Tree_DailyCode()
        {
            testcases.Add(new InOut("2 ^ 4 / (5 * 1) + 10", 13)); 
            testcases.Add(new InOut("(3 + 2) * (4 + 5)", 45));
        }
    }
}
