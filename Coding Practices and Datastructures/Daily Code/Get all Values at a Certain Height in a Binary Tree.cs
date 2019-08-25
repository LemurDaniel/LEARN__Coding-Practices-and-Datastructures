using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Get_all_Values_at_a_Certain_Height_in_a_Binary_Tree : Testable
    {
        private class Input
        {
            public readonly IBTree<char> tree = new BinaryCompleteTree<char>();
            public readonly int height;

            public Input(string s, int height)
            {
                this.height = height;
                Helfer.AssembleBTreeChar(s, tree);
            }
            public override string ToString() => "Levelorder: " + tree.PrintIterative(TraverseType.LevelOrder) + "\nHeight: " + height; 
        }

        private class InOut : InOutBase<Input, char[]>
        {
            public InOut(string s, int h, string s2) : base(new Input(s, h), Helfer.AssembleChar(s2))
            {
                ergStringConverter = arg => Helfer.Arrayausgabe<char>("Ergebnis: ", arg);
                outputStringConverter = arg => Helfer.Arrayausgabe<char>("Erwartet: ", arg);
                CompareOutErg = (arg, arg2) => Helfer.ArrayVergleich<char>(arg, arg2);

                AddSolver((arg, erg) => erg.Setze(arg.tree.GetValuesAtHeight(arg.height)), "Iterativ");
            }
        }

        public Get_all_Values_at_a_Certain_Height_in_a_Binary_Tree()
        {
            testcases.Add(new InOut("1,2,3,4,5,7", 3, "4,5,7"));
            testcases.Add(new InOut("AbCDeFgRichtig", 4, "Richtig"));
        }
    }
}
