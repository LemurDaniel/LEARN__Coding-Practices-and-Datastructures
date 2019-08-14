using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Best_Time_To_Buy_And_Sell_Stock : Testable
    {
        private class InOut : InOutBase<int[], int>
        {
            public InOut(string s, int i) : base(Convert(s), i, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe<int>("Eingabe: ", arg, true);
                AddSolver(Get_MaxProfit);
            }
            private static int[] Convert(string s)  //NOTE Input array is the Price difference of the Stocks each day Day 1: 9, Day 2: 11; Difference => 11-9 = 2;
            {
                int[] arr = Helfer.Assemble(s);
                for (int i = arr.Length-1; i > 0; i--) arr[i] = arr[i] - arr[i - 1];
                arr[0] = 0;
                return arr;
            }
        }

        public Best_Time_To_Buy_And_Sell_Stock()
        {
            testcases.Add(new InOut("9,11,8,5,7,10", 5));
            testcases.Add(new InOut("7,1,5,3,6,4", 5));
            testcases.Add(new InOut("7,6,4,3,1", 0));
        }



        //SOL
        public static void Get_MaxProfit(int[] arr, InOut.Ergebnis erg)
        {
            int price = arr[0];
            int minVal = price;
            int maxProfit = 0;
            for (int i = 1; i < arr.Length; i++)
            {
                price += arr[i];
                minVal = Math.Min(minVal, price);
                maxProfit = Math.Max(maxProfit, price - minVal);
            }
            erg.Setze(maxProfit, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}

