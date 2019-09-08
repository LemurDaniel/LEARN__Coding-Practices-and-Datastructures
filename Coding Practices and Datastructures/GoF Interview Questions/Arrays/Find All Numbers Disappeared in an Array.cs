using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    /*
     Given an array of integers where 1 <= a[i] <= n (n= size of array),
     some elements appear twice and others appear once.

    Find all the elements of [1, n] inclusive that do not appear in this array.

    Could you do it without extra space and in O(n) runtime? 
    You may assume the returned list does not count as extra space.

        IN:  [4,3,2,7,8,2,3,1]
        OUT: [5,6]
    */

    class Find_All_Numbers_Disappeared_in_an_Array : Testable
    {
        public class InOut : St_InOuts.SameArr<int>
        {
            public InOut(string s, string s2) : base (Helfer.Assemble(s), Helfer.Assemble(s2), true)
            {
                AddSolver(SolveConstSpace);
                AddSolver(SolveTwoPasses);
                AddSolver(SolveTwoPassesConstSpace);
            }
        }

        public Find_All_Numbers_Disappeared_in_an_Array()
        {
            testcases.Add(new InOut("4,3,2,7,8,2,3,1", "5,6"));
        }



        //SOL
        public static void SolveConstSpace(int[] arr, InOut.Ergebnis erg)
        {
            // since number range is in array size, you can simply put each number at it's corresponing place in the array
            int index = 0, temp,it = 0;
            while (index < arr.Length)
            {
                it++;
                temp = arr[arr[index] - 1];
                arr[arr[index] - 1] = arr[index];
                if (temp == arr[index]) index++;
                else arr[index] = temp;
            }

            IList<int> list = new List<int>();
            for (int i = 0; i < arr.Length; i++, it++) if (arr[i] != i + 1) list.Add(i + 1);

            erg.Setze(list.ToArray(), it, Complexity.LINEAR, Complexity.CONSTANT);
        }


        public static void SolveTwoPasses(int[] arr, InOut.Ergebnis erg)
        {
            int[] arr2 = new int[arr.Length];
            int it = 0;
            for (int i = 0; i < arr.Length; i++, it++) arr2[arr[i] - 1] = arr[i];

            IList<int> list = new List<int>();
            for (int i = 0; i < arr.Length; i++, it++) if (arr2[i] != i + 1) list.Add(i + 1);

            erg.Setze(list.ToArray(), it, Complexity.LINEAR, Complexity.LINEAR);
        }


        public static void SolveTwoPassesConstSpace(int[] arr, InOut.Ergebnis erg)
        {
            // since number range is in array size, you can simply put each number at it's corresponing place in the array
            // Instead of switching, mark number at pos negative, to indicate corresponding pos was seen
            int it = 0;
            for (int i = 0; i < arr.Length; i++, it++)
            {
                int pos = Math.Abs(arr[i]) - 1;
                arr[pos] = -Math.Abs(arr[pos]);
            }
            IList<int> list = new List<int>();
            for (int i = 0; i < arr.Length; i++, it++) if (arr[i] > 0) list.Add(i + 1);

            erg.Setze(list.ToArray(), it, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }

}
