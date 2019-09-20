using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Strings
{
    /*
     * Given an arbitrary ransom note string and another string containing letters from all the magazines,
     * write a function that will return true if the ransom not can be constructed from the magazines;
     * otherwise, it will return false
     */
    class Ransom_Note : Testable
    {
        public class InOut : InOutBase<string[], bool>
        {
            public InOut(string ransomNote, string mag, bool b) : base(new string[] { ransomNote, mag }, b, true)
            {
                inputStringConverter = arg => "RansomeNote: " + ransomNote + "\nMagazines: " + mag;

                AddSolver(HashMap_Solver);
                AddSolver(HashMap_HashSet_Solver);
                AddSolver(Array_ConstantSpace_Solver);
                AddSolver(Array_ConstantSpace_Solver_Extended_CharSet);

                HasMaxDur = false;
            }

        }

        public Ransom_Note()
        {
            //testcases.Add(new InOut("a", "b", false));
            //testcases.Add(new InOut("aa", "bb", false));
           // testcases.Add(new InOut("aa", "aab", false));
            //testcases.Add(new InOut("aab", "aazhfdhtdhthtrbdvdraeacaewettggrzjhrjrjrjrjrjjr", true));
            testcases.Add(new InOut("Gib mir 500.000 bar", "Hallo Jens, gibbts schon was neues? Meine Nummer ist +49 1050023000. Freundliche Grüße Daniel", true));
        }

        public static void HashMap_Solver(string[] arr, InOut.Ergebnis erg) => HashMap_Solver(arr, erg, 0);
        public static void HashMap_HashSet_Solver(string[] arr, InOut.Ergebnis erg) => HashMap_HashSet_Solver(arr, erg, 0);
        public static void Array_ConstantSpace_Solver(string[] arr, InOut.Ergebnis erg) => Array_ConstantSpace_Solver(arr, erg, 0);
        public static void Array_ConstantSpace_Solver_Extended_CharSet(string[] arr, InOut.Ergebnis erg) => Array_ConstantSpace_Solver_Extended_CharSet(arr, erg, 0);


        public static void HashMap_Solver(string[] arr, InOut.Ergebnis erg, int it = 0) => erg.Setze(HashMap_Solver(arr[1], arr[0], ref it), it, Complexity.LINEAR, Complexity.LINEAR);
        public static void HashMap_HashSet_Solver(string[] arr, InOut.Ergebnis erg, int it = 0) => erg.Setze(HashMap_HashSet_Solver(arr[1], arr[0], ref it), it, Complexity.LINEAR, Complexity.LINEAR);
        public static void Array_ConstantSpace_Solver(string[] arr, InOut.Ergebnis erg, int it = 0) => erg.Setze(Array_ConstantSpace_Solver(arr[1], arr[0], ref it), it, Complexity.LINEAR, Complexity.CONSTANT);
        public static void Array_ConstantSpace_Solver_Extended_CharSet(string[] arr, InOut.Ergebnis erg, int it = 0) => erg.Setze(Array_ConstantSpace_Solver_Extended_CharSet(arr[1], arr[0], ref it), it, Complexity.LINEAR, Complexity.CONSTANT);


        //SOL
        public static bool HashMap_Solver(string mag, string ransom, ref int it)
        {
            IDictionary<char, int> dict = new Dictionary<char, int>();
            foreach(char c in ransom) // save all chars with number of apperances in HashMap
            {
                it++;
                if (dict.ContainsKey(c)) dict[c]++;
                else if(c != ' ') dict.Add(c, 1);
            }

            foreach (char c in mag) // go throug all chars in magazine
            {
                it++;
                if (!dict.ContainsKey(c)) continue;
                if (--dict[c] == 0) 
                {
                    dict.Remove(c); // Remove all chars that appeared equally often in magazin
                    if (dict.Count == 0) return true; // If no chars left => SUCCESS
                }
            }
            return false;
        }

        public static bool HashMap_HashSet_Solver(string mag, string ransom, ref int it)
        {
            IDictionary<char, int> dict = new Dictionary<char, int>();
            HashSet<char> nonNullVals = new HashSet<char>();

            // Same as upp Method
            // But add and subtract in one Go
            // if nonNullVals (All chars that apeared in ransomNote, but haven't appeard enough times in mag yet) is 0 => SUCCESS

            for (int i = 0; i < mag.Length; i++, it++)
            {
                if (i < ransom.Length && ransom[i] != ' ')
                {
                    if (!dict.ContainsKey(ransom[i]))
                    {
                        dict.Add(ransom[i], 1);
                        nonNullVals.Add(ransom[i]);
                    }
                    else if (++dict[ransom[i]] == 1) nonNullVals.Add(ransom[i]);
                }
                else if (nonNullVals.Count == 0) return true;

                if (!dict.ContainsKey(mag[i])) dict.Add(mag[i], -1);
                else if (--dict[mag[i]] == 0) nonNullVals.Remove(mag[i]);
            }
            return false;
        }

        public static bool Array_ConstantSpace_Solver(string mag, string ransom, ref int it)
        {
            // A-Z: 65 - 90
            // a-z: 97 - 122
            // Access Index by (X - 'A') => ('A' - 'A' => index 0)...
            int[] arr = new int['~' - '!' + 1];
            Console.WriteLine('~' - '!' + 1);

            for (int i = 0; i < ransom.Length; i++, it++)
            {           
                if (ransom[i] != 32 && ransom[i] != 64) arr[ransom[i] - '!']++;
                if (mag[i] != 32) arr[mag[i] - '!']--;
            }
            for (int i = ransom.Length - 1; i < mag.Length; i++, it++) if (mag[i] != 32 && (mag[i] - '!') < arr.Length) arr[mag[i] - '!']--;

            for (int i = 0; i < arr.Length; i++, it++) if (arr[i] > 0) return false;
            return true;
        }

        public static bool Array_ConstantSpace_Solver_Extended_CharSet(string mag, string ransom, ref int it, char min = '!', char max = '~')
        {
            if (min >= max) throw new InvalidOperationException("Invalid Charset");
            int[] arr = new int[max - min + 1];
            Console.WriteLine(max - min + 1);
            for (int i = 0; i < ransom.Length; i++, it++)
            {
                if (ransom[i] >= min && ransom[i] <= max && ransom[i] != ' ') arr[ransom[i] - min]++;
                if (mag[i] >= min && mag[i] <= max) arr[mag[i] - min]--;
            }

            for (int i = ransom.Length - 1; i < mag.Length; i++, it++) if(mag[i] >= min && mag[i] <= max) arr[mag[i] - min]--;
   
            for (int i = 0; i < arr.Length; i++, it++) if (arr[i] > 0) return false;
            return true;
        }
    }
}
