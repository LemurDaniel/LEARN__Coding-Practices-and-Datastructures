using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Stack
{
    class Simplify_File_Path : Testable
    {
        private class InOut : InOutBase<string, string>
        {
            public InOut(string s, string s2) : base(s, s2, true)
            {
                AddSolver(StackSolver);
                AddSolver(StackSolver2);
            }
        }

        public Simplify_File_Path()
        {
            testcases.Add(new InOut("/home/", "/home"));
            testcases.Add(new InOut("/home/./a/../../c", "/c"));
        }




        //SOLV

        private static void StackSolver(string path, InOut.Ergebnis erg) => erg.Setze(StackSolver(path), Complexity.LINEAR, Complexity.LINEAR);
        private static void StackSolver2(string path, InOut.Ergebnis erg) => erg.Setze(StackSolver2(path), Complexity.LINEAR, Complexity.LINEAR);

        private static string StackSolver(string path)
        {
            Stack<string> st = new Stack<string>();
            path += "/"; 
            for(int i=1, pt=1; i<path.Length; i++)
            {
                if (path[i] != '/' && i != path.Length) continue;
                string element = path.Substring(pt, i-pt);
                pt = i+1;
                if (element == "." || element == "") continue;
                else if (element != "..") st.Push(element);
                else
                {
                    if (st.Count == 0) throw new FormatException("The path is malformed");
                    else st.Pop();
                }
            }

            if (st.Count == 0) return "/";

            string shortPath = "";
            while (st.Count > 0) shortPath += "/" + st.Pop();
            return shortPath;
        }


        private static string StackSolver2(string path)
        {
            Stack<string> st = new Stack<string>();
            string[] tokens = path.Split('/');
            foreach (string token in tokens)
            {
                if (token == "." || token == "") continue;
                else if (token != "..") st.Push(token);
                else
                {
                    if (st.Count == 0) throw new FormatException("The path is malformed");
                    else st.Pop();
                }
            }

            if (st.Count == 0) return "/";

            string shortPath = "";
            while (st.Count > 0) shortPath += "/"+st.Pop();
            return shortPath;
        }
    }
}
