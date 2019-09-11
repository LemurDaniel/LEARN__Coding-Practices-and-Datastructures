using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    /* Ech Element should appear as many times as they show up in both Arrays */
    /* Result can be in any Order */
    class Intersection_of_Two_Arrays2 : Intersection_of_Two_Arrays
    {
        public new class InOut : Intersection_of_Two_Arrays.InOut
        {
            public InOut(string s, string s2, string s3) : base(s, s2, s3)
            {
                ClearSolvers();
                AddSolver(FindIntersection_Hashmap);
            }
        }
        public Intersection_of_Two_Arrays2()
        {
            testcases.Clear();
            testcases.Add(new InOut("1,2,2,1", "2,2", "2,2"));
            testcases.Add(new InOut("9,4,9,8,4", "4,9,5", "9,4"));
            testcases.Add(new InOut("9,4,9,8,4", "4,9,5,9", "9,9,4"));
        }







        //SOL
        public static void FindIntersection_Hashmap(Input inp, InOut.Ergebnis erg)
        {
            IDictionary<int, int> nums = new Dictionary<int, int>();
            int[] smaller = inp.nums.Length < inp.nums2.Length ? inp.nums : inp.nums2;
            int[] bigger = inp.nums == smaller ? inp.nums2 : inp.nums;
            foreach (int num in smaller)
            {
                if (nums.ContainsKey(num)) nums[num]++;
                else nums[num] = 1;
            }

            IList<int> intersect = new List<int>();
            foreach (int num in bigger)
            {
                if (!nums.ContainsKey(num)) continue;
                else if (nums[num]-- <= 0) continue;
                else intersect.Add(num);
            }

            erg.Setze(intersect.ToArray(), Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
