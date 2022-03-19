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
     * 
    Good morning! Here's your coding interview problem for today.

    This problem was asked by Palantir.

    Write a program that checks whether an integer is a palindrome. 
    
    Do not convert the integer into a string.

   */

    class Daily_Coding_Problem_491___Easy : Testable
    {
        private class InOut : InOutBase<int, bool>
        {
            public InOut(int num, bool isPalindrome) : base(num, isPalindrome, true)
            {
                AddSolver(isPalindrome_noStringConversion);
            }

        }

        public Daily_Coding_Problem_491___Easy()
        {
            testcases.Add(new InOut(121, true));
            testcases.Add(new InOut(888, true));
            testcases.Add(new InOut(80808, true));
            testcases.Add(new InOut(800080008, true));
            testcases.Add(new InOut(8088, false));
            testcases.Add(new InOut(50055, false));
        }

        private static void isPalindrome_noStringConversion(int num, InOut.Ergebnis erg)
        {
            bool nextMostSignificantDigit_wasZero = false;
            while (num > 9)
            {
                int leastSignificantBit = num % 10;
                int orderOfMagnitude = (int)Math.Pow(10, Math.Floor(Math.Log10(num)));
                int mostSignificantBit = nextMostSignificantDigit_wasZero ? 0 : (int)(num / orderOfMagnitude);

                if (mostSignificantBit != leastSignificantBit)
                {
                    erg.Setze(false);
                    return;
                }

                // check if digit afer most significant is zero and therefore removed.
                nextMostSignificantDigit_wasZero = ((int)(num / (orderOfMagnitude / 10)) % 10) == 0;


                if (nextMostSignificantDigit_wasZero)
                    num += (int)orderOfMagnitude / 10;


                // remove most significant digit
                num %= orderOfMagnitude;
                // remove least significant digit
                num = (int)num / 10;

            }

            erg.Setze(true);
        }


    }
}
