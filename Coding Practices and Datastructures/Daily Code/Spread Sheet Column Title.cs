using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Amazon:

    MS Excel column titles have the following pattern: A, B, C, ..., Z, AA, AB, ..., AZ, BA, BB, ..., ZZ, AAA, AAB, ... etc. In other words, column 1 is named "A", column 2 is "B", column 26 is "Z", column 27 is "AA" and so forth. Given a positive integer, find its corresponding column name.
    Examples:
    Input: 26
    Output: Z

    Input: 51
    Output: AY

    Input: 52
    Output: AZ

    Input: 676
    Output: YZ

    Input: 702
    Output: ZZ

    Input: 704
    Output: AAB
    Here is a starting point:

    class Solution:
      def convertToTitle(self, n):
        # Fill this in.

    input1 = 1
    input2 = 456976
    input3 = 28
    print(Solution().convertToTitle(input1))
    # A
    print(Solution().convertToTitle(input2))
    # YYYZ
    print(Solution().convertToTitle(input3))
    # AB
    */
    class Spread_Sheet_Column_Title : Testable
    {
        public class InOut : InOutBase<int, string>
        {
            public InOut(int i, string s) : base (i, s, true)
            {
                AddSolver(Solver1);
            }
        }

        public Spread_Sheet_Column_Title()
        {
            testcases.Add(new InOut(26, "Z"));
            testcases.Add(new InOut(51, "AY"));
            testcases.Add(new InOut(52, "AZ"));
            testcases.Add(new InOut(676, "YZ"));
            testcases.Add(new InOut(702, "ZZ"));
            testcases.Add(new InOut(704, "AAB"));
            testcases.Add(new InOut(1, "A"));
            testcases.Add(new InOut(456976, "YYYZ"));
            testcases.Add(new InOut(28, "AB"));
        }

        public static string alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        public static void Solver1(int column, InOut.Ergebnis erg)
        {
            if (column < 1) return;
            string res = "";
            for (int i=column; i > alpha.Length;)
            {
                i /= alpha.Length;
                res += alpha[i-1 % alpha.Length];
            };
            erg.Setze(res + alpha[ (column-1) % alpha.Length], Complexity.LINEAR, Complexity.CONSTANT);
        }

 
    }
}
