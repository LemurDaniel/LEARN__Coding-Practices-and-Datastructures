using GoF_Coding_Interview_Algos.Daily_Code;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace GoF_Coding_Interview_Algos.GoF_Interview_Questions.Strings
{
    class ZigZag_Conversion : Testable
    {
        private class Input
        {
            public string input;
            public int rows;
            public Input(string input, int rows)
            {
                this.input = input;
                this.rows = rows;
            }
            public override string ToString() => InOutBase<string,string>.StandartInputStringConverter(input) + "\nLänge: " + input.Length + "\nZeilen: " + rows;
        }

        private static readonly FormatException wrongFormat = new FormatException();
        private class InOut : InOutBase<Input, string>
        {
            public InOut(Input input, string output) : base(input, output, true) {
                inputStringConverter = null;
                AddSolver(ZigZagConvert, "ZigZag StringBuilder Array");
                AddSolver(ZigZagConvert2, "ZigZag Distance Calculator");
            }
        }

        public ZigZag_Conversion() : base("--- ZigZag Conversion ---")
        {
            testcases.Add(new InOut(new Input("PAYPALISHIRING", 3), "PAHNAPLSIIGYIR"));
            testcases.Add(new InOut(new Input("ABCDEFGHIJKL", 4), "AGBFHLCEIKDJ"));
            testcases.Add(new InOut(new Input("ABCDEFGHIJKL", 40), "ABCDEFGHIJKL"));
            string s = Helfer.RandomString(500_000);
            testcases.Add(new InOut(new Input(s, 40), ZigZagConvert1(s, 40)));
            s = Helfer.RandomString(1_000_000);
            testcases.Add(new InOut(new Input(s, 1_000), ZigZagConvert1(s, 1_000)));
        }

        private static void ZigZagConvert(Input testcase, InOut.Ergebnis erg) => erg.Setze(ZigZagConvert1(testcase.input, testcase.rows));
        private static string ZigZagConvert1(string input, int rows)
        {
            if (rows < 2) return input;

            StringBuilder[] sbuilder = new StringBuilder[rows];
            for (int i = 0, add = 1, currow = 0; i < input.Length; i++)
            {
                if (sbuilder[currow] == null) sbuilder[currow] = new StringBuilder();
                sbuilder[currow].Append(input[i]);
                currow += add;
                if (currow == sbuilder.Length - 1) add = -1;
                else if (currow == 0) add = 1;
            }

            string converted = "";
            foreach (StringBuilder s in sbuilder)
            {
                if (s == null) continue;
                converted += s.ToString();
            }

            return converted;
        }

        private static void ZigZagConvert2(Input testcase, InOut.Ergebnis erg)
        {
            string input = testcase.input;
            int rows = testcase.rows;
            StringBuilder converted = new StringBuilder();

            // Down n - 1
            // Lücke n - 2
            // + 1
            // next Element
            int distanceToNextElement = 2 * rows - 2;         // down + Lücke + 1

            for(int row=0; row<rows; row++)
            {
                int ZagDistance = (rows - 1 - row) * 2; // Diagonal Element in same Row:
                for (int i = row; i < input.Length; i += distanceToNextElement)
                {
                    converted.Append(input[i]);
                    if (row!=0 && row != rows-1 && i + ZagDistance < input.Length) converted.Append(input[i + ZagDistance]);
                }
            }


            erg.Setze(converted.ToString());
        }
    }
}