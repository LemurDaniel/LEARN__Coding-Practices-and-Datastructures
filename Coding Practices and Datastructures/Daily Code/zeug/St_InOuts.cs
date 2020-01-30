using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class St_InOuts
    {
        public class Primary_Arr<O, N> : InOutBase<O, N[]>
        {
            public Primary_Arr(O o, N[] n, bool len = false, bool shuffle = false, bool checkOrder = true) : base(o, shuffle ? Helfer.ArrayShuffle(n) : n, true)
            {
                outputStringConverter = arg => Helfer.Arrayausgabe<N>("Erwartet: ", arg, len);
                ergStringConverter = arg => Helfer.Arrayausgabe<N>("Ausgabe: ", arg, len);
                if (checkOrder) CompareOutErg = Helfer.ArrayVergleich<N>;
                else CompareOutErg = Helfer.ArrayVergleichAnyOrder<N>;
            }
        }

        public class Primary_IntArr<O> : Primary_Arr<O, int>
        {
            public Primary_IntArr(O o, int[] arr, bool len = false, bool shuffle = false, bool checkOrder = true) : base(o, arr, len, shuffle, checkOrder){}
            public Primary_IntArr(O o, String s, bool len = false, bool shuffle = false, bool checkOrder = true) : this(o, Helfer.Assemble(s), len, shuffle, checkOrder){}
        }

        public class Arr_Primary<O, N> : InOutBase<O[], N>
        {
            public Arr_Primary(O[] o, N n, bool len = false, bool shuffle = false) : base(shuffle ? Helfer.ArrayShuffle(o) : o, n, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe<O>("Eingabe: ", arg, len);
                copiedInputProvider = Helfer.ArrayCopy<O>;
            }
        }

        public class IntArr_Primary<O> : Arr_Primary<int, O>
        {
            public IntArr_Primary(int[] arr, O o, bool len = false, bool shuffle = false) : base(arr, o, len, shuffle){}
            public IntArr_Primary(string s, O o, bool len = false, bool shuffle = false) : this(Helfer.Assemble(s), o, len, shuffle){}
        }

        public class TwoArr<O, N> : InOutBase<O[], N[]>
        {
            public TwoArr(O[] o, N[] n, bool len = false, bool shuffle = false, bool checkOrder = true) : base(shuffle ? Helfer.ArrayShuffle(o) : o, shuffle ? Helfer.ArrayShuffle(n) : n)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe("Eingabe: ", arg, len);
                outputStringConverter = arg => Helfer.Arrayausgabe("Erwartet: ", arg, len);
                ergStringConverter = arg => Helfer.Arrayausgabe("Ausgabe: ", arg, len);
                if (checkOrder) CompareOutErg = Helfer.ArrayVergleich;
                else CompareOutErg = Helfer.ArrayVergleichAnyOrder;
                copiedInputProvider = Helfer.ArrayCopy;
            }
        }
        public class SameArr<O> : TwoArr<O, O>
        {
            public SameArr(O[] o, O[] n, bool len = false, bool shuffle = false, bool checkOrder = true) : base(o, n, len, shuffle, checkOrder){}
        }

        public class TwoIntArr: SameArr<int>
        {
            public TwoIntArr(string arr, string arr1, bool len = false, bool shuffle = false, bool checkOrder = true) : base(Helfer.Assemble(arr), Helfer.Assemble(arr1), len, shuffle, checkOrder){}
        }
    }
}
