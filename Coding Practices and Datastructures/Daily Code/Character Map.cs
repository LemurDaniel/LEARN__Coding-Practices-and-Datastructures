using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Character_Map : Testable
    {
        public class InOut : St_InOuts.Arr_Primary<string, bool>
        {
            public InOut(string s, string s2, bool b) : base(new string[] { s, s2 }, b, true)
            {
                AddSolver( (arg, erg) => erg.Setze(Solve1(arg[0], arg[1]) ), "Solver1" );
            }
        }

        public Character_Map()
        {
            testcases.Add(new InOut("abc", "def",true));
            testcases.Add(new InOut("aac", "def", false));
        }

        public static bool Solve1(string s, string s2)
        {
            IDictionary<char, char> dict = new Dictionary<char, char>();
            IDictionary<char, char> dictInverse = new Dictionary<char, char>();

            string longer = s.Length >= s2.Length ? s : s2;
            string shorter = longer == s ? s2 : s;
            for(int i=0; i<shorter.Length; i++)
            {
                if (!dict.ContainsKey(shorter[i])) dict.Add(shorter[i], longer[i]);
                else if (dict[shorter[i]] != longer[i]) return false;

                if (!dict.ContainsKey(longer[i])) dict.Add(longer[i], shorter[i]);
                else if (dict[longer[i]] != shorter[i]) return false;
            }
            return true;
        }
    }
}
