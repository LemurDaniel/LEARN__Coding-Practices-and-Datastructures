using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class JumpGame2 : Testable
    {
        private class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string s, int b) : base(s, b)
            {
                AddSolver(SearchRecursive);
                HasMaxDur = false;
            }
        }


        public JumpGame2()
        {
            testcases.Add(new InOut("4,2,1,0,4", 1));
            testcases.Add(new InOut("2,3,1,1,4", 2));

        }

        //SOL
        public static void SearchRecursive(int[] arr, InOut.Ergebnis erg) => erg.Setze(SearchRecursive(arr.Length - 1, arr), Complexity.FACTORIAL, Complexity.FACTORIAL, "Not Sure??");
        public static int SearchRecursive(int pos, int[] arr)
        {
            if (pos == 0) return 0;
            int jumpLen = int.MaxValue;
            for (int i = 0, len = pos; i < pos; i++, len--) if (arr[i] >= len) jumpLen = Math.Min(SearchRecursive(i, arr)+1, jumpLen);
            return jumpLen == int.MaxValue ? -1:jumpLen;
        }
    }
}
