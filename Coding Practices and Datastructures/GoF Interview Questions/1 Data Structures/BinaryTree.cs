using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoF_Coding_Interview_Algos.GoF_Interview_Questions._1_Data_Structures
{
    public class BinaryTree<V> where V : IComparable
    {
        public class Node
        {
            private Node left, right;
            private V val;

            public Node Left { get => left; set => left = value; }
            public Node Right { get => right; set => right = value; }
            public V Val { get => val; set => val = value; }

            public Node(V val) => this.val = val;

            public Node Insert(Node n, bool invertedInsertion)
            {
                if (invertedInsertion ^ (n.Val.CompareTo(val) > 0) )
                {
                    if (right == null) right = n;
                    else return right;
                }
                else
                {
                    if (left == null) left = n;
                    else return left;
                }
                return null;
            }

            // For Inverting the Binary Tree => swaps left and right and calls swap on subNodes
            public void SwapRecursive()
            {
                left?.SwapRecursive();
                right?.SwapRecursive();
                Node tmp = right;
                right = left;
                left = tmp;
            }

            public StringBuilder GenerateStringRecursive(StringBuilder sb)
            {
                sb.Append(val + "; ");
                left?.GenerateStringRecursive(sb);
                right?.GenerateStringRecursive(sb);
                return sb;
            }


            public override bool Equals(object obj)
            {
                if (obj == null) return false;
                if (!obj.GetType().Equals(typeof(Node))) return false;
                Node node = obj as Node;

                bool rightBool = false;
                if (right == null && node.right == null) rightBool = true;
                else rightBool = right.Equals(node.right);

                bool leftBool = false;
                if (left == null && node.left == null) leftBool = true;
                else leftBool = left.Equals(node.left);

                return node.val.Equals(val) && rightBool && leftBool;
            }
        }


        // BINARY TREE
        private Node root;
        private bool inverted;
        public Node Root { get => root;  }

        //KONSTRUKTOR
        public BinaryTree() => this.inverted = false;
        public BinaryTree(bool inverted) => this.inverted = inverted;

        //Methods
        public void Append(V val) => Append(new Node(val));
        public void Append(Node insert)
        {
            if (root == null)
            {
                root = insert;
                return;
            }

            Node node = root;
            while (node != null)    node = node.Insert(insert, inverted);
        }


        //Reverse
        public BinaryTree<V> InvertRecursive()
        {
            Root?.SwapRecursive();
            inverted = !inverted;
            return this;
        }


        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            Root?.GenerateStringRecursive(sb);
            return sb.ToString().Substring(0, sb.Length-2);
        }
        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            if (!obj.GetType().Equals(typeof(BinaryTree<V>))) return false;
            BinaryTree<V> tree = obj as BinaryTree<V>;
            if (tree.Root == null && Root != null) return false;
            if (tree.Root == null && Root == null) return true;
            return tree.Root.Equals(Root);
        }

        //static Methods


    }
}
