using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.MathEx
{
    class Implement_Sqrt_Double : Testable
    {
        private class InOut : InOutBase<int, double>
        {
            public InOut(int x, double z) : base(x, z, true)
            {
                ergStringConverter = erg => "Ausgabe: "+erg + " => " + erg * erg;
                CompareOutErg = (arg, arg2) => (arg - arg2) <= 0.00000000000001;
                AddSolver(BinarySearchSqrt);
                AddSolver(BinarySearchSqrt2);
            }
        }

        public Implement_Sqrt_Double()
        {
            testcases.Add(new InOut(9, 3));
            testcases.Add(new InOut(144, 12));
            testcases.Add(new InOut(145, 12.0415945787923));
        }


        // SOL

        private static void BinarySearchSqrt(int x, InOut.Ergebnis erg)
        {
            int it = 0;
            double low = 0, high = x, mid;
            while (true)
            {
                it++;
                mid = ( high + low ) / 2;
                int comp = (mid * mid).CompareTo(x);
                if (comp > 0) high = mid;
                else if (comp < 0) low = mid;
                else break;
            }
            erg.Setze(mid, it, Complexity.LOGARITHMIC, Complexity.CONSTANT);
        }
        private static void BinarySearchSqrt2(int x, InOut.Ergebnis erg)
        {
            int it = 0;
            long depth = 1;
            double low = 0, high = x, mid = 0;
            while (depth <= 100000000000)
            {
                it++;
                mid = (high + low) / 2;
                mid = ((double)(int)(mid * depth)) / depth;
                int comp = (mid * mid).CompareTo(x);
                if (comp > 0) high = mid;
                else if (comp < 0) low = mid;
                else break;
                if ((high - low) <= (1.0/Math.Min(depth*10,1))) depth *= 10;
            }
            erg.Setze(mid, it, Complexity.LOGARITHMIC, Complexity.CONSTANT);
        }
    }
}
