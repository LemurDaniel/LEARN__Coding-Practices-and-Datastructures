using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Two_Pointers
{
    class Valid_Palindrom : Testable
    {
        private class InOut : InOutBase<string, bool>
        {
            public InOut(string input, bool output) : base(input, output, true) => AddSolver(Vaildate);
        }

        public Valid_Palindrom()
        {
            testcases.Add(new InOut("A man, a plan, a canal: Panama", true));
            testcases.Add(new InOut("race a car", false));
            testcases.Add(new InOut("race a Ecar", true));
        }







        // SOLUTION
        private static void Vaildate(string input, InOut.Ergebnis erg)
        {
            int pointer1 = 0, pointer2 = input.Length - 1;
            while(pointer2 - pointer1 > 1)
            {
                if(Char.ToLower(input[pointer1]) != Char.ToLower(input[pointer2]))
                {
                    erg.Setze(false);
                    return;
                }
                do pointer1++; while (!Char.IsLetter(input[pointer1]));
                do pointer2--; while (!Char.IsLetter(input[pointer2]));
            }
            erg.Setze(true);
        }
    }
}
