using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Uber:

        Given a string s and a character c, find the distance for all characters in the string to the character c in the string s. You can assume that the character c will appear at least once in the string.

        Here's an example and some starter code:

        def shortest_dist(s, c):
          # Fill this in.

        print(shortest_dist('helloworld', 'l'))
        # [2, 1, 0, 0, 1, 2, 2, 1, 0, 1]

    */

    class Shortest_Distance_to_Character : Testable
    {
        public class InOut : St_InOuts.Primary_IntArr<string>
        {
            public InOut(string s, string arr) : base(s, arr, true)
            {
                inputStringConverter = arg => "Eingabe: " + s.Substring(2, s.Length-2)+ "\nChar: " + s[0];
                AddSolver(SolverAbstract1);
            }
        }

        public Shortest_Distance_to_Character()
        {
            testcases.Add(new InOut("l-helloworld", "2,1,0,0,1,2,2,1,0,1"));
        }

        public static void SolverMain(string s, InOut.Ergebnis erg, SolverAbstract solver) => solver(s.Substring(2, s.Length-2), s[0], erg);
        public static void SolverAbstract1(string s, InOut.Ergebnis erg) => SolverMain(s, erg, Solver1);
        public static void Solver1(string s, char c, InOut.Ergebnis erg)
        {
            int[] arr = new int[s.Length];

            /*
             * 1. Create Array of same Length as String 'arr'
             * 2. Parse String from left to right in for loop
             *      - 1. create pointer pt ==> points to last unfilled Postion
             *      - 2. Pointer i points to current parsed Position
             *      - RUlE:
             *          if Character at Position 'i' != 'c'
             *          THEN 
             *               if (flag isset ==> arr[i] = maxInt) Else arr[i] get counted up   
             *          ELSE
             *              ==> 'arr[i] = 0
             *              ==> Calculate the Distance from all Elements from Pointer 'pt' up to current Element: (i - pt = Distance)
             *                  if(Distance is samller then current set Distance at Position ==> Replace)
             *                  Set the Flag to 1;
             *                  (The Flag indicates wether a previous Character 'c' was encounter)
             *              
             */
            for (int i = 0, pt = 0, flag = 0; i < arr.Length; i++)
            {
                if (s[i] != c)  arr[i] = flag == 0 ? int.MaxValue : i - pt;
                else
                {
                    arr[i] = 0;
                    for (; pt < i; pt++) if (i - pt < arr[pt]) arr[pt] = i - pt;
                    flag = 1;
                }
            }

            erg.Setze(arr, Complexity.QUADRATIC, Complexity.LINEAR);
        }


        public delegate void SolverAbstract(string s, char c, InOut.Ergebnis erg);
    }
}
