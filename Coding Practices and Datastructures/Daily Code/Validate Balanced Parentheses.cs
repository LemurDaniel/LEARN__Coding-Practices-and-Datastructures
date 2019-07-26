﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoF_Coding_Interview_Algos.Daily_Code
{
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
            Stack<char> stack = new Stack<char>();
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
