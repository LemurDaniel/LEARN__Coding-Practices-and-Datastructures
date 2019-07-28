using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.LinkedLists
{
    class Add_Two_Numbers_II : Testable
    {
        private class Input
        {
            public LinkedList<int> summand1, summand2;
            private string s1, s2;
            public Input(string s1, string s2)
            {
                this.s1 = s1;
                this.s2 = s2;
                summand1 = LinkedList<int>.Assemble(s1);
                summand2 = LinkedList<int>.Assemble(s2);
            }
            public override string ToString() => String.Format("({0}) + ({1})", summand1.ToString(), summand2.ToString());
            public Input Copy() => new Input(s1, s2);

        }

        private class InOut : InOutBase<Input, LinkedList<int>>
        {
            public InOut(Input input, string output) : base(input, LinkedList<int>.Assemble(output), true)
            {
                copiedInputProvider = arg => arg.Copy();
                AddSolver(Solve, "Solver 1");
            }
        }

        public Add_Two_Numbers_II() 
        {
            testcases.Add(new InOut(new Input("7243", "564"), "7807"));
            testcases.Add(new InOut(new Input("0", "0"), "0"));
            testcases.Add(new InOut(new Input("000", "000"), "0"));
            testcases.Add(new InOut(new Input("001000", "0010"), "1010"));
        }


        private static void Solve(Input input, InOut.Ergebnis erg)
        {
            LinkedList<int>.Node summand1 = input.summand1.Root;
            LinkedList<int>.Node summand2 = input.summand2.Root;

            System.Collections.Generic.Stack<int> s1 = new System.Collections.Generic.Stack<int>();
            System.Collections.Generic.Stack<int> s2 = new System.Collections.Generic.Stack<int>();

            while (summand1 != null || summand2 != null)
            {
                if (summand1 != null)
                {
                    s1.Push(summand1.Val);
                    summand1 = summand1.Next;
                }
                if (summand2 != null)
                {
                    s2.Push(summand2.Val);
                    summand2 = summand2.Next;
                }
            }

            LinkedList<int>.Node sum = null, node2 = null;
            int val = 0;

            while (s1.Count > 0 || s2.Count > 0)
            {
                val = val / 10 + (s1.Count > 0 ? s1.Pop() : 0) + (s2.Count > 0 ? s2.Pop() : 0);
                node2 = new LinkedList<int>.Node( val % 10);
                node2.Next = sum;
                sum = node2;
            }

            if (sum == null) sum = new LinkedList<int>.Node(0);
            else if(sum.Val == 0 && sum.Next != null)
            {
                while (sum.Val == 0 && sum.Next != null) sum = sum.Next;
                sum.SetAsRootToList(sum.List);
            }
            erg.Setze(sum.List);
        }
    }
}
