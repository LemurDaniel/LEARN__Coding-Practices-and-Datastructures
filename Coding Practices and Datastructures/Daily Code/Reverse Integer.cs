using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
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
