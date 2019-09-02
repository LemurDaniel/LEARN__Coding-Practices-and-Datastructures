using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Container_with_most_water : Testable
    {
        public class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string s, int i) : base(s, i)
            {
                AddSolver(ContainerWithMostWater);
                AddSolver(ContainerWithMostWater2);
            }
        }

        public Container_with_most_water()
        {
            testcases.Add(new InOut("2,1,4,7,6,13,9,1", 14));
        }


        //SOL
        public static void ContainerWithMostWater(int[] arr, InOut.Ergebnis erg)
        {
            int right = arr.Length - 1, left = 0, bucket = 0;
            do
            {
                bucket = Math.Max(Math.Min(arr[right], arr[left]) * (right - left - 1), bucket);
                if (arr[left] < arr[right]) left++;
                else right--;
            } while (right > left);

            erg.Setze(bucket, Complexity.LINEAR, Complexity.CONSTANT);
        }

        public static void ContainerWithMostWater2(int[] arr, InOut.Ergebnis erg)
        {
            int right = arr.Length - 1, left = 0, bucket = 0;
            do
            {
                int temp = bucket;
                bucket = Math.Max(Math.Min(arr[right], arr[left]) * (right - left - 1), bucket);
                if (bucket != temp) Console.WriteLine("Pos --- ({0}, {1}) => Vals ({2}, {3}) len:{6} => bucket old{4} => new{5}", left, right, arr[left], arr[right], temp, bucket, right-left);
                if (arr[left] < arr[right]) left++;
                else right--;
            } while (right > left);

            erg.Setze(bucket, Complexity.LINEAR, Complexity.CONSTANT);
        }

    }
}
