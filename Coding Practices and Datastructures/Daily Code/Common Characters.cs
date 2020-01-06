using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Common_Characters : Testable
    {
        public class InOut : St_InOuts.TwoArr<string, char>
        {
            /*
             *  Hi, here's your problem today. This problem was recently asked by Apple:

                Given a list of strings, find the list of characters that appear in all strings.

                Here's an example and some starter code:

                def common_characters(strs):
                  # Fill this in.

                print(common_characters(['google', 'facebook', 'youtube']))
                # ['e', 'o']
            */
            public InOut(string s, string s2) : base(Helfer.AssembleString(s), Helfer.AssembleChar(s2), true)
            {
                AddSolver(Find_Common_Characters);
            }
        }

        public Common_Characters()
        {
            testcases.Add(new InOut("google, facebook, youtube", "e,o"));
        }

        public static void Find_Common_Characters(string[] arr, InOut.Ergebnis erg)
        {
            IDictionary<char, int> collision = new Dictionary<char, int>();
            IList<char> common = new List<char>();

            foreach(string s in arr)
            {
                foreach(char c in s)
                {
                    if (!collision.ContainsKey(c)) collision.Add(c, 0);
                    else if (collision[c] == 2) common.Add(c);
                    collision[c]++;
                }
            }

            erg.Setze(common.ToArray(), Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
