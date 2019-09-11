using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Microsoft:

        You are given an array of integers. Return the length of the longest increasing subsequence (not necessarily contiguous) in the array.

        Example:
        [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]

        The following input should return 6 since the longest increasing subsequence is 0, 2, 6, 9 , 11, 15.

    */
    class Longest_Increasing_Subsequence : Testable
    {
        public class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string s, int i) : base(s, i, true)
            {
                AddSolver(LongestIncreasingSeq_From);
                HasMaxDur = false;
            }
        }


        public Longest_Increasing_Subsequence()
        {
            testcases.Add(new InOut("0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15", 6));
        }



        //SOL
        public static void LongestIncreasingSeq_From(int[] arr, InOut.Ergebnis erg)
        {
            int max = 0;
            int it = 0;
            for (int i=0, prev=0; i<arr.Length; i++, it++)
            {
                if (max >= arr.Length-i) break;
                if (i!=prev && arr[i] <= arr[prev]) continue;
                max = Math.Max(GetIncreasingSeq_From(i, arr, ref it), max);
                it--;
            }

            erg.Setze(max, Complexity.QUADRATIC, Complexity.CONSTANT);
        }
        public static int GetIncreasingSeq_From(int index, int[] arr, ref int it)
        {
            int max = 1;
            int curr = arr[index];
            for(; index<arr.Length; index++, it++)
            {
                if (arr[index] <= curr) continue;
                curr = arr[index];
                max++;
            }
            return max;
        }
    }
}
