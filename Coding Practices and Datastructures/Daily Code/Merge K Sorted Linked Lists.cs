using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Merge_K_Sorted_Linked_Lists : Testable
    {
        private class InOut : InOutBase<LinkedList<int>[], LinkedList<int>>
        {
            public InOut(string s, string s2) : base(Convert(s), LinkedList<int>.Assemble(s2), true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe("", arg, false, "\n   ");
                AddSolver((arg, erg) => erg.Setze(LinkedList<int>.Merge_K_Sorted_LinkedLists<int>(arg)), "Merge_K_Sorted_LinkedLists");
                copiedInputProvider = arg => Convert(s);
                HasMaxDur = false;
            }
            private static LinkedList<int>[] Convert(string s)
            {
                string[] arr = s.Split(';');
                LinkedList<int>[] larr = new LinkedList<int>[arr.Length];
                for (int i = 0; i < arr.Length; i++) larr[i] = LinkedList<int>.Assemble(arr[i]);
                return larr;
            }
        }


        public Merge_K_Sorted_Linked_Lists()
        {
            testcases.Add(new InOut("1,6,8;2,5,7;3,6,9;4,5", "1,2,3,4,5,5,6,6,7,8,9"));
            testcases.Add(new InOut("1,2,3,4,5,5,6,6,7,8,9", "1,2,3,4,5,5,6,6,7,8,9"));
        }


        //SOL
    }
}
