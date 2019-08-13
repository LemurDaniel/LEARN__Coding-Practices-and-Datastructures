using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures
{
    public class BinarySearchTree<V> : BinaryTree<V, BinarySearchTree<V>.Node> where V : IComparable
    {
        public class Node : BTreeNode<V>
        {
            public new Node Right { get => right as Node; set => right = value as Node; }
            public new Node Left { get => left as Node; set => left = value as Node; }
            public Node(V val) : base(val) { }

            public override IBTreeNode<V> Insert(BTreeNode<V> n, object arg) => Insert(n as Node, (bool)arg);
            private Node Insert(Node n, bool invertedInsertion)
            {
                if (invertedInsertion ^ (n.Val.CompareTo(val) > 0))
                {
                    if (right == null) right = n;
                    else return (Node)right;
                }
                else
                {
                    if (left == null) left = n;
                    else return (Node)left;
                }
                return null;
            }
        }
        //NODE END

        private bool inverted;
        public bool Inverted { get => inverted; }
        public new Node Root { get => root as Node;  }

        public override BinaryTree<V, Node> InvertRecursive()
        {
            inverted = !inverted;
            return base.InvertRecursive();
        }


        public override void Append(V val) => Append(new Node(val));
        public override void Append(Node insert)
        {
            if (root == null) root = insert;
            else
            {
                Node node = root as Node;
                while (node != null) node = node.Insert(insert, inverted) as Node;
            }
        }

    }
}
