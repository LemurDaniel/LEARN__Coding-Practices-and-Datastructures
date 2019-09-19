using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Bit_Manipulations
{
    /*
     * Given an integer, write a function to determine if it is a power of two.
     * 
     */
    class Power_of_Two : Testable
    {
        public class InOut : InOutBase<int, bool>
        {
            public InOut(int i, bool b) : base(i, b, true)
            {
                AddSolver(IsPowerOfTwo);
            }
        }

        public Power_of_Two()
        {
            testcases.Add(new InOut(2,true));
            testcases.Add(new InOut(256, true));
            testcases.Add(new InOut(7, false));
            testcases.Add(new InOut(512, true));
            testcases.Add(new InOut(2, true));
            testcases.Add(new InOut(1024, true));
            testcases.Add(new InOut(1024*1024, true));
            testcases.Add(new InOut(7645, false));
            testcases.Add(new InOut(227, false));
        }

        //SOL
        public static void IsPowerOfTwo(int num, InOut.Ergebnis erg) => erg.Setze(BIT.SparseBitcount(num) == 1);
    }
}
