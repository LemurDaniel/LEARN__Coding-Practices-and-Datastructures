using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by LinkedIn:

        Write a function that reverses the digits a 32-bit signed integer, x. Assume that the environment can only store integers within the 32-bit signed integer range, [-2^31, 2^31 - 1]. The function returns 0 when the reversed integer overflows.

        Example:
        Input: 123
        Output: 321
        */
    class Reverse_Integer : Testable
    {
        public class InOut : InOutBase<int, int>
        {
            public InOut(int i, int i2) : base(i, i2, true)
            {
                AddSolver(Solve);
            }
        }

        public Reverse_Integer()
        {
            testcases.Add(new InOut(123,321));
            testcases.Add(new InOut(2_147_483_647,0));
            testcases.Add(new InOut(147_483_647, 746_384_741));
        }


        public static void Solve(int num, InOut.Ergebnis erg) => erg.Setze(Solve(num), Complexity.LINEAR, Complexity.CONSTANT);

        //SOL
        public static int Solve(int num)
        {
            string sNum = Math.Abs(num) + "";
            int sign = num < 0 ? -1 : 1;

            num = Helfer.GetNumber(sNum[sNum.Length-1]);
            for (int i=sNum.Length-2; i >= 0; i--)
            {
                int tmp = num * 10 + Helfer.GetNumber(sNum[i]);
                if (tmp <= num) return 0;
                num = tmp;
            }

            return num;
        }
    }
}
