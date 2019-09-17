using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Strings
{
    class Text_Justification : Testable
    {
        public class Input
        {
            public readonly string[] arr;
            public readonly int len; //length of line
            public Input(string s, int len = 16)
            {
                this.arr = s.Split(' ');
                this.len = len;
            }
            public override string ToString() => Helfer.Arrayausgabe(arr) + "\nLinelength: " + len;
        }
        public class InOut : InOutBase<Input, string[]>
        {
            public InOut(string s, string s2, int len = 16) : base(new Input(s, len), s2.Split(','), true)
            {
                outputStringConverter = arg => Helfer.Arrayausgabe("Erwartet: \n", arg, false, "\n   ");
                ergStringConverter = arg => Helfer.Arrayausgabe("Ausgabe: \n", arg, false, "\n   ");
                CompareOutErg = Helfer.ArrayVergleich;
                AddSolver(Solve);
                HasMaxDur = false;
            }
        }

        public Text_Justification()
        {
            testcases.Add(new InOut("This is an example of text justification.",
                "This    is    an," +
                "example  of text," +
                "justification."));
        }


        //SOL
        public static void Solve(Input inp, InOut.Ergebnis erg)
        {
            string[] arr = inp.arr;
            int len = inp.len;


            int index = 0, ptStart = 0;
            List<string> output = new List<string>();
            while (index < arr.Length)
            {
                int currLen = 0;
                while (index < arr.Length)
                {
                    if (currLen + arr[index].Length + (index - ptStart) > len) break; // accumulated wordlength + new Word lenght + a Space for each word
                    currLen += arr[index++].Length;
                }

                //calculate line Spacing
                int wordCount = Math.Max(index - ptStart - 1, 1);
                int freeSpaces = len - currLen;
                int spacePerWord = (index < arr.Length ? freeSpaces / wordCount : 1);
                int remainder = (index < arr.Length ? freeSpaces % wordCount : 0);  //Will never exceed Number of Words-1 in Line

                string buildLine = "";
                for (; ptStart < index - 1; ptStart++) buildLine += arr[ptStart] + Helfer.GenerateString(spacePerWord + (remainder-->0? 1:0));
                output.Add(buildLine + arr[ptStart++]);
            }

            erg.Setze(output.ToArray(), Complexity.LINEAR, Complexity.LINEAR);
        }

    }
}
