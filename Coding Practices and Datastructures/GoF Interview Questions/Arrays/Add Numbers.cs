using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class AddNumbers : Testable
    {

        private static string digits = "0123456789ABCDEF";
        private static IDictionary<char, int> dict = new Dictionary<char, int>();
        private static void Setup()
        {
            if (dict.Count > 0) return;
            for (int i = 0; i < digits.Length; i++) dict.Add(digits[i], i);
        }

        public class Input
        {
            public readonly int Num_base;
            public readonly string number;
            public readonly string number2;

            private readonly string ausgabe;
            public Input(string number, string number2, int Num_base)
            {
                ausgabe = "Aufgabe: " + number + " + " + number2 + "  --  (" + Num_base + ")";
                this.number = Helfer.removeChar(number);
                this.number2 = Helfer.removeChar(number2);
                this.Num_base = Num_base;
            }
            public override string ToString() => ausgabe;
        }

        public class InOut : InOutBase<Input, string>
        {
            public InOut(string num1, string num2, int b, string erg) : base(new Input(num1, num2, b), erg, true)
            {
                inputStringConverter = null;
                base.setup = Setup;
                AddSolver(AddNumber);
            }
        }


        public AddNumbers()
        {
            testcases.Add(new InOut("124","926", 10, "1.050"));
            testcases.Add(new InOut("124", "112.345.826", 10, "112.345.950"));
            testcases.Add(new InOut("FFE", "2", 16, "1.000"));
            testcases.Add(new InOut("FFF FFE", "2", 16, "1.000.000"));
        }








        public static void AddNumber(Input inp, InOut.Ergebnis erg) => erg.Setze(AddNumber(inp.number, inp.number2, inp.Num_base));
        //SOL
        public static string AddNumber(string num1, string num2, int b)
        {
            if (b < 1 || b > digits.Length) throw new InvalidOperationException("Base not supported");
            StringBuilder sb = new StringBuilder();
            int carry = 0;
            for(int i = 0, len = Math.Max(num1.Length, num2.Length); i<len; i++)
            {
                int n1 = i >= num1.Length ? 0 : dict[num1[num1.Length - i - 1]];
                int n2 = i >= num2.Length ? 0 : dict[num2[num2.Length - i - 1]];
                if (n1 > b || n2 > b) throw new InvalidOperationException("Invalid digits present");
                int num = n1 + n2 + carry;
                sb.Insert(0, ((i+1)%3==0 ? ".":"")+digits[num % b]);
                carry = num / b;
            }

            return  ((carry != 0 ? digits[carry]+"" : "") + sb.ToString()).Trim('.');
        }
    }
}
