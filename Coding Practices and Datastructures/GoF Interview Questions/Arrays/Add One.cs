using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Add_One : Testable
    {
        private class InOut : St_InOuts.SameArr<int>
        {
            public InOut(string s, string s2) : base(Helfer.Assemble(Helfer.removeChar(s, " .")), Helfer.Assemble(Helfer.removeChar(s2, " .")))
            {
                AddSolver((arg, erg) => erg.Setze(PlusOne(arg)), "Add One");
            }
        }


        public Add_One()
        {
            testcases.Add(new InOut("123.456.789", "123.456.790"));
            testcases.Add(new InOut("999.999.999", "1.000.000.000"));
        }

        //SOL
        public static int[] PlusOne(int[] arr)
        {
            for(int i= arr.Length-1; i>=0; i--)
            {
                if (arr[i] != 9)
                {
                    arr[i]++;
                    return arr;
                }
                arr[i] = 0;
            }

            arr = new int[arr.Length + 1];
            arr[0] = 1;
            return arr;
        }
    }
}
