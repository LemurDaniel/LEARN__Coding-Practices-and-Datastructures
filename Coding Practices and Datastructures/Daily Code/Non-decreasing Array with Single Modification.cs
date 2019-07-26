using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoF_Coding_Interview_Algos.Daily_Code 
{
    /*
        You are given an array of integers in an arbitrary order.
        Return whether or not it is possible to make the array non-decreasing by modifying at most 1 element to any value.

        We define an array is non-decreasing if array[i] <= array[i + 1] holds for every i (1 <= i<n).
    */
    class Non_decreasing_Array_with_Single_Modification : Testable
    {
        private class InOut : InOutBase<int[], bool>
        {
            public InOut(string input, bool output) : base(Helfer.Assemble(input), output){
                inputStringConverter = arg => Helfer.Arrayausgabe<int>("Eingabe: ", arg);
                AddSolver(Solve);
            }
        }

        public Non_decreasing_Array_with_Single_Modification()
        {
            testcases.Add(new InOut("13,4,7", true));
            testcases.Add(new InOut("13,4,1", false));
            testcases.Add(new InOut("13,-2147483648,1", true));
            testcases.Add(new InOut("0,2,-1", false));
            testcases.Add(new InOut("1234567589", false));
        }



        //SOLUTION

        private static void Solve(int[] arr, InOut.Ergebnis erg)
        {
            bool modified = false;
            bool nonDec = true;

            for(int i=0; i<arr.Length && nonDec; i++)
            {
                if(i+1 < arr.Length && arr[i] > arr[i+1])
                {
                    if (modified) nonDec = false;
                    else if (i != 0 && arr[i - 1] > arr[i + 1]) nonDec = false;
                    else modified = true;
                }
            }

            erg.Setze(nonDec);
        }
    }
}
