using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Google:

        Given a list of positive numbers, find the largest possible set such that no elements are adjacent numbers of each other.

        Here's some example and some starter code

        def maxNonAdjacentSum(nums):
          # Fill this in.
  
        print(maxNonAdjacentSum([3, 4, 1, 1]))
        # 5
        # max sum is 4 (index 1) + 1 (index 3)

        print(maxNonAdjacentSum([2, 1, 2, 7, 3]))
        # 9
        # max sum is 2 (index 0) + 7 (index 3)
        
         */
    class Maximum_Non_Adjacent_Sum : Testable
    {
        public class InOut : St_InOuts.TwoIntArr
        {
            public InOut(string s, int ind1, int ind2) : base(s, ind1+","+ind2, true)
            {
                Func<int[], string> conv = arg => string.Format("Max sum is {0} (index {1}) + {2} (index {3})  => Sum: {4}", base.Input[arg[0]], arg[0], base.Input[arg[1]], arg[1], base.Input[arg[0]] + base.Input[arg[1]]);
                ergStringConverter = arg => conv(arg);
                outputStringConverter = arg => conv(arg);

                AddSolver(Solve_BruteForce);
            }
        }

        public Maximum_Non_Adjacent_Sum()
        {

            testcases.Add(new InOut("3, 4, 1, 1", 1, 3));
            testcases.Add(new InOut("2,1,2,7,3", 0, 3));
        }

        public static void Solve_BruteForce(int[] arr, InOut.Ergebnis erg)
        {
            HashSet<int> doubles = new HashSet<int>();
            int maxInd1 = 0, maxInd2 = 0, maxSum = 0;
            int cycles = 0;

            for(int i=0; i<(arr.Length+1) / 2; i++) // Only Process half of the Array
            {
                if (doubles.Contains(arr[i])) continue;
                doubles.Add(arr[i]); // Don't Process Number that apear multiple times

                for (int curr = arr[i], j = 0; j < arr.Length; j++, cycles++)
                {
                    if (i - j == 0 || i - j == 1 || i - j == -1) continue;
                    if (curr + arr[j] <= maxSum) continue;
                    maxSum = curr + arr[j];
                    maxInd1 = i;
                    maxInd2 = j;
                }
            }

            erg.Setze(new int[] { maxInd1, maxInd2 }, cycles, Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
