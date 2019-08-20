using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.MathEx
{
    class Implement_Square_Root : Testable
    {
        private class InOut : InOutBase<int, int>
        {
            public InOut(int x, int z) : base(x, z, true)
            {
                AddSolver(BinarySearchSqrt);
                AddSolver(BinarySearchSqrt2);
            }
        }

        public Implement_Square_Root()
        {
            testcases.Add(new InOut(9, 3));
            testcases.Add(new InOut(144, 12));
            testcases.Add(new InOut(145, -1));
        }


        // SOL

        private static void BinarySearchSqrt(int x, InOut.Ergebnis erg)
        {
            int it = 0, curr = 0;
            if (!Helfer.BinarySearch(0, x, ref curr, ref it, num => (num * num).CompareTo(x))) curr = -1;
            erg.Setze(curr, it, Complexity.LOGARITHMIC, Complexity.CONSTANT);
        }
        private static void BinarySearchSqrt2(int x, InOut.Ergebnis erg)
        {
            int it = 0, curr = 0;
            if (!Helfer.BinarySearch(0, x/2, ref curr, ref it, num => (num * num).CompareTo(x))) curr = -1;
            erg.Setze(curr, it, Complexity.LOGARITHMIC, Complexity.CONSTANT);
        }
    }
}
