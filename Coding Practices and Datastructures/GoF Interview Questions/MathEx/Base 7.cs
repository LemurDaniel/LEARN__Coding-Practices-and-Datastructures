using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.MathEx
{
    class Base_7 : Testable
    {
        private class Input
        {
            public readonly int z;
            public readonly int b;
            public Input(int z, int b)
            {
                this.z = z;
                this.b = b;
            }
            public override string ToString() => "Zahl: "+z + "\nBase: " + b;
        }

        private class InOut : InOutBase<Input, string>
        {
            public InOut(Input i, string s) : base (i, s, true)
            {
                inputStringConverter = null;
                AddSolver((arg, erg) => erg.Setze(ConvertToBase(arg.z, arg.b)), "ConvertToBase");
            }
        }

        public Base_7()
        {
            testcases.Add(new InOut(new Input(100, 7),"202"));
            testcases.Add(new InOut(new Input(100, 2), "1100100"));
            testcases.Add(new InOut(new Input(100, 10), "100"));
            testcases.Add(new InOut(new Input(100, 8), "144"));
            testcases.Add(new InOut(new Input(100, 16), "64"));
            testcases.Add(new InOut(new Input(int.MaxValue, 16), "7FFFFFFF"));
            testcases.Add(new InOut(new Input(11259375, 16), "ABCDEF"));
        }









        private static string digits = "0123456789ABCDEF";
        private static string ConvertToBase(int num, int Rbase)
        {
            if (Rbase > digits.Length || Rbase < 1) throw new InvalidOperationException("Base not Supported");
            string result = "";
            bool negate = num < 0;
            num = Math.Abs(num);
            while(num != 0)
            {
                result = digits[num % Rbase] + result;
                num /= Rbase;
            }
            return result;
        }
    }
}
