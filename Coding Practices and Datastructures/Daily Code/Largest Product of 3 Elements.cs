using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     *Hi, here's your problem today. This problem was recently asked by Microsoft:
        
        You are given an array of integers. 
        Return the largest product that can be made by multiplying any 3 integers in the array.

        Example:
        [-4, -4, 2, 8] should return 128 as the largest product can be made by multiplying -4 * -4 * 8 = 128.
      */
    class Largest_Product_of_3_Elements : Testable
    {
        private class InOut : InOutBase<int[], int>
        {
            public InOut(string s, int i) : base(Helfer.Assemble(s), i, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe<int>("Eingabe: ", arg);
                AddSolver((arg, erg) => erg.Setze(MaxProdOfThree_Enumerable(arg), Complexity.LINEAR, Complexity.CONSTANT), "MaxProdOfThree_Enumerable");
                AddSolver((arg, erg) => erg.Setze(MaxProdOfThree_SortedArray(arg), Complexity.LINEAR, Complexity.CONSTANT), "MaxProdOfThree_SortedArray");
            }
        }

        public Largest_Product_of_3_Elements()
        {
            testcases.Add(new InOut("-4,-4,2,8", 128));
            testcases.Add(new InOut("-4,-4,-1,-1", -4));
            testcases.Add(new InOut("-4,2,8,8", 128));
        }


        // SOL
        private static int MaxProdOfThree_Enumerable(int[] arr)
        {
            IEnumerable<int> enu = arr.OrderByDescending(i => Math.Abs(i));
            int negSum = 1; //Topmost positive and 2 Topmost negative ints
            int posSum = 1; //All Top Positive ints
            int posCountPosSum = 3;

            int negCountNegSum = 2;
            int posCountNegSum = 1;
            foreach(int z in enu)
            {
                if (posCountPosSum > 0 && z > 0)
                {
                    posSum *= z;
                    posCountPosSum--;
                }
                if (posCountNegSum > 0 && z > 0)
                {
                    negSum *= z;
                    posCountNegSum--;
                }else if(negCountNegSum > 0 && z < 0)
                {
                    negSum *= z;
                    negCountNegSum--;
                }

                if (negCountNegSum + posCountNegSum + posCountPosSum == 0) break;
            }
            if (posCountPosSum != 0) posSum = 0;
            if (posCountNegSum + negCountNegSum != 0) negSum = 0;
            return Math.Max(negSum, posSum);
        }

        private static int MaxProdOfThree_SortedArray(int[] arr)
        {
            if (arr.Length < 3) throw new InvalidOperationException("Arraylength must be greater or equal to 2");
            Array.Sort(arr);
            //if(arr[arr.Length-1] < 0) // Only Negative Elements in Array ==> Covered by PosSum ==> Summing topmost 3 Elements of Array which should be the 3 smallest negative ints

            int negSum = arr[arr.Length-1] * arr[0] * arr[1];  // Topmost Positive ints * 2 most negative ints
            int posSum = arr[arr.Length-1] * arr[arr.Length-2] * arr[arr.Length-3]; // 3 most positive ints
            return Math.Max(negSum, posSum);
        }
    }
}
