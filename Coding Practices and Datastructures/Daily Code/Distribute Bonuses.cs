using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
        Hi, here's your problem today. This problem was recently asked by Twitter:

        You are the manager of a number of employees who all sit in a row.The CEO would like to give bonuses to all of your employees, but since the company did not perform so well this year the CEO would like to keep the bonuses to a minimum.

        The rules of giving bonuses is that:
        - Each employee begins with a bonus factor of 1x.
        - For each employee, if they perform better than the person sitting next to them, the employee is given +1 higher bonus (and up to +2 if they perform better than both people to their sides).

        Given a list of employee's performance, find the bonuses each employee should get.

        Example:
        Input: [1, 2, 3, 2, 3, 5, 1]
            Output: [1, 2, 3, 1, 2, 3, 1]
    */
    class Distribute_Bonuses : Testable
    {
        public class InOut : St_InOuts.TwoIntArr
        {
            public InOut(string s, string s2) : base(s, s2, true)
            {
                AddSolver(Solve_ConstantSpace);
                HasMaxDur = false;
            }
        }


        public Distribute_Bonuses()
        {
            testcases.Add(new InOut("1, 2, 3, 2, 3, 5, 1", "1, 2, 3, 1, 2, 3, 1"));
        }



        //SOL
        public static void Solve_ConstantSpace(int[] inp, InOut.Ergebnis erg)
        {
            int prev = inp[0];      
            int bonus = 1, nextBon = 1;
            
            for(int i=1; i<inp.Length; i++)
            {
                if (inp[i] < prev) bonus++;
                else if (inp[i] != prev) nextBon = 2;

                inp[i - 1] = bonus;

                bonus = nextBon;
                nextBon = 1;
                prev = inp[i];
            }
            inp[inp.Length - 1] = bonus;

            erg.Setze(inp, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
