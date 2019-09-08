﻿using System;
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
            public IntArr_Primary(string s, O o, bool len = false) : base(Helfer.Assemble(s), o, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe<int>("Eingabe: ", arg, len);
                copiedInputProvider = Helfer.ArrayCopy<int>;
            }
        }

        public class TwoArr<O, N> : InOutBase<O[], N[]>
        {
            public TwoArr(O[] o, N[] n, bool len = false) : base(o, n)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe("Eingabe: ", arg, len);
                outputStringConverter = arg => Helfer.Arrayausgabe("Erwartet: ", arg, len);
                ergStringConverter = arg => Helfer.Arrayausgabe("Ausgabe: ", arg, len);
                CompareOutErg = Helfer.ArrayVergleich;
                copiedInputProvider = Helfer.ArrayCopy;
            }
        }
        public class SameArr<O> : TwoArr<O, O>
        {
            public SameArr(O[] o, O[] n, bool len = false) : base(o, n, len)
            {
            }
        }
    }
}
