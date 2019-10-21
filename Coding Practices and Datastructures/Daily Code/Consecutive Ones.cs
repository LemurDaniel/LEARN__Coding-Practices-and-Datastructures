using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * Hi, here's your problem today. This problem was recently asked by Microsoft:

        Return the longest run of 1s for a given integer n's binary representation.

        Example:
        Input: 242
        Output: 4
        242 in binary is 0b11110010, so the longest run of 1 is 4.
    */
    class Consecutive_Ones : Testable
    {
        public class InOut : InOutBase<int, int>
        {
            public InOut(int i, int i2) : base(i,i2, true)
            {
                AddSolver(Longest_run);
            }
        }

        public Consecutive_Ones()
        {
            testcases.Add(new InOut(242, 4));
        }

        public static void Longest_run(int n, InOut.Ergebnis erg)
        {
            int maxRun = 0, currRun = 0;
            while (n > 0)
            {
                if (n % 2 == 1) currRun++;
                else
                {
                    maxRun = Math.Max(maxRun, currRun);
                    currRun = 0;
                }

                n /= 2;
            }

            erg.Setze(Math.Max(currRun, maxRun), Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
