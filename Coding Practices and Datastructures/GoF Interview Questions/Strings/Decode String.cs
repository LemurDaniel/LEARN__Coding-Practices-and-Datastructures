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
        public class InOut : InOutBase<string, string>
        {
            public InOut(string s, string s2) : base(s, s2, true)
            {
                AddSolver((arg, erg) => erg.Setze(DecodeRecurse(arg)), "Rekursiv");
                AddSolver((arg, erg) => erg.Setze(DecodeRecurse_another_Way(arg)), "Rekursiv2");
                AddSolver((arg, erg) => erg.Setze(DecodeStack(arg)), "StackDecode");

                HasMaxDur = false;
            }
        }

        public Decode_String()
        {
            testcases.Add(new InOut("3[a2[c]g]", "accgaccgaccg"));
            testcases.Add(new InOut("3[a2[c]]", "accaccacc"));
            testcases.Add(new InOut("3[a]2[bc]", "aaabcbc"));
            testcases.Add(new InOut("2[abc]3[cd]ef", "abcabccdcdcdef"));

        }


        private static string DecodeRecurse(string s)
        {
            StringBuilder sb = new StringBuilder();
            int num = 0;
            for(int i=0; i<s.Length; i++)
            {
                if (Char.IsDigit(s[i])) num += int.Parse(s[i] + "") + num * 10;
                else if (s[i] != '[') sb.Append(s[i] + ""); //Append all to Current Sequence
                else
                {
                    // Start of Subsequence
                    int i2 = i;
                    int brackets = 1;
                    while (brackets > 0) // When 3[a2[c2[b]] => then subsequence is 2[c2[b]]
                    {
                        i2++;
                        if (s[i2] == '[') brackets++;
                        else if (s[i2] == ']') brackets--;
                    }
                    string s2 = DecodeRecurse(s.Substring(i + 1, i2 - i - 1));
                    while (num-- > 0) sb.Append(s2);
                    i = i2;
                    num = 0;
                }
            }
            return sb.ToString();
        }

        private static string DecodeRecurse_another_Way(string s)
        {
            int i = -1;
            return DecodeRecurse_another_Way(s, ref i);
        }
        private static string DecodeRecurse_another_Way(string s, ref int i)
        {
            StringBuilder sb = new StringBuilder();
            string sub = "";
            int num = 0;
            i++;
            for (; i < s.Length; i++)
            {
                if (Char.IsDigit(s[i])) num = num * 10 + int.Parse(s[i] + "");
                else if (s[i] == ']') break;
                else if (s[i] != '[') sb.Append(s[i]);
                else
                {
                    sub = DecodeRecurse_another_Way(s, ref i);
                    while (num-- > 0) sb.Append(sub);
                };
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
                else if (s[i] == '[') // If Seq Start => Push "repeat number" to stack
                {
                    nums.Push(num);
                    num = 0;
                    decodes.Push("");
                }
                else if (s[i] == ']') // If Seq End =>  Take num from Stack an Resolve Sequence, Push bak to Stack
                {
                    string sTemp = "";
                    num = nums.Pop()+1;
                    while (num-- > 1) sTemp += decodes.Peek();
                    decodes.Pop();
                    decodes.Push(decodes.Pop() + sTemp);
                }else
                    decodes.Push(decodes.Pop() + s[i]); // If In Seq => Push Elements to current Sequence
            }
            return decodes.Pop();
        }
    }
}
