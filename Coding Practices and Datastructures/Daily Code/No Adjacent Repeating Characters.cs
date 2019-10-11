using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class No_Adjacent_Repeating_Characters : Testable
    {
        /*
         * 
         * Hi, here's your problem today. This problem was recently asked by LinkedIn:

            Given a string, rearrange the string so that no character next to each other are the same. If no such arrangement is possible, then return None.

            Example:
            Input: abbccc
            Output: cbcbca
            */
        public class InOut : St_InOuts.SameArr<char>
        {
            public InOut (string s) : base (s.ToCharArray(), null, true)
            {
                CompareOutErg = Check;
                HasMaxDur = true;

                AddSolver(Stack_Solver);
            }
            public bool Check(char[] c1, char[] c)
            {
                for (int i = 1; i < c.Length; i++) if (c[i - 1] == c[i]) return false;
                return true;
            }
        }
        public No_Adjacent_Repeating_Characters()
        {
            testcases.Add(new InOut("abbccc"));
        }


        //SOL
        public static void Stack_Solver(char[] arr, InOut.Ergebnis erg)
        {

        }
    }
}
