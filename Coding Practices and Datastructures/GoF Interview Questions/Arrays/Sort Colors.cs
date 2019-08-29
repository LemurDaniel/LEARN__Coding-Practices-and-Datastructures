using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Sort_Colors : Testable
    {
        private class InOut : InOutBase<int[], int[]>{

            public InOut(int[] s, int[] s2) : base(s, s2)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe<int>("Eingabe: ",arg)+ " ...len: "+arg.Length;
                outputStringConverter = arg => Helfer.Arrayausgabe<int>("Erwartet: ", arg);
                ergStringConverter = arg => Helfer.Arrayausgabe<int>("Ausgabe: ", arg);
                copiedInputProvider = arg => Helfer.ArrayCopy<int>(arg);
                CompareOutErg = Helfer.ArrayVergleich<int>;
                AddSolver(SolveOnePass_ConstantSpace_TwoPointers);
            }                
        }

        public Sort_Colors()
        {
            for(int i=0; i<10; i++)
            {
                int[] arr = Helfer.Assemble(0,2,Helfer.Rand.Next(16,26));
                int[] copy = Helfer.ArrayCopy<int>(arr);
                Array.Sort(copy);
                testcases.Add(new InOut(arr, copy));
            }
        }

        /*
         *  StartPointer points to 0 elements => starts at 0
         *  Endpointer points to 2 elements => start at array End
         * 
         *  if(2 Encountered) swap to Endpointer and Endpointer++ and evaluate position again;
         *  if(0 Encountered) swap to StartPointer and StartPointer++ and move to next element;
         *  else move to next element;
         */
        private static void SolveOnePass_ConstantSpace_TwoPointers(int[] arr, InOut.Ergebnis erg)
        {
            int it = 1; //Iterations
            for(int i=0, stP = 0, eP = arr.Length-1; i<=eP; it++)
            {
                if (arr[i] == 0)
                {
                    if (i != stP) Swap(arr, i, stP);    // Don't swap same elemnt => i points to stP
                    stP++;
                }
                else if (arr[i] == 2)
                {
                    Swap(arr, i, eP);
                    eP--;
                    continue; // Don't Increment incase another 2 or 0 gets swapped into place
                }
                i++;    //Next element
            }
            erg.Setze(arr, it, Complexity.LINEAR, Complexity.CONSTANT);
        }

        private static void Swap(int[] arr, int source, int target)
        {
            int temp = arr[target];
            arr[target] = arr[source];
            arr[source] = temp;
        }
    }
}
