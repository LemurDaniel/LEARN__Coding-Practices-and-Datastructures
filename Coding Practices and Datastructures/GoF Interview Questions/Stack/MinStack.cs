using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.DS_HANDBOOK.Stack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Stack
{
    class Min_Stack : Testable
    {
        private class InOut : InOutBase<string, int>
        {
            public InOut(string input, int output) : base(input, output, true)
            {
                AddSolver((inp, erg) => erg.Setze(Assemble(inp, new MinStack()).Min()), "Min Stack");
            }
        }


        public Min_Stack()
        {
            testcases.Add(new InOut("5;4;4;2;9;1;POP;POP", 2));
            testcases.Add(new InOut("5;4;4;2;9;-5;POP", 2));
            testcases.Add(new InOut("5;4;4;2;9;6;POP;POP;9", 2));
            testcases.Add(new InOut("5;4;4;2;9;6;POP;POP;9;-50;1;POP;PEEK;PEEK", -50));
            testcases.Add(new InOut("5;4;1;POP;POP", 5));
            testcases.Add(new InOut("1;2;4;POP;POP", 1));
        }


        private static MinStack Assemble(string input, MinStack st)
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

        private class MinStack
        {
            private LLStack<int> stack = new LLStack<int>();
            private int min = int.MaxValue;
            public int Min() => min;

            public void Push(int data)
            {
                if (data <= min)
                {
                    stack.Push(min);    // Store the Last min Value behind new min value in Stack
                    min = data;
                }
                stack.Push(data);
            }
            public int Peek() => stack.Peek();
            public int Pop()
            {
                int data = stack.Pop();
                if (data == min) min = stack.Pop();
                return data;
            }

        }
    }
}
