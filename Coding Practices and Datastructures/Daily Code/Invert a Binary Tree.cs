using GoF_Coding_Interview_Algos.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoF_Coding_Interview_Algos.Daily_Code
{
    class Invert_a_Binary_Tree : Testable
    {
        private class InOut : InOutBase<BinaryTree<char>, BinaryTree<char>>
        {
            public InOut(string input, string output) : base (Helfer.AssembleBTreeChar(input), Helfer.AssembleBTreeChar(output), true)
            {
                copiedInputProvider = arg => Helfer.AssembleBTreeChar(input);
                AddSolver((inp, erg) => erg.Setze(inp.InvertRecursive()), "InvertiereRekursiv");
            }
        }

        public Invert_a_Binary_Tree()
        {
            testcases.Add(new InOut("cabedf", "*cefdab"));
        }
    }
}
