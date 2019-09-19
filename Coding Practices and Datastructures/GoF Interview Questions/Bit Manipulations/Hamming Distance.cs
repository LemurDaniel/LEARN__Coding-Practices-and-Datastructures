using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Bit_Manipulations
{
    /*
     * The Hamming distance between two integers is the number of positions at which the corresponding bits are different
     * */

    class Hamming_Distance : Testable
    {
        public class InOut : InOutBase<int[], int>
        {
            public InOut(int i, int i2, int i3) : base(new int[] { i, i2 }, i3, true)
            {
                inputStringConverter = arg => "Num: " + arg[0] + "\nNum2: " + arg[1];

                AddSolver((arg, erg) => erg.Setze(XOR_Solve(arg[0], arg[1])), "XOR_Solver");
            }
        }

        public Hamming_Distance()
        {
            testcases.Add(new InOut(0b001001,
                                    0b000010,3));
            testcases.Add(new InOut(0b1010010000,
                                    0b1010100011, 4));
            testcases.Add(new InOut(0b00100001011,
                                    0b00001010100, 7));
        }

        //SOL
        public static int XOR_Solve(int num, int num2) => BIT.SparseBitcount(num^num2);
    }
}
