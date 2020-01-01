using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.MathEx
{
    public class Base_7 : Testable
    {
        protected class Input
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

        protected class Output
        {
            public readonly string z;
            public readonly int z2;
            public Output(string z, int z2)
            {
                this.z = z;
                this.z2 = z2;
            }
            public override string ToString() => "Conversion: " + z + "\nBackConversion: " + z2;
            public override bool Equals(object obj)
            {
                Output outp = (obj as Output);
                if (outp.z != z) return false;
                if (outp.z2 != z2) return false;
                return true;
            }
            public override int GetHashCode() => base.GetHashCode();
        }

        protected class InOut : InOutBase<Input, Output>
        {
            public InOut(Input i, Output s) : base (i, s)
            {
                AddSolver(Solve, "ConvertToBase");
                setup = Setup;
            }
        }

        public Base_7()
        {
            testcases.Add(new InOut(new Input(100, 7),new Output("202", 100)));
            testcases.Add(new InOut(new Input(100, 2), new Output("1100100", 100)));
            testcases.Add(new InOut(new Input(100, 10), new Output("100", 100)));
            testcases.Add(new InOut(new Input(100, 8), new Output("144", 100)));
            testcases.Add(new InOut(new Input(100, 16), new Output("64", 100)));
            testcases.Add(new InOut(new Input(int.MaxValue, 16), new Output("7FFFFFFF", int.MaxValue)));
            testcases.Add(new InOut(new Input(11259375, 16), new Output("ABCDEF", 11259375)));
            testcases.Add(new InOut(new Input(-11259375, 16), new Output("-ABCDEF", -11259375)));
        }









        private static string digits = "0123456789ABCDEF";
        private static IDictionary<char, int> dict = new Dictionary<char, int>();
        private static void Setup()
        {
            if (dict.Count > 0) return;
            for (int i = 0; i < digits.Length; i++) dict.Add(digits[i], i);
        }

        private static void Solve(Input inp, InOut.Ergebnis erg)
        {
            string s = ConvertToBase(inp.z, inp.b);
            int num = ConvertFromBase(s, inp.b);
            erg.Setze(new Output(s, num));
        }
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
            return (negate ? "-":"") + result;
        }
        private static int ConvertFromBase(string num, int Rbase)
        {
            if (Rbase > digits.Length || Rbase < 1) throw new InvalidOperationException("Base not Supported");
            bool negate = num[0] == '-';
            int result = 0;
            for(int i=0, pow=1; i< (negate ? num.Length-1:num.Length); i++)
            {
                char c = num[num.Length - i - 1];
                result += dict[c] * pow;    
                pow *= Rbase;               // Exponentiate Pow: in base 2: 1,2,4,8,16,32,...
            }
            return negate ? -result : result;
        }
    }
}
