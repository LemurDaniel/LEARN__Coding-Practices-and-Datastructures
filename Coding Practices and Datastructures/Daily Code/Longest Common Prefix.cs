using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Microsoft:

        Given a list of strings, find the longest common prefix between all strings.

        Here's some examples and some starter code.

        def longest_common_prefix(strs):
          # Fill this in.
  
        print(longest_common_prefix(['helloworld', 'hellokitty', 'hell']))
        # hell

        print(longest_common_prefix(['daily', 'interview', 'pro']))
        # ''
    */

    class Longest_Common_Prefix : Testable
    {
        public class InOut : St_InOuts.Arr_Primary<string, string>
        {
            public InOut(string arr, string prefix ) : base(Helfer.AssembleString(arr), prefix)
            {
                AddSolver(Get_Longest_Common_Prefix);
                HasMaxDur = false;
            }
        }

        public Longest_Common_Prefix()
        {
            testcases.Add(new InOut("helloworld, hellokitty, hello", "hello"));
            testcases.Add(new InOut("daily, interview, pro", ""));
        }

        public static void Get_Longest_Common_Prefix(string[] arr, InOut.Ergebnis erg) => erg.Setze(Get_Longest_Common_Prefix(arr), Complexity.QUADRATIC, Complexity.LINEAR);
        public static string Get_Longest_Common_Prefix(string[] arr)
        {
            StringBuilder prefixBuilder = new StringBuilder();
            int increment = -1;
            while (true)
            {
                if (arr[0].Length == ++increment) return prefixBuilder.ToString(); // Check if EOS (END OF STRING)s
                char next = arr[0][increment]; // GET next char

                for (int i = 0; i < arr.Length; i++)
                    if (arr[i].Length == increment || arr[i][increment] != next) return prefixBuilder.ToString(); // Check if same char

                prefixBuilder.Append(next); // Append Char
            }

        }
    }
}
