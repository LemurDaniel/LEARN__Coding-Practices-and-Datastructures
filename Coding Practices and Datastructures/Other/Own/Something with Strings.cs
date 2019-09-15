using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Other.Own
{
    class Something_with_Strings : Testable
    {
        /*
         * Given a string, find the character, that isn't evenly distributed in the String.
         * A Character is evenly Distributed, if number of apearences is even => 2, 4, 6
         * There is only one Character, that isn't evenly distributed, find it in one pass and constant space
         */
        public class InOut : InOutBase<string, char>
        {
            public InOut(string s, char c) : base(s, c, true)
            {
                AddSolver(FindWith_XOR);
            }
        }

        public Something_with_Strings()
        {
            testcases.Add(new InOut("axbba", 'x'));
            testcases.Add(new InOut("abuIliubaccxlkillikkk", 'x'));
        }

        //SOL
        public static void FindWith_XOR(string s, InOut.Ergebnis erg)
        {
            char uneven = 'a';
            foreach (char c in s) uneven ^= Char.ToLower(c);
            erg.Setze((char)(uneven ^ 'a'), Complexity.LINEAR, Complexity.CONSTANT);
        }

    }
}
