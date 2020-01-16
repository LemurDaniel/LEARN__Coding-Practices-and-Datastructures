using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Facebook:

        Given two binary numbers represented as strings, return the sum of the two binary numbers as a new binary represented as a string. Do this without converting the whole binary string into an integer.

        Here's an example and some starter code.

        def sum_binary(bin1, bin2):
          # Fill this in.
  
        print(sum_binary("11101", "1011"))
        # 101000
        */
    class Sum_Binary_Numbers : Testable
    {
        public class InOut : St_InOuts.Arr_Primary<string, string>
        {
            public InOut(string num, string num1, string sum) : base( new string[] { num, num1 }, sum)
            {
                AddSolver(Add_Binary);
            }
        }

        public Sum_Binary_Numbers()
        {
            testcases.Add(new InOut("11101","1011", "101000"));
        }

        public static void Add_Binary(string[] arr, InOut.Ergebnis erg) => erg.Setze(Add_Binary(arr[0], arr[1]), Complexity.LINEAR, Complexity.LINEAR);

        public static string Add_Binary(string num, string num2)
        {
            StringBuilder sb = new StringBuilder();

            string smaller = num.Length > num2.Length ? num2 : num;
            string bigger = smaller == num ? num2 : num;

            int pos = 0;
            bool carry = false;
            for(; pos < bigger.Length; pos++)
            {
                bool c1 = pos <smaller.Length ? smaller[smaller.Length - 1 - pos] == '1' : false;
                bool c2 = bigger[bigger.Length - 1 - pos] == '1';

                bool xor1 = c1 ^ c2;
                bool sum = xor1 ^ carry;
                carry = (c1 && c2) || (xor1 && carry);

                if (sum) sb.Insert(0, '1');
                else sb.Insert(0, '0');
            }

            return carry ? '1' + sb.ToString() : sb.ToString();
        }
    }
}
