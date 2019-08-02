using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.MathEx
{
    class Integer_to_English_Words : Testable
    {
        private class InOut : InOutBase<int, string>
        {
            public InOut(int n, string s) : base(n, s, true) => AddSolver(ToEnglischWord);
        }

        public Integer_to_English_Words()
        {
            testcases.Add(new InOut(0, "Null"));
            testcases.Add(new InOut(123, "One Hundred Twenty Three"));
            testcases.Add(new InOut(12_345, "Twelve Thousand Three Hundred Fourty Five"));
            testcases.Add(new InOut(1_234_567, "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"));
            testcases.Add(new InOut(1_000_007, "One Million and Seven"));
            testcases.Add(new InOut(1_000_107, "One Million One Hundred and Seven"));
        }


        // SOL

        private static string[] L20 = new string[] { "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fithteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" };
        private static string[] TENTHS = new string[] { "", "Ten", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty", "Seventy", "Eightty", "Ninety" };
        private static string[] HUNDREDS = new string[] { "", "Thousand", "Million", "Billion" };

        private static void ToEnglischWord(int num, InOut.Ergebnis erg)
        {
            string numS = num == 0 ? "Null":"";
            int pot = 0;
            while(num > 0)
            {
                numS = (num > 9999 && num%1000 < 10 ? "and ":"") + TriplettToWord(num % 1000, pot++) + numS;
                num /= 1000;
            }
            erg.Setze(numS.Trim(' '));
        }

        private static string TriplettToWord(int num, int potency)
        {
            if (num == 0) return "";
            string s = "";
            if (num > 99)
            {
                s += L20[num / 100] + " Hundred " +( num%100 < 10 ? "and ":"");
                num %= 100;
            }
            if (num < 20) s += L20[num] + " ";
            else s += TENTHS[num / 10] + " "+ L20[num % 10] + " ";

            if (potency > HUNDREDS.Length - 1) throw new Exception("Number to Large, Not Supported");
            return s += HUNDREDS[potency] + " ";
        }
    }
}
