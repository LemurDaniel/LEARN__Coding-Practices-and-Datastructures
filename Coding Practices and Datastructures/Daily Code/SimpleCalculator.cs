using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * Hi, here's your problem today. This problem was recently asked by Google:
     * Given a mathematical expression with just single digits, plus signs, negative signs, and brackets, evaluate the expression. 
     * Assume the expression is properly formed.
     * 
     * 
     * 
     */

    class Simple_Calculator : Testable
    {
        private class OutPut
        {
            public readonly int erg;
            public readonly string rpn;
            public OutPut(int erg) => this.erg = erg;
            public OutPut(int erg, string rpn) : this(erg) => this.rpn = rpn;

            public override string ToString() => erg + (rpn == null ? "" : "\nRPN: " + rpn);
            public override bool Equals(object obj) => (obj as OutPut).erg == erg;
            public override int GetHashCode() => base.GetHashCode();
        }

        private class InOut : InOutBase<string, OutPut>
        {
            public InOut(string inp, int outp) : base(inp, new OutPut(outp), true)
            {
                AddSolver(Eval);
            }
        }

        public Simple_Calculator()
        {
            testcases.Add(new InOut("3+3+4+6-2", 14));
            testcases.Add(new InOut("3+3*4", 15));
            testcases.Add(new InOut("(3+3)*4", 24));
            testcases.Add(new InOut("-3", -3));
            testcases.Add(new InOut("-(3+(2-1))", -4));
            testcases.Add(new InOut("3+4*2/(1-5)", 1));
            testcases.Add(new InOut("3+4*2*2/(1-5)", -1));
            testcases.Add(new InOut("(1+(4+5+2)-3)+(6+8)", 23));
        }



        private class MyStack : Stack<int>
        {
            public new void Push(int i)
            {
                RPN += i;
                base.Push(i);
            }
        }

        private static string operators = "+-/*#";
        private static string RPN;
        private static void Eval(string exp, InOut.Ergebnis erg)
        {
            RPN = "";
            MyStack stack = new MyStack();
            Stack<char> operators = new Stack<char>();

            exp = "(" + exp + ")";

            char token, lastToken = ' ';
            for (int i = 0; i < exp.Length; i++)
            {
                token = exp[i];
                if (token == ' ') continue;
                else if (token == '-' && lastToken != ')' && !Char.IsDigit(lastToken)) token = '#';     // If - is used as a Negation operator => change Token to Negation: #

                if (Char.IsDigit(token)) stack.Push(int.Parse(token + "")); // Push Digits
                else if (token == '(') operators.Push(token);   // Push Brackets
                else if (token == ')' || IsOperator(token)) Process(token, stack, operators);

                lastToken = token;
            }

            erg.Setze(new OutPut(stack.Pop(), RPN));
        }

        private static void Process(char token, Stack<int> stack, Stack<char> operators)
        {
            if (token == ')')   // If Closing Brackets Evaluate until opening bracket
            {
                while (operators.Count > 0 && operators.Peek() != '(') stack.Push(Calc(operators.Pop(), stack));
                if (operators.Peek() == '(') operators.Pop();
                else throw new Exception("Non matching Parentheses");
                return;
            }

            if (operators.Count > 0 && operators.Peek() != '(' && GetPrecedence(operators.Peek()) >= GetPrecedence(token)) // If Operator with greater Precedence on Stack
                stack.Push(Calc(operators.Pop(), stack));   // Pop operator and Push Result on outputStack

            operators.Push(token);
        }



        private static bool IsOperator(char c) => operators.Contains(c);
        private static int GetPrecedence(char c)
        {
            switch (c)
            {
                case '#': return 3;
                case '*': case '/': return 2;
                default: return 1;
            }
        }
        private static int Calc(char op, Stack<int> stack)
        {
            int val;
            switch (op)
            {
                case '+': val = stack.Pop() + stack.Pop(); break;
                case '-': val = -stack.Pop() + stack.Pop(); break;
                case '*': val = stack.Pop() * stack.Pop(); break;
                case '/': val = (int)(1.0 / stack.Pop() * stack.Pop()); break;
                case '#': val = -stack.Pop(); break;
                default: val = int.MinValue; break;
            }
            RPN += op;
            return val;
        }
    }
}


