using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Create_a_balanced_binary_search_tree_from_a_sorted_list : Testable
    {
        private class InOut : St_InOuts.IntArr_Primary<IBTree<int>>
        {
            public InOut(string s) : base(s, new BinarySearchTree<int>())
            {
                AddSolver(SolveRecursive);
                AddSolver(SolveIterative);
                CompareOutErg = (outp, erg) => erg.IsCompleteIt();
                ergStringConverter = erg => erg.PrintIterative(TraverseType.LevelOrder);
                HasMaxDur = false;
            }
        }

        public Create_a_balanced_binary_search_tree_from_a_sorted_list()
        {
            testcases.Add(new InOut("1,2,3,4,5,6,7"));
            testcases.Add(new InOut("1,2,3,4,5,6,7,8"));
            testcases.Add(new InOut("1,2,3,4,5,6,7,8,9"));
        }







        //SOl 
        private static void SolveRecursive(int[] arr, InOut.Ergebnis erg)
        {
            IBTree<int> tree = new BinarySearchTree<int>();
            AddMiddle(arr, 0, arr.Length - 1 , tree);           
            erg.Setze(tree);
        }

        private static void AddMiddle(int[] arr, int start, int end, IBTree<int> tree)
        {
            bool isEven = (end+1 - start) % 2 == 0;
            int mid = (start + end) / 2;
            tree.Append(arr[mid]);
            if (start >= end) return;
            AddMiddle(arr, mid + (isEven ? 2 : 1), end, tree);
            AddMiddle(arr, start, mid - 1, tree);
            if (isEven) tree.Append(arr[mid + 1]);
        }

        //  Similar to the Recursive Solution
        //  start with 0 and arrLen -1
        //  Adds middle element of range to tree
        //  Adds NEWrange from start of curr_range to middleElement
        //  Adds NEWrange from middleElement to end of curr_range
        private static void SolveIterative(int[] arr, InOut.Ergebnis erg)
        {
            IBTree<int> tree = new BinarySearchTree<int>();
            DS_HANDBOOK.Interfaces.IQueue<int[]> q = new DS_HANDBOOK.Queue.ArrayQueue<int[]>(arr.Length*2);
            q.AddStringConverter(Helfer.Arrayausgabe<int>);

            q.Enqueue(new int[] { 0, arr.Length - 1}); // start, end
            while (!q.IsEmpty())
            {
                int[] range = q.Dequeue();
                bool isEven = (range[1] + 1 - range[0]) % 2 == 0;
                int mid = (range[0] + range[1]) / 2;
                tree.Append(arr[mid]);
                if (range[0] >= range[1]) continue;
                q.Enqueue(new int[] { range[0], mid-1 });   // Add range from start to mid-1
                q.Enqueue(new int[] { mid+(isEven? 2:1), range[1] });  // Add range from mid+1 to end
                if (isEven) q.Enqueue(new int[] { mid+1, mid+1 });
            }
            erg.Setze(tree);
        }

    }
}
