using Coding_Practices_and_Datastructures.GoF_Interview_Questions.Bit_Manipulations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Google:

        Given an integer, find the number of 1 bits it has.

        Here's an example and some starting code.

        def one_bits(num):
          # Fill this in.

        print(one_bits(23))
        # 4
        # 23 = 0b1011
        */
    class Number_of_1_Bits : Testable
    {
        public class InOut : InOutBase<int, int>
        {
            public InOut(int i, int i2) : base(i, i2, true)
            {
                AddSolver( (arg, erg) => erg.Setze(BIT.MyBitcount(arg)), "My BitCount" );
            }
        }

        public Number_of_1_Bits()
        {
            testcases.Add(new InOut(23, 4));
        }
    }
}
