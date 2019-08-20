using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by AirBNB:

        Given two strings A and B of lowercase letters, return true if and only if we can swap two letters in A so that the result equals B.

        Example 1:
        Input: A = "ab", B = "ba"
        Output: true
        Example 2:

        Input: A = "ab", B = "ab"   <== is false !!!!
        Output: false

        Example 3:
        Input: A = "aa", B = "aa"
        Output: true

        Example 4:
        Input: A = "aaaaaaabc", B = "aaaaaaacb"
        Output: true

        Example 5:
        Input: A = "", B = "aa"
        Output: false
     */
    class Buddy_Strings : Testable
    {
        private class InOut : InOutBase<string[], bool>
        {
            public InOut(string s, bool b) : base(s.Split(';'), b, true)
            {
                HasMaxDur = false;
                inputStringConverter = arg => "Original: "+arg[0]+"\nBuddy?: "+arg[1];
                AddSolver(IsBuddyString);               
            }
        }
        public Buddy_Strings()
        {
            testcases.Add(new InOut("ab;ba", true));
            testcases.Add(new InOut("ab;ab", false));
            testcases.Add(new InOut("aa;aa", true));
            testcases.Add(new InOut("aaaaaaabc;aaaaaaacb", true));
            testcases.Add(new InOut(";aa", false));
        }



        private static void IsBuddyString(string[] s, InOut.Ergebnis erg) => erg.Setze(IsBuddyString(s[0], s[1]), Complexity.LINEAR, Complexity.LINEAR);
        //SOL
        private static bool IsBuddyString(string original, string buddy)
        {
            if (original.Length != buddy.Length) return false;
            int indx = -1;
            HashSet<char> chars = new HashSet<char>();
            bool doubles = false;

            for(int i=0; i<original.Length; i++)
            {
                if (original[i] == buddy[i])
                {
                    if (!chars.Contains(original[i])) chars.Add(original[i]);
                    else doubles = true;
                }
                else if (indx == -99) return false;  // <-- one swap took place => return false
                else if (indx == -1) indx = i;
                else if (original[i] != buddy[indx] || buddy[i] != original[indx]) return false;
                else indx = -99;    // <--- It marks one successfull swap
            }
            return (indx == -99) || doubles; // if one swapped true else no buddies :'-(
        }
    }
}
