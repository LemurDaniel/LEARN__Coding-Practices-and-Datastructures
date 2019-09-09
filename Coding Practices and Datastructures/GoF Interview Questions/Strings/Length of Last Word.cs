using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Strings
{
    class Length_of_Last_Word : Testable
    {
        public class InOut : InOutBase<string, int>
        {
            public InOut(string s, int i) : base (s, i, true)
            {
                AddSolver((arg, erg) => erg.Setze(arg.TrimEnd(' ').Length - arg.LastIndexOf(' ') - 1));
            }
        }

        public Length_of_Last_Word()
        {
            testcases.Add(new InOut("Hello World", 5));
        }
    }
}
