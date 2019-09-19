using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Bit_Manipulations
{
    /*
     * Given an array of integers, every element appears twice except for one.
     * Find that single one
     * 
     * Requirements:
     *  O(n) Time Complexity
     *  O(1) Space Complexity
     * */
    class Single_Number  : Testable
    {
        public class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string s, int i) : base(s, i, true, true)
            {
                AddSolver(XOR_Solver);
            }
        }

        public Single_Number()
        {
            for(int i=0; i<10; i++)
            {
                int len = Helfer.random.Next(10, 30);
                if (len % 2 == 0) len++;
                int[] arr = new int[len];
                int x = Helfer.random.Next(0, 50);

                for (int j=0; j<arr.Length-1; j+=2)
                {
                    int num = Helfer.random.Next(0, 50);
                    if (num == x) i -= 2;
                    else arr[j] = arr[j + 1] = num;
                }
                arr[arr.Length - 1] = x;
                testcases.Add(new InOut(Helfer.Arrayausgabe(arr).Replace('{',' ').Replace('}',' '),x));
            }
        }

        public static void XOR_Solver(int[] arr, InOut.Ergebnis erg)
        {
            int x = 0;
            foreach (int num in arr) x ^= num;
            erg.Setze(x ^ 0, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
