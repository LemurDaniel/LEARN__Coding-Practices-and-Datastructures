using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Given_two_arrays_write_a_function_to_compute_their_intersection : Testable
    {
        public class Input
        {
            public readonly int[] nums, nums2;
            public Input(string nums, string nums2)
            {
                this.nums = Helfer.Assemble(nums);
                this.nums2 = Helfer.Assemble(nums2);
            }
            public override string ToString() => Helfer.Arrayausgabe("Nums: ", nums, true) + "\n" + Helfer.Arrayausgabe("Nums2: ", nums2, true);
        }
        public class InOut : InOutBase<Input, int[]>
        {
            public InOut(string s, string s2, string s3) : base (new Input(s, s2), Helfer.Assemble(s3))
            {
                outputStringConverter = arg => Helfer.Arrayausgabe("Erwartet: ", arg, true);
                ergStringConverter = arg => Helfer.Arrayausgabe("Ausgabe: ", arg, true);
                CompareOutErg = Helfer.ArrayVergleich;

                AddSolver(FindIntersection_WithHashset);
            }
        }
        
        public Given_two_arrays_write_a_function_to_compute_their_intersection()
        {
            testcases.Add( new InOut("1,2,2,1", "2,2", "2") );
            testcases.Add(new InOut("9,4,9,8,4", "4,9,5", "9,4"));
        }

        //SOL
        public static void FindIntersection_WithHashset(Input inp, InOut.Ergebnis erg)
        {
            HashSet<int> set = new HashSet<int>();
            HashSet<int> intersect = new HashSet<int>();
            int[] smaller = inp.nums.Length < inp.nums2.Length ? inp.nums : inp.nums2;
            int[] bigger = smaller == inp.nums2 ? inp.nums : inp.nums2;

            int it = 0;
            for (int i = 0; i < smaller.Length; i++, it++) if (!set.Contains(smaller[i])) set.Add(smaller[i]);
            for (int i = 0; i < bigger.Length; i++, it++) if (set.Contains(bigger[i]) && !intersect.Contains(bigger[i])) intersect.Add(bigger[i]);

            erg.Setze(intersect.ToArray(), it, Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
