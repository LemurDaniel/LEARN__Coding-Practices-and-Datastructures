using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Strings
{
    class Reverse_Vowels_of_a_String : Testable
    {
        public class InOut : InOutBase<string, string>
        {
            public InOut(string s, string s2) : base(s, s2, true)
            {
                AddSolver(SolveCharArray);
                AddSolver(SolveStringbuilder);
            }
        }


        public Reverse_Vowels_of_a_String()
        {
            testcases.Add(new InOut("Leetcode","Leotcede"));
            testcases.Add(new InOut("Leetoode", "Leotoede"));
        }




        public static readonly string VOWELS = "aeiouAEIOU";

        //SOL
        public static void SolveCharArray(string s, InOut.Ergebnis erg)
        {
            char[] cArr = s.ToCharArray();
            int ptLeft = 0, ptRight = cArr.Length - 1;
            while(ptLeft < ptRight)
            {
                if (!VOWELS.Contains(cArr[ptLeft])) ptLeft++;
                else if (!VOWELS.Contains(cArr[ptRight])) ptRight--;
                else
                {
                    char temp = cArr[ptLeft];
                    cArr[ptLeft++] = cArr[ptRight];
                    cArr[ptRight--] = temp;
                }
            }


            erg.Setze(new string(cArr), Complexity.LINEAR, Complexity.LINEAR);
        }



        public static void SolveStringbuilder(string s, InOut.Ergebnis erg)
        {
            StringBuilder fHalf = new StringBuilder(), sHalf = new StringBuilder();
            int ptLeft = 0, ptRight = s.Length - 1;
            while (ptLeft < ptRight)
            {
                bool b1 = !VOWELS.Contains(s[ptLeft]);
                bool b2 = !VOWELS.Contains(s[ptRight]);

                if (b1) fHalf.Append(s[ptLeft++]);
                if (b2) sHalf.Insert(0, s[ptRight--]);
                if (b1 || b2) continue;
                sHalf.Insert(0, s[ptLeft++]);
                fHalf.Append(s[ptRight--]);
            }


            erg.Setze(fHalf.ToString() + (s.Length%2==0 ? "":s[s.Length/2+1]+"") + sHalf.ToString(), Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
