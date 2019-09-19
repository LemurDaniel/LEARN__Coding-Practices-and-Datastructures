using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures
{
    class Binary_Arithmetic_Tree : BinaryTree<long, Binary_Arithmetic_Tree.Node>
    {
        public class Node : BTreeNode<long>
        {
            public new Node left { get => base.left as Node; }
            public new Node right { get => base.right as Node; }
            public Node(long val) : base(val) { }

            public long SolveRecursive() => val >= 0 ? val : Calc(left.SolveRecursive(), right.SolveRecursive(), val);
        }

        private static string postFix;

        public Binary_Arithmetic_Tree()
        {
            if(ops.Count == 0)
            {
                int num = 0;
                foreach (char c in operatorString) ops.Add(c, num++);
            }
        }

        public override void Append(long val) => Append(new Node(val));
        public override void Append(Node insert) => throw new NotImplementedException();
        protected override IBTree<long> TreeGetNewInstance() => throw new NotImplementedException();
        public override IBTreeNode<long> CreateNode(long val) => throw new NotImplementedException();
        public long SolveRecursive() => root == null ? -1 : root.SolveRecursive();


        public static long Calc(long num, long num2, long op)
        {
            switch (op)
            {
                case -1: return num + num2;
                case -2: return num - num2;
                case -3: return num / num2;
                case -4: return num * num2;
                case -5: return (long)Math.Pow(num, num2);
                default: return -1;
            }
        }


        public Binary_Arithmetic_Tree BuildTree(string s)
        {
            Stack<Node> stack = new Stack<Node>();
            StringBuilder sb = new StringBuilder();

            ConvertToPostfix(s, z =>
            {
                if (z > 0)
                {
                    sb.Append(z + " ");
                    stack.Push(new Node(z));
                }
                else
                {
                    sb.Append(operatorString[(int)(z * -1) - 1] + " ");
                    Node op = new Node(z);
                    op.Right = stack.Pop();
                    op.Left = stack.Pop();
                    stack.Push(op);
                }
            });

            root = stack.Pop();
            postFix = sb.ToString();
            return this;
        }


        //Convert to PostFix via shuntingyard
        public static readonly string operatorString = "+-/*^()";
        private static IDictionary<char, int> ops = new Dictionary<char, int>();
        private static readonly int[] code = new int[] { -1, -2, -3, -4, -5, -6, -7 };
        private static readonly int[] precedence = new int[] { 1, 1, 2, 2, 3, 0, 0 };
        private static readonly int[] leftAss = new int[] { 1, 1, 1, 1, 0, 0, 0 };

        private static void ConvertToPostfix(string s, Action<long> action)
        {
            Stack<int> opStack = new Stack<int>();

            long num = 0;
            bool numFound = false;
            for(int i=0; i<s.Length; i++)
            {
                if(s[i] == '1')
                {
                    Console.WriteLine();
                }
                if (Char.IsDigit(s[i]))
                {
                    numFound = true;
                    num = num*10 + Helfer.GetNumber(s[i]);
                    if (i == s.Length - 1) action(num);
                    continue;
                }
                if(numFound) action(num);
                numFound = false;
                num = 0;

                if (!operatorString.Contains(s[i])) continue;
                if (s[i] == '(') opStack.Push(ops['(']);
                else if (s[i] == ')')
                {
                    while (opStack.Count > 0 && opStack.Peek() != ops['(']) action(code[opStack.Pop()]);
                    if (opStack.Count == 0) throw new Exception("Non Matching parenthesises");
                    else opStack.Pop();
                }
                else
                {
                    if (opStack.Count != 0 && opStack.Peek() != ops[')'] && opStack.Peek() != ops['('] && precedence[opStack.Peek()] > precedence[ops[s[i]]] && leftAss[ops[s[i]]] == 1) action(code[opStack.Pop()]);
                    opStack.Push(ops[s[i]]);
                }
            }
            while(opStack.Count != 0) action(code[opStack.Pop()]);
        }



        public override string ToString() => postFix+"\n" + base.ToString();
    }
}
