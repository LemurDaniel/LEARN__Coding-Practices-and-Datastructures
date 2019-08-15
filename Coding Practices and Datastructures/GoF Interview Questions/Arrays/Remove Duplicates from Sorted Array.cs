using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Remove_Duplicates_from_Sorted_Array : Testable
    {
        private class Output
        {
            public readonly int[] arr;
            public readonly int len;
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
            public override string ToString() => Helfer.Arrayausgabe<int>(arr) + "\nLength: " + len;
        }
        private class InOut : InOutBase<int[], Output>
        {
            public InOut(int[] i, Output o) : base(i, o, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe<int>("Eingabe: ", arg);
                copiedInputProvider = Helfer.ArrayCopy<int>;
                AddSolver(RmDuplicates);
            }
        }

        public Remove_Duplicates_from_Sorted_Array()
        {
            testcases.Add(new InOut(new int[] { 1, 2, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 9 }, new Output(new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, -1, -1, -1, -1}, 9)));
        }



        //SOL
        private static void RmDuplicates(int[] arr, InOut.Ergebnis erg)
        {
            int pt = 0;
            for (int i = 0; i < arr.Length; i++)
            {
                if (arr[i] != arr[pt]) arr[++pt] = arr[i];
            }
            erg.Setze(new Output(arr, pt+1), Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
