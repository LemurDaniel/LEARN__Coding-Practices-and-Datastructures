using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Convert_To_Hex : GoF_Interview_Questions.MathEx.Base_7
    {
        protected new class InOut : GoF_Interview_Questions.MathEx.Base_7.InOut
        {
            public InOut(int i, string s) : base(new Input(i, 16), new Output(s, i))
            {
                
            }
        }

        public Convert_To_Hex()
        {
            testcases.Clear();
            testcases.Add(new InOut(123, "7B"));
        }
    }
}
