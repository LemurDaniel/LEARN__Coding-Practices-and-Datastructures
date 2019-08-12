using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Data_Structures_and_Algos
{
    public class InfoBase<V>
    {
        private int iterations;
        private V result;
        private string meta;
        public int Iterations { get => iterations; }
        public V Result { get => result; }

        public InfoBase(int iterations, V result, string meta){
            this.iterations = iterations;
            this.result = result;
            this.meta = meta;
        }

        public override string ToString() => "Iterations: " + iterations + "\n " + meta + result.ToString() +"\n";

    }


    class Search_Element_in_Array : ITestable
    {
        private Dictionary<int[], int> ArrTar = new Dictionary<int[], int>();
        delegate InfoBase<int> search(int tar, int[] arr);
        public Search_Element_in_Array()
        {
            ArrTar.Add(new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9 }, 5);
            ArrTar.Add(new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9 }, 1);
            int[] arr = new int[int.MaxValue/8];
            for (int i = 0; i < arr.Length; i++) arr[i] = i;
            ArrTar.Add(arr, int.MaxValue / 9);
        }


        public void Test()
        {
            Testen("Linear Search", LinearSearch);
            Testen("Binary Search", BinarySearch);
        }


        private void Testen(string description, search method)
        {
            Console.WriteLine("-----------------------------------");
            Console.WriteLine("Search Element in Array");
            Console.WriteLine("---> Method: " + description);

            int i = 0;
            foreach (int[] arr in ArrTar.Keys)
            {
                Console.WriteLine("Test: " + ++i);
                Console.WriteLine(Helfer.Arrayausgabe("Eingabe: ", arr));
                Console.WriteLine("Target: " + ArrTar[arr]);
                Console.WriteLine();
                Console.WriteLine(method(ArrTar[arr], arr));
            }
        }


        public InfoBase<int> LinearSearch(int target, int[] array)
        {
            int it;
            for (it = 0; it < array.Length; it++) if (array[it] == target) return new InfoBase<int>(it+1, it, "Position: ");
            return new InfoBase<int>(it, -1, "Position: ");
        }

        public InfoBase<int> BinarySearch(int target, int[] sortedArray)
        {
            int upBound = sortedArray.Length-1, lowBound = 0, current, iterations = 0;
            while (true)
            {
                int Diff = upBound - lowBound;
                iterations++;
                current = (upBound + lowBound) / 2;
                if (sortedArray[current] == target) return new InfoBase<int>(iterations, current, "Position: ");
                else if (upBound - lowBound < 1) return new InfoBase<int>(iterations, -1, "Position: ");
                else if (sortedArray[current] > target) upBound = current-1;
                else lowBound = current+1;
            }
        }
    }
}
