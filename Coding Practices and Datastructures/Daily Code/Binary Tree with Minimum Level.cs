using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Twitter:

        You are given the root of a binary tree. Find the level for the binary tree with the minimum sum, and return that value.

        For instance, in the example below, the sums of the trees are 10, 2 + 8 = 10, and 4 + 1 + 2 = 7. So, the answer here should be 7.
        */
    class Binary_Tree_with_Minimum_Level : Testable
    {
        public class InOut : InOutBase<IBTree<int>, int>{
            public InOut(string s, int i) : base(Helfer.AssembleBTreePreOrder(s), i, true)
            {
                AddSolver((arg, erg) => erg.Setze(Minimum_level_sum(arg)));
            }
        }

        public Binary_Tree_with_Minimum_Level()
        {
            testcases.Add(new InOut("10,2,4,/,/,1,/,/,8,/,2", 7));
        }


        public static int Minimum_level_sum(IBTree<int> tree)
        {
            Queue<IBTreeNode<int>> q = new Queue<IBTreeNode<int>>();
            q.Enqueue(tree.GetRoot());
            q.Enqueue(null);

            int sum = 0, minSum = int.MaxValue;
            while (true)
            {
                IBTreeNode<int> node = q.Dequeue();
                if (node.Left != null) q.Enqueue(node.Left);
                if (node.Right != null) q.Enqueue(node.Right);
                sum += node.Val;

                if(q.Peek() == null)
                {
                    minSum = Math.Min(minSum, sum);
                    sum = 0;
                    if (q.Count == 1) return minSum;
                    q.Enqueue(q.Dequeue());
                }
            }
        }
    }
}
