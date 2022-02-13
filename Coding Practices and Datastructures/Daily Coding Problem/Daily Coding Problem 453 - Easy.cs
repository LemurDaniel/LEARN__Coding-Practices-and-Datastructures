using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;

namespace Coding_Practices_and_Datastructures.Daily_Coding_Problem
{
    /*
        Good morning! Here's your coding interview problem for today.

        This problem was asked by Google.

        Given the root of a binary search tree, and a target K, return two nodes in the tree whose sum equals K.

        For example, given the following tree and K of 20

           10
          /   \
        5      15
              /  \
            11    15
        Return the nodes 5 and 15.
   */

    class Daily_Coding_Problem_453___Easy : Testable
    {
        private class Input
        {
            public readonly IBTree<int> tree;
            public readonly int target;

            public Input(string tree, int target)
            {
                this.tree = Helfer.AssembleBTreePreOrder(tree);
                this.target = target;
            }

            override
            public string ToString()
            {
                return "\n    Tree: " + this.tree.ToString()
                + "\n    Target: " + this.target;
            }
        }

        private class InOut : InOutBase<Input, Tuple<int, int>>
        {
            public InOut(string tree, int target, int num, int num2) : base(new Input(tree, target), new Tuple<int, int>(num, num2), true)
            {
                AddSolver(DictionarySolver);
                AddSolver(TryAllPossiblities);

                CompareOutErg = (arg1, arg2) => (arg1.Item1 == arg2.Item1 && arg1.Item2 == arg2.Item2) || (arg1.Item1 == arg2.Item2 && arg1.Item2 == arg2.Item1);
            }
        }

        public Daily_Coding_Problem_453___Easy()
        {
            testcases.Add(new InOut("10,5,/,/,15,11,/,/,15", 20, 5, 15));
            testcases.Add(new InOut("5,3,2,/,/,4,/,/,6,/,7", 9, 5, 4));
            testcases.Add(new InOut("5,3,2,/,/,4,/,/,6,/,7", 28, -1, -1));
        }

        private static IEnumerable<IBTreeNode<V>> TreeTraverse<V>(IBTreeNode<V> node)
        {
            var stack = new Stack<IBTreeNode<V>>();
            stack.Push(node);

            while (stack.Count > 0)
            {

                if (node == null)
                {
                    node = stack.Pop().Right;
                    continue;
                }

                yield return node;

                stack.Push(node);
                node = node.Left;
            }
        }

        private static void TryAllPossiblities(Input inp, InOut.Ergebnis erg)
        {
            var root = inp.tree.GetRoot();
            int target = inp.target;

            foreach (var node in TreeTraverse<int>(root))
            {
                foreach (var innerNode in TreeTraverse<int>(root))
                {
                    if (node == innerNode) continue;
                    if (node.Val + innerNode.Val != target) continue;

                    erg.Setze(new Tuple<int, int>(node.Val, innerNode.Val));
                    return;
                }
            }

            erg.Setze(new Tuple<int, int>(-1, -1));
        }


        private static void DictionarySolver(Input inp, InOut.Ergebnis erg)
        {
            var node = inp.tree.GetRoot();
            int target = inp.target;


            var map = new Dictionary<int, IBTreeNode<int>>();
            var stack = new Stack<IBTreeNode<int>>();
            stack.Push(inp.tree.GetRoot());

            while (stack.Count > 0)
            {
                if (node == null)
                {
                    node = stack.Pop().Right;
                    continue;
                }


                int diff = target - node.Val;
                if (map.ContainsKey(node.Val))
                {
                    Console.WriteLine(node.Val);
                    erg.Setze(new Tuple<int, int>(node.Val, map[node.Val].Val));
                    return;
                }
                else
                    map[diff] = node;

                stack.Push(node);
                node = node.Left;
            }

            erg.Setze(new Tuple<int, int>(-1, -1));
        }
    }
}
