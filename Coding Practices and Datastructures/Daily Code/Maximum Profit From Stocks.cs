using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Maximum_Profit_From_Stocks : Testable
    {

        /*
         * Hi, here's your problem today. This problem was recently asked by Apple:

            You are given an array. 
            Each element represents the price of a stock on that particular day. 
            Calculate and return the maximum profit you can make from buying and selling that stock only once.

            For example: [9, 11, 8, 5, 7, 10]

            Here, the optimal trade is to buy when the price is 5, and sell when it is 10, so the return value should be 5 (profit = 10 - 5 = 5).
        */
        private class InOut : St_InOuts.IntArr_Primary<int>
        {
            public InOut(string s, int i) : base(s, i)
            {
                AddSolver(Get_MaxProfit);
                AddSolver(Get_MaxProfit2);
            }
        }

        public Maximum_Profit_From_Stocks()
        {
            testcases.Add(new InOut("9,11,8,5,7,10",5));
            testcases.Add(new InOut("7,1,5,3,6,4", 5));
            testcases.Add(new InOut("7,6,4,3,1", 0));
        }



        //SOL
        public static void Get_MaxProfit(int[] arr, InOut.Ergebnis erg)
        {
            int max = 0;
            for(int i=1; i<arr.Length; i++) max = Math.Max(Get_MaxProfit(arr, i), max);
            erg.Setze(max, Complexity.FACTORIAL, Complexity.CONSTANT);
        }

        private static int Get_MaxProfit(int[] arr, int pos)
        {
            int max = 0;
            for (int i = 0; i < pos; i++) max = Math.Max(max, arr[pos]-arr[i]);
            return max;
        }

        public static void Get_MaxProfit2(int[] arr, InOut.Ergebnis erg)
        {
            int minVal = arr[0];
            int maxProfit = 0;
            for (int i = 1; i < arr.Length; i++)
            {
                minVal = Math.Min(minVal, arr[i]);
                maxProfit = Math.Max(maxProfit, arr[i] - minVal);
            }
            erg.Setze(maxProfit, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}
