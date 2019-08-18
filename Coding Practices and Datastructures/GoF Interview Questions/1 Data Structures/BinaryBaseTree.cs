using System;
using System.Collections;
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

    public abstract class BTreeNode<V> : IBTreeNode<V>
    {
        public BTreeNode(V val) => this.val = val;
        public override IBTreeNode<V> Insert(BTreeNode<V> n, object arg = null)
        {
            if (left == null) left = n;
            else if (right == null) right = n;
            return null;
        }

        // For Inverting the Binary Tree => swaps left and right and calls swap on subNodes
        public override void SwapRecursive()
        {
            left?.SwapRecursive();
            right?.SwapRecursive();
            IBTreeNode<V> tmp = right;
            right = left;
            left = tmp;
        }

        public override StringBuilder GenerateStringRecursive(StringBuilder sb)
        {
            sb.Append(val + "; ");
            left?.GenerateStringRecursive(sb);
            right?.GenerateStringRecursive(sb);
            return sb;
        }


        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            if (!obj.GetType().Equals(typeof(BTreeNode<V>))) return false;
            BTreeNode<V> node = obj as BTreeNode<V>;

            bool rightBool = false;
            if (right == null && node.right == null) rightBool = true;
            else rightBool = right.Equals(node.right);

            bool leftBool = false;
            if (left == null && node.left == null) leftBool = true;
            else leftBool = left.Equals(node.left);

            return node.val.Equals(val) && rightBool && leftBool;
        }
        public override int GetHashCode() => base.GetHashCode();

        // Travers
        public override StringBuilder PrintRecursive(StringBuilder sb, TraverseType traverseType)
        {
            if (traverseType == TraverseType.PreOrder) sb.Append(val + "; ");
            left?.PrintRecursive(sb, traverseType);
            if (traverseType == TraverseType.InOrder) sb.Append(val + "; ");
            right?.PrintRecursive(sb, traverseType);
            if (traverseType == TraverseType.PostOrder) sb.Append(val + "; ");
            return sb;
        }


    }


    public abstract class BinaryTree<V, N> : IEnumerable<V>, IBTree<V> where V : IComparable where N : IBTreeNode<V>
    {       
        
        // BINARY TREE
        protected N root;
        public N Root { get => root;  }

        //KONSTRUKTOR
        // public BinaryTree();

        //Methods
        public abstract void Append(V val);
        public abstract void Append(N insert);


        //Reverse
        public virtual IBTree<V> InvertRecursive()
        {
            Root?.SwapRecursive();
            return this;
        }


        public override string ToString()
        {
            if (root == null) return "";
            StringBuilder sb = new StringBuilder();
            Root?.GenerateStringRecursive(sb);
            return sb.ToString().Substring(0, sb.Length-2);
        }
        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            if (!obj.GetType().Equals(typeof(BinaryTree<V, N>))) return false;
            BinaryTree<V, N> tree = obj as BinaryTree<V, N>;
            if (tree.Root == null && Root != null) return false;
            if (tree.Root == null && Root == null) return true;
            return tree.Root.Equals(Root);
        }
        public override int GetHashCode() => base.GetHashCode();

        public bool IsMirrorRecurse()
        {
            if (root == null) return true;
            else return IsMirrorRecurse(root.Left, root.Right);
        }
        private bool IsMirrorRecurse(IBTreeNode<V> left, IBTreeNode<V> right)
        {
            if (left == null) return left == null && right == null;
            else if (!left.Val.Equals(right.Val)) return false;
            else return IsMirrorRecurse(left.Left, right.Right) && IsMirrorRecurse(left.Right, right.Left);

        }
        public bool IsMirrorIt()
        {
            if (root == null) return true;
            //Traverse seperatae levelorder on left
            //Traverse inverse levelorder on right
            //compare vals
            Queue<IBTreeNode<V>> left = new Queue<IBTreeNode<V>>();
            Queue<IBTreeNode<V>> right = new Queue<IBTreeNode<V>>();
            if(root.Left != null) left.Enqueue(root.Left);
            if (root.Right != null)  right.Enqueue(root.Right);

            IBTreeNode<V> leftN, rightN;
            while (left.Count != 0)
            {
                if (left.Count != right.Count) return false;
                leftN = left.Dequeue();
                rightN = right.Dequeue();
                if (!leftN.Val.Equals(rightN.Val)) return false;

                if (leftN.Left != null) left.Enqueue(leftN.Left);   // Enqueue left one first
                if (leftN.Right != null) left.Enqueue(leftN.Right);

                if (rightN.Right != null) right.Enqueue(rightN.Right);  // Enqueue right one first !!!!
                if (rightN.Left != null) right.Enqueue(rightN.Left);
            }
            return true;
        }

        public bool IsBalancedIt()
        {
            if (root == null) return true;
            Queue<IBTreeNode<V>> q = new Queue<IBTreeNode<V>>();
            q.Enqueue(root);
            q.Enqueue(null);


            IBTreeNode<V> node;
            int expectedNodeCount = 1;
            int count = 0;
            while (q.Count != 0)
            {
                node = q.Dequeue();
                count++;

                if (node.Left != null) q.Enqueue(node.Left); 
                if (node.Right != null) q.Enqueue(node.Right);

                if(q.Peek() == null)
                {
                    q.Enqueue(q.Dequeue());
                    if (q.Count == 1) break;
                    if (count != expectedNodeCount) return false;
                    expectedNodeCount *= 2;
                    count = 0;
                }
            }
            return true;
        }

        // TRAVERSAL
        // Depth First
        public string PrintRecursive(TraverseType traverseType)
        {
            if (root == null) return "";
            StringBuilder sb = new StringBuilder();
            if (traverseType.IsZigZagLevelOrder || traverseType.IsLevelOrder) PrintLevelOrder(sb, traverseType);
            else root.PrintRecursive(sb, traverseType);
            return sb.ToString().Substring(0, sb.Length - 2);
        }

        public string PrintIterative(TraverseType traverseType)
        {
            if (root == null) return "";
            StringBuilder sb = new StringBuilder();
            if(traverseType.IsZigZagLevelOrder || traverseType.IsLevelOrder) return PrintLevelOrder(sb, traverseType).ToString().Substring(0, sb.Length - 2);

            Stack<IBTreeNode<V>> stack = new Stack<IBTreeNode<V>>();

            IBTreeNode<V> node = root;
            while(node != null || stack.Count > 0)
            {            
                if(node != null)
                {
                    if (traverseType.IsPreOrder) sb.Append(node.Val + "; ");
                    else if (traverseType.IsPostOrder) sb.Insert(0, node.Val + "; ");   // Insert at 0 to reverse WRL to LRW => Postorder
                    stack.Push(node);
                    node = traverseType.IsPostOrder ? node.Right : node.Left;   // if postOrder do WRL else WLR
                    continue;
                }
                if(traverseType.IsInorder) sb.Append(stack.Peek().Val+"; ");
                node = traverseType.IsPostOrder ? stack.Pop().Left : stack.Pop().Right; // if postOrder do WRL else WLR
            }
            return sb.ToString().Substring(0, sb.Length-2);
        }

        private StringBuilder PrintLevelOrder(StringBuilder sb, TraverseType traverseType)
        {
            Queue<IBTreeNode<V>> queue = new Queue<IBTreeNode<V>>();
            queue.Enqueue(root);
            if(traverseType.IsZigZagLevelOrder) queue.Enqueue(null);    // To force an alternation from zig to zag after root
            bool Zig = true;

            StringBuilder subSb = new StringBuilder();
            while(queue.Count != 0)
            {
                IBTreeNode<V> node = queue.Dequeue();

                if (traverseType.IsZigZagLevelOrder)
                {
                    if (Zig) subSb.Append(node.Val + "; ");
                    else subSb.Insert(0, node.Val + "; ");
                }
                else sb.Append(node.Val + "; ");

                if (node.Left != null) queue.Enqueue(node.Left);
                if (node.Right != null) queue.Enqueue(node.Right);

                if(queue.Count > 0 && queue.Peek() == null)
                {
                    queue.Dequeue();
                    sb.Append(subSb);
                    subSb.Clear();
                    if (queue.Count == 0)   break;
                    queue.Enqueue(null);
                    Zig = !Zig; //Alternate between Zig and Zag
                }
            }
            return sb;
        }


        //TEST ENUMERABLES
        public IEnumerator<V> GetEnumerator() => GetIEnumerable(TraverseType.InOrder).GetEnumerator();
        public IEnumerable<V> GetIEnumerable(TraverseType traverseType, IBTreeNode<V> node = null)
        {
            if (node == null) node = root;
            if (traverseType.IsZigZagLevelOrder || traverseType.IsLevelOrder)
                foreach (V val in GetIEnumerableLevelOrder(traverseType, node)) yield return val;
            else
            {
                Stack<IBTreeNode<V>> stack = new Stack<IBTreeNode<V>>();
                Stack<V> postorderStack = new Stack<V>();

                while (node != null || stack.Count > 0)
                {
                    if (node != null)
                    {
                        if (traverseType.IsPreOrder) yield return node.Val;
                        else if (traverseType.IsPostOrder) postorderStack.Push(node.Val);   // Insert at 0 to reverse WRL to LRW => Postorder
                        stack.Push(node);
                        node = traverseType.IsPostOrder ? node.Right : node.Left;   // if postOrder do WRL else WLR
                        continue;
                    }
                    if (traverseType.IsInorder) yield return stack.Peek().Val;
                    node = traverseType.IsPostOrder ? stack.Pop().Left : stack.Pop().Right; // if postOrder do WRL else WLR
                }
                if (traverseType.IsPostOrder) while (postorderStack.Count > 0) yield return postorderStack.Pop();
            }
        }
        private IEnumerable<V> GetIEnumerableLevelOrder(TraverseType traverseType, IBTreeNode<V> node)
        {
            Queue<IBTreeNode<V>> queue = new Queue<IBTreeNode<V>>();
            Stack<V> zagSt = new Stack<V>();
            queue.Enqueue(node);
            if (traverseType.IsZigZagLevelOrder) queue.Enqueue(null);    // To force an alternation from zig to zag after root
            bool Zig = true;

            while (queue.Count != 0)
            {
                node = queue.Dequeue();

                if (traverseType.IsZigZagLevelOrder && !Zig) zagSt.Push(node.Val);
                else yield return node.Val;

                if (node.Left != null) queue.Enqueue(node.Left);
                if (node.Right != null) queue.Enqueue(node.Right);

                if (queue.Count > 0 && queue.Peek() == null)
                {
                    while (zagSt.Count > 0) yield return zagSt.Pop();
                    queue.Dequeue();
                    if (queue.Count == 0) break;
                    queue.Enqueue(null);
                    Zig = !Zig; //Alternate between Zig and Zag
                }
            }
        }
        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
        //static Methods
    }

}
