using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    /*
     *  Given a sorted array and a traget value, return the index if the target is found.
        If not, return the index where it would be if it werde inserted in order
        */

    class Search_Insert_Position : Testable
    {
        public class Input
        {
            public readonly int[] arr;
            public readonly int value;
            public Input(int[] arr, int value)
            {
                this.arr = arr;
                this.value = value;
            }
            public override string ToString() => Helfer.Arrayausgabe(arr) + "\nWert: " + value;
        }
        public class InOut : InOutBase<Input, int>
        {
            public InOut(string s, int i, int i2) : base(new Input(Helfer.Assemble(s), i), i2, true)
            {
                AddSolver(SimpleBinarySearch);
            }
        }

        public Search_Insert_Position()
        {
            testcases.Add(new InOut("1,3,5,6", 5, 2));
            testcases.Add(new InOut("1,3,5,6", 2, 1));
            testcases.Add(new InOut("1,3,5,6", 7, 4));
            testcases.Add(new InOut("1,3,5,6", 0, 0));
        }


        //SOL
        public static void SimpleBinarySearch(Input inp, InOut.Ergebnis erg) => erg.Setze(SimpleBinarySearch(inp.arr, inp.value), Complexity.LOGARITHMIC, Complexity.CONSTANT);
        public static int SimpleBinarySearch(int[] arr, int val)
        {
            int low = 0, high = arr.Length - 1, curr;
            do
            {
                curr = (low + high) / 2;
                int comp = arr[curr].CompareTo(val);
                if (comp == 0) return curr;
                else if (comp > 0) high = curr - 1;
                else low = curr + 1;
            } while (high >= low);
            return low;
        }
    }
}
