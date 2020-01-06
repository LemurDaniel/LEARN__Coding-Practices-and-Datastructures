using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Remove_Duplicate_Adjacent_Characters : Testable
    {
        /*
             Hi, here's your problem today. This problem was recently asked by Apple:

            Given a string, we want to remove 2 adjacent characters that are the same, and repeat the process with the new string until we can no longer perform the operation.

            Here's an example and some starter code:

            def remove_adjacent_dup(s):
              # Fill this in.

            print(remove_adjacent_dup("cabba"))
            # Start with cabba
            # After remove bb: caa
            # After remove aa: c
            # print c
         */

        public class InOut : InOutBase<string, string>
        {
            public InOut(string s, string s2) : base(s, s2, true)
            {
                AddSolver(Remove_Adjacent);
            }
        }

        public Remove_Duplicate_Adjacent_Characters()
        {
            testcases.Add(new InOut("cabba", "c"));
        }


        public static void Remove_Adjacent(string s, InOut.Ergebnis erg)
        {
            Stack<char> st = new Stack<char>();
            foreach(char c in s)
            {
                if (st.Count > 0 && st.Peek() == c) st.Pop();
                else st.Push(c);
            }

            erg.Setze(new string(st.ToArray()), Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
