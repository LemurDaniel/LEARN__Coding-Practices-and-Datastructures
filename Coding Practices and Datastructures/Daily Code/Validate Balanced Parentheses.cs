using Coding_Practices_and_Datastructures.DS_HANDBOOK.Interfaces;
using Coding_Practices_and_Datastructures.DS_HANDBOOK.Stack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Uber:

    You are given a string of parenthesis. Return the minimum number of parenthesis that would need to be removed in order to make the string valid. 
    "Valid" means that each open parenthesis has a matching closed parenthesis.

    Example:

    "()())()"

    The following input should return 1.
    */
    public class Validate_Balanced_Parentheses : Testable
    {
        private class InOut : InOutBase<string, bool>
        {
            public InOut(string input, bool output) : base(input, output, true)
            {
                inputStringConverter = arg => "Eingabe: " + arg + "\nLänge: " + arg.Length;
                AddSolver(Solve1, "Solver 1");
            }
        }

        private static IDictionary<char, char> match = new Dictionary<char, char>();
        public Validate_Balanced_Parentheses() : base("--- Validate_Balanced_Parentheses ---")
        {
            testcases.Add(new InOut("((()))", true));
            testcases.Add(new InOut("[()]{}", true));
            testcases.Add(new InOut("({[)])", false));

            match.Add('(', ')');
            match.Add('{', '}');
            match.Add('[', ']');
        }

        private static void Solve1(string input, InOut.Ergebnis erg)
        {
            int count = 0;
            LLStack<char> stack = new LLStack<char>();
            for(int i=0; i< input.Length; i++)
            {
                count++;
                if (stack.Count == 0) stack.Push(input[i]);
                else if (match.Keys.Contains<char>(input[i])) stack.Push(input[i]);
                else if (match[stack.Peek()] == input[i]) stack.Pop();
                else break;
            }
            erg.Setze(stack.Count == 0, count);
        }
    }
}
