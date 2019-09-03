using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Merge_Sorted_Arrays : Testable
    {
        public class InOut : InOutBase<int[][], int[]>
        {
            public InOut(string s, string s2, string s3) : base(new int[2][] { Helfer.Assemble(s), Helfer.Assemble(s2) }, Helfer.Assemble(s3))
            {
                copiedInputProvider = arg => new int[2][] { Helfer.ArrayCopy(arg[0]), Helfer.ArrayCopy(arg[1]) };
                inputStringConverter = arg => Helfer.Arrayausgabe("Eingabe:+\n", arg[0]) + "\n" + Helfer.Arrayausgabe(arg[1]);
                outputStringConverter = arg => Helfer.Arrayausgabe("Erwartet: ", arg);
                ergStringConverter = arg => Helfer.Arrayausgabe("Ergebnis: ", arg);
                CompareOutErg = Helfer.ArrayVergleich;
                AddSolver(MergeSmallerArrayIntoLarger_ConstantSpace);
                AddSolver(MergeSmallerArrayIntoLarger_ConstantSpace_StartFromBack);
                HasMaxDur = false;
            }
        }

        public Merge_Sorted_Arrays()
        {
            testcases.Add(new InOut("1,5,7,8,9,-1,-1,-1,-1,-1", "2,3,4,6,10", "1,2,3,4,5,6,7,8,9,10"));
        }


        //SOL
        /*
         Identify Larger Array.
         Larger array size = n + m       | Where m is size of smaller Array
         Use m Part of Large_arr as Puffer 

         */

        public static void MergeSmallerArrayIntoLarger_ConstantSpace(int[][] arr, InOut.Ergebnis erg)
        {
            int[] large = arr[0].Length > arr[1].Length ? arr[0] : arr[1];
            int[] small = large == arr[1] ? arr[0] : arr[1];

            int puffer = small.Length; //Points to Start of Puffer
            int pufferEnd = small.Length;
            //Puffer Stores unprocessed Elements of larger Array
            //if el of small < el of large => puffer el of large
            int ptLarge = 0;    //Points to Current El of Large
            int ptSmall = 0;    //Points to Current El of small

            for (; ptSmall < small.Length; ptLarge++)
            {
                if (pufferEnd - puffer > 0 && large[puffer] < small[ptSmall] && ptLarge < small.Length)
                {
                    large[pufferEnd++] = large[ptLarge];
                    large[ptLarge] = large[puffer++];
                    large[puffer - 1] = int.MaxValue;
                }
                else if (large[ptLarge] > small[ptSmall] || ptLarge >= pufferEnd) {
                    if(ptLarge < small.Length) large[pufferEnd++] = large[ptLarge];
                    large[ptLarge] = small[ptSmall++];
                }
            }

            erg.Setze(large, Complexity.LINEAR, Complexity.CONSTANT);
        }

        public static void MergeSmallerArrayIntoLarger_ConstantSpace_StartFromBack(int[][] arr, InOut.Ergebnis erg)
        {
            int[] large = arr[0].Length > arr[1].Length ? arr[0] : arr[1];
            int[] small = large == arr[1] ? arr[0] : arr[1];

            int ptLarge = small.Length - 1;
            int ptSmall = small.Length - 1;
            int ptCurr = large.Length - 1;

            while(ptSmall >= 0)  large[ptCurr--] = (small[ptSmall] >= (ptLarge >= 0 ? large[ptLarge] : int.MinValue) ? small[ptSmall--] : large[ptLarge--]);

            erg.Setze(large, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
