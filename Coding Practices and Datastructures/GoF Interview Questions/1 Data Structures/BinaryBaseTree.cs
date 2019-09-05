using Coding_Practices_and_Datastructures.Daily_Code;
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
        private class Node : BTreeNode<V> { }
        public static readonly BTreeNode<V> EMPTY = new Node();
        public bool IsEMPTY { get => this == EMPTY;  }

        private BTreeNode() { }
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
        public override StringBuilder GenerateStringIt(int lenEl = 4, int spacing = 4)
        {
            StringBuilder sbsssss = new StringBuilder();

            Queue<IBTreeNode<V>> q = new Queue<IBTreeNode<V>>();

            BTreeNode<V> node;
            q.Enqueue(this);
            q.Enqueue(null);
            bool AllEmpty = true;

            while (true)
            {
                node = q.Dequeue() as BTreeNode<V>;
                q.Enqueue(node.Left ?? BTreeNode<V>.EMPTY);
                q.Enqueue(node.Right ?? BTreeNode<V>.EMPTY);
                AllEmpty = node.Left == null && node.Right == null && AllEmpty;
                sbsssss.Append(Helfer.ShortenString(lenEl, (!node.IsEMPTY ? node.Val.ToString() : "-"), true));

                if (q.Peek() == null)
                {
                    if (AllEmpty) break;
                    sbsssss.Append("\n");
                    q.Enqueue(q.Dequeue());
                    AllEmpty = true;
                }
            }


                    return sbsssss;/*
            int height = GetHeightRecursive();
            int neededSpace = ((int)Math.Pow(2, height)) * (lenEl+spacing) +spacing;
            int numOfNodes = 1;
            int baseSpacing = spacing;
            int depth = height;
            StringBuilder sbBase = new StringBuilder();
            StringBuilder sb = new StringBuilder("\n" + Helfer.GenerateString((neededSpace)/2) + Helfer.ShortenString(lenEl, this.val.ToString()));
            Queue<IBTreeNode<V>> q = new Queue<IBTreeNode<V>>();

            IBTreeNode<V> node;
            q.Enqueue(null);
            q.Enqueue(this);

            while(true)
            {
                if (q.Peek() == null)
                {
                    //spacing = (neededSpace - (numOfNodes * lenEl)) / (numOfNodes+1);
                    spacing = baseSpacing * height;
                    if (height-- == -1) break;
                    numOfNodes *= 2;
                    q.Enqueue(q.Dequeue());
                    sbBase.Append("\n"+sb);
                    sb = new StringBuilder(Helfer.GenerateString(spacing));
                }

                node = q.Dequeue();
                if (node != BTreeNode<V>.EMPTY)
                {
                    q.Enqueue(node.Left ?? BTreeNode<V>.EMPTY);
                    q.Enqueue(node.Right ?? BTreeNode<V>.EMPTY);

                    sb.Append(Helfer.ShortenString(lenEl, (node.Left != null ? node.Left.Val.ToString():""), true) + Helfer.GenerateString(spacing));
                    sb.Append(Helfer.ShortenString(lenEl, (node.Right != null ? node.Right.Val.ToString() : ""), true) + Helfer.GenerateString(baseSpacing, "-"));
                }
            }
            return sbBase;
            */
        }

        public override int GetHeightRecursive() => Math.Max(left == null ? 0 : left.GetHeightRecursive(), right == null ? 0 : right.GetHeightRecursive()) + 1;
        public override void GetLeafsRecursive(IList<IBTreeNode<V>> list)
        {
            if (right == null && left == null) list.Add(this);
            left?.GetLeafsRecursive(list);
            right?.GetLeafsRecursive(list);
        }
        public override void GetLeafsRecursive(IList<V> list)
        {
            if (right == null && left == null) list.Add(this.Val);
            left?.GetLeafsRecursive(list);
            right?.GetLeafsRecursive(list);
        }

        public override IBTreeNode<V> GetDeepestNodeRecursive() => GetDeepestNodeRecursive(0).node;
        private Wrap GetDeepestNodeRecursive(int currDepth)
        {
            Wrap leftW = null;
            Wrap rightW = null;

            if(left != null) leftW = (left as BTreeNode<V>)?.GetDeepestNodeRecursive(currDepth+1);
            if (right != null) rightW = (right as BTreeNode<V>)?.GetDeepestNodeRecursive(currDepth+1);
            if (right == null && left == null) return new Wrap { node = this, depth = currDepth };

            if (leftW == null) return rightW;
            else if (rightW == null) return leftW;
            else return leftW.depth > rightW.depth ? leftW : rightW;
        }


        public override int GetNumberOfUnvialSubtreesRecursiveStart() => GetNumberOfUnvialSubtreesRecursive()[0];
        /*
         * int[] {UnvialSubtree, IsUnival(0 or 1)} 
         * 
         */
        public override int[] GetNumberOfUnvialSubtreesRecursive()
        {
            int[] larr, rarr;
            larr = rarr = new int[] { 0, 1 };    //If no child unvial by default
            if (left == null && right == null) return new int[] { 1, 1 };   //Is Leaf?
            if (right != null)
            {
                rarr = right.GetNumberOfUnvialSubtreesRecursive();
                rarr[1] = rarr[1] == 1 && val.Equals(right.Val) ? 1 : 0;   //Is Unvial?
            }
            if (left != null)
            {
                larr = left.GetNumberOfUnvialSubtreesRecursive();
                larr[1] = larr[1] == 1 && val.Equals(left.Val) ? 1 : 0;   //Is Unvial?
            }

            if (larr[1] == 1 && rarr[1] == 1) return new int[] { larr[0] + rarr[0] + 1, 1 };
            else return new int[] { larr[0] + rarr[0], 0 };
        }

        //positive == unival || negative == not unival
        public override int GetNumberOfUnvialSubtreesRecursiveMethod2()
        {
            int lCount = 0, rCount = 0; //If no child unvial by default
            if (left == null && right == null) return -1;   //Is Leaf?
            if (right != null)
            {
                rCount = right.GetNumberOfUnvialSubtreesRecursiveMethod2();
                rCount = rCount < 0 && val.Equals(right.Val) ? rCount : Math.Abs(rCount);   //Is Unvial?
            }
            if (left != null)
            {
                lCount = left.GetNumberOfUnvialSubtreesRecursiveMethod2();
                lCount = lCount < 0 && val.Equals(left.Val) ? lCount : Math.Abs(lCount);    //Is Unvial?
            }

            if (lCount <= 0 && rCount <= 0) return lCount + rCount - 1;   // IsUnival!
            else return Math.Abs(lCount) + Math.Abs(rCount);    //NotUnival
        }

        public override void RemoveNodeValsRecursive(V val)
        {
            if (right != null)
            {
                if (right.Val.Equals(val)) right = null;
                else right.RemoveNodeValsRecursive(val);
            }
            if (left != null)
            {
                if (left.Val.Equals(val)) left = null;
                else left.RemoveNodeValsRecursive(val);
            }
        }

        //negative == false && int == node count
        public override IBTreeNode<V> GetLargestBst(Func<V, V, int> compare)
        {
            Wrap wp = new Wrap();
            GetLargestBst(wp, compare);
            return wp.node;
        }
        private int GetLargestBst(Wrap largest, Func<V, V, int> compare) 
        {
            BTreeNode<V> right = this.right as BTreeNode<V>, left = this.left as BTreeNode<V>;
            bool IsValid = (left == null ? true : compare(val, left.Val) > -1) && (right == null ? true : compare(val, right.Val) == -1);
            int count = (right == null ? 0 : right.GetLargestBst(largest, compare)) + (left == null ? 0 : left.GetLargestBst(largest, compare)) + 1;
            if (!IsValid) return -1;
            else if (count > largest.depth)
            {
                largest.depth = count;
                largest.node = this;
            }
            return count;
        }

        private class Wrap
        {
            public int depth;
            public BTreeNode<V> node;
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
        public override StringBuilder PrintRecursive(StringBuilder sb, TraverseType traverseType, string split = "; ")
        {
            if (traverseType == TraverseType.PreOrder) sb.Append(val + split);
            left?.PrintRecursive(sb, traverseType);
            if (traverseType == TraverseType.InOrder) sb.Append(val + split);
            right?.PrintRecursive(sb, traverseType);
            if (traverseType == TraverseType.PostOrder) sb.Append(val + split);
            return sb;
        }


    }


    public abstract class BinaryTree<V, N> : IEnumerable<V>, IBTree<V> where N : IBTreeNode<V>
    {       
        
        // BINARY TREE
        protected N root;
        public N Root { get => root;  }

        //KONSTRUKTOR
        // public BinaryTree();

        //Statics

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
            StringBuilder sb = Root.GenerateStringIt();
            return sb.ToString();
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
        public bool IsBalancedIt() => throw new NotImplementedException();
        public bool IsCompleteIt()
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

        public IList<IBTreeNode<V>> GetLeafsRecursive()
        {
            IList<IBTreeNode<V>> list = new List<IBTreeNode<V>>();
            root?.GetLeafsRecursive(list);
            return list;
        }
        public IList<V> GetLeafsRecursiveVals()
        {
            IList<V> list = new List<V>();
            root?.GetLeafsRecursive(list);
            return list;
        }
        public IList<IBTreeNode<V>> GetLeafsIt()
        {
            IList<IBTreeNode<V>> list = new List<IBTreeNode<V>>();
            if (root == null) return list;

            Queue<IBTreeNode<V>> q = new Queue<IBTreeNode<V>>();
            IBTreeNode<V> node = root;
            q.Enqueue(root);
            while (q.Count > 0)
            {
                node = q.Dequeue();
                if (node.Left != null) q.Enqueue(node.Left);
                if (node.Right != null) q.Enqueue(node.Right);
                if (node.Right == null && node.Left == null) list.Add(node);
            }
            return list;
        }
        public IList<V> GetLeafsItVals()
        {
            IList<V> list = new List<V>();
            if (root == null) return list;

            Queue<IBTreeNode<V>> q = new Queue<IBTreeNode<V>>();
            IBTreeNode<V> node = root;
            q.Enqueue(root);
            while (q.Count > 0)
            {
                node = q.Dequeue();
                if (node.Left != null) q.Enqueue(node.Left);
                if (node.Right != null) q.Enqueue(node.Right);
                if (node.Right == null && node.Left == null) list.Add(node.Val);
            }
            return list;
        }

        public IBTreeNode<V> GetDeepestNodeRecursive() => root == null ? null : root.GetDeepestNodeRecursive();
        public IBTreeNode<V> GetDeepestNodeIt()
        {
            Queue<IBTreeNode<V>> q = new Queue<IBTreeNode<V>>();
            IBTreeNode<V> node = root;
            q.Enqueue(root);
            while (q.Count > 0)
            {
                node = q.Dequeue();
                if (node.Left != null) q.Enqueue(node.Left);
                if (node.Right != null) q.Enqueue(node.Right);
            }
            return node;
        }

        public V[] GetValuesAtHeight(int h) // root == 1
        {
            if (root == null) throw new InvalidOperationException("No values Present");
            if (h <= 0) throw new InvalidOperationException("height must be greater than zero");
            if (h == 1) return new V[] { root.Val };

            IBTreeNode<V> node;
            Queue<IBTreeNode<V>> q = new Queue<IBTreeNode<V>>();
            q.Enqueue(root);
            q.Enqueue(null);
            while(true)
            {
                node = q.Dequeue();
                if (node.Left != null) q.Enqueue(node.Left);
                if (node.Right != null) q.Enqueue(node.Right);

                if(q.Peek() == null)
                {
                    q.Dequeue();
                    if (--h == 1) break;
                    else if (q.Count == 0) throw new InvalidOperationException("No Values Present at Level");
                    else q.Enqueue(null);   //Seperates Levels
                }
            }

            V[] vals = new V[q.Count];
            while (q.Count > 0) vals[vals.Length - q.Count] = q.Dequeue().Val;
            return vals;
        }

        public int GetNumberOfUnivalSubtreesRecursive() => root == null ? 0 : root.GetNumberOfUnvialSubtreesRecursiveStart();
        public int GetNumberOfUnivalSubtreesRecursiveMethod2() => root == null ? 0 : Math.Abs(root.GetNumberOfUnvialSubtreesRecursiveMethod2());
        public void RemoveNodeVals(V val) => root?.RemoveNodeValsRecursive(val);
        public IBTreeNode<V> GetLargestBst(Func<V, V, int> compare) => root == null ? null : root.GetLargestBst(compare);

        // TRAVERSAL
        // Depth First
        public string PrintRecursive(TraverseType traverseType, IBTreeNode<V> baseNode = null ,string split = "; ")
        {
            if (baseNode == null) baseNode = root;
            if (baseNode == null) return "";
            StringBuilder sb = new StringBuilder();
            if (traverseType.IsZigZagLevelOrder || traverseType.IsLevelOrder) PrintLevelOrder(sb, traverseType, baseNode, split);
            else baseNode.PrintRecursive(sb, traverseType, split);
            return sb.ToString().Substring(0, sb.Length - split.Length);
        }

        public string PrintIterative(TraverseType traverseType, IBTreeNode<V> baseNode = null, string split = "; ")
        {
            if (baseNode == null) baseNode = root;
            if (baseNode == null) return "";
            StringBuilder sb = new StringBuilder();
            if(traverseType.IsZigZagLevelOrder || traverseType.IsLevelOrder) return PrintLevelOrder(sb, traverseType, baseNode, split).ToString().Substring(0, sb.Length - split.Length);

            Stack<IBTreeNode<V>> stack = new Stack<IBTreeNode<V>>();

            IBTreeNode<V> node = baseNode;
            while(node != null || stack.Count > 0)
            {            
                if(node != null)
                {
                    if (traverseType.IsPreOrder) sb.Append(node.Val + split);
                    else if (traverseType.IsPostOrder) sb.Insert(0, node.Val + split);   // Insert at 0 to reverse WRL to LRW => Postorder
                    stack.Push(node);
                    node = traverseType.IsPostOrder ? node.Right : node.Left;   // if postOrder do WRL else WLR
                    continue;
                }
                if(traverseType.IsInorder) sb.Append(stack.Peek().Val+ split);
                node = traverseType.IsPostOrder ? stack.Pop().Left : stack.Pop().Right; // if postOrder do WRL else WLR
            }
            return sb.ToString().Substring(0, sb.Length-split.Length);
        }

        private StringBuilder PrintLevelOrder(StringBuilder sb, TraverseType traverseType, IBTreeNode<V> baseNode, string split = "; ")
        {
            Queue<IBTreeNode<V>> queue = new Queue<IBTreeNode<V>>();
            queue.Enqueue(baseNode);
            if(traverseType.IsZigZagLevelOrder) queue.Enqueue(null);    // To force an alternation from zig to zag after root
            bool Zig = true;

            StringBuilder subSb = new StringBuilder();
            while(queue.Count != 0)
            {
                IBTreeNode<V> node = queue.Dequeue();

                if (traverseType.IsZigZagLevelOrder)
                {
                    if (Zig) subSb.Append(node.Val + split);
                    else subSb.Insert(0, node.Val + split);
                }
                else sb.Append(node.Val + split);

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
