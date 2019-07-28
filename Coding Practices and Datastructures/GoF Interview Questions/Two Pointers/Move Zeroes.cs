
using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Two_Pointers
{
    class Move_Zeroes : Testable
    {
        private class InOut : InOutBase<int[], int[]>
        {
            public InOut(string input, string output) : base(Helfer.Assemble(input), Helfer.Assemble(output))
            {
                copiedInputProvider = Helfer.ArrayCopy<int>;
                inputStringConverter = arr => Helfer.Arrayausgabe<int>("Eingabe: ", arr);
                outputStringConverter = arr => Helfer.Arrayausgabe<int>("Erwartet: ", arr);
                ergStringConverter = arr => Helfer.Arrayausgabe<int>("Ausgabe: ", arr);
                CompareOutErg = Helfer.ArrayVergleich<int>;
                AddSolver(MoveZeroes);
            } 
        }

        public Move_Zeroes()
        {
            testcases.Add(new InOut("01039", "13900"));
            testcases.Add(new InOut("12304050067809", "12345678900000"));
        }


        // SOLUTION
        private static void MoveZeroes(int[] input, InOut.Ergebnis erg)
        {
            int pointer = 0;
            for(int i=0; i<input.Length; i++)
            {
                if (input[i] == 0) continue;
                else if (pointer == i) pointer++;
                else
                {
                    input[pointer++] = input[i];
                    input[i] = 0;
                }
            }
            erg.Setze(input);
        }
    }
}