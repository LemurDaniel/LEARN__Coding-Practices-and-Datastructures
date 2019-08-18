using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.DS_HANDBOOK.Interfaces;
using Coding_Practices_and_Datastructures.DS_HANDBOOK.Queue;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.DS_HANDBOOK.Test
{
    class TestArrayQueue : Testable
    {
        public class InOut : St_InOuts.IntArr_Primary<string>
        {
            public InOut(string s, string s2) : base(s, s2)
            {
                AddSolver(Solve);
                HasMaxDur = false;
            }
        }


        public TestArrayQueue()
        {
            testcases.Add(new InOut("5,1,2,3,4,5", "1 2 3 4 5"));
            testcases.Add(new InOut("5,1,2,3,4,5,-1,-1,-1,-1,6,7,8,9", "5 6 7 8 9"));
            testcases.Add(new InOut("5,2,-1", ""));
            testcases.Add(new InOut("1,2,2", ""));
        }

        //SOL
        private static void Solve(int[] arr, InOut.Ergebnis erg)
        {
            string res = "";
            IQueue<int> q = new ArrayQueue<int>(arr[0]);
            for(int i=1; i<arr.Length; i++)
            {
                if (arr[i] == -1) q.Dequeue();
                else q.Enqueue(arr[i]);
            }
            while (!q.IsEmpty()) res += q.Dequeue() + " ";
            erg.Setze(res.Trim(' '));
        }
    }
}
