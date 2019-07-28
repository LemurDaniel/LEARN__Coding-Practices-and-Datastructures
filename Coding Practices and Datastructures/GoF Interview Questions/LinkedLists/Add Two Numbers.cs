using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.LinkedLists
{
    class Add_Two_Numbers : Testable
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

        public Add_Two_Numbers() : base ("--- Add Two Numbers ---")
        {
            testcases.Add(new InOut(new Input("243","564"),"708"));
            testcases.Add(new InOut(new Input("248973", "23264"), "470624"));
            testcases.Add(new InOut(new Input("0243987", "564957"), "5882568"));
            testcases.Add(new InOut(new Input("14553", "860905"), "906445"));
            testcases.Add(new InOut(new Input("0243989", "564959"), "58825801"));
        }


        private static void Solve(Input input, InOut.Ergebnis erg)
        {
            LinkedList<int> summand1 = input.summand1;
            LinkedList<int> summand2 = input.summand2;

            LinkedList<int>.Node node = summand1.Root, node2 = summand2.Root, outp = null;
            int val = 0;
            while(node != null || node2 != null || val > 0)
            {
                if (node != null)
                {
                    val += node.Val;
                    node = node.Next;
                }
                if (node2 != null)
                {
                    val += node2.Val;
                    node2 = node2.Next;
                }
                if (outp == null) outp = new LinkedList<int>(val % 10).Root;
                else
                {
                    outp.Next = new LinkedList<int>.Node(val % 10);
                    outp = outp.Next;
                }
                val /= 10;  // Overflow handeln --> val of next iteration == carry
            }
            erg.Setze(outp.List);
        }

    }
}
