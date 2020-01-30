using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * Hi, here's your problem today. This problem was recently asked by Apple:

        Given a sorted list of size n, with m unique elements (thus m < n), modify the list such that the first m unique elements in the list will be sorted, ignoring the rest of the list. 
        Your solution should have a space complexity of O(1). Instead of returning the list (since you are just modifying the original list), you should return what m is.

        Here's an example and some starter code.

        def remove_dups(nums):
          # Fill this in.

        nums = [1, 1, 2, 3, 4, 4, 4, 4, 4, 5, 5, 6, 7, 9]
        print(remove_dups(nums))
        # 8
        print(nums)
        # [1, 2, 3, 4, 5, 6, 7, 9]

        nums = [1, 1, 1, 1, 1, 1]
        print(remove_dups(nums))
        print(nums)
        # 1
        # [1]
    */
    class Remove_Duplicates_From_Sorted_List : Testable
    {
        public class Output
        {
            public readonly int m;
            private readonly int[] arr;
            private readonly int[] referenceArr;
            public Output(int m, int[] arr, int[] refArr = null)
            {
                this.arr = arr;
                this.m = m;
                this.referenceArr = refArr;
            }

            public override string ToString() => "\n    M: " + m + "\n  Array: " + Helfer.Arrayausgabe(arr, 0, m);
            public override bool Equals(object obj)
            {
                Output out2 = (Output) obj;
                int s = referenceArr.GetHashCode();
                int s2 = out2.arr.GetHashCode();
               // if (referenceArr != out2.arr) return false; //Checks if still same Array as Input
                if (out2.m != m) return false;
                for (int i = 0; i < m; i++) if (out2.arr[i] != arr[i]) return false;
                return true;
            }
            public override int GetHashCode() => base.GetHashCode();
        }
        public class InOut : St_InOuts.IntArr_Primary<Output>
        {
            private static int[] temp;
            public InOut(string s, int m, string s2) : base(InOut.Convert(s), new Output(m, Helfer.Assemble(s2), temp), true)
            {
                AddSolver(Remove_Doubles);
            }
            private static int[] Convert(string s)
            {
                temp = Helfer.Assemble(s);
                return temp;
            }
        }

        public Remove_Duplicates_From_Sorted_List()
        {
            testcases.Add(new InOut("1, 1, 2, 3, 4, 4, 4, 4, 4, 5, 5, 6, 7, 9", 8, "1,2,3,4,5,6,7,9"));
            testcases.Add(new InOut("1, 1, 1, 1, 1, 1", 1, "1"));
        }

        public static void Remove_Doubles(int[] arr, InOut.Ergebnis erg)
        {
            int p = 1;
            for (int i = 1; i < arr.Length; i++)
                if (arr[i] != arr[i - 1]) arr[p++] = arr[i];   // if p == i THEN Nothing happens

            erg.Setze(new Output(p, arr), Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
