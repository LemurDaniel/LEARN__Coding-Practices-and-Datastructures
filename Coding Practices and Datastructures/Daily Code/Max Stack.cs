using Coding_Practices_and_Datastructures.DS_HANDBOOK.Stack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Max_Stack : Testable
    {
        private class InOut : InOutBase<string, int>
        {
            public InOut(string input, int output) : base(input, output, true)
            {
                AddSolver((inp, erg) => erg.Setze(Assemble(inp, new MaxStack<int>()).Max()),"Max Stack 1");
                AddSolver((inp, erg) => erg.Setze(Assemble(inp, new MaxStack2()).Max()), "Max Stack 2");
            }
        }

 
        public Max_Stack()
        {
            testcases.Add(new InOut("5;4;4;2;9;6;POP;POP", 5));
            testcases.Add(new InOut("5;4;4;2;9;6;POP", 9));
            testcases.Add(new InOut("5;4;4;2;9;6;POP;POP;9", 9));
            testcases.Add(new InOut("5;4;4;2;9;6;POP;POP;9;120;1;POP;PEEK;PEEK", 120));
            testcases.Add(new InOut("5;4;4;POP;POP", 5));
            testcases.Add(new InOut("1;2;4;POP;POP", 1));
        }


        private static IMaxStack<int> Assemble(string input, IMaxStack<int> st)
        {
            string[] arr = input.Split(';');
            for (int i = 0; i < arr.Length; i++)
            {
                if (arr[i] == "POP") st.Pop();
                else if (arr[i] == "PEEK") st.Peek();
                else st.Push(int.Parse(arr[i]));
            }
            return st;
        }

        private interface IMaxStack<V>
        {
            V Pop();
            V Peek();
            void Push(V obj);
            V Max();
        }


        private class MaxStack<V> : IMaxStack<V> where V : IComparable
        {
            private class Node
            {
                public Node next;
                public Node prev;
                public Node max;
                public V data;
                public Node(Node next, V data) : this(next, null, data) { }
                public Node(Node next, Node prev, V data)
                {
                    this.prev = prev;
                    this.next = next;
                    this.data = data;
                }
            }

            private Node top;   // Stack
            private Node max;   // Ordered Linkedlist of MaxElements
            public V Max() => max.data;

            public V Pop() => Pop(true);
            public V Peek() => Pop(false);
            public void Push(V data)
            {
                top = new Node(top, data);

                Node tmp = null, node;
                if (max == null) tmp = max = new Node(null, null, data);    // if there is no Node
                else
                {
                    node = max;
                    while (node != null)
                    {
                        if (data.CompareTo(node.data) != -1)
                        {
                            if (node == max)    // When Max Node needs to be replaced
                            {
                                tmp = new Node(max, null, data);
                                max = tmp;
                                node.prev = tmp; // Previous max Node points back to new max Node
                                break;
                            }
                            else if (node != max)  // When its a Node In the LinkedList: adjusting prev and next pointers of previous and following Node
                            {
                                tmp = new Node(node, node.prev, data);  // New node that points to current Node and to the prev of the current Node
                                node.prev.next = tmp;   // adjusting next pointer of prev Node of the current
                                node.prev = tmp;    // adjusting prev pointer of current node
                                break;
                            }
                        } 
                        else if (node.next == null) // Adding a Node to the End of the List
                        {
                            tmp = new Node(null, node, data);
                            node.next = tmp;
                        }
                        node = node.next;
                    }
                }
                top.max = tmp;  // Node of the Stack points to the Node in the Max Element LinkedList
            }


            private V Pop(bool pop)
            {
                if (top == null) throw new InvalidOperationException("stack is empty");
                V data = top.data;
                if (pop)
                {
                    Node node = top.max;
                    if(node == max)
                    {
                        max = max.next;                     // if Max node Poped, next is new Max node
                        if(max != null) max.prev = null;    // Prev of new Max Node is null
                    }
                    else
                    {
                        node.prev.next = node.next;         // Prev Node points to Next of Current (Skipping Current)
                        if(node.next != null) node.next.prev = node.prev;   // Prev of Next Points top Prev of Current Node
                    }
                    top = top.next;

                }
                return data;
            } 
        }

        private class MaxStack2 : IMaxStack<int>
        {
            private LLStack<int> stack = new LLStack<int>();
            private int max = int.MinValue;
            public int Max() => max;

            public void Push(int data)
            {
                if(data >= max) {
                    stack.Push(max);    // Store the Last max Value behind new Max value in Stack
                    max = data;
                }
                stack.Push(data);
            }
            public int Peek() => stack.Peek();
            public int Pop()
            {
                int data = stack.Pop();
                if (data == max) max = stack.Pop();
                return data;
            }

        }
    }
}
