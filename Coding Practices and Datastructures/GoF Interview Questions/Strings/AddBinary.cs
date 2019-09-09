using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Strings
{
    class AddBinary : AddNumbers
    {
        public AddBinary()
        {
            testcases.Clear();
            testcases.Add(new InOut("11", "1", 2, "100"));
        }
    }
}
