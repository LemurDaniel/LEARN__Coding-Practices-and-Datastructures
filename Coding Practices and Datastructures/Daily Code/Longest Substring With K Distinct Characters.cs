using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Amazon:

        You are given a string s, and an integer k. 
        Return the length of the longest substring in s that contains at most k distinct characters.

        For instance, given the string:
        aabcdefff and k = 3, then the longest substring with 3 distinct characters would be defff. 
        The answer should be 5
     */
    class Longest_Substring_With_K_Distinct_Characters : Testable
    {
        private class Input
        {
            public readonly int k;
            public readonly string s;
            public Input(string s, int k)
            {
                this.s = s;
                this.k = k;
            }
            public override string ToString() => "Eingabe: " + s + "\nK: " + k;
        }
        private class InOut : InOutBase<Input, string>
        {
            public InOut(string s, int k, string o) : base(new Input(s, k), o, true)
            {
                outputStringConverter = arg => "Erwartet: "+arg+"\nLength: "+arg.Length;
                ergStringConverter = arg => "Ergebnis: " + arg + "\nLength: " + arg.Length;
                AddSolver( (arg, erg) => erg.Setze(Solve(arg.s, arg.k), Complexity.LINEAR, Complexity.LINEAR), "Iterativ");
                HasMaxDur = false;
            }
        }


        public Longest_Substring_With_K_Distinct_Characters()
        {
            testcases.Add(new InOut("aabcdefffg", 3, "defff"));
            testcases.Add(new InOut("aabcdefff", 3, "defff"));
            testcases.Add(new InOut("aabcdefff", 4, "cdefff"));
            testcases.Add(new InOut("aabcdefff", 5, "bcdefff"));
            testcases.Add(new InOut("aabcdefff", 6, "aabcdefff"));
            testcases.Add(new InOut("aabcdefff", 16, "aabcdefff"));
            testcases.Add(new InOut("aabcdefff", 1, "fff"));
        }

        ///SOL
        private static string Solve(string s, int k) //!!!!!!!!!! Doesn't work for aabacdefff
        {
            Queue<char> q = new Queue<char>();
            IDictionary<char, int> cIndex = new Dictionary<char, int>();    //First Index of a new Char
            string str = "", temp;

            int i = 0, ind;
            for(; i<s.Length; i++)
            {
                if (cIndex.Keys.Contains(s[i])) continue;
                else if (cIndex.Count < k)
                {
                    q.Enqueue(s[i]);
                    cIndex.Add(s[i], i);
                }
                else
                {
                    char rem = q.Dequeue();
                    ind = cIndex[rem];
                    temp = s.Substring(ind, i-ind);
                    if (temp.Length > str.Length) str = temp;
                    q.Enqueue(s[i]);
                    cIndex.Add(s[i], i);
                    cIndex.Remove(rem);
                }
            }
            ind = cIndex[q.Dequeue()];
            temp = s.Substring(ind, i - ind);
            return str.Length >= temp.Length ? str : temp;
        }

    }
}
