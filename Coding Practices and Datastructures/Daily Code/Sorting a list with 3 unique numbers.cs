using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Sorting_a_list_with_3_unique_numbers : Testable
    {

        private class InOut : InOutBase<int[], int[]>
        {
            public InOut(int[] input, int[] output) : base(input, output) {
                inputStringConverter = arg => Helfer.Arrayausgabe<int>("Eingabe: ", arg);
                outputStringConverter = arg => Helfer.Arrayausgabe<int>("Erwartet: ", arg);
                ergStringConverter = arg => Helfer.Arrayausgabe<int>("Ausgabe: ", arg);
                CompareOutErg = Helfer.ArrayVergleich<int>;
                inputToString = inputStringConverter(input);
                AddSolver(Sort, "Sort 1");
            }
        }

        public Sorting_a_list_with_3_unique_numbers() : base("--- Sort List with 3 Unique Numbers ---")
        {
            testcases.Add(new InOut(
                new int[] { 3, 3, 2, 1, 3, 2, 1 },
                new int[] { 1, 1, 2, 2, 3, 3, 3 }
             ));
            testcases.Add(new InOut(
               new int[] { 3, 3, 2, 1, 3, 2, 1,3, 2 },
               new int[] { 1, 1, 2, 2, 2, 3, 3, 3, 3 }
            ));
            testcases.Add(new InOut(
               new int[] { 2, 2, 2, 2, 1, 3, 1 },
               new int[] { 1, 1, 2, 2, 2, 2, 3 }
            ));
        }

        private static void Sort(int[] arr, InOut.Ergebnis erg)
        {
            int pointer1 = 0, pointer3 = arr.Length-1;
            while(pointer3 > 0) {
                if (arr[pointer3] == 3) pointer3--;
                else break;
            }

            for (int i = 0, temp, pointer; i <= pointer3;)
            {
                if (arr[i] == 1) pointer = pointer1++;
                else if (arr[i] == 3) pointer = pointer3--;
                else pointer = i;
                if (pointer == i){
                    i++;
                    continue;
                }
                temp = arr[pointer];
                arr[pointer] = arr[i];
                arr[i] = temp;
            }

            erg.Setze(arr);
        }
    }
}
