using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Optimized_Sum_List : Testable
    {
        /*
         * 
         * Hi, here's your problem today. This problem was recently asked by Apple:

            Create a class that initializes with a list of numbers and has one method called sum. 
            sum should take in two parameters, start_idx and end_idx and return the sum of the list from start_idx (inclusive) to end_idx` (exclusive).

            You should optimize for the sum method.
         * 
         * 
         * 
         */

        public class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string nums, int num) : base (nums, num, true)
            {
                AddSolver(Solver1);
            }
        }

        public interface IFastListSum {
            int Sum(int start, int end);
            void SetErgebnis(InOut.Ergebnis erg, int start, int end);
        }

        public Optimized_Sum_List() {
            testcases.Add(new InOut("1,2,3,4,5,6,7,   2,5", 12));   // Last two in Array is startindex and endindex
        }

        public static void MainSolver(IFastListSum Flist, int start, int end, InOut.Ergebnis erg) => Flist.SetErgebnis(erg, start, end);

        public static void Solver1(int[] nums, InOut.Ergebnis erg) => new FList1(nums).SetErgebnis(erg, nums[nums.Length-2], nums[nums.Length-1]);

        public class FList1 : IFastListSum
        {
            private int[] summedList;

            public FList1(int[] nums)
            {
                summedList = Helfer.ArrayCopy(nums);
                for(int i=1; i<summedList.Length-2; i++)
                {
                    summedList[i] += summedList[i - 1];
                }
            }

            public void SetErgebnis(InOutBase<int[], int>.Ergebnis erg, int start, int end)
            {
                Console.WriteLine(Helfer.Arrayausgabe(summedList));
                erg.Setze(Sum(start, end), Complexity.CONSTANT, Complexity.LINEAR, "Summed Solver");
            }
            public int Sum(int start, int end) => summedList[end-1] - summedList[start-1];
        }
    }
}
