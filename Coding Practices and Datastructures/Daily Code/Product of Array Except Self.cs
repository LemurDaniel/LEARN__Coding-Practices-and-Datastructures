using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Amazon:

        You are given an array of integers. Return an array of the same size where the element at each index is the product of all the elements in the original array except for the element at that index.

        For example, an input of [1, 2, 3, 4, 5] should return [120, 60, 40, 30, 24].

        You cannot use division in this problem. Solve in O(n) time
        */
    class Product_of_Array_Except_Self : Testable
    {
        public class InOut : St_InOuts.SameArr<int>
        {
            public InOut(string s, string s2) : base(Helfer.Assemble(s), Helfer.Assemble(s2), true)
            {
                AddSolver(SolveMultiplePasses);
            }
        }

        public Product_of_Array_Except_Self()
        {
            testcases.Add(new InOut("1, 2, 3, 4, 5", "120, 60, 40, 30, 24"));
        }


        //SOL
        public static void SolveMultiplePasses(int[] arr, InOut.Ergebnis erg)
        {
            int[] ausgabe = new int[arr.Length];
            int it = 0;
            for(int i=0; i<arr.Length; i++)
            {
                int product = 1;
                for (int j = 0; j < arr.Length; j++, it++) if (j != i) product *= arr[j];
                ausgabe[i] = product;
            }

            erg.Setze(ausgabe, it, Complexity.QUADRATIC, Complexity.LINEAR);
        }
    }
}
