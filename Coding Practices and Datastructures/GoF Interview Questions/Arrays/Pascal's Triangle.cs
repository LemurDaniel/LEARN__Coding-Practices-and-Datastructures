using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Pascal_s_Triangle : Testable
    {
        public class InOut : InOutBase<int, int[][]>
        {
            public InOut (int i, string s) : base(i, Helfer.Assemble2Dim(s), true)
            {
                outputStringConverter = arg => Helfer._2Dim_Arrayausgabe("Erwartet: ", arg);
                ergStringConverter = arg => Helfer._2Dim_Arrayausgabe("Ausgabe: ", arg);
                CompareOutErg = Helfer._2Dim_ArrayVergleich;

                AddSolver(Solve);
            }
        }

        public Pascal_s_Triangle()
        {
            testcases.Add(new InOut(5, 
                "1;" +
                "1,1;" +
                "1,2,1;" +
                "1,3,3,1;" +
                "1,4,6,4,1"));
            testcases.Add(new InOut(20,
                "1;" +
                "1,1;" +
                "1,2,1;" +
                "1,3,3,1;" +
                "1,4,6,4,1"));
        }

        //SOL
        public static void Solve(int num, InOut.Ergebnis erg)
        {
            int it = 0;

            int[][] triangle = new int[num][];
            if (num < 1) { erg.Setze(triangle, Complexity.LINEAR, Complexity.LINEAR); return; }
            triangle[0] = new int[] { 1 };
            if (num == 1) { erg.Setze(triangle, Complexity.LINEAR, Complexity.LINEAR); return; }

            triangle[1] = new int[] { 1, 1 };
            int[] prev = triangle[1], cRow;
            for(int i=2; i<num; i++)
            {
                cRow = new int[prev.Length+1];
                cRow[0] = cRow[cRow.Length - 1] = 1;
                for(int j=1; j <= (cRow.Length / 2); j++, it++)
                {
                    cRow[j] = prev[j-1] + prev[j];
                    cRow[cRow.Length - j - 1] = cRow[j];
                }

                prev = cRow;
                triangle[i] = cRow;
            }

            erg.Setze(triangle, Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
