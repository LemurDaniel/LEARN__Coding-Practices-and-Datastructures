using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
    Hi, here's your problem today. This problem was recently asked by Apple:

    Given an array of integers, arr, where all numbers occur twice except one number which occurs once, find the number.Your solution should ideally be O(n) time and use constant extra space.
    Example:
    Input: arr = [7, 3, 5, 5, 4, 3, 4, 8, 8]
    Output: 7
    */
    class Find_the_Single_Element_in_an_Array_of_Duplicates : Testable
    {
        public class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string s, int k) : base(s, k, true, true)
            {
                AddSolver(XOR_Solver);
            }
        }
        public Find_the_Single_Element_in_an_Array_of_Duplicates()
        {
            testcases.Add(new InOut("7,3,5,5,4,3,4,8,8", 7));
        }

        //SOL
        public static void XOR_Solver(int[] arr, InOut.Ergebnis erg)
        {
            int k = 0;
            foreach (int i in arr) k ^= i;
            erg.Setze(k ^ 0, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
