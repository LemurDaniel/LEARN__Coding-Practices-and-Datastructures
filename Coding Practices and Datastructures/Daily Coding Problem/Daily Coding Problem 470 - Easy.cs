using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;

namespace Coding_Practices_and_Datastructures.Daily_Coding_Problem
{
    /*
     * 
    Good morning! Here's your coding interview problem for today.

    This problem was asked by Google.

    Given an array of numbers and an index i, return the index of the nearest larger number of the number at index i, where distance is measured in array indices.

    For example, given [4, 1, 3, 5, 6] and index 0, you should return 3.

    If two distances to larger numbers are the equal, then return any one of them. If the array at i doesn't have a nearest larger integer, then return null.

    Follow-up: If you can preprocess the array, can you do this in constant time?

   */

    class Daily_Coding_Problem_470___Easy : Testable
    {
        public class Input
        {
            public readonly int[] arr;
            public readonly int index;

            public Input(string str, int index)
            {
                this.arr = Helfer.Assemble(str);
                this.index = index;
            }

        }
        private class InOut : InOutBase<Input, Nullable<int>>
        {
            public InOut(string str, int index, int output) : base(new Input(str, index), output, true)
            {
                AddSolver(returnIndexOfLargestNeighbour);
            }

        }

        public Daily_Coding_Problem_470___Easy()
        {
            testcases.Add(new InOut("4;1;3;5;6", 0, 3));
        }

        private static void returnIndexOfLargestNeighbour(Input inp, InOut.Ergebnis erg)
        {
            int[] array = inp.arr;
            int index = inp.index;

            int left = index, right = index, num = array[index];

            while (--left >= 0)
            {
                if (array[left] > num) break;

            }

            while (++right < array.Length)
            {
                if (array[right] > num) break;
            }

            Nullable<int> leftDistance = null, rightDistance = null;

            if (left >= 0) leftDistance = index - left;
            if(right < array.Length) rightDistance = right - index;

            Nullable<int> shortestDistance = leftDistance ?? rightDistance;
            if (rightDistance != null && leftDistance != null && rightDistance < leftDistance)
                shortestDistance = rightDistance;

            erg.Setze(shortestDistance);
        }

    }
}
