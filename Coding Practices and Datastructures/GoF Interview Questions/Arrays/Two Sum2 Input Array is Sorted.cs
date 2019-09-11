using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Two_Sum2_Input_Array_is_Sorted : Two_Sum_GoF
    {
        public new class InOut : Two_Sum_GoF.InOut
        {
            public InOut(string s, int i, string s2) : base(s, i, s2)
            {
                ClearSolvers();
                AddSolver(TwoSum_BinarySearch);
                AddSolver(TwoSum_TwoPointers);
            }
        }

        public Two_Sum2_Input_Array_is_Sorted()
        {
            testcases.Clear();
            testcases.Add(new InOut("2,7,11,15",9, "1,2"));
        }


        //SOL
        public static void TwoSum_BinarySearch(Input inp, InOut.Ergebnis erg)
        {
            int[] arr = inp.arr;
            int tar = inp.target;
            int it = 0;
            Output outp = new Output(null);
            for(int i=0; i<arr.Length-1; i++, it++)
            {
                int curr = 0;
                if (Helfer.BinarySearch(i+1, arr.Length - 1, ref curr, ref it, ind => arr[ind].CompareTo(tar - arr[i])))
                {
                    outp = new Output(new int[] { i+1, curr+1});
                    outp.exp = arr[i] + " + " + arr[curr] + " = " + tar;
                    break;
                }
            }

            // log n + log n-1 + log n-2 ... => log (n * (n-1) *(n-2)...) log (n!) => log (n)
            erg.Setze(outp, it, Complexity.LINEARITHMIC, Complexity.CONSTANT, "Time is actually Log ((n-1)!)");
        }


        public static void TwoSum_TwoPointers(Input inp, InOut.Ergebnis erg)
        {
            Output outp = new Output(null);
            int[] arr = inp.arr;
            int tar = inp.target;
            int it = 0;
            int ptSmall = 0, ptBig = inp.arr.Length - 1;

            while(ptSmall < ptBig)
            {
                it++;
                int sum = arr[ptSmall] + arr[ptBig];
                if (sum > tar) ptBig--;
                else if (sum < tar) ptSmall++;
                else
                {
                    outp = new Output(new int[] { ptSmall+1, ptBig+1});
                    break;
                }
            }

            erg.Setze(outp, it, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
