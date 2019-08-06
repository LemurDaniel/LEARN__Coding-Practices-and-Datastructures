using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.DS_HANDBOOK.Stack;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.LinkedLists
{
    class Palindrom_Linked_List : Testable
    {

        private class InOut : InOutBase<LinkedList<char>, bool>
        {
            public InOut(string s, bool b) : base(LinkedList<char>.AssembleChar(s), b, true)
            {
                inputStringConverter = null;
                AddSolver((arg, erg) => erg.Setze(Solve(arg)));
            }
        }


        public Palindrom_Linked_List()
        {
            testcases.Add(new InOut("Radar", true));
            testcases.Add(new InOut("Radara", false));
            testcases.Add(new InOut("anna", true));
        }

        public static bool Solve(LinkedList<char> ll)
        {
            if (ll.Root == null) return false;
            LinkedList<char>.Node jumper = ll.Root, curr = ll.Root;
            LLStack<char> stack = new LLStack<char>();

            while (jumper.Next != null)
            {
                jumper = jumper.Next;
                if (jumper.Next == null)    // Ungerade Länge
                {
                    curr = curr.Next;   // Mitte überspringen
                    break;
                }
                jumper = jumper.Next;

                stack.Push(curr.Val);
                curr = curr.Next;
            }

            while(stack.Count > 0)
            {
                curr = curr.Next;
                if (Char.ToLower(stack.Pop()) != Char.ToLower(curr.Val)) return false;
            }

            return true;
        }
    }
}
