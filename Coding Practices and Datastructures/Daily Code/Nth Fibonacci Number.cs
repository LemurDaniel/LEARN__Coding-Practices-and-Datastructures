using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Nth_Fibonacci_Number : Testable
    {
        public class InOut : InOutBase<int, int>
        {
            public InOut(int n, int n2) : base(n, n2, true)
            {
                AddSolver(Solve_Recursive);
                AddSolver(Solve_It);
            }
        }

        public Nth_Fibonacci_Number()
        {
            testcases.Add(new InOut(-2, 0));
            testcases.Add(new InOut(0, 0));
            testcases.Add(new InOut(1, 1));
            testcases.Add(new InOut(2, 1));
            testcases.Add(new InOut(3, 2));
            testcases.Add(new InOut(7, 13));

            testcases.Add(new InOut(40, 102334155));
        }

        public static void Solve_Recursive(int nth, InOut.Ergebnis erg) => erg.Setze(Solve_Recursive(nth), Complexity.LINEAR, Complexity.LINEAR);
        public static void Solve_It(int nth, InOut.Ergebnis erg) => erg.Setze(Solve_It(nth), Complexity.LINEAR, Complexity.CONSTANT);
        //SOL
        public static int Solve_Recursive(int nth) => nth <= 1 ? Math.Max(0, nth) : Solve_Recursive(nth - 1) + Solve_Recursive(nth - 2);

        public static int Solve_It(int nth)
        {
            if (nth <= 0) return 0;

            int sumM1 = 0, sumM2 = 1;
            for (int temp; nth >= 2; nth--)
            {
                temp = sumM2;
                sumM2 = sumM1;
                sumM1 += temp;
            }
            return sumM1 + sumM2;
        }
    }
}
