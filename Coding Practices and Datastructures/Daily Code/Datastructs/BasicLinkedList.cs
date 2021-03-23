using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code.Datastructs
{
    class BasicLinkedList<V>
    {
        public static readonly int MAX_PRINT_LEN = 50;
        public static readonly string PRINT_CONNECTOR = " => ";
        public class Node
        {
            public Node Next { get => next; set => next = value; }
            public V Val { get => val; set => val = value; }

            private Node next;
            private V val;
            public Node(V val) => this.val = val;

            public override string ToString() => val.ToString();
            public override bool Equals(object obj) => (obj as Node).val.Equals(val);
            public StringBuilder PrintListFromNode(StringBuilder sb)
            {
                sb.Append(ToString() + PRINT_CONNECTOR);
                if(sb.Length < MAX_PRINT_LEN && next != null) next.PrintListFromNode(sb);
                return sb;
            }
              
        }

        public Node Root { get => root; set => root = value; }
        public Node Last { get => last; set => last = value; }
        private Node root;
        private Node last;




        public void Append(V val) => Append(new BasicLinkedList<V>.Node(val));
        public void Append(BasicLinkedList<V>.Node node)
        {
            if (root == null)
            {
                root = node;
                last = node;
            }
            else
            {
                last.Next = node;
                last = node;
            }
        }

        public BasicLinkedList<V> Copy()
        {
            BasicLinkedList<V>.Node node = root;
            BasicLinkedList<V> copy = new BasicLinkedList<V>();
            while (node != null)
            {
                copy.Append(node.Val);
                node = node.Next;
            }

            return copy;
        }





        public override string ToString() => root?.PrintListFromNode(new StringBuilder()).ToString() + "NULL";
        public override bool Equals(object obj)
        {
            if (!obj.GetType().Equals(typeof(BasicLinkedList<V>))) return false;
            BasicLinkedList<V>.Node node = (obj as BasicLinkedList<V>).root;
            BasicLinkedList<V>.Node node2 = root;
            while (node != null)
            {
                if (!node.Equals(node2)) return false;
                node = node.Next;
                node2 = node2.Next;
            }

            return node2 == null;
        }


        // Single digits ==> "1 2 3 4 5" ==>   1 > 2 > 3 > 4 > 5
        public static BasicLinkedList<int> Assemble(string number)
        {
            BasicLinkedList<int> llist = new BasicLinkedList<int>();
            if (number.Contains(',')) return Assemble2(number.Split(','), llist);

            for (int i = 0; i < number.Length; i++)
                llist.Append(Int32.Parse(number[i] + ""));

            return llist;
        }

        // Numbers ==> "123, 2, 13, 44, 5" ==>   123 > 2 > 13 > 44 > 5
        private static BasicLinkedList<int> Assemble2(string[] nums, BasicLinkedList<int> llist)
        {
            for (int i = 0; i < nums.Length; i++)
                llist.Append(Int32.Parse(nums[i] + ""));
            return llist;
        }
    }
}
