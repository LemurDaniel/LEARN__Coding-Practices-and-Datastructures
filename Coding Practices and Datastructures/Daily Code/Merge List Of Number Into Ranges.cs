using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * Hi, here's your problem today. This problem was recently asked by Facebook:

        Given a sorted list of numbers, return a list of strings that represent all of the consecutive numbers.

        Example:
        Input: [0, 1, 2, 5, 7, 8, 9, 9, 10, 11, 15]
        Output: ['0->2', '5->5', '7->11', '15->15']
        Assume that all numbers will be greater than or equal to 0, and each element can repeat.
    */

    class Merge_List_Of_Number_Into_Ranges : Testable
    {
        public class InOut : St_InOuts.TwoArr<int, string>
        {
            public InOut(string s, string s2) : base(Helfer.Assemble(s), Convert(s2))
            {
                AddSolver(SolveLinear);
            }
            public static string[] Convert(string s)
            {
                string[] arr = s.Split(',');
                for (int i = 0; i < arr.Length; i++) arr[i] = arr[i].Trim(' ');
                return arr;
            }
        }

        public Merge_List_Of_Number_Into_Ranges()
        {
            testcases.Add(new InOut("0,1,2,5,7,8,9,9,10,11,15", "0=>2, 5=>5, 7=>11, 15=>15"));
            testcases.Add(new InOut("-6,-5,-4,-2,0,1,2,5,7,8,9,9,10,11,15", "-6=>-4, -2=>-2, 0=>2, 5=>5, 7=>11, 15=>15"));
        }



        //SOL

        public static void SolveLinear(int[] inp, InOut.Ergebnis erg)
        {
            int low = inp[0];
            IList<string> list = new List<string>();
            int it = 0;
            for(int i=1; i<inp.Length; i++, it++)
            {
                if (Math.Abs(inp[i] - inp[i - 1]) <= 1) continue; //Is Consecutive Number => Continue
                list.Add( low + "=>" + inp[i-1] );
                low = inp[i];
            }
            list.Add(low + "=>" + inp[inp.Length-1]); //Add Last sequence

            erg.Setze(list.ToArray(), it, Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
