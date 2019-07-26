using GoF_Coding_Interview_Algos.GoF_Interview_Questions._1_Data_Structures;
using GoF_Coding_Interview_Algos.Daily_Code;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoF_Coding_Interview_Algos.GoF_Interview_Questions.LinkedLists
{
    class Reverse_Linked_List_2 : Testable
    {
        private class Input {
            private string s;
            public LinkedList<int> list;
            public int m, n;

            public Input(int m,int n, string s)
            {
                this.m = m;
                this.n = n;
                this.s = s;
                list = LinkedList<int>.Assemble(s);
            }
            public override string ToString() => list + String.Format("\nRange: ({0}, {1})", m, n);
            public Input Copy() => new Input(m, n, s);
        }

        private class InOut : InOutBase<Input, LinkedList<int>>
        {
            public InOut(Input input, string output) : base(input, LinkedList<int>.Assemble(output), true)
            {
                MAX_PRINT_LEN = 100;
                copiedInputProvider = arg => arg.Copy();
                AddSolver((inp, erg) => erg.Setze(inp.list.ReverseBetween(inp.m, inp.n, true)), "Reverse Iterative");
                AddSolver((inp, erg) => erg.Setze(inp.list.ReverseBetween(inp.m, inp.n, false)), "Reverse Recursive");
            }
        }
        //Konstruktor
        public Reverse_Linked_List_2() : base("--- Reverse Linked List II ---")
        {
            testcases.Add(new InOut(new Input(2, 4, ""), ""));
            testcases.Add(new InOut(new Input(2, 4, "1"), "1"));
            testcases.Add(new InOut(new Input(2, 2, "123"), "123"));
            testcases.Add(new InOut(new Input(1, 4, "12"), "21"));           
            testcases.Add(new InOut(new Input(2, 3, "123"), "132"));
            testcases.Add(new InOut(new Input(2, 4, "12345"),"14325"));
            testcases.Add(new InOut(new Input(-1, 90, "123456789"), "987654321"));
            testcases.Add(new InOut(new Input(3, 6, "123456789"), "126543789"));
        }
    }
}
