using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Pascal_s_Triangle2 : Testable
    {
        public class InOut : InOutBase<int, int[]>
        {
            public InOut(int i, string s) : base(i, Helfer.Assemble(s), true)
            {
                outputStringConverter = arg => Helfer.Arrayausgabe("Erwartet: ", arg);
                ergStringConverter = arg => Helfer.Arrayausgabe("Ausgabe: ", arg);
                CompareOutErg = Helfer.ArrayVergleich;

                AddSolver(Solve);
                AddSolver(Solve_NumSpaceComplexity);
            }
            
        }

        public Pascal_s_Triangle2()
        {
            testcases.Add(new InOut(0, ""));
            testcases.Add(new InOut(1,"1"));
            testcases.Add(new InOut(2,"1,1"));
            testcases.Add(new InOut(3,"1,2,1"));
            testcases.Add(new InOut(4,"1,3,3,1"));
            testcases.Add(new InOut(5,"1,4,6,4,1"));
            testcases.Add(new InOut(20, "1, 19, 171, 969, 3876, 11628, 27132, 50388, 75582, 92378, 92378, 75582, 50388, 27132, 11628, 3876, 969, 171, 19, 1"));
        }

        //SOL
        public static void Solve(int num, InOut.Ergebnis erg)
        {
            int it = 0;

            if (num < 1) { erg.Setze(new int[] { }, Complexity.LINEAR, Complexity.LINEAR); return; }
            if (num == 1) { erg.Setze(new int[] { 1 }, Complexity.LINEAR, Complexity.LINEAR); return; }

            int[] prev = new int[] { 1, 1 }, cRow = prev;
            for (int i = 2; i < num; i++)
            {
                cRow = new int[prev.Length + 1];
                cRow[0] = cRow[cRow.Length - 1] = 1;
                for (int j = 1; j <= (cRow.Length / 2); j++, it++)
                {
                    cRow[j] = prev[j - 1] + prev[j];
                    cRow[cRow.Length - j - 1] = cRow[j];
                }

                prev = cRow;
            }

            erg.Setze(cRow, it, Complexity.LINEAR, Complexity.LINEAR);
        }

        public static void Solve_NumSpaceComplexity(int num, InOut.Ergebnis erg)
        {
            int it = 0;

            List<int> list = new List<int>();
            if (num > 0) list.Add(1);
            if (num > 1)
            {
                for(int i=1; i<num; i++)
                {
                    list.Add(1);
                    list[0] = 1;
                    int prev = list[0], tmp = list[1];
                    for (int j = list.Count <= 2 ? 20 : 1; j <= (list.Count-1)/2; j++, it++)
                    {
                        tmp = list[j];
                        list[j] = prev + list[j];
                        list[list.Count - 1 - j] = list[j];
                        prev = tmp;
                    }
                }
            }

            erg.Setze(list.ToArray(), it, Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
