using Coding_Practices_and_Datastructures.Daily_Code.zeug;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Running_Median : Testable
    {
        public class InOut : InOutBase<int[], string>
        {
            public InOut(string s, string s2) : base(Helfer.Assemble(s), s2, true)
            {
                inputStringConverter = Helfer.Arrayausgabe;
                AddSolver(BinarySearchSolve);
                HasMaxDur = false;
            }
        }

        public Running_Median()
        {
            testcases.Add(new InOut("2147205", "2 | 1,5 | 2 | 3 | 2 | 2 | 2 | "));
        }

        //SOL
        public static void BinarySearchSolve(int[] arr, InOut.Ergebnis erg)
        {
            IList<int> list = new List<int>();
            list.Add(arr[0]);
            string s = arr[0]+" | ";
            for (int i = 1; i < arr.Length; i++)
            {
                int pos = BSearchLowBound(arr[i], list);
                list.Insert(pos, arr[i]);
;
                if (list.Count % 2 != 0) s += list[list.Count / 2] + " | ";
                else s += (list[list.Count/2] + list[list.Count/2-1])/2.0 + " | ";
            }

            erg.Setze(s);
        }

        private static int BSearchLowBound(int data, IList<int> list)
        {
            int current = 0, lowBound = 0, upBound = list.Count;
            while (lowBound != upBound)
            {
                current = (lowBound + upBound) / 2;
                int comp = list[current].CompareTo(data);
                if (comp > 0) upBound = current;
                else if (comp < 0) lowBound = Math.Min(current + 1, upBound);
                else return current;
            }
            return lowBound;
        }

    }

    public class MedianBTree<V> : BinaryTree<V, MedianBTree<V>.Node> where V : Numeric
    {
        public class Node : BTreeNode<V>
        {
            int nodesLeft = 0, nodesRight = 0;
            public Node(V val) : base(val) { }

            public override IBTreeNode<V> Insert(BTreeNode<V> n, object arg = null) => Insert(n as Node, arg as Node);
            private Node Insert(Node append, Node parent)
            {
                int comp = append.val.Comp(val);
                if(comp >= 0)
                {
                    if (nodesLeft <= nodesRight)
                    {
                        nodesLeft++;
                        if (left != null) left.Insert(append, this);
                        else left = append;
                    }
                    else
                    {
                        nodesRight++;
                        if (right != null) right.Insert(append, this);
                        else right = append;
                    }
                }else if(comp < 0)  //becomes new Parent
                {
                    if(parent != null)
                    {
                        if (parent.left == this) parent.left = append;
                        else parent.right = append;
                    }
                    append.nodesLeft = nodesLeft;
                    append.nodesRight = nodesRight;
                    append.right = this.right;
                    append.left = this.left;
                    this.left = null;
                    this.right = null;
                    append.Insert(this, parent);
                    return append;
                }
                return this;
            }
        }
        public override void Append(V val) => Append(new Node(val));

        public override void Append(Node insert)
        {
            if (root == null) root = insert;
            else root = root.Insert(insert, null) as Node;
        }
    }
}
