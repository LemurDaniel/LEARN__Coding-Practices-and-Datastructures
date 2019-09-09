using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Strings
{
    class Longest_Substring_without_Repeating_Characters : Testable
    {    
        public class InOut : InOutBase<string, string>
        {
            public InOut(string s, string s2) : base(s, s2, true)
            {
                AddSolver(SolveOnePass);
            }
        }

        public Longest_Substring_without_Repeating_Characters()
        {
            testcases.Add(new InOut("abcabcbb", "abc"));
            testcases.Add(new InOut("bbbbb", "b"));
            testcases.Add(new InOut("pwwkew", "wke"));
        }


        //SOL
        public static void SolveOnePass(string s, InOut.Ergebnis erg)
        {
            HashSet<char> chars = new HashSet<char>();
            string max = "";
            StringBuilder sb = new StringBuilder();
            foreach(char c in s)
            {
                if (chars.Contains(c))
                {
                    if (sb.Length > max.Length) max = sb.ToString();
                    chars.Clear();
                    sb.Clear();
                }
                chars.Add(c);
                sb.Append(c);
            }

            erg.Setze(max.Length >= sb.Length ? max : sb.ToString(), Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
