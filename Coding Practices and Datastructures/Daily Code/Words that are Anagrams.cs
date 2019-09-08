using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by AirBNB:

        Given a list of words, group the words that are anagrams of each other. (An anagram are words made up of the same letters).

        Example:

        Input: ['abc', 'bcd', 'cba', 'cbd', 'efg']
        Output: [['abc', 'cba'], ['bcd', 'cbd'], ['efg']]

    */
    class Words_that_are_Anagrams : Testable
    {
        public class InOut : InOutBase<string[], string[][]>
        {
            public InOut(string s, string s2) : base (s.Split(','), Convert(s2), true)
            {
                outputStringConverter = arg =>
                {
                    string sasda = "Erwartet:";
                    foreach (string[] arr in arg) sasda += "\n" + Helfer.Arrayausgabe<string>(arr);
                    return sasda;
                };
                ergStringConverter = arg =>
                {
                    string sasda = "Ergebnis:";
                    foreach (string[] arr in arg) sasda += "\n" + Helfer.Arrayausgabe<string>(arr);
                    return sasda;
                };
                inputStringConverter = arg => Helfer.Arrayausgabe<string>("Eingabe:\n", arg);
                CompareOutErg = (arg, arg2) => { for (int i = 0; i < arg.Length; i++) { if (!Helfer.ArrayVergleich(arg[i], arg2[i])) return false; } return true; }; 

                AddSolver(SortWords);
                AddSolver(WithHashValue);
            }
            public static string[][] Convert(string s)
            {
                string[] bla = s.Split(';');
                string[][] inp = new string[bla.Length][];
                for (int i = 0; i < inp.Length; i++) inp[i] = bla[i].Split(',');
                return inp;
            }
        }

        public Words_that_are_Anagrams()
        {
            testcases.Add(new InOut("abc,bcd,cba,cbd,efg", "abc,cba;bcd,cbd;efg"));
        }

        //SOL
        public static void SortWords(string[] words, InOut.Ergebnis erg)
        {
            IDictionary<string, List<string>> strIndex = new Dictionary<string, List<string>>();
            for (int i = 0; i < words.Length; i++)
            {
                char[] arr = words[i].ToCharArray();
                Array.Sort(arr);
                string sorted = new String(arr);
                if (strIndex.Keys.Contains(sorted)) strIndex[sorted].Add(words[i]);
                else strIndex[sorted] = new List<string>(new string[] { words[i] });
            }

            string[][] ergArr = new String[strIndex.Count][];
            int count = 0;
            foreach (List<String> wordArr in strIndex.Values) ergArr[count++] = wordArr.ToArray<string>();


            erg.Setze(ergArr);
        }

        public static void WithHashValue(string[] words, InOut.Ergebnis erg)
        {
            IDictionary<int, List<string>> strIndex = new Dictionary<int, List<string>>();
            for (int i = 0; i < words.Length; i++)
            {
                int key = 1;
                int sec = 0;
                foreach (char c in words[i])
                {
                    key *= c;
                    sec = sec + (c % 2 == 0 ? c : -c);
                }
                key = key*sec + words[i].Length;

                if (!strIndex.ContainsKey(key)) strIndex[key] = new List<string>(new string[] { words[i] });
                else strIndex[key].Add(words[i]);
            }

            string[][] ergArr = new String[strIndex.Count][];
            int count2 = 0;
            foreach (List<String> wordArr in strIndex.Values) ergArr[count2++] = wordArr.ToArray<string>();

            erg.Setze(ergArr);
        }
    }
}
