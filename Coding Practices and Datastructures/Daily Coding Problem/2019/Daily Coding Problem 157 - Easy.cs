using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Coding_Problem._2019
{
    /*
     * Good morning! Here's your coding interview problem for today.

    This problem was asked by Amazon.

    Given a string, determine whether any permutation of it is a palindrome.

    For example, carrace should return true, since it can be rearranged to form racecar, which is a palindrome. daily should return false, since there's no rearrangement that can form a palindrome.
    */
    class Daily_Coding_Problem_157___Easy : Testable
    {
        public class InOut : InOutBase<string, bool>
        {
            public InOut(string s, bool b) : base (s, b, true)
            {
                AddSolver(Hashset_Solver);
            }
        }

        public Daily_Coding_Problem_157___Easy()
        {
            testcases.Add(new InOut("carrace", true));
            testcases.Add(new InOut("daily", false));
        }

        //SOL
        public static void Hashset_Solver(string s, InOut.Ergebnis erg)
        {
            HashSet<char> chars = new HashSet<char>();
            foreach(char c in s)
            {
                if (chars.Contains(c)) chars.Remove(c);
                else chars.Add(c);
            }

            erg.Setze(chars.Count <= 1, Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
