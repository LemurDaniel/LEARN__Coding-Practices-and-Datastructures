using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Strings
{
    class String_To_Integer : Testable
    {
        private static readonly FormatException wrongFormat = new FormatException(); 
        private class InOut : InOutBase<string, Object>
        {
            public InOut(string input, object output) : base(input, output, true){
                AddSolver( ConvertToInt, "Conversion 1");
            }
        }


        // 100_000_000
        // 100.000.000
        // 100,000,000
        // 100000000
        // 100 000 000

        public String_To_Integer() : base ("--- Convert String To Integer ---")
        {
            testcases.Add(new InOut(int.MaxValue + "1", wrongFormat));
            testcases.Add(new InOut("123", 123));
            testcases.Add(new InOut("z123", wrongFormat));
            testcases.Add(new InOut("1242413", 1242413));
            testcases.Add(new InOut("+123", 123));
            testcases.Add(new InOut("-123", -123));
            testcases.Add(new InOut("100_000_000", 100_000_000));
            testcases.Add(new InOut("100.000.000", 100_000_000));
            testcases.Add(new InOut("100,000,000", 100_000_000));
            testcases.Add(new InOut("100 000 000", 100_000_000));
            testcases.Add(new InOut("100000000", 100_000_000));
            testcases.Add(new InOut(int.MaxValue+"", int.MaxValue));          
            testcases.Add(new InOut("z12afw3", wrongFormat));
        }

        private static void ConvertToInt(string input, InOut.Ergebnis erg)
        {
            int number = 0;
            try
            {
                if (input.Length == 0) throw wrongFormat;

                int sign = 1;
                bool signed = true;
                if (input[0] == '-') sign = -1;
                else if (input[0] == '+') sign = 1;
                else if (Helfer.GetNumber(input[0]) != -1) signed = false;
                else throw wrongFormat;

                char seperator = ' ';
                bool sep = true;
                bool sepSet = false;

                for(int i=input.Length-1, multi=0, curr; i>= (signed ? 1:0); i--)
                {
                    curr = Helfer.GetNumber(input[i]);

                    if (multi > 0 && multi % 3 == 0)
                    {
                        if (!sepSet)
                        {
                            seperator = input[i];
                            if (curr != -1) sep = false;
                            else if (!IsSeperator(input[i])) throw wrongFormat;
                            else continue;
                        }
                        else
                        {
                            if (input[i] != seperator) throw wrongFormat;
                            else continue;
                        }
                    }

                    if (curr == -1) throw wrongFormat;
                    if (multi >= 10) throw wrongFormat;
                    number += curr * (int)Math.Pow(10, multi++);
                }
                number *= sign;
            }
            catch(FormatException fe)
            {
                erg.Setze(fe);
                return;
            }
            erg.Setze(number);
        }

        private static bool IsSeperator(char c)
        {
            switch (c)
            {
                case '_': case '.': case ',': case ' ': return true;
                default: return Helfer.GetNumber(c) != -1;
            }
        }
    }
}
