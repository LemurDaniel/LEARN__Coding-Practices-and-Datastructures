using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Google:

        You are given a hash table where the key is a course code, and the value is a list of all the course codes that are prerequisites for the key. 
        Return a valid ordering in which we can complete the courses. 
        If no such ordering exists, return NULL.

        Example:
        {
          'CSC300': ['CSC100', 'CSC200'], 
          'CSC200': ['CSC100'], 
          'CSC100': []
        }

        This input should return the order that we need to take these courses:
         ['CSC100', 'CSC200', 'CSC300']

    */
    class Course_Prerequisites : Testable
    {
        private class InOut : InOutBase<IDictionary<string, string[]>, string[]>
        {
            public InOut(string s, string s2) : base(InOut.Convert(s), s2.Split(','), true)
            {
                inputStringConverter = InOut.InToString;
                outputStringConverter = arg => "Ausgabe:\n"+ InOut.OutToString(arg);
                ergStringConverter = arg => "Ergebnis:\n" + InOut.OutToString(arg);
                CompareOutErg = Helfer.ArrayVergleich<string>;
                AddSolver(SolverRecursive);
            }
            private static Dictionary<string, string[]> Convert(string s)
            {
                Dictionary<string, string[]> dict = new Dictionary<string, string[]>();
                string[] courses = s.Split(';');
                for(int i=0; i<courses.Length; i+=2)
                {
                    string[] pre = null;
                    if (courses[i + 1].Length != 0) pre = courses[i + 1].Split(',');
                    dict.Add(courses[i], pre);
                }
                return dict;
            }

            private static string InToString(IDictionary<string, string[]> dict)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Eingabe: \n");
                foreach(string key in dict.Keys)
                {
                    sb.Append("'" + key + "': " + OutToString(dict[key])+"\n");
                }
                return sb.ToString();
            }
            private static string OutToString(string[] sArr)
            {
                if (sArr == null) return "[]";
                string s = "[";
                foreach (string pre in sArr)
                {
                    s += "'" + pre + "', ";
                }
                return s.Substring(0, s.Length - 2) + "]";
            }

        }


        public Course_Prerequisites()
        {
            testcases.Add(new InOut("CSC300;CSC100,CSC200;CSC200;CSC100;CSC100;", "CSC100,CSC200,CSC300"));
        }





        // SOLVE
        private static void SolverRecursive(IDictionary<string, string[]> inp, InOut.Ergebnis erg)
        {
            IList<string> list = new List<string>();
            AddPreReq(inp, list, inp.Keys.ElementAt(0));
            erg.Setze(list.ToArray<string>());
        }

        private static void AddPreReq(IDictionary<string, string[]> dict, IList<string> list, string key)
        {
            if (dict[key] != null)
            {
                foreach (string pre in dict[key])
                    AddPreReq(dict, list, pre);
            }
            if (!list.Contains(key)) list.Add(key);
        }
    }
}
