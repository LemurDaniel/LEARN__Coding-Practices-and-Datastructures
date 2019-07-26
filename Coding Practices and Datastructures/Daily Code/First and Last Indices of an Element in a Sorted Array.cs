using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoF_Coding_Interview_Algos.Daily_Code
{
    public class First_and_Last_Indices_of_an_Element_in_a_Sorted_Array : Testable
    {
        private class Input
        {
            public int[] input;
            public int target;
            public Input(int[] input, int target)
            {
                this.input = input;
                this.target = target;
            }
            public override string ToString()
            {
                return Helfer.Arrayausgabe<int>("Eingabe: ", input) + "\n"
                    + "Target: " + target;
            }
        }

        private class InOut : InOutBase<Input, int[]>{

            public InOut(int[] inp, int tar, int[] outp) : base(new Input(inp, tar), outp)
            {
                ergStringConverter = erg => Helfer.Arrayausgabe<int>("Ausgabe: ", erg);
                outputStringConverter = erg => Helfer.Arrayausgabe<int>("Erwartet: ", erg);
                CompareOutErg = Helfer.ArrayVergleich<int>;
                AddSolver(Solve, "Solver 1");
            }
        }

        public First_and_Last_Indices_of_an_Element_in_a_Sorted_Array() : base("--- First_and_Last_Indices_of_an_Element_in_a_Sorted_Array ---")
        {
            testcases.Add(new InOut(
                new int[] { 1, 3, 3, 5, 7, 8, 9, 9, 9, 15 },
                9,
                new int[] { 6, 8 }
            ));
            testcases.Add(new InOut(
               new int[] { 100, 150, 150, 153 },
               150,
               new int[] { 1, 2 }
           ));
            testcases.Add(new InOut(
               new int[] { 1, 2, 3, 4, 5, 6, 10 },
               9,
               new int[] { -1, -1 }
           ));


            int[] inp = new int[Int32.MaxValue/8];
            int tar = 5;
            int[] oup = new int[2];
            for(int i=0; i<inp.Length; i++)
            {
                if(i+5 == tar)
                {
                    int j = i;
                    for (; j<inp.Length && j<i+5; j++)
                    {
                        inp[j] = tar;
                    }
                    oup[0] = i;
                    oup[1] = j;
                    i = j-1;
                }
                else inp[i] = i;
            }
            testcases.Add(new InOut( inp, tar, oup));
        }


        private static void Solve(Input testcase, InOut.Ergebnis erg)
        {
            int[] input = testcase.input;
            int target = testcase.target;

            int min = 0, max = input.Length-1, current, it = 0;
            while (true)
            {
                it++;
                current = (max + min) / 2;
                if (input[current] == target) break;
                else if (input[current] > target) max = current;
                else min = current;

                if (max - min == 1)
                {
                    erg.Setze(new int[] { -1, -1 }, it);
                    return;
                }
            }

            //Find Lowest / Biggest
            int low = current;
            while (true)
            {
                if (low-1 < 0 || input[low-1] != target) break;
                else low--;
            }
            int high = current;
            while (true)
            {
                if (high > input.Length || input[high + 1] != target) break;
                else high++;
            }

            erg.Setze(new int[] { low, high }, it);
        }

    }
}
