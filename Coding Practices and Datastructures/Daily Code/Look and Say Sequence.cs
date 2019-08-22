using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Google:

        A look-and-say sequence is defined as the integer sequence beginning with a single digit in which the next term is obtained by describing the previous term. An example is easier to understand:

        Each consecutive value describes the prior value.

        1      #
        11     # one 1's
        21     # two 1's
        1211   # one 2, and one 1.
        111221 # #one 1, one 2, and two 1's.

        Your task is, return the nth term of this sequence.

    */
    class Look_and_Say_Sequence : Testable
    {
        private class InOut : InOutBase<int, string> 
        {
            public InOut (int i, string s) : base(i, s, true)
            {
                AddSolver(SolveSequentially);
            }
        }


        public Look_and_Say_Sequence()
        {
            testcases.Add(new InOut(0, ""));
            testcases.Add(new InOut(1, "1"));
            testcases.Add(new InOut(2, "11"));
            testcases.Add(new InOut(3, "21"));
            testcases.Add(new InOut(4, "1211"));
            testcases.Add(new InOut(5, "111221"));
            testcases.Add(new InOut(6, "312211"));
            testcases.Add(new InOut(7, "13112221"));
            testcases.Add(new InOut(8, "1113213211"));
            testcases.Add(new InOut(9, "31131211131221"));
            testcases.Add(new InOut(10, "13211311123113112211"));
            testcases.Add(new InOut(11, "11131221133112132113212221"));

            testcases.Add(new InOut(40, "-1"));
        }


        //SOL
        private static void SolveSequentially(int nth, InOut.Ergebnis erg)
        {
            string seq = "";
            while (nth-- > 0) seq = GetNextSequence(seq);
            erg.Setze(seq);
        }

        private static string GetNextSequence(string prev)
        {
            if (prev == "") return "1";
            if (prev == "1") return "11";

            string next = "";
            char curr = prev[0];
            int count = 1;

            for(int i=1; i<prev.Length; i++)
            {
                if (prev[i] == curr) count++;
                else
                {
                    next += count + "" + curr;
                    count = 1;
                    curr = prev[i];
                }
            }
            return next + count + "" + curr;
        }
    }
}
