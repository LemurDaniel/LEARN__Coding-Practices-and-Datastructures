using GoF_Coding_Interview_Algos.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoF_Coding_Interview_Algos.GoF_Interview_Questions.Stack
{
    class Basic_Calculator : Testable
    {

        private class InOut : InOutBase<string, int>
        {
            public InOut(string input, int output) : base (input, output, true)
            {
                AddSolver(Solve);
                setup = Construct;
            }
        }

        public Basic_Calculator()
        {
            // number always positive, must support +, - and brackets, Testcases are always valid
            testcases.Add(new InOut("1 + 1", 2));
            testcases.Add(new InOut("2 - 1 + 2", 3));
            //testcases.Add(new InOut("(1+(4+5+2)-3)+(6+8)", 23));
        }


        // SOLUTION START
        private delegate int Operation(int z1, int z2);
        private static IDictionary<char, Operation> operators = new Dictionary<char, Operation>();
        private static void Construct()
        {
            operators.Clear();
            operators.Add('+', (arg, arg2) => arg + arg2);
            operators.Add('-', (arg, arg2) => arg - arg2);
            operators.Add('/', (arg, arg2) => arg / arg2);
            operators.Add('*', (arg, arg2) => arg * arg2);
        }


        private static void Solve(string input, InOut.Ergebnis erg)
        {
            Stack<int> stack = new Stack<int>();

            input += " ";
            char c;
            Operation op = null;
            for(int i=0, number = -1, num2; i<input.Length; i++)
            {
                c = input[i];
                if (Char.IsDigit(c)) number = (number == -1 ? Helfer.GetNumber(c) : number * 10 + Helfer.GetNumber(c));
                else if (c == '(')
                {
                    stack.Push(number);
                    number = -1;
                }
                else if (c == ')') number = stack.Pop();
                else
                {
                    if (number > -1)
                    {
                        if (op != null) number = op(number, number);
                        else
                        {
                            num2 = number;
                            number = -1;
                        }
                        op = null;
                    }
                    if (operators.Keys.Contains(c)) op = operators[c];
                }
            }

            erg.Setze(stack.Pop());
        }


    }
}
