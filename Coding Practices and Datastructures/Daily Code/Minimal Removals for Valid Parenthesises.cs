using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * Hi, here's your problem today. This problem was recently asked by Uber:

        You are given a string of parenthesis. Return the minimum number of parenthesis that would need to be removed in order to make the string valid. 
        "Valid" means that each open parenthesis has a matching closed parenthesis.

        Example:

        "()())()"

        The following input should return 1.
    */
    class Minimal_Removals_for_Valid_Parenthesises : Testable
    {
        public class InOut : InOutBase<string, int>
        {
            public InOut(string s, int i) : base(s, i, true)
            {
                AddSolver(GetMinimumRemovals);
                AddSolver(GetMinimumRemovals_ConstantSpace);
            }
        }

        public Minimal_Removals_for_Valid_Parenthesises()
        {
            testcases.Add(new InOut("()())()", 1));
        }


        //SOL
        public static void GetMinimumRemovals(string parent, InOut.Ergebnis erg)
        {
            Stack<char> st = new Stack<char>();
            int remove = 0;
            foreach(char c in parent)
            {
                if (c == ')')
                {
                    if (st.Count == 0 || st.Peek() != '(') remove++;
                    else st.Pop();
                }
                else if (c == '(') st.Push(c);
                else throw new Exception(c + " is not a Parenthesis");
            }

            erg.Setze(remove+st.Count, Complexity.LINEAR, Complexity.LINEAR);
        }



        public static void GetMinimumRemovals_ConstantSpace(string parent, InOut.Ergebnis erg)
        {
            int open = 0;
            int remove = 0;
            foreach (char c in parent)
            {
                if (c == ')')
                {
                    if (open > 0) open--;
                    else remove++;
                }
                else if (c == '(') open++;
                else throw new Exception(c + " is not a Parenthesis");
            }

            erg.Setze(remove+open, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
