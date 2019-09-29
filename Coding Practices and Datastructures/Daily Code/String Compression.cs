using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class String_Compression : Testable
    {
        public class InOut : St_InOuts.SameArr<char>
        {
            public InOut(string c, string c2) : base(Helfer.AssembleChar(c), Helfer.AssembleChar(c2), true)
            {
                AddSolver(Solver1);
            }

        }

        public String_Compression()
        {
            testcases.Add(new InOut("a,a,b,c,c,c", "a,2,b,c,3,-"));
        }

        //SOL
        public static void Solver1(char[] c, InOut.Ergebnis erg)
        {
            int i, pt;
            for (i = 0, pt = 0; i < c.Length; i++)
            {
                if (c[pt] == c[i])
                {
                    if (i - pt > 2) c[i - 1] = c[i];
                }
                else if (i - pt > 1)
                {
                    c[pt + 1] = (i - pt + "")[0];
                    pt = i;
                }
                else pt = i;
            }
            if (i - pt > 1) c[pt + 1] = (i - pt + "")[0];
            pt++;
            while (++pt < c.Length) c[pt] = '-';

            erg.Setze(c, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
