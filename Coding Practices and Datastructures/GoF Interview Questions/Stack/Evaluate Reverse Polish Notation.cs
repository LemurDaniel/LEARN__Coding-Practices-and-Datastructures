using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Stack
{
    class Evaluate_Reverse_Polish_Notation : Testable
    {
        private class InOut : InOutBase<string, int>
        {
            public InOut(string input, int output) : base (input, output, true)
            {
                setup = Construct;
                AddSolver(EvalRPN);
            }
        }

        public Evaluate_Reverse_Polish_Notation()
        {
            testcases.Add(new InOut(" 2 1 + 3 *", 9));
            testcases.Add(new InOut(" 4 13 5 / +", 6));
            testcases.Add(new InOut(" 4 # 13 5 / +", -2));
        }




        // SOLUTION START
        // CUSTOMIZE STACK
        private class Stack : System.Collections.Generic.Stack<Object>
        {
            public V Pop<V>() => (V) base.Pop();
        }

            //
        private delegate Object Operation(Stack stack);
        private static System.Collections.Generic.IDictionary<char, Operation> operators = new System.Collections.Generic.Dictionary<char, Operation>();

        private static void Construct()
        {
            operators.Clear();
            operators.Add('+', st => st.Pop<int>() + st.Pop<int>() );
            operators.Add('-', st => -st.Pop<int>() - st.Pop<int>());
            operators.Add('/', st => (int) (1.0 / st.Pop<int>() * st.Pop<int>()) );
            operators.Add('*', st => st.Pop<int>() * st.Pop<int>());
            operators.Add('#', st => -st.Pop<int>());
        }


        private static void EvalRPN(string input, InOut.Ergebnis erg)
        {
            Stack stack = new Stack();

            char c;
            bool num = false;
            for(int i=0, number = 0, sign = 0; i<input.Length; i++)
            {
                c = input[i];
                if ((c == '-' || c == '+') && i + 1 < input.Length && char.IsDigit(input[i + 1])) sign = c == '-' ? -1 : 1;
                else if (char.IsDigit(c))
                {
                    if (sign == 0) sign = 1;
                    if (num) number = number * 10 + Helfer.GetNumber(c);
                    else number = Helfer.GetNumber(c);
                    num = true;
                }
                else    //  Not A Digit
                {
                    if(num) // Push parsed number
                    {
                        stack.Push(number * sign);
                        sign = 0;
                        num = false;
                    }
                    if (operators.Keys.Contains(c)) stack.Push(operators[c](stack));
                }
            }

            erg.Setze(stack.Pop<int>());
        }
    }
}
