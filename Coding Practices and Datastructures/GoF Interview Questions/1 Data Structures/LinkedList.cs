using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures
{
    public class LinkedList<V> : IList<V>
    {
        /* LINKED LIST NODE */
        public class Node
        {
            /* VARS */
            private LinkedList<V> list; 
            private Node next;
            private V val;

            public LinkedList<V> List { get => list == null ? SetAsRootToList(new LinkedList<V>()) : list;  }
            public Node Next { get => next; set { next = value; if(value != null) value.OperateOnNodes( node => node.list = this.List); }  } // !!! BIG DIFFERENCE WHEN USING .Next und .next (.Next updates listpointer of appended Elements)
            public V Val { get => val; set => val = value; }
            public bool IsRoot { get => List.root == this; }
            public Node Root { get => List.Root; }

            /* CONSTRUCTORS */
            public Node(V val) => this.val = val;

            /* METHODS */
            public override string ToString() => val.ToString();
            public override bool Equals(object obj) => val.Equals( ((Node)obj).val );
            public override int GetHashCode() => val.GetHashCode();
            public LinkedList<V> SetAsRootToList(LinkedList<V> list)
            {
                Node oldRoot = list.root;
                Node n2 = oldRoot;
                while(n2 != null)
                {
                    n2.list = null;
                    if (n2.Next == this) n2.next = null;        // Remove if old Root points eventually to this element
                    n2 = n2.Next;
                }

                list.root = this;
                list.last = null;
                this.list = list;
                OperateOnNodes(node => node.list = this.list);
                return list;
            }

            public Node Copy(LinkedList<V> llist)
            {
                Node copied = new Node(val)
                {
                    list = llist
                };
                llist.root = copied;
                if(Root.next != null) Root.next.OperateOnNodes( arg => {
                    copied.Next = new Node(arg.val);
                    copied = copied.next;
                });
                return llist.root;
            }


            //DELEGATEES
            private delegate bool ReverseActionIt(Node nodeBase, Node prev, Node curr, Node next);
            private delegate void EndAction(Node nodeBase, Node prev, Node curr, Node next);
            public delegate bool NodeEval(Node node);
            public delegate void Operator(Node node);
            // REVERSE METHODS

            public Node ReverseListRecursive() => Root.ReverseFromNodeRecursive();
            public Node ReverseFromNodeRecursive() => ReverseFromNodeRecursive(node => node.next == null);
            public Node ReverseFromNodeRecursive(int len) => ReverseFromNodeRecursive(node => len-- <= 1 || node.next == null);

            private Node ReverseFromNodeRecursive(NodeEval reverseActionRec)
            {
                Node baseNode = Root;
                if (baseNode != this) while (baseNode.Next != this) baseNode = baseNode.Next;
                else baseNode = null;
                return ReverseFromNodeRecursive(reverseActionRec, baseNode);
            }
            private Node ReverseFromNodeRecursive(NodeEval reverseActionRec, Node baseNode)
            {
                if (reverseActionRec(this))
                {
                    if (baseNode == null) list.root = this;
                    else
                    {
                        baseNode.next.next = this.next;
                        baseNode.next = this;
                    }
                }
                else next.ReverseFromNodeRecursive(reverseActionRec, baseNode).next = this;
                if (baseNode == null) next = null;
                return this;
            }

            public Node ReverseListIterative() => list.root.ReverseFromNodeIterative();
            public Node ReverseFromNodeIterative() => ReverseIterative(null);
            public Node ReverseFromNodeIterative(int len) => ReverseIterative((self, prev, curr, next) => --len > 0);

            private Node ReverseIterative(ReverseActionIt reverseAction) => ReverseIterative(reverseAction, (self, prev, curr, next) => self.next = curr);
            private Node ReverseIterative(ReverseActionIt eval, EndAction endAction)
            {
                if (this.next == null) return this;
                Node baseNode = Root;
                if (!IsRoot) while (baseNode.next != this) baseNode = baseNode.next;        // Find Previous Node of this one (if this is not root node)

                if (eval == null) eval = (s, p, c, n) => true;

                Node prev = this, curr = this.next, next = null;
                while (curr != null && eval(this, prev, curr, next))
                {
                    //Mode Forward
                    next = curr.next;

                    //Reverse Current Node
                    curr.next = prev;

                    prev = curr;
                    curr = next;
                }
                endAction?.Invoke(this, prev, curr, next);  // Ending Action
                if (!IsRoot) baseNode.next = prev;      // IF NOT ROOT NODE: After Reversal baseNode points to Last element of Reverse Process
                else list.root = prev;                  // IF ROOT: Point to Null and new Root node is Last element of List
                return prev;
            }


            public string PrintList() => Root.PrintFromNode();
            public string PrintFromNode()
            {
                StringBuilder sb = new StringBuilder();
                OperateOnNodes(arg => sb.Append(arg + (arg.next != null ? PRINT_NODE_CONCAT:"")), MAX_PRINT_LEN);
                return sb.ToString();
            }

            public Node OperateOnNodes(Operator operation, long cap) => OperateOnNodes(operation, node => node != null && cap-- > 0);
            public Node OperateOnNodes(Operator operation) => OperateOnNodes(operation, node => node != null);
            public Node OperateOnNodes(Operator operation, NodeEval eval)
            {
                Node node = this;
                while (eval(node))
                {
                    operation?.Invoke(node);
                    node = node.next;
                }
                return node;
            }


            public void Insert(V val)
            {
                Node node = next;
                Next = new Node(val);
                Next.Next = node;
            }
            public void RemoveNext()
            {
                if (next == null) return;
                Node node = next;
                next = node.next;
                node.next = null;
                node.Remove();
            }
            public void Remove()
            {
                if (IsRoot) list.root = null;
                OperateOnNodes(node =>
                {
                    if (list.last == node) list.last = null;
                    node.list = null;
                });
            }
        }

        /* LINKED LIST */
        /* STATIC FINAL VARS */
        public static readonly int MAX_PRINT_LEN = 50;
        public static readonly string PRINT_NODE_CONCAT = " ---> ";

        /* VARS */
        private Node root;
        private Node last;
        public Node Root { get => root; }

        public int Count => throw new NotImplementedException();

        public bool IsReadOnly => throw new NotImplementedException();

        public V this[int index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        /* CONSTRUCTORS */
        private LinkedList() => this.root = null;
        public LinkedList(V val) : this(new LinkedList<V>.Node(val)) { }
        public LinkedList(LinkedList<V>.Node root) => root.SetAsRootToList(this);

        /* STATIC METHODS */
        public static LinkedList<string>.Node Assemble(int len) {
            LinkedList<string> llist = new LinkedList<string>("Root");

            LinkedList<string>.Node node = llist.root;
            while (--len > 0) {
                if (len % 100000 == 0) Console.WriteLine(len);
                node.Next = new LinkedList<string>.Node(Helfer.RandomString(5));
                node = node.Next;
            }
            node.Val = "Last";
            return llist.root;
        }

        public static LinkedList<int>.Node Assemble(int len, int min, int max)
        {
            LinkedList<int> llist = new LinkedList<int>(Helfer.random.Next(min, max));

            LinkedList<int>.Node node = llist.root;
            while (--len > 0)
            {
                if (len % 100000 == 0) Console.WriteLine(len);
                node.Next = new LinkedList<int>.Node(Helfer.random.Next(min,max));
                node = node.Next;
            }
            return node;
        }

        public static LinkedList<int> Assemble(string number)
        {
            if (number.Contains(',')) return Assemble2(number);
            LinkedList<int> llist = new LinkedList<int>();
            for (int i = 0; i < number.Length; i++) llist.Append(Int32.Parse(number[i] + ""));
            return llist;
        }
        public static LinkedList<int> Assemble2(string number)
        {
            string[] nums = number.Split(',');
            LinkedList<int> llist = new LinkedList<int>();
            for (int i = 0; i < nums.Length; i++) llist.Append(Int32.Parse(nums[i] + ""));
            return llist;
        }
        public static LinkedList<char> AssembleChar(string number)
        {
            LinkedList<char> llist = new LinkedList<char>();
            for (int i = 0; i < number.Length; i++) llist.Append(number[i]);
            return llist;
        }

       //Merge
        public static LinkedList<X> Merge_K_Sorted_LinkedLists<X>(LinkedList<X>[] arr) where X : IComparable<X>
        {
            DS_HANDBOOK.Interfaces.IQueue<LinkedList<X>.Node> q = new DS_HANDBOOK.Queue.PrioArrayQueue<LinkedList<X>.Node>((n, n2) => n.Val.CompareTo(n2.Val));
            foreach (LinkedList<X> llist in arr) q.Enqueue(llist.root);

            LinkedList<X>.Node node = q.Dequeue();
            if (node.Next != null) q.Enqueue(node.Next);
            LinkedList<X> list = new LinkedList<X>(node);
            while (!q.IsEmpty())
            {
                node.Next = q.Dequeue();
                node = node.Next;
                if (node.Next != null) q.Enqueue(node.Next);
            }
            return list;
        }

        /* METHODS */
        public override string ToString() => root != null ? root.PrintFromNode():"<NULL>";
        public override int GetHashCode() => base.GetHashCode();
        public override bool Equals(object obj)
        {
            if (obj == this) return true;
            Node node = ((LinkedList<V>)obj).root, node2 = root;
            while(node != null && node2 != null)
            {
                if (!node.Equals(node2)) return false;
                node = node.Next;
                node2 = node2.Next;
            }
            if (node != node2) return false; // Both should be Null at this point
            return true;
        }

        public LinkedList<V> Copy() => root.Copy(new LinkedList<V>()).List;
        public void Append(V val) => Append(new Node(val));
        public void Append(LinkedList<V>.Node add)
        {
            if(root == null)
            {
                last = null;
                add.SetAsRootToList(this);
                return;
            }
            Node node = last ?? root;
            while (node.Next != null) node = node.Next;
            node.Next = add;
            last = add;
        }



        public string PrintList() => root.PrintList();
        public LinkedList<V> ReverseListIterative() => root.ReverseFromNodeIterative().List;
        public LinkedList<V> ReverseListRecursive() => root.ReverseFromNodeRecursive().List;
        public LinkedList<V> ReverseBetween(int m, int n, bool iterative)
        {
            if (root == null) return this;
            Node node = root;
            int m2 = m;
            while (--m2 > 0 && node.Next != null) node = node.Next;
            if (iterative) node.ReverseFromNodeIterative(n - m + 1);
            else node.ReverseFromNodeRecursive(n - m + 1);
            return this;
        }



        // Remove K-th Element
        public LinkedList<V> Remove_Kth_Element(int k)
        {
            Root.OperateOnNodes(node => { if (--k == 1) node.RemoveNext(); return; });
            return this;
        }
        public LinkedList<V> RemoveElements(V val)
        {
            Node node = Root;
            if (root == null) return this;
            while(node != null && node.Next != null)
            {
                if (node.Next.Val.Equals(val)) node.RemoveNext();
                else node = node.Next;
            }
            if (Root.Val.Equals(val)) root = Root.Next;
            return this;
        }



        // ILIST SCHNITTSTELLE
        public int IndexOf(V item)
        {
            int count = 0;
            root.OperateOnNodes(node => count++, node => node.Val.Equals(item));
            return count;
        }

        public void Insert(int index, V item)
        {
            if (index == 0) new Node(item).SetAsRootToList(this);
            else root.OperateOnNodes(node => { if (--index <= 0) node.Insert(item); });
        }

        public void RemoveAt(int index) => root.OperateOnNodes(node => { if (--index <= 0) node.RemoveNext(); });

        public void Add(V item) => Append(new Node(item));

        public void Clear() => root.Remove();

        public bool Contains(V item) => null == root.OperateOnNodes(null, node => node.Val.Equals(item));

        public void CopyTo(V[] array, int arrayIndex)
        {
            throw new NotImplementedException();
        }

        public bool Remove(V item)
        {
            if (root.Val.Equals(item)) root.Remove();
            else root.OperateOnNodes(node => { if (node.Next.Val.Equals(item)) node.RemoveNext(); });
            return true;
        }
        public IEnumerator<V> GetEnumerator()
        {
            throw new NotImplementedException();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            throw new NotImplementedException();
        }
    }
}
