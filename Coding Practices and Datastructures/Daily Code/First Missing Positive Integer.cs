using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{

    /*
     * 
    Hi, here's your problem today. This problem was recently asked by Facebook:

    You are given an array of integers. Return the smallest positive integer that is not present in the array. The array may contain duplicate entries.

    For example, the input [3, 4, -1, 1] should return 2 because it is the smallest positive integer that doesn't exist in the array.

    Your solution should run in linear time and use constant space.
    */
    class First_Missing_Positive_Integer : Testable
    {
        private class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string s, int i) : base(s, i)
            {

            }
        }

        public First_Missing_Positive_Integer()
        {
            testcases.Add(new InOut("3,4,-1,1", 2));
        }




        //SOL
        private static void Solve(int[] arr){

            int smallest = arr[0], secSmallest = arr[0]; //smallest non positive
            for (int i = 0,tmp, curr; i < arr.Length; i++)
            {
                if (arr[i] < 0) continue;
                curr = arr[i];
                tmp = arr[curr];
                arr[curr] = curr;
                arr[i] = tmp;
            }

        }
    }
}
