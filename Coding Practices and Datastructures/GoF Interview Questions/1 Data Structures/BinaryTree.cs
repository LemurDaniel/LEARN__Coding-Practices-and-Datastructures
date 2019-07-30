using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures
{
    public class TraverseType
    {
        public static readonly TraverseType InOrder = new TraverseType("InOrder",0);        // Left, Root, Right
        public static readonly TraverseType PreOrder = new TraverseType("PreOrder", 1);     // Root, Left, Right
        public static readonly TraverseType PostOrder = new TraverseType("PostOrder", 2);   // Left, Right, Root
        public static readonly TraverseType LevelOrder = new TraverseType("LevelOrder", 3); // Print all on same Level Startig from Top
        public static readonly TraverseType ZigZagLevelOrder = new TraverseType("ZigZagLevelOrder", 4);

        public bool IsInorder { get => this.Equals(InOrder); }
        public bool IsPreOrder { get => this.Equals(PreOrder); }
        public bool IsPostOrder { get => this.Equals(PostOrder); }
        public bool IsLevelOrder { get => this.Equals(LevelOrder); }
        public bool IsZigZagLevelOrder { get => this.Equals(ZigZagLevelOrder); }

        public readonly int typ;
        public readonly string desc;
        private TraverseType(string desc, int typ)
        {
            this.desc = desc;
            this.typ = typ;
        }
        public override string ToString() => desc;
    }

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

            // Travers
            public StringBuilder PrintRecursive(StringBuilder sb, TraverseType traverseType)
            {
                if(traverseType == TraverseType.PreOrder) sb.Append(val + "; ");
                left?.PrintRecursive(sb, traverseType);
                if (traverseType == TraverseType.InOrder) sb.Append(val + "; ");
                right?.PrintRecursive(sb, traverseType);
                if (traverseType == TraverseType.PostOrder) sb.Append(val + "; ");
                return sb;
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




        // TRAVERSAL
        // Depth First
        public string PrintInOrderRecursive(TraverseType traverseType)
        {
            if (root == null) return "";
            StringBuilder sb = new StringBuilder();
            if (traverseType.IsZigZagLevelOrder || traverseType.IsLevelOrder) return PrintLevelOrder(sb, traverseType).ToString().Substring(0, sb.Length - 2);
            else return root.PrintRecursive(sb, traverseType).ToString().Substring(0, sb.Length-2);
        }

        public string PrintInOrderIterative(TraverseType traverseType)
        {
            if (root == null) return "";
            StringBuilder sb = new StringBuilder();
            if(traverseType.IsZigZagLevelOrder || traverseType.IsLevelOrder) return PrintLevelOrder(sb, traverseType).ToString().Substring(0, sb.Length - 2);

            Stack<Node> stack = new Stack<Node>();

            Node node = root;
            while(node != null || stack.Count > 0)
            {            
                if(node != null)
                {
                    if (traverseType.IsPreOrder) sb.Append(node.Val + "; ");
                    stack.Push(node);
                    node = node.Left;
                    continue;
                }
                node = stack.Pop();
                if(traverseType.IsInorder) sb.Append(node.Val+"; ");
                node = node.Right;
            }
            return sb.ToString().Substring(0, sb.Length-2);
        }

        private StringBuilder PrintPostOrderIt(StringBuilder sb) // ????????????????????
        {
            Stack<Node> main = new Stack<Node>();
            Stack<Node> rights = new Stack<Node>();

            Node node = root, tmp = null;
            while (true)
            {
                if (node.Left != null)
                {
                    main.Push(node);
                    node = node.Left;
                    continue;
                }
                else if (node.Right != null)
                {
                    node = node.Right;
                    rights.Push(node);
                    continue;
                }
                else
                    sb.Append(node.Val);
            }
        }

        private StringBuilder PrintLevelOrder(StringBuilder sb, TraverseType traverseType)
        {
            Queue<Node> queue = new Queue<Node>();
            queue.Enqueue(root);
            if(traverseType.IsZigZagLevelOrder) queue.Enqueue(null);
            bool Zig = true;

            string substring = "";
            while(queue.Count != 0)
            {
                Node node = queue.Dequeue();

                if (traverseType.IsZigZagLevelOrder)
                {
                    if (Zig) substring += node.Val + "; ";
                    else substring = node.Val + "; " + substring;
                }
                else sb.Append(node.Val + "; ");

                if (node.Left != null) queue.Enqueue(node.Left);
                if (node.Right != null) queue.Enqueue(node.Right);

                if(queue.Count > 0 && queue.Peek() == null)
                {
                    queue.Dequeue();
                    sb.Append(substring);
                    if (queue.Count == 0) break;
                    substring = "";
                    queue.Enqueue(null);
                    Zig = !Zig;
                }
            }
            return sb;
        }

        //static Methods


    }

}
