using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * Hi, here's your problem today. This problem was recently asked by Apple:

        You are given the root of a binary tree, along with two nodes, A and B. Find and return the lowest common ancestor of A and B. 
        For this problem, you can assume that each node also has a pointer to its parent, along with its left and right child.

    */
    class Lowest_Common_Ancestor_of_2_Nodes_in_Binary_Tree : Testable
    {
        public class Input
        {
            public readonly IBTree<char> tree;
            public readonly IBTreeNode<char> n, n1;
            public Input(string s, char n, char n1)
            {
                tree = Helfer.AssembleBTreeCharPreOrder(s);
                this.n = Search(n, tree.GetRoot());
                this.n1 = Search(n1, tree.GetRoot());

            }
            public IBTreeNode<char> Search(char c, IBTreeNode<char> node)
            {
                Stack<IBTreeNode<char>> stack = new Stack<IBTreeNode<char>>();
                while (stack.Count > 0 || node != null)
                {
                    if (node != null)
                    {
                        if (node.Val == c) return node;
                        stack.Push(node);
                        node = node.Left;
                    }
                    else node = stack.Pop().Right;
                }
                return node;
            }
            public override string ToString() => "Tree: " + tree + "\nNode: " + n + "\nNode2: " + n1;
        }
        public class InOut : InOutBase<Input, char>
        {
            public InOut(string s, char n, char n2, char i) : base(new Input(s, n, n2), i, true)
            {
                AddSolver((arg, erg) =>
               {
                   IBTreeNode<char> node = arg.n;
                   arg.tree.GetRoot().LowestCommonAncestorRecursive(arg.n, arg.n1, ref node);
                   erg.Setze(node.Val);
               });
            }
        }

        public Lowest_Common_Ancestor_of_2_Nodes_in_Binary_Tree()
        {
            testcases.Add(new InOut("a,b,/,/,c,d,/,/,e", 'd', 'e', 'c'));
        }
    }
}
