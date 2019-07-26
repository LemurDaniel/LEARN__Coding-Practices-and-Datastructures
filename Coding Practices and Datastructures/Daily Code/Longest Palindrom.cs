using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoF_Coding_Interview_Algos.Daily_Code
{
    class Longest_Palindrom : Testable
    {
        private class InOut : InOutBase<string, string>
        {
            public InOut(string input, string output) : base(input, output)
            {
                inputStringConverter = arg => "Eingabe: " + arg;
                outputStringConverter = arg => "Erwartet: " + arg;
                ergStringConverter = arg => "Ausgabe: " + arg;
                AddSolver(LongestPalindrom, "LongestPalindrom 1");
            }
        }

        public Longest_Palindrom() : base("--- Find Longest Palindrom ---")
        {
            testcases.Add(new InOut("Banana", "anana"));
            testcases.Add(new InOut("Mensch", "M"));
            testcases.Add(new InOut("Tassimo", "ss"));
            testcases.Add(new InOut("million", "illi"));
            testcases.Add(new InOut("Billion", "illi"));
            testcases.Add(new InOut("bbbabadabdbafbbabababdabaabbabababbabaSdsbsbsssdbsbsdbSbETGeGHsbgSEbseBebSbbsbesBSEseESESgbBAaa", "abbabababba"));
        }

        private static void LongestPalindrom(string s, InOut.Ergebnis erg)
        {
            string palindrom = "", temp;
            for(int i=0; i<s.Length; i++)
            {
                temp = GetPalindrom(i, s);
                if (temp.Length > palindrom.Length) palindrom = temp;
                if (palindrom.Length > s.Length - i) break;
            }

            erg.Setze(palindrom, -1);
         }

        private static string GetPalindrom(int start, string s)
        {
            int i = 0;
            bool even = false;

            if (start + 1 < s.Length && Char.ToLower(s[start + 1]) == Char.ToLower(s[start])) even = true;
            else if(start - 1 > 0 && Char.ToLower(s[start - 1]) == Char.ToLower(s[start]) ){
                even = true;
                start--;
            }

            while (true)
            {
                try
                {
                    if (Char.ToLower(s[start - i - 1]) != Char.ToLower(s[start + i + (even? 2:1) ])) break;
                }catch (IndexOutOfRangeException)
                {
                    break;
                }
                i++;
            }
            return s.Substring(start - i, i * 2 + (even ? 2 : 1));
        }
    }
}
