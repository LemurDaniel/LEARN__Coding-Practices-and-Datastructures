using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Shifted_String : Testable
    {
        /*
         * Hi, here's your problem today. This problem was recently asked by Apple:

            You are given two strings, A and B. Return whether A can be shifted some number of times to get B.

            Eg. A = abcde, B = cdeab should return true because A can be shifted 3 times to the right to get B. A = abc and B= acb should return false.
            */
        public class InOut : St_InOuts.Arr_Primary<string, bool>
        {
            public InOut(string s, string s2, bool b) : base(new string[] { s, s2 }, b)
            {
                AddSolver((arg, erg) => erg.Setze(SolverConstantSpace(arg[0], arg[1]), Complexity.QUADRATIC, Complexity.CONSTANT));
                HasMaxDur = false;
            }
        }

        public Shifted_String()
        {
            testcases.Add(new InOut("abcde", "cdeab", true));
            testcases.Add(new InOut("abc", "acb", false));
        }


        public static bool SolverConstantSpace(string s, string s2)
        {
            if(s.Length != s2.Length)   return false;

            for(int i=0; i<s2.Length; i++)
            {
                if (s2[i] != s[0]) continue;
                bool check = true;
                for (int j = 0; j < s2.Length; j++) if (s[j] != s2[(i + j) % s2.Length]) check = false;
                if (check) return true;
            }
            return false;
        }
    }
}
