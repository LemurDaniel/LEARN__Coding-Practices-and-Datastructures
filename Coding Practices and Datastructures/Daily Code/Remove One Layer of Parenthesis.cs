using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Remove_One_Layer_of_Parenthesis : Testable
    {
        public class InOut : InOutBase<string, string>
        {
            public InOut(string s, string o) : base(s, o, true)
            {
                AddSolver(RemoveOuterLayer);
            }
        }

        public Remove_One_Layer_of_Parenthesis()
        {
            testcases.Add(new InOut("((()()))()", "(()())"));
            testcases.Add(new InOut("(())()", "()"));
            testcases.Add(new InOut("(()())", "()()"));
            testcases.Add(new InOut("()()()", ""));
        }

        public static void RemoveOuterLayer(string parenths, InOut.Ergebnis erg)
        {
            StringBuilder sb = new StringBuilder();
            int layer = 0;
            foreach(char c in parenths)
            {
                if (c == '(') layer++; // Order is important!! Don't do if(c== '(') ... else ...
                if (layer > 1 ) sb.Append(c);
                if (c == ')') layer--;
            }
            erg.Setze(sb.ToString(), Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
