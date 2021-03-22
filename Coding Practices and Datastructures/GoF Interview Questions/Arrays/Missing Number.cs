using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    public class Missing_Number : Testable
    {
        /*
            Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.
        
            Example:
            Given nums = [0, 1, 3] return 2.

            Note:
            Your algorithm should run in linear runtime complexity. 
            Could you implement it using only constant extra space complexity.
         */
        private class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string arr, int i) : this(Helfer.Assemble(arr), i) { }
            public InOut(int[] arr, int i) : base(arr, i, true, true)
            {
                AddSolver((arg, erg) => erg.Setze(TwoArrays(arg), Complexity.LINEAR, Complexity.LINEAR), "TwoArrays");
                AddSolver((arg, erg) => erg.Setze(Xor_array(arg), Complexity.LINEAR, Complexity.CONSTANT), "XOR");
                AddSolver((arg, erg) => erg.Setze(Sum_array(arg), Complexity.LINEAR, Complexity.CONSTANT), "Addition");
                AddSolver((arg, erg) => erg.Setze(Sub_array(arg), Complexity.LINEAR, Complexity.CONSTANT), "Subtraction");
            }
        }

        private static InOut GenerateRandomTestcase()
        {
            int[] arr = new int[Helfer.random.Next(5, 10)];
            int missing = Helfer.random.Next(0, arr.Length);
            for (int j = 0; j < arr.Length; j++)
            {
                if (j == missing) arr[j] = arr.Length;
                else arr[j] = j;
            }
            return new InOut(arr, missing);
        }
        public Missing_Number()
        {
            testcases.Add(new InOut("0,1,2,3,4,6", 5));

            for(int i=0; i<5; i++) {            
                testcases.Add(GenerateRandomTestcase());
            }
        }

        /*
            Array has 1 ... n values. Create second array and map all values of the first array to index of the second array
            Parse second array and find missing index

            Linear time complexity => 2n for two passes through array
            Linear space complexity => a second array of size n is created
         */

        public static int TwoArrays(int[] arr)
        {
            int[] arr2 = new int[arr.Length + 1];
            for(int i=0; i<arr.Length; i++)
            {
                int num = arr[i];
                arr2[num] = num;
            }

            for(int i=0; i<arr2.Length; i++)
            {
                if (arr2[i] != i) return i;
            }

            return -1;
        }

        /*
            When xoring the same number twice on a number, both nullify each other:
                ==> a^b^b = a
            
            When each number corresponds to an index in the array then you can xor each value with its index
            and eventually cancel those operations out. The number left will be the missing number since one
            index doesn't have a corresponding value and therefore its XOR-Operation won't be cancelled out.

            linear time complexity ==> only one pass through array
            constant space complexity ==> regardless of input size only one variable is created
         */
        public static int Xor_array(int[] arr)
        {
            // values range from 0 to n, but n doesn't have an index in the array
            // So xor it first with number n to account for the missing index
            int xor = 0 ^ arr.Length;

            for(int i=0; i<arr.Length; i++)
            {
                // continually xor the number with all array values and indexes
                xor = xor ^ arr[i] ^ i;
            }

            return xor;
        }

        /*
            Calculate the sum of elements 0 ... n.
            Sum up all elements in array.
            The Difference between the two sums is the missing number.

            linear time complexity ==> only one pass through array
            constant space complexity ==> regardless of input size only two variables are created
         */
        public static int Sum_array(int[] arr)
        {
            int target_sum = arr.Length * (arr.Length + 1) / 2;
            int sum = arr[0];
            for (int i = 1; i < arr.Length; i++)
            {
                sum += arr[i];
            }
  
            return target_sum - sum;
        }

        /*
            Similar to Xor one.

            Adding and then subtracting the same value will nullify the operation.
            When each value has a corresponding index, the addition of the index will cancel the subtraction.
            Whats left is the missing number.

            linear time complexity ==> only one pass through array
            constant space complexity ==> regardless of input size only one variable is created
         */
        public static int Sub_array(int[] arr)
        {
            int result = arr.Length;
            for (int i = 0; i < arr.Length; i++)
            {
                result = result - arr[i] + i;
            }

            return result;
        }

    }
}
