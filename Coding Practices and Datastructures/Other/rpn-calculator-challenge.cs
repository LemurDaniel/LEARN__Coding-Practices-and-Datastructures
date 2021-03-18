using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Other
{
    class rpn_calculator_challenge : Testable
    {
        private class InOut : InOutBase<string[], int>
        {
            public InOut(string desc, string calc, int output) : base(new string[] { desc, calc }, output, true)
            {
                inputStringConverter = (arg) => "Description: " + arg[0] + "\n" + "Calculation: " + arg[1];
                AddSolver(EvalRPN);
            }
        }

        public rpn_calculator_challenge()
        {
            string desc = "Basic RPN Calculation";
            string calc = "12 4 / 1 -";
            testcases.Add(new InOut(desc, calc, 2));

            desc = "Basic RPN Calculation";
            calc = "12 4 1 - /";
            testcases.Add(new InOut(desc, calc, 4));

            desc = "Basic RPN Calculation";
            calc = "15 7 1 1 + - / 3 * 2 1 1 + + -";
            testcases.Add(new InOut(desc, calc, 5));

            desc = "Save 2 to in var1, then save var1 in var2, then show value of var2";
            calc = "2 var1 =   var1 var2 =    var2 ";
            testcases.Add(new InOut(desc, calc, 2));

            desc = "Save 2 in var1, 4 in var2, then add both together";
            calc = "2 var1 =   4 var2 =   var1 var2 + ";
            testcases.Add(new InOut(desc, calc, 6));

            desc = "Save 2 in var1, var1 in var2, 4 in var2, then add var2 to var3";
            calc = "2 var1 =   var1 var2 =   4 var3 =    var2 var3 + ";
            testcases.Add(new InOut(desc, calc, 6));

            desc = "Save 2 in var1, var1 in var2, 4 in var2 \n --- Then reassign existing var1 with value 6 \n --- Finally add var2 to var3 \n --- since var2 references var1 it should use the new value of 6";
            calc = "2 var1 =   var1 var2 =   4 var3 =   6 var1 =   var2 var3 + ";
            testcases.Add(new InOut(desc, calc, 10));

            desc = "Save (2 + 4)*6 in var1 \n --- save var1 * 2 in var2 \n --- add var1 and var2";
            calc = "2 4 + 6 * var1 =    var1 2 * var2 =   var1 var2 +";
            testcases.Add(new InOut(desc, calc, 108));
        }


        // Start of Solving Here

        private static readonly Char VAR_INDICATOR = '~';
        private static readonly string operators = "+-*/:=";

        private static bool isOperator(Char c) => operators.Contains(c);
        private static int Calculate(Char opcode, int op1, int op2)
        {
            switch (opcode)
            {
                case '-': return op2 - op1;
                case '+': return op2 + op1;
                case '*': return op2 * op1;
                case '/': return op2 / op1;
                case ':': return op2 / op1;
                default:
                    throw new InvalidOperationException("Opcode: " + opcode + " not recognised");
            }
        }

        // Main Solving Method
        private static void EvalRPN(string[] inp, InOut.Ergebnis erg)
        {
            string input = inp[1];

            // Create stack and map
            Stack<string> operands = new Stack<string>();
            IDictionary<string, string> var = new Dictionary<string, string>();

            // token is either a number or a string
            string token = "";
            // determines whether token gets interpreted as a number or a variable || Only Integers
            bool flag_num = false; 
  
            // loop through inputstring
            for(int i=0; i<input.Length+1; i++)
            {
                // Make sure input always end with a whitespace without creating a new string, so that last char gets processed 
                char c = (i < input.Length ? input[i]:' ');

                if (c == VAR_INDICATOR)
                    throw new InvalidOperationException("Character '"+ VAR_INDICATOR+"' not allowed");


                bool isOpcode = isOperator(c);
                bool isDigit = Char.IsDigit(c);

                // vars can have numbers but must start with a non-numeric-value else it gets interpreted as a number
                if (token.Length == 0)
                    flag_num = isDigit;

                // determine if token ends (when token has a value ==> len > 0)
                // (isDigit && flag_num) checks if a digits ends due to a new variable
                // (isOpcode || isWhitespace) checks if token ends due to whitespace or opcode
                bool isNewToken = token.Length > 0 && (isOpcode || Char.IsWhiteSpace(c) || (!isDigit && flag_num)); 


                // Push vars and numbers
                if (isNewToken)
                {
                    if (flag_num) operands.Push(token);
                    else operands.Push(VAR_INDICATOR + token);
                    token = "";
                    continue;
                }
                // else add char to current token (as long as its not an opcode or a whitespace)
                else if (!isOpcode && !Char.IsWhiteSpace(c))
                {
                    token += c;
                    continue;
                }


                // Do actual operations
                if (c == '=')
                {
                    if (operands.Peek()[0] != VAR_INDICATOR) throw new InvalidOperationException("'" + operands.Peek() + "' is not a variable");
                    if (!var.Keys.Contains(operands.Peek())) var.Add(operands.Pop(), operands.Pop());
                    else var[operands.Pop()] = operands.Pop();
                }
                else if (isOpcode)
                {
                    while (operands.Peek()[0] == VAR_INDICATOR) operands.Push(var[operands.Pop()]);
                    int op1 = int.Parse(operands.Pop());
                    while (operands.Peek()[0] == VAR_INDICATOR) operands.Push(var[operands.Pop()]);
                    int op2 = int.Parse(operands.Pop());
                    operands.Push(Calculate(c, op1, op2) + "");
                }
            }

            while(operands.Peek()[0] == VAR_INDICATOR)  operands.Push(var[operands.Pop()]);
            erg.Setze(int.Parse(operands.Pop()));
        }
        
    }
}
