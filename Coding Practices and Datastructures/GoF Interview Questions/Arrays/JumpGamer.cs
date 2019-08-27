using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class JumpGame : Testable
    {
        private class InOut : St_InOuts.IntArr_Primary<bool>
        {
            public InOut(string s, bool b) : base(s, b)
            {
                AddSolver(SearchRecursive);
            }
        }


        public JumpGame()
        {
            testcases.Add(new InOut("2,3,1,1,4", true));
            testcases.Add(new InOut("3,2,1,0,4", false));
        }

        //SOL
        public static void SearchRecursive(int[] arr, InOut.Ergebnis erg) => erg.Setze(SearchRecursive(arr.Length-1, arr), Complexity.FACTORIAL, Complexity.FACTORIAL, "Not Sure??");
        public static bool SearchRecursive(int pos, int[] arr)
        {
            if (pos == 0) return true;
            for(int i=pos-1, len=1; i>=0; i--, len++) if (arr[i] >= len && SearchRecursive(i, arr)) return true;
            return false;
        }
    }
}
