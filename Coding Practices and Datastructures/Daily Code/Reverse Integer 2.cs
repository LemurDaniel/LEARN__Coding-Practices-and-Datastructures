using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * Hi, here's your problem today. This problem was recently asked by Amazon:

        Given an integer, reverse the digits. Do not convert the integer into a string and reverse it.

        Here's some examples and some starter code.

        def reverse_integer(num):
          # Fill this in.
  
        print(reverse_integer(135))
        # 531

        print(reverse_integer(-321))
        # -123

    */
    class Reverse_Integer_2 : Testable
    {
        public class InOut : InOutBase<int, int>
        {
            public InOut(int i, int i2) : base(i, i2, true)
            {
                AddSolver(Reverse_Int);
            }
        }

        public Reverse_Integer_2()
        {
            testcases.Add(new InOut(135, 531));
            testcases.Add(new InOut(-321, -123));
        }

        public static void Reverse_Int(int num, InOut.Ergebnis erg)
        {
            bool flag = num >= 0;
            num = Math.Abs(num);

            int rev = 0;

            while(num > 0)
            {
                rev = rev * 10 + num % 10;
                num /= 10;
            }

            erg.Setze(flag ? rev : -rev, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
