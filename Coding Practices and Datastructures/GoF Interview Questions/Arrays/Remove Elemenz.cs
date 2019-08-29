using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Remove_Element : Testable
    {
        public class Output
        {
            public readonly int[] arr;
            public readonly int len;

            public Output(string arr, int len) : this(Helfer.Assemble(arr), len) { }
            public Output(int[] arr, int len)
            {
                this.len = len;
                this.arr = arr;
                for (int i = len; i < arr.Length; i++) arr[i] = -1;
            }
            public override bool Equals(object obj)
            {
                Output op = obj as Output;
                if (len != op.len) return false;
                return Helfer.ArrayVergleich<int>(arr, op.arr);
            }

            public override int GetHashCode() => base.GetHashCode();
            public override string ToString() => "\n"+Helfer.Arrayausgabe<int>(arr) + "\nLength: " + len;
        }

        public class Input
        {
            public readonly int[] arr;
            public readonly int el;

            public Input(string arr, int el) : this(Helfer.Assemble(arr), el) { }
            public Input(int[] arr, int el)
            {
                this.el = el;
                this.arr = arr;
            }
            public override string ToString() => "\n" + Helfer.Arrayausgabe<int>(arr) + "\nElement: " + el;
            public Input GetCopy() => new Input(Helfer.ArrayCopy<int>(arr), el);
        }
            private class InOut : InOutBase<Input, Output>
        {
            public InOut(string s, int el, string s2, int len) : base(new Input(s, el), new Output(s2, len), true)
            {
                copiedInputProvider = arg => arg.GetCopy();
                AddSolver(RmDuplicates);
            }
        }

        public Remove_Element()
        {
            testcases.Add(new InOut("1,4,3,2,5,6,4,1,3,3,9,0,3,3", 3, "1,4,2,5,6,4,1,9,0,-1,-1,-1,-1,-1", 9));
        }





        //SOL
        public static void RmDuplicates(Input inp, InOut.Ergebnis erg) => erg.Setze(new Output(inp.arr, RmDuplicates<int>(inp.arr, inp.el)), Complexity.LINEAR, Complexity.CONSTANT);
        public static int RmDuplicates<V>(V[] arr, V el)
        {
            int pt = 0;
            for(int i = 0; i<arr.Length; i++)
            {
                if (arr[i].Equals(el)) continue;
                if (pt != i) arr[pt] = arr[i];
                pt++;
            }
            return pt;
        }
    }
}
