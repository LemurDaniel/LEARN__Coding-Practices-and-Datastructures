using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Facebook:

        Two words can be 'chained' if the last character of the first word is the same as the first character of the second word.

        Given a list of words, determine if there is a way to 'chain' all the words in a circle.

        Example:
        Input: ['eggs', 'karat', 'apple', 'snack', 'tuna']
        Output: True
        Explanation:
        The words in the order of ['apple', 'eggs', 'snack', 'karat', 'tuna'] creates a circle of chained words.

     */
    class Circle_of_Chained_Words : Testable
    {
        public class InOut : InOutBase<string[], bool>
        {
            public InOut(string s, bool b) : base(s.Split(','), b, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe("Eingabe: ", arg);

                AddSolver(Solver1);
            }
        }

        public Circle_of_Chained_Words()
        {
            testcases.Add(new InOut("apple,eggs,snack,karat,tuna", true));
        }

        //SOL
        /*
         * Count number of apperances of starting chars, do the same with ending chars and look if the match up
         * 
         */
        public static void Solver1(string[] words, InOut.Ergebnis erg)
        {
            int it = 0;
            erg.Setze(Solver1(words, ref it), it, Complexity.LINEAR, Complexity.LINEAR);
        }

        public static bool Solver1(string[] words, ref int it)
        {
            IDictionary<char, int> starts = new Dictionary<char, int>(), ends = new Dictionary<char, int>();
            foreach(string word in words)
            {
                it++;
                if (!starts.ContainsKey(word[0])) starts.Add(word[0], 1);
                else starts[word[0]]++;
                if (!ends.ContainsKey(word[word.Length - 1])) ends.Add(word[word.Length - 1], 1);
                else ends[word[word.Length - 1]]++;
            }

            if (starts.Count != ends.Count) return false;

            foreach(char c in starts.Keys)
            {
                it++;
                if (!ends.ContainsKey(c)) return false;
                else if (ends[c] != starts[c]) return false;
            }

            return true;
        }
    }
}
