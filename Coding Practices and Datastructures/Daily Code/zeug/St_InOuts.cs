using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class St_InOuts
    {
        public class IntArr_Primary<O> : InOutBase<int[], O>
        {
            public IntArr_Primary(string s, O o) : base(Helfer.Assemble(s), o, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe<int>("Eingabe: ", arg);
            }
        }
    }
}
