using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Longest_Sequence_with_Two_Unique_Numbers : Testable
    {

        /*
         * 
         * Hi, here's your problem today. This problem was recently asked by Facebook:
         * Given a sequence of numbers, find the longest sequence that contains only 2 unique numbers.
         * 
         * 
         */

        private class InOut : InOutBase<int[], int>
        {
            public InOut(string inp, int outp) : base(Helfer.Assemble(inp), outp, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe<int>("Eingabe: ", arg);
                AddSolver( (arg, erg) => erg.Setze(Solve(arg)) );
            }
        }


        public Longest_Sequence_with_Two_Unique_Numbers()
        {
            testcases.Add(new InOut("1;3;5;3;1;3;1;5", 4));
            testcases.Add(new InOut("1;3;5;3;1;3;1;5;3;3;3;5", 5));
        }


        private static int Solve(int[] arr)
        {
            if (arr.Length <= 2) return arr.Length;

            int num1 = arr[0], num2;    // First num is First Element of Array
            int start = 1;
            while (arr[start] == num1) start++; // Find next num that is different to first num
            num2 = arr[start++];    // Our Algortihm start after the next num

            int len = 0;    // Longest Found Sequence
            int tmpPxLastSequence = 0;  // Points to last Sequence, At start first Element in Array

            for(int i=start; i<arr.Length; i++)
            {
               if (arr[i] == num1 || arr[i] == num2) continue;
                int z = i - 1;  // new Num1 = number before current
                while (z - 1 > 0 && arr[z - 1] == arr[i - 1]) z--;  // Track back if same num occurs before that
                num1 = arr[z];
                num2 = arr[i];
                if(i - tmpPxLastSequence > len) len = i - tmpPxLastSequence;    // Check if Sequence Length greater than current
                tmpPxLastSequence = z;
            }

            if (arr.Length - tmpPxLastSequence > len) len = arr.Length - tmpPxLastSequence; // Final Check if Sequence Length greater than current, after Array end

            return len;
        }
    }
}
