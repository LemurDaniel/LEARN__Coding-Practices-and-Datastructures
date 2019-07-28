using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Two_Sum : Testable
    {
        /*
            You are given a list of numbers, and a target number k. 
            Return whether or not there are two numbers in the list that add up to k.
         */
        private class Input
        {
            public int[] arr;
            public int target;
            public override string ToString() => Helfer.Arrayausgabe<int>("Eingabe: ", arr, true) + "\nTarget: " + target;
        }
        private class Output
        {
            public bool erg;
            public string exp;
            public Output(bool erg) => this.erg = erg;
            public override string ToString() => erg + ((exp != null) ? "\nExpression: " + exp:"");
            public override bool Equals(object obj) => obj.Equals(erg);
            public override int GetHashCode() => erg.GetHashCode();
        }

        private class InOut : InOutBase<Input, Output>
        {
            public InOut(Input input, Output output) : base (input, output, true) => AddSolver(TwoSumSolve, "Two Sum Solver 1");

        }

        public Two_Sum() : base ("--- Two Sum ---")
        {
            testcases.Add(new InOut(
                new Input{
                    arr = new int[] { 4, 7, 1, -3, 2},
                    target = 5
            }, new Output(true)));

            testcases.Add(new InOut(
                new Input{
                    arr = new int[1_000_000],
                    target = 50
                }, new Output(false)));

            int[] arr1 = new int[1_000_000];
            for (int i = 0; i < arr1.Length; i++) arr1[i] = Helfer.random.Next(0, 100);
            testcases.Add(new InOut(
                new Input
                {
                    arr = arr1,
                    target = 50
                }, new Output(true)));
        }



        private static void TwoSumSolve(Input testcase, InOut.Ergebnis erg)
        {
            int[] input = testcase.arr;
            int target = testcase.target;
            Output outp = new Output(false);

            IDictionary<int, int> numbers = new Dictionary<int, int>();
            int i, n1;
            for(i=0; i<input.Length; i++)
            {
                n1 = input[i];
                if (numbers.Keys.Contains(n1))
                {
                    int n2 = numbers[n1];
                    outp.erg = true;
                    outp.exp = String.Format("{0} + {1} = {2}", n2, n1, n2 + n1);
                    break;
                }
                else if (n1 <= target && !numbers.Keys.Contains(target - n1))
                    numbers.Add(target - n1, n1);
            }

            erg.Setze(outp, i);
        }
    }
}
