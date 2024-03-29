﻿using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.DS_HANDBOOK.Interfaces;
using Coding_Practices_and_Datastructures.DS_HANDBOOK.Queue;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.DS_HANDBOOK.Test
{
    class Test_PrioArrayQueue : Testable
    {
        public class InOut : St_InOuts.IntArr_Primary<string>
        {
            public InOut(string s, string s2) : base(s, s2)
            {
                AddSolver(Solve);
            }
        }


        public Test_PrioArrayQueue()
        {
            testcases.Add(new InOut("9923847651", "1 2 3 4 5 6 7 8 9"));
            testcases.Add(new InOut("5,5,4,3,2,1", "1 2 3 4 5"));
            testcases.Add(new InOut("7,5,2,4,3,4,2,1", "1 2 2 3 4 4 5"));
            testcases.Add(new InOut("5,5,2,3,-1,-1,99,68,70,72", "5 68 70 72 99"));
        }

        //SOL
        private static void Solve(int[] arr, InOut.Ergebnis erg)
        {
            string res = "";
            IQueue<int> q = new PrioArrayQueue<int>(arr[0], (z, z2) => z.CompareTo(z2) );
            for(int i=1; i<arr.Length; i++)
            {
                if (arr[i] == -1) q.Dequeue();
                else q.Enqueue(arr[i]);
            }
            while (!q.IsEmpty()) res += q.Dequeue()+" ";
            erg.Setze(res.Trim(' '));
        }
    }
}
