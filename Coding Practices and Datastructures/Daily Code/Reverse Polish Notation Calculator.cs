using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Facebook:

        Given an expression (as a list) in reverse polish notation, evaluate the expression. Reverse polish notation is where the numbers come before the operand. Note that there can be the 4 operands '+', '-', '*', '/'. You can also assume the expression will be well formed.

        Example
        Input: [1, 2, 3, '+', 2, '*', '-']
        Output: -9
        The equivalent expression of the above reverse polish notation would be (1 - ((2 + 3) * 2)).

        Here's some starter code:

        def reverse_polish_notation(expr):
          # Fill this in.
  
        # 1 - (2 + 3) * 2
        print(reverse_polish_notation([1, 2, 3, '+', 2, '*', '-']))
        # -9
    */
    class Reverse_Polish_Notation_Calculator : Testable
    {
        public class InOut : St_InOuts.Arr_Primary<string,int>
        {
            public InOut(string s, int i) : base(s.Split(','), i, true)
            {
                AddSolver((arg, erg) => erg.Setze(Evaluate(arg)));
            }
        }

        public Reverse_Polish_Notation_Calculator()
        {
            testcases.Add(new InOut("1,2,3,+,2,*,-", -9));
        }


        private static int Operate(char op, int a, int b)
        {
            switch (op)
            {
                case '+': return b + a;
                case '-': return b - a;
                case '/': return b / a;
                case '*': return b * a;
                default:
                    return -1;
            }
        }
        public static int Evaluate(string[] arr)
        {
            Stack<int> stack = new Stack<int>();
            for(int i=0; i<arr.Length; i++)
            {
                if ("+-*/".Contains(arr[i])) stack.Push(Operate(arr[i][0], stack.Pop(), stack.Pop()));
                else stack.Push(Int32.Parse(arr[i]));
            }

            return stack.Pop();
        }
    }
}
