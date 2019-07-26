using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoF_Coding_Interview_Algos.Daily_Code
{
    class Find_the_non_duplicate_number : Testable
    {
        private class InOut : InOutBase<int[], int>
        {
            public InOut(string input, int output) : base(Helfer.Assemble(input), output, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe<int>("Eingabe: ", arg);
                AddSolver(Solve1, "Solver mit HashSet");
                AddSolver(Solve2, "Solver mit O(1) Space Complexity");
            }
        }

        public Find_the_non_duplicate_number()
        {
            testcases.Add(new InOut("4324132", 1));
        }



        // SOLUTION START

        private static void Solve1(int[] arr, InOut.Ergebnis erg){

            ISet<int> set = new HashSet<int>();
            for(int i=0; i<arr.Length; i++)
            {
                if (set.Contains(arr[i])) set.Remove(arr[i]);
                else set.Add(arr[i]);
            }

            erg.Setze(set.ToArray<int>()[0]);
        }

        private static void Solve2(int[] arr, InOut.Ergebnis erg)
        {

            Array.Sort(arr);
            for (int i = 0; i < arr.Length; i+=2)
            {
                if (arr[i] != arr[i + 1])
                {
                    erg.Setze(arr[i]);
                    return;
                }
            }
        }
    }
}
