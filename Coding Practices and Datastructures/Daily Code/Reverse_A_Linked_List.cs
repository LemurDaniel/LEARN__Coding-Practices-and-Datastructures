using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.IO;
using System.Linq;
using System.Text;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Reverse_A_Linked_List : Testable
    {
        private class InOut : InOutBase<LinkedList<string>, LinkedList<string>>
        {
            public InOut(LinkedList<string> input) : base(input, input.Copy().Root.ReverseListIterative().List, true)
            {
                MAX_PRINT_LEN = 100;
                copiedInputProvider = arg => arg.Copy();
                AddSolver( (arg1, erg) => erg.Setze(arg1.Root.ReverseFromNodeIterative().List), "Reverse Iterativley");
                AddSolver((arg1, erg) => erg.Setze(arg1.Root.ReverseFromNodeRecursive().List), "Reverse Recursivley");
            }
        }
        //Konstruktor
        public Reverse_A_Linked_List() : base("--- Reverse a Linked List ---")
        {
            testcases.Add(new InOut(LinkedList<string>.Assemble(8).List));
            testcases.Add(new InOut(LinkedList<string>.Assemble(6).List));
            testcases.Add(new InOut(LinkedList<string>.Assemble(9_000).List));
        }

    }
}