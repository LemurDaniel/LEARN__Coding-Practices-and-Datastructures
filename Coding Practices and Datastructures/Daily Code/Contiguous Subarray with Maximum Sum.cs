using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * 
     *  Hi, here's your problem today. This problem was recently asked by Twitter:

        You are given an array of integers. 
        Find the maximum sum of all possible contiguous subarrays of the array.

        Example:    [34, -50, 42, 14, -5, 86]

        Given this input array, the output should be 137. 
        The contiguous subarray with the largest sum is [42, 14, -5, 86].

        Your solution should run in linear time.
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
    class Contiguous_Subarray_with_Maximum_Sum : Testable
    {
        private class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string s, int i) : base(s, i)
            {
                AddSolver(Max_subarray_sum);
                AddSolver(Max_subarray_sum2);
                AddSolver(Max_subarray_sum3);
            }
        }

        public Contiguous_Subarray_with_Maximum_Sum()
        {
            testcases.Add(new InOut("34,-50,42,14,-5,86",137));
            testcases.Add(new InOut("-5,-1,-6,-6,-8,-7", -1));
            testcases.Add(new InOut("50,7,-1,-1,-68,-7", 57));
        }



        //SOL
        /*
         * 
         * parse every element
         * if(sum-element <= 0) sequence ended, start next sequence
         * else sum+=element
         * 
         */

        private static void Max_subarray_sum(int[] arr, InOut.Ergebnis erg) => erg.Setze(Max_subarray_sum(arr), Complexity.LINEAR, Complexity.CONSTANT);
        private static void Max_subarray_sum2(int[] arr, InOut.Ergebnis erg) => erg.Setze(Max_subarray_sum2(arr), Complexity.LINEAR, Complexity.CONSTANT);
        private static void Max_subarray_sum3(int[] arr, InOut.Ergebnis erg) => erg.Setze(Max_subarray_sum3(arr), Complexity.LINEAR, Complexity.CONSTANT);
        private static int Max_subarray_sum(int[] arr)
        {
            int maxSum = 0, sum = 0;
            foreach(int el in arr)
            {
                if (sum + el <= 0)  maxSum = Math.Max(sum, maxSum);
                sum = Math.Max(0, sum+el);
            }
            maxSum = Math.Max(sum, maxSum);
            return maxSum;
        }

        private static int Max_subarray_sum2(int[] arr)
        {
            int maxSum = 0, sum = 0;
            int negSubArr = 0; // contigous negative Subarry
            int maxEl = arr[0];  // Incase all Negatvie => Array == least Negative Number
            bool allNeg = true;
            foreach (int el in arr)
            {
                maxEl = Math.Max(el, maxEl);
                if (sum + el <= 0)
                {
                    maxSum = Math.Max(sum - negSubArr, maxSum);
                    negSubArr = sum = 0;
                }
                else
                {
                    negSubArr = el >= 0 ? 0 : negSubArr + el;
                    if (negSubArr >= 0) allNeg = false;
                    sum = Math.Max(0, sum + el);
                }
            }
            maxSum = Math.Max(sum, maxSum);
            return allNeg ? maxEl : maxSum;
        }

        private static int Max_subarray_sum3(int[] arr)
        {
            int sum = 0, negs = 0, maxSum = 0;
            foreach(int el in arr)
            {
                sum += el;
                if (el < 0) negs += el;
                else negs = 0;

                if (sum > 0) continue;
                maxSum = Math.Max(maxSum, sum-negs);
                sum = negs = 0;
            }
            return Math.Max(sum, maxSum);
        }

    }
}
