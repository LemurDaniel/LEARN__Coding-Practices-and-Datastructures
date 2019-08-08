using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Two_Pointers
{
    class Implement_StrStr : Testable
    {
        private class Input
        {
            public readonly string haystack;
            public readonly string needle;
            public Input(string s, string s2)
            {
                haystack = s;
                needle = s2;
            }
            public override string ToString() => "Haystack: " + haystack + "\nNeedle: " + needle;
        }
        private class InOut : InOutBase<Input, int>
        {
            public InOut(Input s, int s2) : base(s, s2, true)
            {
                AddSolver((arg, erg) => erg.Setze(strStr(arg)));
                inputStringConverter = null;
            }
        }

        public Implement_StrStr()
        {
            testcases.Add(new InOut(new Input("HayNeedleStack", "Needle"),3));
            testcases.Add(new InOut(new Input("HayNeedseStack", "Needle"), -1));
        }



        //SOLVE
        private static int strStr(Input inp)
        {
            string haystack = inp.haystack;
            string needle = inp.needle;
            for(int i=0; i< haystack.Length; i++)
            {
                if (needle.Length > haystack.Length - i) return -1;
                else if (Char.ToLower(haystack[i]) != Char.ToLower(needle[0])) continue;
                else if (needle.Length == 0) return i;
                for(int j=1; j<needle.Length; j++)
                {
                    if (Char.ToLower(needle[j]) != Char.ToLower(haystack[i + j])) break;
                    else if (j == needle.Length - 1) return i;
                }
            }

            return -1;
        }
    }
}
