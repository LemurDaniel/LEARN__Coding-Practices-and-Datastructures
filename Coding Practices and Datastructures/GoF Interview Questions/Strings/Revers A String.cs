using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Strings
{
    class Revers_A_String : Testable
    {
        public class InOut : InOutBase<string, string>
        {
            public InOut(string s, string s2) : base(s, s2, true)
            {
                AddSolver((arg, erg) => erg.Setze(SolveRecursive(arg)), "Rekursiv");
                AddSolver((arg, erg) => erg.Setze(IterateOver(arg)), "Iterate");
                AddSolver((arg, erg) => erg.Setze(IterateOver2(arg)), "IterateCharArray");
                AddSolver((arg, erg) => erg.Setze(StackSolve(arg)), "StackSolve");
            }
        }



        public Revers_A_String()
        {
            testcases.Add(new InOut("Wetter", "retteW"));
            string s = Helfer.RandomString(int.MaxValue/128, true);
            testcases.Add(new InOut(s, StackSolvessssssssssssssssssssssssss(s, true)));
        }






        //SOL
        public static string SolveRecursive(string s) => s[s.Length - 1] + (s.Length == 1 ? "" : SolveRecursive(s.Substring(0, s.Length - 1)));
        public static string IterateOver(string s)
        {
            StringBuilder sb = new StringBuilder();
            for (int i = s.Length - 1; i >= 0; i--) sb.Append(s[i]);
            return sb.ToString();
        }
        public static string IterateOver2(string s)
        {
            char[] carr = s.ToCharArray();
            for (int i = 0; i < carr.Length/2; i++)
            {
                char temp = s[i];
                carr[i] = carr[carr.Length - i - 1];
                carr[carr.Length - i - 1] = temp;
            }
            return new string(carr);
        }
        public static string StackSolve(string s, bool report = false)
        {
            Stack<char> st = new Stack<char>();
            StringBuilder sb = new StringBuilder();
            foreach (char c in s) st.Push(c);
            while (st.Count > 0) sb.Append(st.Pop());
            return sb.ToString();
        }


        public static string StackSolvessssssssssssssssssssssssss(string s, bool report = false)
        {
            Stack<char> st = new Stack<char>();
            StringBuilder sb = new StringBuilder();
            foreach (char c in s)
            {
                if (report && st.Count % (s.Length/100) == 0) Console.WriteLine("Stack size: " + st.Count + "    ---    Done: " + (((double)st.Count) / s.Length * 100) + "%"); 
                st.Push(c);
            }
            while (st.Count > 0)
            {
                if (report && st.Count % (s.Length / 100) == 0) Console.WriteLine("Stack size: " + st.Count + "    ---    Done: " + (((double)s.Length-st.Count) / s.Length * 100) + "%");
                sb.Append(st.Pop());
            }
            return sb.ToString();
        }
    }
}
