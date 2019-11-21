using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * Hi, here's your problem today. This problem was recently asked by Amazon:

        Given a string, return the first recurring letter that appears. If there are no recurring letters, return None.

        Example:
        Input: qwertty
        Output: t

        Input: qwerty
        Output: None

    */
    class First_Recurring_Character : Testable
    {
        public class InOut : InOutBase<string, string>
        {
            public InOut(string s, string s2) : base(s, s2 == null ? "None" : s2[0]+"", true)
            {
                AddSolver(Solver1);
            }
        }

        public First_Recurring_Character()
        {
            testcases.Add(new InOut("qwertty", "t"));
            testcases.Add(new InOut("qwerty", null));
        }

        public static void Solver1(string s, InOut.Ergebnis erg) => erg.Setze(Solver1(s));
        public static string Solver1(string s)
        {
            HashSet<char> set = new HashSet<char>();
            foreach(char c in s)
            {
                if (set.Contains(c)) return c+"";
                else set.Add(c);
            }
            return "None";
        }
    }
}
