using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * Hi, here's your problem today. This problem was recently asked by LinkedIn:

        You are only allowed to perform 2 operations, multiply a number by 2, or subtract a number by 1. Given a number x and a number y, find the minimum number of operations needed to go from x to y.

        Here's an example and some starter code.

        def min_operations(x, y):
          # Fill this in.

        print(min_operations(6, 20))
        # (((6 - 1) * 2) * 2) = 20 : 3 operations needed only
        # print 3
    */

    class Minimum_Number_of_Operations : Testable
    {
        public class Output
        {
            public readonly string term;
            public readonly int numOfOperations;
            public Output(int num, string term)
            {
                this.term = term;
                this.numOfOperations = num;
            }
            public override string ToString() => (term != null ? ("\n   Term: " + term) : "") + "\n    Minimum Number Of Operations: " + numOfOperations;
            public override bool Equals(object obj) => numOfOperations == (obj as Output).numOfOperations;
            public override int GetHashCode() => numOfOperations.GetHashCode();
        }
        public class InOut : InOutBase<Helfer.Point, Output>
        {
            public InOut(int i, int i2, int i3) : base(new Helfer.Point(i, i2), new Output(i3, null), true)
            {
                AddSolver(Find_Minimum_Number_of_Operations);
            }
        }

        public Minimum_Number_of_Operations()
        {
            testcases.Add(new InOut(6, 20, 3));
        }



        private class TreeNode
        {
            public readonly int num, depth ;
            public readonly String Operation = "root";

            public TreeNode left, right, parent;

            public TreeNode(int num) => this.num = num; // num is targetnum not starting num
            private TreeNode(TreeNode parent, bool leftNode)
            {
                if (leftNode)
                {
                    num = parent.num / 2;
                    Operation = " * 2)";
                }
                else
                {
                    num = parent.num + 1;
                    Operation = " - 1)";
                }
                this.depth = parent.depth + 1;
                this.parent = parent;
            }

            public TreeNode CreateTreeNode(bool leftNode)
            {
                if (leftNode)
                {
                    left = new TreeNode(this, true);
                    return left;
                }
                else
                {
                    right = new TreeNode(this, false);
                    return right;
                }
            }
    }
        public static void Find_Minimum_Number_of_Operations(Helfer.Point pt, InOut.Ergebnis erg)
        {
            /*
             * Go Throug all Possibilietes with a tree Structure
             * Create all Nodes of the Next Tree level, until a Level with a Resultnode exists
             * Follow the Resultnode back to parent
             */

            TreeNode root = new TreeNode(pt.X); // X is target num ==> Operations done on reverse ==> easier Stringbuilding possible
            TreeNode SourceNode = CreateTree(root, pt.Y);
            StringBuilder sb = new StringBuilder( Helfer.GenerateString(SourceNode.depth, "(") + pt.Y );
            StringBuilder sb2 = new StringBuilder(); //Staged
            int depth = SourceNode.depth;

            while (SourceNode != root)
            {
                sb.Append(SourceNode.Operation);
                sb2.Append(sb + " = " + SourceNode.parent.num + "\n          ");
                SourceNode = SourceNode.parent;
            }

            erg.Setze(new Output(depth, sb2.ToString()), Complexity.EXPONENTIAL, Complexity.EXPONENTIAL);
        }

        private static TreeNode CreateTree(TreeNode root, int source)
        {
            Queue<TreeNode> q = new Queue<TreeNode>();
            q.Enqueue(root);

            while (q.Count > 0)
            {
                TreeNode node = q.Dequeue();

                TreeNode left = node.CreateTreeNode(true);
                if (left.num == source) return left;
                else q.Enqueue(left);

                TreeNode right = node.CreateTreeNode(false);
                if (right.num == source) return right;
                else q.Enqueue(right);
            }

            return root;
        }

    }
}
