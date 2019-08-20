using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Uber:

        You have a landscape, in which puddles can form. You are 
        given an array of non-negative integers representing the elevation at each location. 
        Return the amount of water that would accumulate if it rains.

        For example: [0,1,0,2,1,0,1,3,2,1,2,1] should return 6 because 6 units of water can get trapped here.

     * 
     */
    class Trapping_Rainwater : Testable
    {
        private class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string s, int i) : base (s, i)
            {
                AddSolver(SolveBoundaryScan);
                AddSolver(SolveSmallerBoundary);
                AddSolver(SolveSmallerBoundary2);
            }
        }

        public Trapping_Rainwater()
        {
            testcases.Add(new InOut("010210132121",6));
            testcases.Add(new InOut("10210132121102101321211021013212110210132121102101321211021013212110210132121102101321211021013212110210132121102101321211021013212110210132121", 234));
            string s = "0123456789";
            StringBuilder s2 = new StringBuilder();
            for (int i = 0; i < int.MaxValue / 64; i++) { s2.Append(s[Helfer.random.Next(0, s.Length)]); if (i % 1000000 == 0) Console.WriteLine(i); }
            testcases.Add(new InOut(s2.ToString(), -1));
        }


        /* SOL 1
         * 
         * Find first lowest Boundary from left and right
         * scan inbetween boundarys and subtract lowest boundary from all elements
         * redo until all el < 0
         * final sweep add all sub 0 vals
         */
        private static void SolveBoundaryScan(int[] arr, InOut.Ergebnis erg)
        {

            int nextBr = arr.Length-1, nextBl = 0;  //Indexes!!
            int bRight = arr[nextBr], bLeft = arr[nextBl];  //Vals
            int nextBrtmp = nextBr;

            do
            {
                for (int i = nextBl; i < nextBrtmp; i++)
                {
                    arr[i] -= Math.Min(bRight, bLeft);
                    if (arr[nextBl] <= 0 && arr[i] > 0) nextBl = i;
                    if (arr[nextBrtmp] <= 0 && arr[i] > 0) nextBr = i;
                }
                bRight = arr[nextBr];
                bLeft = arr[nextBl];
                nextBrtmp = nextBr;
                arr[nextBrtmp] -= Math.Min(bLeft, bRight);
            } while (bRight > 0 && bLeft > 0);

            //final sweep
            int sum = 0;
            for (int i = 0; i < arr.Length; i++) sum -= Math.Min(arr[i], 0);
            erg.Setze(sum, Complexity.QUADRATIC, Complexity.CONSTANT);
        }


        private static void SolveSmallerBoundary(int[] arr, InOut.Ergebnis erg)
        {

            int bRight = arr.Length - 1, bLeft = 0; 
            int sum = 0, count = 0;
            while (bLeft < bRight + 1)
            {
                if (arr[bLeft] <= arr[bRight])   //Evaluate lower boundary
                {
                    count = bLeft + 1;
                    while (arr[count] <= arr[bLeft] && count < bRight) sum += arr[bLeft] - arr[count++];  //Eval from left until bigger boundary found
                    bLeft = count;
                }
                else
                {
                    count = bRight - 1;
                    while (arr[count] <= arr[bRight] && count > bLeft) sum += arr[bRight] - arr[count--];  //Eval from right until bigger boundary found
                    bRight = count;
                }
            }
            erg.Setze(sum, Complexity.LINEAR, Complexity.CONSTANT);
        }

        private static void SolveSmallerBoundary2(int[] arr, InOut.Ergebnis erg)
        {
            int r = arr.Length - 1, l = 0;
            int lMax = 0, rMax = 0;
            int sum = 0;
            while (l <= r)
            {
                lMax = Math.Max(arr[l], lMax);
                rMax = Math.Max(arr[r], rMax);
                if (lMax <= rMax) sum += lMax - arr[l++];
                else sum += rMax - arr[r--];
            }
            erg.Setze(sum, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
