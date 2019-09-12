using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.MathEx
{
    class Implement_Pow : Testable
    {
        public class InOut : InOutBase<double[], double>
        {
            public InOut(double x, int n, double erg) : base(new double[] { x, n }, erg, true)
            {
                inputStringConverter = arg => "Num: " + x + "\nPow: " + n;
                AddSolver(PowRecurse);
                AddSolver(PowIt);
            }
        }

        public Implement_Pow()
        {
            testcases.Add(new InOut(5, 2, 25));
            testcases.Add(new InOut(5, 0, 1));
            for (int i = 0; i < 10; i++)
            {
                int num = Helfer.Rand.Next(5, 50);
                int pow = Helfer.Rand.Next(2, 10);
                testcases.Add(new InOut(num, pow, Math.Pow(num, pow)));
            }
        }

        //SOL
        public static void PowRecurse(double[] arr, InOut.Ergebnis erg) => erg.Setze(PowRecurse(arr[0], (int)arr[1]), Complexity.LINEAR, Complexity.LINEAR);
        public static void PowIt(double[] arr, InOut.Ergebnis erg) => erg.Setze(PowIt(arr[0], (int)arr[1]), Complexity.LINEAR, Complexity.CONSTANT);

        public static double PowRecurse(double x, int n) => n == 0 ? 1 : PowRecurse(x, n - 1) * x;
        public static double PowIt(double x, int n)
        {
            double erg = 1;
            while (n-- > 0) erg *= x;
            return erg;
        }
    }
}
