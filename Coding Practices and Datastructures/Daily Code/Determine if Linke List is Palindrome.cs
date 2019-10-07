using Coding_Practices_and_Datastructures.GoF_Interview_Questions.LinkedLists;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Determine_if_Linke_List_is_Palindrome : Palindrom_Linked_List
    {
        public new class InOut : Palindrom_Linked_List.InOut
        {
            public InOut(string s, bool b) : base(s, b)
            {
                AddSolver((arg, erg) => erg.Setze(arg.Root.IsPalindromicStackSolve((c, c1) => Char.ToLower(c) == char.ToLower(c1)), Complexity.LINEAR, Complexity.LINEAR));
                AddSolver((arg, erg) => erg.Setze(arg.Root.IsPalindromicConstantSpace(), Complexity.LINEAR, Complexity.CONSTANT));
                HasMaxDur = false;
            }
        }

        public Determine_if_Linke_List_is_Palindrome()
        {
            testcases.Add(new InOut("Radar", true));
            testcases.Add(new InOut("Radara", false));
            testcases.Add(new InOut("anna", true));
        }
    }
}
