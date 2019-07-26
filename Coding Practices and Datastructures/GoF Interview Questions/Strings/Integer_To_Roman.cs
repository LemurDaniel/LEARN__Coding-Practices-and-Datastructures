using GoF_Coding_Interview_Algos.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoF_Coding_Interview_Algos.GoF_Interview_Questions.Strings
{

    class Integer_To_Roman : ITestable
    {
        private IDictionary<string, int> romanInt = new Dictionary<string, int>();
        
        public Integer_To_Roman()
        {
            romanInt.Add("I", 1);
            romanInt.Add("IV", 4);
            romanInt.Add("V", 5);
            romanInt.Add("IX", 9);
            romanInt.Add("X", 10);
            romanInt.Add("XL", 40);
            romanInt.Add("L", 50);
            romanInt.Add("XC", 90);
            romanInt.Add("C", 100);
            romanInt.Add("CD", 400);
            romanInt.Add("D", 500);
            romanInt.Add("CM", 900);
            romanInt.Add("M", 1000);

            romanTestcases.Add(5, "V");
            romanTestcases.Add(6, "VI");
            romanTestcases.Add(2786, "MMDCCLXXXVI");
            romanTestcases.Add(141, "CXLI");
            romanTestcases.Add(234, "CCXXXIV");
            romanTestcases.Add(1242, "MCCXLII");
            romanTestcases.Add(3999, "MMMCMXCIX");
        }

        public string ConvertToRoman(int number)
        {
            StringBuilder sb = new StringBuilder();
            int count;
            foreach(string key in romanInt.Keys.Reverse<string>())
            {
                count = number / romanInt[key];
                number = number % romanInt[key];
                while (count-- > 0) sb.Append(key);
                if (number == 0) break;
            }
            return sb.ToString();
        }
        public int ConvertToNumeral(string roman)
        {
            int numeral = 0;
            for(int i= 0; i<roman.Length;)
            {
                // Doppeltes / Einfaches Zeichen ?
                string s1 = Char.ToUpper(roman[i]).ToString();
                string s2 = Char.ToUpper( (i+1 < roman.Length) ? roman[i+1]:'I' ).ToString();
                if (romanInt[s2] > romanInt[s1]) {
                    numeral += romanInt[s1 + s2];
                    i += 2;
                }
                else
                {
                    numeral += romanInt[s1];
                    i++;
                }
            }
            return numeral;
        }


        // Test
        private Dictionary<int, string> romanTestcases = new Dictionary<int, string>();
        public void Test()
        {
            Console.WriteLine("-----------------------------------");
            Console.WriteLine("Integer To Roman");
            int i = 0;
            foreach (int key in romanTestcases.Keys)
            {
                Console.WriteLine("Test: " + ++i);
                Console.WriteLine("Eingabe: " + key);
                Console.WriteLine("Erwartet: " + romanTestcases[key]);
                Console.WriteLine();
                string outp = ConvertToRoman(key);
                int outp2 = ConvertToNumeral(romanTestcases[key]);
                Console.WriteLine("Convert-Roman: " + outp + " ---> " +(outp==romanTestcases[key] ? "Success":"Failure") );
                Console.WriteLine("Convert-Back:  " + outp2 + " ---> " + (outp2 == key ? "Success" : "Failure"));
                Console.WriteLine();
            }
        }
    }
}
