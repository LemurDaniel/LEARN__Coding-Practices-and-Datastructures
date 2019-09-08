using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    /*
     * Given a binary array, find the maximum number of consecutive 1s in this array
     */

    class Max_Consecutive_Ones : Testable
    {
        public class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string s, int i) : base(s, i, true)
            {
                AddSolver(FindMaxConsecutiveElement_InACollection);
            }
        }

        public Max_Consecutive_Ones()
        {
            testcases.Add(new InOut("1,1,0,1,1,1", 3));
        }



        //SOL
        public static void FindMaxConsecutiveElement_InACollection(ICollection<int> col, InOut.Ergebnis erg) => FindMaxConsecutiveElement_InACollection(col, 1, erg);
        public static void FindMaxConsecutiveElement_InACollection<T>(ICollection<T> col, T el, InOut.Ergebnis erg)
        {
            int max = 0, temp = 0, it = 0;
            foreach (T item in col)
            {
                it++;
                if (item.Equals(el)) temp++;
                else
                {
                    max = Math.Max(max, temp);
                    temp = 0;
                }
            }
            erg.Setze(Math.Max(max, temp), it, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
