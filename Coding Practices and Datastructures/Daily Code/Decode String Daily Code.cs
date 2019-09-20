using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Decode_String_Daily_Code : GoF_Interview_Questions.Strings.Decode_String
    {
        public Decode_String_Daily_Code()
        {
            testcases.Add(new InOut("2[a2[b]c]","abbcabbc"));
        }
    }
}
