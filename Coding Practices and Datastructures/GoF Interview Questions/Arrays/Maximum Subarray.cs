using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    /*
     * Find the contiguous subarray within an array (containing at least one number) which has the largest sum.
     * For Example, given the array [-2,1,-3,4,-1,2,1-5,4],
     * the contiguous subarry [4,-1,2,1] has the largest sum = 6;
     * */
    class Maximum_Subarray : Testable
    {
        public class Output
        {
            public readonly int[] arr;
            public readonly int sum;
            public Output(int[] arr, int sum)
            {
                this.arr = arr;
                this.sum = sum;
            }
            public override string ToString() => Helfer.Arrayausgabe("Subarray: ", arr) + "\n+Summe: " + sum;
        }
        public class InOut : InOutBase<int[], Output>
        {
            public InOut(string s, string s2, int i) : base(Helfer.Assemble(s), new Output(Helfer.Assemble(s2), i), true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe("Eingabe: ", arg);
                AddSolver(FindContigousSubarray);
                HasMaxDur = false;
            }

        }

        public Maximum_Subarray()
        {
            testcases.Add(new InOut("-2,1,-3,4,-1,2,1,-5,4", "4,-1,2,1", 6));
        }

        //SOL
        public static void FindContigousSubarray(int[] arr, InOut.Ergebnis erg)
        {
            int maxSum = 0, sum = 0;
            List<int> maxSubArray = null;
            List<int> subArray = new List<int>();
            for(int i=0; i<arr.Length; i++)
            {
                if (sum + arr[i] > 0)
                {
                    sum += arr[i];
                    subArray.Add(arr[i]);
                } else
                {
                    if(sum > maxSum)
                    {
                        maxSubArray = subArray;
                        maxSum = sum;
                    }
                    subArray = new List<int>();
                    sum = 0;
                }
            }

            if (sum > maxSum)
            {
                maxSubArray = subArray;
                maxSum = sum;
            }
            erg.Setze(new Output(maxSubArray.ToArray(), maxSum), Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
