using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Find_Missing_Numbers_in_an_Array : Testable
    {
        /*
         * 
         * Hi, here's your problem today. This problem was recently asked by Twitter:

            Given an array of integers of size n, where all elements are between 1 and n inclusive, find all of the elements of [1, n] that do not appear in the array. 
            Some numbers may appear more than once.

            Example:
            Input: [4,5,2,6,8,2,1,5]
            Output: [3,7]
         */
        public class InOut : St_InOuts.TwoIntArr
        {
            public InOut(string s, string s2) : base(s, s2, true, true, false)
            {
                AddSolver(MissingNumber);

                HasMaxDur = false;
            }
        }
        public Find_Missing_Numbers_in_an_Array()
        {
            testcases.Add(new InOut("1,2,2,4,5,5,6,8","3,7"));
        }


        public static void MissingNumber(int[] arr, InOut.Ergebnis erg)
        {
            List<int> res = new List<int>();
            for (int i = 0, pos; i < arr.Length; i++) {
                pos = Math.Abs(arr[i]) - 1;
                arr[pos] = -Math.Abs(arr[pos]);
            }
            for (int i = 0; i < arr.Length; i++) if (arr[i] > 0) res.Add(i+1);

            erg.Setze(res.ToArray(), Complexity.LINEAR, Complexity.CONSTANT, "Constant space excludes Resultarray");
        }
    }
}
