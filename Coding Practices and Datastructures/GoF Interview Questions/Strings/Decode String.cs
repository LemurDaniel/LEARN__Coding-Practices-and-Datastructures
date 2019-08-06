using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Strings
{
    class Decode_String : Testable

    {
        private class InOut : InOutBase<string, string>
        {
            public InOut(string s, string s2) : base(s, s2, true)
            {
                AddSolver((arg, erg) => erg.Setze(DecodeRecurse(arg)), "Rekursiv");
                AddSolver((arg, erg) => erg.Setze(DecodeStack(arg)), "StackDecode");
            }
        }

        public Decode_String()
        {
            testcases.Add(new InOut("3[a]2[bc]", "aaabcbc"));
            testcases.Add(new InOut("3[a2[c]]", "accaccacc"));
            testcases.Add(new InOut("2[abc]3[cd]ef", "abcabccdcdcdef"));
        }


        private static string DecodeRecurse(string s)
        {
            StringBuilder sb = new StringBuilder();
            int num = 0;
            for(int i=0; i<s.Length; i++)
            {
                if (Char.IsDigit(s[i])) num += int.Parse(s[i] + "") + num * 10;
                else if (s[i] != '[') sb.Append(s[i] + "");
                else
                {
                    int i2 = i;
                    while (s[i2] != ']') i2++;
                    string s2 = DecodeRecurse(s.Substring(i + 1, i2 - i - 1));
                    while (num-- > 0) sb.Append(s2);
                    i = i2;
                    num = 0;
                }
            }
            return sb.ToString();
        }
        private static string DecodeStack(string s)
        {
            Stack<int> nums = new Stack<int>();
            Stack<string> decodes = new Stack<string>();
            decodes.Push("");

            int num = 0;
            for (int i = 0; i < s.Length; i++)
            {
                if (Char.IsDigit(s[i])) num += int.Parse(s[i] + "") + num * 10;
                else if (s[i] == '[')
                {
                    nums.Push(num);
                    num = 0;
                    decodes.Push("");
                }
                else if (s[i] == ']')
                {
                    string sTemp = "";
                    num = nums.Pop()+1;
                    while (num-- > 1) sTemp += decodes.Peek();
                    decodes.Pop();
                    decodes.Push(decodes.Pop() + sTemp);
                }else
                    decodes.Push(decodes.Pop() + s[i]);
            }
            return decodes.Pop();
        }
    }
}
