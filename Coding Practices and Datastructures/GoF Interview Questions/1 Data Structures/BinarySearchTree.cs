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
                    //Normally everything > to right | <= to left
                    //Inverted everything <= to right | > to left
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

            public bool ValidateRecursive(bool inverted)
            {
                if (!IsValidNode(inverted)) return false;
                return (right == null ? true : Right.ValidateRecursive(inverted)) && (left == null ? true : Left.ValidateRecursive(inverted));
            }
            public bool IsValidNode(bool inverted) => (right == null || (inverted ^ right.Val.CompareTo(val) > 0)) && (left == null || (inverted ^ left.Val.CompareTo(val) <= 0));
            public bool ValidateRecursiveOneLiner(bool inverted) => !IsValidNode(inverted) ? false : (left == null ? true : Left.ValidateRecursiveOneLiner(inverted)) && (Right == null ? true : Right.ValidateRecursiveOneLiner(inverted));
        }
        //NODE END

        private bool inverted;
        public bool Inverted { get => inverted; }
        public new Node Root { get => root as Node;  }


        //Statics
        public static BinarySearchTree<V> GenerateFromLevelOrder(V[] args, bool inverted = false)
        {
            BinarySearchTree<V> tree = new BinarySearchTree<V>();
            if (inverted) tree.InvertRecursive();
            Queue<Node> q = new Queue<Node>();
            tree.Append(args[0]);
            q.Enqueue(tree.root);
            q.Enqueue(tree.root);
            for(int i=1; i<args.Length; i++)
            {
                Node n = new Node(args[i]);
                q.Enqueue(n);
                q.Enqueue(n);
                Node deq = q.Dequeue();
                if (deq.Left == null) deq.Left = n;
                else deq.Right = n;
            }
            return tree;
        }

        //Methods
        public override IBTree<V> InvertRecursive()
        {
            inverted = !inverted;
            return base.InvertRecursive();
        }

        public override void Append(V val) => Append(new Node(val));
        public override IBTreeNode<V> CreateNode(V val) => new Node(val);
        public override void Append(Node insert)
        {
            if (root == null) root = insert;
            else
            {
                Node node = root as Node;
                while (node != null) node = node.Insert(insert, inverted) as Node;
            }
        }

        public bool ValidateRecursive() => root == null ? true : root.ValidateRecursiveOneLiner(inverted);
        public bool ValidateIt()
        {
            if (root == null) return true;
            Queue<Node> q = new Queue<Node>();
            q.Enqueue(root);
            while(q.Count > 0)
            {
                Node n = q.Dequeue();
                if (!n.IsValidNode(inverted)) return false;
                if (n.Left != null) q.Enqueue(n.Left);
                if (n.Right != null) q.Enqueue(n.Right);
            }
            return true;
        }

    }
}
