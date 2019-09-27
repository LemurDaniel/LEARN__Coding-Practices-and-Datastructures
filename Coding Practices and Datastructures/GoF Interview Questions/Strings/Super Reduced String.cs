using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Strings
{
    /*
     * Steve has a string, s, consisting of n lowercase English alphabetic letters. In one operation, he can delete any pair of adjacent letters with same value.
     * For example, stirng "aabcc" would become either "aab" or "bcc" after 1 opeartion
     * 
     * Steve want to reduce s as much as possible. To do this, he will repeat the above operation as many times as it can be performed. 
     * Help Steve out by finding and printing s's non-reducible form!
     * 
     * Note: If the final string is empty, print Empty String
     */
    class Super_Reduced_String : Testable
    {
        public class InOut : InOutBase<string, string>
        {
            public InOut(string s, string s2) : base(s, s2, true)
            {
                AddSolver(Solver_Stack);
            }
        }

        public Super_Reduced_String()
        {
            testcases.Add(new InOut("aaabccddd", "abd"));
            testcases.Add(new InOut("baab", "Empty String"));
        }


        //SOL
        public static void Solver_Stack(string s, InOut.Ergebnis erg)
        {
            Stack<char> stack = new Stack<char>();
            for(int i=0; i<s.Length; i++)
            {
                if (stack.Count == 0 || stack.Peek() != s[i]) stack.Push(s[i]);
                else stack.Pop();
            }

            StringBuilder sb = new StringBuilder();
            foreach (char c in stack.Reverse()) sb.Append(c);
            erg.Setze(sb.Length == 0 ? "Empty String":sb.ToString(), Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
