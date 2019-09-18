using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Coding_Practices_and_Datastructures.Daily_Code.Min_Stack_DailyCode;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
        Hi, here's your problem today. This problem was recently asked by Uber:

        Design a simple stack that supports push, pop, top, and retrieving the minimum element in constant time.

        push(x) -- Push element x onto stack.
        pop() -- Removes the element on top of the stack.
        top() -- Get the top element.
        getMin() -- Retrieve the minimum element in the stack. (In O(n) Time !!!!!)
           
     */
    class Min_Stack_DailyCode : Testable
    {
        public interface IMinStack<V>
        {
            void Push(V val); 
            V Pop();
            V Top();
            V GetMin();
        }

        public class Operation<V>
        {
            private V val;
            public readonly Action<IMinStack<V>, Output<V>> operation;
            private string des;
            public Operation(string s, V val = default(V)) {
                this.val = val;
                des = s.ToUpper()[0] + s.Substring(1);
                s = s.ToLower();
                if (s == "push") { operation = (st, erg) => st.Push(val); des = des + "(" + val + ")"; }
                else if (s == "pop") operation = (st, erg) => erg.Add(st.Pop(), s);
                else if (s == "top") operation = (st, erg) => erg.Add(st.Top(), s);
                else if (s == "min") operation = (st, erg) => erg.Add(st.GetMin(), s);
            }
            public override string ToString() => des;
        }

        public class Output<V>
        {
            private List<V> vals = new List<V>();
            private string outp = null;
            public Output() { }
            public Output(V[] vals) => this.vals = new List<V>(vals);
            public void Add(V val, string op)
            {
                vals.Add(val);
                if (outp == null) outp = "";
                else outp += ",";
                outp += op + "=>" + val;
            }

            public override string ToString() => "\n"+Helfer.Arrayausgabe(vals.ToArray()) + (outp != null ? "\n"+ outp: "");
            public override bool Equals(object obj) => Helfer.ArrayVergleich((obj as Output<V>).vals.ToArray(), vals.ToArray());
            public override int GetHashCode() => base.GetHashCode();
        }

        public class InOut : InOutBase<Operation<int>[], Output<int>>
        {
            public InOut (string s, string s2) : base(Convert(s), new Output<int>(Helfer.Assemble(s2)), true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe("Eingabe: \n", arg);
                HasMaxDur = false;
                AddSolver(NodeMinStack_Solver);
                AddSolver(ArrayMinStack_Solver);
            }
            public static Operation<int>[] Convert(string s)
            {
                string[] sArr = s.Split(',');
                Operation<int>[] ops = new Operation<int>[sArr.Length];
                for(int i=0; i<sArr.Length; i++)
                {
                    if (sArr[i].Contains(':'))
                        ops[i] = new Operation<int>("Push", int.Parse(sArr[i].Substring(1)));
                    else
                        ops[i] = new Operation<int>(sArr[i]);
                }
                return ops;
            }
        }

        public Min_Stack_DailyCode()
        {
            testcases.Add(new InOut(":10,:20,:30,min,:5,min,:3,:10,min,:2,min,pop,min,pop,pop,min",
                "10,5,3,2,2,3,10,3,5"));
        }




        public static void General_Solver(Operation<int>[] ops, InOut.Ergebnis erg, IMinStack<int> stack) {
            Output<int> outp = new Output<int>();
            foreach (Operation<int> op in ops) op.operation(stack, outp);
            erg.Setze(outp);
        }


        //SOL
        public static void NodeMinStack_Solver(Operation<int>[] ops, InOut.Ergebnis erg) => General_Solver(ops, erg, new NodeMinStack<int>());
        public class NodeMinStack<V> : IMinStack<V> where V : IComparable
        {
            private NodeStack stack = new NodeStack();
            private V min;
            public V GetMin() => min;

            public void Push(V val)
            {
                if (stack.IsEmpty || min.CompareTo(val) > -1)
                {
                    stack.Push(min);
                    min = val;
                }
                stack.Push(val);
            }

            public V Pop()
            {
                V val = stack.Pop();
                if (val.Equals(min)) min = stack.Pop();
                return val;
            }

            public V Top() => stack.Top();

            public override string ToString() => stack.ToString();

            private class NodeStack
            {
                private class Node
                {
                    public V val;
                    public Node next;
                    public Node(V val, Node next)
                    {
                        this.val = val;
                        this.next = next;
                    }
                }
                private Node top;
                public bool IsEmpty { get => top == null; }

                public void Push(V val) => top = new Node(val, top);
                public V Top() => Pop(false);
                public V Pop() => Pop(true);

                private V Pop(bool pop)
                {
                    if (top == null) throw new InvalidOperationException();
                    V val = top.val;
                    if (pop) top = top.next;
                    return val;
                }

                public override string ToString()
                {
                    string s = "";
                    Node node = top;
                    while (node != null)
                    {
                        s += node.val + " => ";
                        node = node.next;
                    }
                    s += "<NULL>";
                    return s;
                }
            }
        }



        //SOL2
        public static void ArrayMinStack_Solver(Operation<int>[] ops, InOut.Ergebnis erg) => General_Solver(ops, erg, new ArrayMinStack<int>());
        public class ArrayMinStack<V> : IMinStack<V> where V : IComparable
        {
            private ArrayStack stack = new ArrayStack();
            private V min;
            public V GetMin() => min;

            public void Push(V val)
            {
                if (stack.IsEmpty || min.CompareTo(val) > -1)
                {
                    stack.Push(min);
                    min = val;
                }
                stack.Push(val);
            }

            public V Pop()
            {
                V val = stack.Pop();
                if (val.Equals(min)) min = stack.Pop();
                return val;
            }

            public V Top() => stack.Top();

            public override string ToString() => stack.ToString();


            private class ArrayStack
            {
                private V[] arr = new V[100];
                public int top = 0;
                public bool IsEmpty { get => top == 0; }

                public void Push(V val)
                {
                    if (top == arr.Length - 1) throw new InvalidOperationException("Stack ist voll");
                    arr[++top] = val;
                }
                public V Top() => Pop(false);
                public V Pop() => Pop(true);
                private V Pop(bool pop)
                {
                    if (top == 0) throw new InvalidOperationException();
                    if (pop) return arr[top--];
                    else return arr[top];
                }

                public override string ToString()
                {
                    string s = "";
                    int i = 0;
                    while (i <= top) s += arr[i++] + " => ";
                    return s + "<NULL>";
                }
            }

        }
    }
}
