using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Find_the_k_th_Largest_Element_in_a_List : Testable
    {

        private class Input
        {
            public readonly int k;
            public readonly int[] arr;
            private string arrS;
            public Input(string arrS, int k)
            {
                this.arrS = arrS;
                this.k = k;
                this.arr = Helfer.Assemble(arrS);
            }
            public override string ToString() => Helfer.Arrayausgabe<int>(arr) + "\nKth: " +k;
            public Input Copy() => new Input(arrS, k);
        }


        private class InOut : InOutBase<Input, int>
        {
            public InOut(Input inp, int i) : base(inp, i, true)
            {
                copiedInputProvider = arg => arg.Copy();
                AddSolver(FindKthLargest_SortAndPass);
            }
        }


        public Find_the_k_th_Largest_Element_in_a_List()
        {
            testcases.Add(new InOut(new Input("3,5,2,4,6,8",3),5));
        }






        // SOL
        private static void FindKthLargest_SortAndPass(Input inp, InOut.Ergebnis erg) => erg.Setze(FindKthLargest_SortAndPass(inp.arr, inp.k));
        private static int FindKthLargest_SortAndPass(int[] arr, int k)
        {
            if (k < 0) k = 1;
            Array.Sort<int>(arr);   // Sort Arr
            int target = arr[arr.Length - 1];
            k--;
            for(int i=arr.Length-2; k>0 && i>0; i--)
            {
                if (arr[i] == target) continue;     // Skip equal values
                target = arr[i];
                k--;
            }
            return target;
        }
    }
}
