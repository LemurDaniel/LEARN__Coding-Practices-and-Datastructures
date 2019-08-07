using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * Hi, here's your problem today. This problem was recently asked by Google:

        There are n people lined up, and each have a height represented as an integer. 
        A murder has happened right in front of them, and only people who are taller than everyone in front of them are able to see what has happened. 
        How many witnesses are there?

        Example:
        Input: [3, 6, 3, 4, 1]
        Output: 3
        Explanation: Only [6, 4, 1] were able to see in front of them.
     * 
     * 
     * 
     * 
     * 
     */
    class Witness_of_The_Tall_People : Testable
    {
        private class InOut : InOutBase<int[], int>
        {
            public InOut(string s, int i) : base (Helfer.Assemble(s), i, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe<int>("Eingabe: ", arg);
                AddSolver(Solve);
            }
        }

        public Witness_of_The_Tall_People()
        {
            testcases.Add(new InOut("36341", 3));
        }



        //SOL
        public static void Solve(int[] arr, InOut.Ergebnis erg)
        {
            int count = 0;
            int highest = 0;
            for(int i=arr.Length-1; i>=0; i--)
            {
                if(arr[i] > highest)
                {
                    highest = arr[i];
                    count++;
                }
            }
            erg.Setze(count);
        }
    }
}
