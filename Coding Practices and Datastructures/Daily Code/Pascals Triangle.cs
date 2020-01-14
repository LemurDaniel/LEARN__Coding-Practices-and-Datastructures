using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by AirBNB:

        Pascal's Triangle is a triangle where all numbers are the sum of the two numbers above it. Here's an example of the Pascal's Triangle of size 5.
            1
           1 1
          1 2 1
         1 3 3 1
        1 4 6 4 1
        Given an integer n, generate the n-th row of the Pascal's Triangle.

        Here's an example and some starter code.

        def pascal_triangle_row(n):
          # Fill this in.

        print(pascal_triangle_row(6))
        # [1, 5, 10, 10, 5, 1]

        */

    class Pascals_Triangle : Testable
    {
        public class InOut : St_InOuts.Primary_IntArr<int>
        {
            public InOut(int i, string s) : base (i, s)
            {
                AddSolver(Get_Level_of_Triangle);
                HasMaxDur = false;
            }

        }

        public Pascals_Triangle()
        {
            testcases.Add(new InOut(2, "1,1"));
            testcases.Add(new InOut(0, "1"));
            testcases.Add(new InOut(3, "1,2,1"));
            testcases.Add(new InOut(6, "1,5,10,10,5,1"));
            testcases.Add(new InOut(7, "1,6,15,20,15,6,1"));
            testcases.Add(new InOut(8, "1,7,21,35,35,21,7,1"));
            testcases.Add(new InOut(9, "1,8,28,56,70,56,28,8,1"));
        }

        public static void Get_Level_of_Triangle(int levels, InOut.Ergebnis erg)
        {
            int[] result = new int[] { 1 };
            levels = Math.Max( 1, levels);
            for (int i = 1; i < levels; i++) result = GetNextLevel(result);
            erg.Setze(result, Complexity.LINEAR, Complexity.CONSTANT);
        }

        public static int[] GetNextLevel(int[] level)
        {
            // "1,5,10,10,5,1" ==> if the middle is the Pivot then the left side equals always the right side
            // Only left side needs to be calculated (this half the amount of Calculations)
            // first and last are always 1 ==> -1 Calculation

            int[] next = new int[level.Length + 1];
            next[0] = next[next.Length - 1] = 1;

            for (int i = 1; i < ( next.Length + 1 ) / 2; i++)
            {
                next[i] = next[next.Length - i - 1] = level[i - 1] + level[i];  
            }

            return next;
        }
    }
}
