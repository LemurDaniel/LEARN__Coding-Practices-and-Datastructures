using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Basic_Calc.Code
{
    interface ICalc
    {
        int GetMode();
        void SetMode(int mode);

        void Eval(string s);
        string PrintStack();
    }
}
