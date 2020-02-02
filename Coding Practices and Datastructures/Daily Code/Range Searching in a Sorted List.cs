using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Range_Searching_in_a_Sorted_List : Testable
    {
        /*
         * Hi, here's your problem today. This problem was recently asked by Twitter:

            Given a sorted list with duplicates, and a target number n, find the range in which the number exists (represented as a tuple (low, high), both inclusive. 
            If the number does not exist in the list, return (-1, -1)).

            Here's some examples and some starter code.

            def find_num(nums, target):
              # Fill this in.

            print(find_num([1, 1, 3, 5, 7], 1))
            # (0, 1)

            print(find_num([1, 2, 3, 4], 5))
            # (-1, -1)
         */

        public class InOut : St_InOuts.TwoIntArr
        {
            public InOut(string s, int i,  string s2) : base (s+","+i, s2)
            {
                inputStringConverter = arg => "Array: " + Helfer.Arrayausgabe(arg, 0, arg.Length - 1) + "\nTarget: " + i;
                AddSolver(Range_Search);
            }
        }

        public Range_Searching_in_a_Sorted_List()
        {
            testcases.Add(new InOut("1,1,3,5,7", 1, "0,1"));
            testcases.Add(new InOut("1,2,3,4", 5, "-1,-1"));
        }

        public static void Range_Search(int[] input, InOut.Ergebnis erg) => Range_Search(Helfer.GenerateSubArray(input, input.Length - 2, 0), input[input.Length - 1], erg);
        public static void Range_Search(int[] nums, int target, InOut.Ergebnis erg)
        {
            int up = nums.Length - 1, low = 0, curr = 0;
            int cycles = 0;
            int[] range;
            while (up - low > 1)
            {
                cycles++;
                curr = (up - low) / 2;
                if (nums[curr] > target) up = curr - 1;
                else if (nums[curr] < target) low = curr + 1;
                else break;
            }

            curr = (up - low) / 2;
            if (nums[curr] == target)
            {
                //FIND UPPER
                int temp = curr;
                if (temp < nums.Length) while (nums[temp + 1] == target) temp++;
                //FIND LOWER
                if (curr > 0) while (nums[curr - 1] == target) curr--;

                range = new int[] { curr, temp };
            }
            else range = new int[] { -1, -1 };

            erg.Setze(range, cycles, Complexity.LOGARITHMIC, Complexity.CONSTANT);
        }


    }
}
