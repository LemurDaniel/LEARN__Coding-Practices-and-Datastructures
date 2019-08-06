using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{

    /*
     * 
     * Hi, here's your problem today. This problem was recently asked by Twitter:

        Given a string with the initial condition of dominoes, where:

        . represents that the domino is standing still
        L represents that the domino is falling to the left side
        R represents that the domino is falling to the right side

        Figure out the final position of the dominoes. If there are dominoes that get pushed on both ends, the force cancels out and that domino remains upright.

        Example:
        Input:  ..R...L..R.
        Output: ..RR.LL..RR

    */
    class Falling_Dominoes : Testable
    {
        private class InOut : InOutBase<string, string>
        {
            public InOut(string s, string s2) : base(s, s2, true)
            {

            }
        }

        public Falling_Dominoes()
        {
            testcases.Add(new InOut("..R...L..R.", "..RR.LL..RR"));
        }



        //SOLUTION

        private static void Solve(string dominoes)
        {

        }
    }
}
