using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;

namespace Coding_Practices_and_Datastructures.Daily_Coding_Problem
{
    /*    

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Apple.

    Implement the function fib(n), which returns the nth number in the Fibonacci sequence, using only O(1) space.

   */

    class Daily_Coding_Problem_451___Easy : Testable
    {
        private class InOut : InOutBase<int, int>
        {
            public InOut(int n, int fib) : base(n, fib, true)
            {
                AddSolver(fibonacci);
            }

        }

        public Daily_Coding_Problem_451___Easy()
        {
            testcases.Add(new InOut(1, 1));
            testcases.Add(new InOut(2, 1));
            testcases.Add(new InOut(3, 2));
            testcases.Add(new InOut(4, 3));
            testcases.Add(new InOut(17, 1597));
            testcases.Add(new InOut(30, 832040));
        }

        private static void fibonacci(int n, InOut.Ergebnis erg)
        {
            int temp, num = 0, num2 = 1;

            while(n-- > 1)
            {
                temp = num2;
                num2 = num + num2;

                num = temp;
            }

            erg.Setze(num2);
        }


    }
}
