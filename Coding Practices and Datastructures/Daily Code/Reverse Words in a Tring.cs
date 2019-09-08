using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Facebook:

        Given a string, you need to reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.

        Example 1:
        Input: "The cat in the hat"
        Output: "ehT tac ni eht tah"
        Note: In the string, each word is separated by single space and there will not be any extra space in the string.
    */

    class Reverse_Words_in_a_String : Testable
    {
        public class InOut : InOutBase<string, string>
        {
            public InOut (string s, string s2) : base(s, s2, true)
            {
                AddSolver(ReverseWords);
            }
        }

        public Reverse_Words_in_a_String()
        {
            testcases.Add(new InOut("The cat in the hat", "ehT tac ni eht tah"));
        }


        //SOL
        public static void ReverseWords(string s, InOut.Ergebnis erg)
        {
            string temp = "";
            StringBuilder reverse = new StringBuilder();
            foreach(char c in s){
                if (c != ' ') temp = c + temp;
                else
                {
                    reverse.Append(temp + c);
                    temp = "";
                }
            }
            reverse.Append(temp);
            erg.Setze(reverse.ToString());
        }
    }
}
