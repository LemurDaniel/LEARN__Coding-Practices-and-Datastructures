using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{ 
    class Two_Sum : Testable
    {
        private class Input
        {
            public int[] arr;
            public int target;
            public override string ToString() => Helfer.Arrayausgabe<int>("Eingabe: ", arr, true) + "\nTarget: " + target;
        }
        private class Output
        {
            public int[] erg;
            public string exp;
            public Output(int[] erg) => this.erg = erg;
            public override string ToString() => Helfer.Arrayausgabe<int>(erg) + ((exp != null) ? "\nExpression: " + exp : "");
            public override bool Equals(object obj) => Helfer.ArrayVergleich<int>( ((Output)obj).erg, erg);

        }

        private class InOut : InOutBase<Input, Output>
        {
            public InOut(Input input, Output output) : base(input, output, true) => AddSolver(TwoSumSolve, "Two Sum Solver 1");

        }

        public Two_Sum() : base("--- Two Sum ---")
        {
            testcases.Add(new InOut(
                new Input
                {
                    arr = new int[] { 4, 7, 1, -3, 2 },
                    target = 5
                }, new Output(new int[] { 0, 2 })));


            int[] arr1 = new int[1_000_000];
            for (int i = 0; i < arr1.Length; i++)
            {
                if (i == 500) arr1[i] = 35;
                else if (i == 40) arr1[i] = 15;
                else arr1[i] = Helfer.random.Next(55, 100);
            }
            testcases.Add(new InOut(
                new Input
                {
                    arr = arr1,
                    target = 50
                }, new Output(new int[] { 40, 500 })));

            testcases.Add(new InOut(
                new Input
                {
                    arr = new int[1_000_000],
                    target = 50
                }, new Output(null)));
        }



        private static void TwoSumSolve(Input testcase, InOut.Ergebnis erg)
        {
            int[] input = testcase.arr;
            int target = testcase.target;
            Output outp = new Output(null);

            IDictionary<int, int> numbers = new Dictionary<int, int>();
            int i, n1;
            for (i = 0; i < input.Length; i++)
            {
                n1 = input[i];
                if (numbers.Keys.Contains(n1))
                {
                    int n2Index = numbers[n1];
                    outp.erg = new int[] { n2Index, i };
                    outp.exp = String.Format("{0} + {1} = {2}", input[n2Index], n1, input[n2Index] + n1);
                    break;
                }
                else if (n1 <= target && !numbers.Keys.Contains(target - n1))
                    numbers.Add(target - n1, i);
            }

            erg.Setze(outp, i);
        }
    }
}
