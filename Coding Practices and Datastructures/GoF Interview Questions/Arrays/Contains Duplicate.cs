using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Contains_Duplicate : Testable
    {
        public class InOut : St_InOuts.IntArr_Primary<bool>
        {
            public InOut(string s, bool b) : base (s, b, true)
            {
                AddSolver((arg, erg) => erg.Setze(FindDuplicate_viaHashSet(arg), Complexity.LINEAR, Complexity.LINEAR), "Find via Hashset");
                AddSolver((arg, erg) => erg.Setze(FindDuplicate_ConstantSpace(arg), Complexity.QUADRATIC, Complexity.CONSTANT), "Find in Constant Space");
            }
        }

        public Contains_Duplicate()
        {
            testcases.Add(new InOut("1,2,4,5,34,4,8,0", true));
            testcases.Add(new InOut("1,2,4,5,34,9,8,0", false));
        }


        //SOL
        public static ItErgWrapper<bool> FindDuplicate_viaHashSet(int[] nums)
        {
            HashSet<int> set = new HashSet<int>();
            int it = 0;
            for (int i = 0; i < nums.Length; i++, it++) {
                if (set.Contains(nums[i])) return new ItErgWrapper<bool>(true, it);
                else set.Add(nums[i]);
            }
            return new ItErgWrapper<bool>(false, it);
        }

        public static ItErgWrapper<bool> FindDuplicate_ConstantSpace(int[] nums)
        {
            int it = 0;
            for (int i = 0; i < nums.Length; i++)  for(int j=0; j<nums.Length; j++, it++) if(i != j && nums[j] == nums[i]) return new ItErgWrapper<bool>(true, it);
            return new ItErgWrapper<bool>(false, it);
        }
    }
}
