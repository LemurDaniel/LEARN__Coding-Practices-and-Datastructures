using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Compare_Version_Numbers : Testable
    {
        /*
         * Hi, here's your problem today. This problem was recently asked by Amazon:

        Version numbers are strings that are used to identify unique states of software products. A version number is in the format a.b.c.d. and so on where a, b, etc. are numeric strings separated by dots. These generally represent a hierarchy from major to minor changes. Given two version numbers version1 and version2, conclude which is the latest version number. Your code should do the following:
        If version1 > version2 return 1.
        If version1 < version2 return -1.
        Otherwise return 0.

        Note that the numeric strings such as a, b, c, d, etc. may have leading zeroes, and that the version strings do not start or end with dots. Unspecified level revision numbers default to 0.

        Example:
        Input: 
        version1 = "1.0.33"
        version2 = "1.0.27"
        Output: 1 
        #version1 > version2

        Input:
        version1 = "0.1"
        version2 = "1.1"
        Output: -1
        #version1 < version2

        Input: 
        version1 = "1.01"
        version2 = "1.001"
        Output: 0
        #ignore leading zeroes, 01 and 001 represent the same number. 

        Input:
        version1 = "1.0"
        version2 = "1.0.0"
        Output: 0
        #version1 does not have a 3rd level revision number, which
        defaults to "0"
        */

        public class InOut : St_InOuts.Arr_Primary<string, int>
        {
            public InOut(string s, string s2, int i) : base(new string[] { s, s2 }, i, true)
            {
                AddSolver((arg, erg) => erg.Setze(Compare_VNs(arg[0], arg[1])));
            }
        }

        public Compare_Version_Numbers()
        {
            testcases.Add(new InOut("1.0.33", "1.0.27", 1));
            testcases.Add(new InOut("0.1", "1.1", -1));
            testcases.Add(new InOut("1.01", "1.001", 0));
            testcases.Add(new InOut("1.0", "1.0.0", 0));
            testcases.Add(new InOut("1", "0", 1));
        }

        public static int Compare_VNs(string v1, string v2)
        {
            string[] v1_arr = v1.Split('.');
            string[] v2_arr = v2.Split('.');
            if (v1_arr.Length != v2_arr.Length) return 0;
            for(int i=0; i<v1_arr.Length; i++)
            {
                int comp = int.Parse(v1_arr[i]).CompareTo(int.Parse(v2_arr[i]));
                if (comp != 0) return comp;
            }
            return 0;
        }
    }
}
