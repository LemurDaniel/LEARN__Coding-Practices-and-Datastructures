using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Tries
{
    class Add_nad_Search_Word__Data_Structure_Design : Testable
    {
        private class InOut : InOutBase<string[][], bool[]>
        {
            public InOut(string s, string bools) : base(Convert(s), Helfer.AssembleBool(bools))
            {
                outputStringConverter = arg => Helfer.Arrayausgabe<bool>("Erwartet: ", arg);
                ergStringConverter = arg => Helfer.Arrayausgabe<bool>("Searches: ", arg);
                inputStringConverter = ConvertToSring;
                CompareOutErg = Helfer.ArrayVergleich<bool>;
                AddSolver(TrieSolver);
            }

            public static string[][] Convert(string s)
            {
                string[][] inp = new string[2][];
                string[] tmp = s.Split(';');
                inp[0] = tmp[0].Split(',');
                inp[1] = tmp[1].Split(',');
                return inp;
            }
            public static string ConvertToSring(string[][] sarr)
            {
                string s = Helfer.Arrayausgabe<string>("Added Words: ", sarr[0]) + "\n";
                s += Helfer.Arrayausgabe<string>("Search Words: ", sarr[1]);
                return s;
            }
        }

        public Add_nad_Search_Word__Data_Structure_Design()
        {
            testcases.Add(new InOut("bad, dad, mad; pad, bad, .ad, b..", "false, true, true, true"));
        }

        //SOL
        private static void TrieSolver(string[][] arrs, InOut.Ergebnis erg)
        {
            WordDictionary dict = new WordDictionary();
            foreach (string word in arrs[0]) dict.AddWord(word);
            bool[] arrbool = new bool[arrs[1].Length];
            for (int i = 0; i < arrbool.Length; i++) arrbool[i] = dict.SearchWord(arrs[1][i]);
            erg.Setze(arrbool);
        }
    }
}
