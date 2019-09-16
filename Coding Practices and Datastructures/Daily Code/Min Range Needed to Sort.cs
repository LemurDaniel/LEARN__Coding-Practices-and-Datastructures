using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     Hi, here's your problem today. This problem was recently asked by Twitter:

        Given a list of integers, return the bounds of the minimum range that must be sorted so that the whole list would be sorted.

        Example:
        Input: [1, 7, 9, 5, 7, 8, 10]
        Output: (1, 5)
        Explanation:
        The numbers between index 1 and 5 are out of order and need to be sorted.
         
         */

    class Min_Range_Needed_to_Sort : Testable
    {
        public class InOut : St_InOuts.TwoIntArr
        {
            public InOut(string s, string s2) : base(s, s2, true)
            {
                AddSolver(Solve_TwoPointers);
            }
        }

        public Min_Range_Needed_to_Sort()
        {
            testcases.Add(new InOut("1,7,9,5,7,8,10", "1,5"));
        }


        //SOL
        public static void Solve_TwoPointers(int[] arr, InOut.Ergebnis erg)
        {
            int ptLeft = 0;
            int leftMax = arr[ptLeft];
            //first pass left
            for (int i = 0; i < arr.Length; i++)
            {
                if (arr[i] < leftMax) ptLeft = i;
                else leftMax = arr[i];
            }

            int ptRight = arr.Length - 1;
            int rightMin = arr[ptRight];
            //second pass from right
            for (int i = arr.Length - 1; i >= 0; i--)
            {
                if (arr[i] > rightMin) ptRight = i;
                else rightMin = arr[i];
            }

            erg.Setze(new int[] { ptRight, ptLeft }, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
