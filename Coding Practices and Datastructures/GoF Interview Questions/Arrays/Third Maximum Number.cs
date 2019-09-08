using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Third_Maximum_Number : Testable
    {
        /*
         Given a non-empty array of integers, return the third maximum number in this array. 
         If it does not exist, return the maximum number.
         The time complexity must be in O(n)
        */

        public class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string s, int i) : base(s, i, true)
            {
                AddSolver(SolveOnePass);
            }
        }

        public Third_Maximum_Number()
        {
            testcases.Add(new InOut("3,2,1",1));
            testcases.Add(new InOut("1,2", 2));
            testcases.Add(new InOut("2,2,3,1", 1));
        }


        //SOL
        public static void SolveOnePass(int[] arr, InOut.Ergebnis erg)
        {
            int max3 = int.MinValue, max2 = int.MinValue, max1 = int.MinValue, it=0;
            for (int i = 0, curr = arr[0]; i < arr.Length; i++, it++)
            {
                curr = arr[i];
                if (curr == max1 || curr == max2 || curr == max3) continue;
                else if (curr > max1)
                {
                    max3 = max2;
                    max2 = max1;
                    max1 = curr;
                }
                else if (curr > max2)
                {
                    max3 = max2;
                    max2 = curr;
                }
                else max3 = curr;
            }

            erg.Setze( max3 == int.MinValue ? max1 : max3, it, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
