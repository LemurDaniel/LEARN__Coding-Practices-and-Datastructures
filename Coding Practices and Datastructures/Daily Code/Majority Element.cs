using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by AirBNB:

        A majority element is an element that appears more than half the time. 
        Given a list with a majority element, find the majority element.

        Here's an example and some starting code.

        def majority_element(nums):
          # Fill this in.

        print(majority_element([3, 5, 3, 3, 2, 4, 3]))
        # 3

    */
    class Majority_Element : Testable
    {
        public class InOut : St_InOuts.TwoIntArr
        {
            public InOut(string s, int i, int count) : base(s, i+","+count, true, true)
            {
                ergStringConverter = arg => "Majority Element: " + i + "\nCount: " + count;
                outputStringConverter = arg => "Majority Element: " + i + "\nCount: " + count;                                                                 
                AddSolver(Get_Majority_Element);
            }
        }

        public Majority_Element()
        {
            testcases.Add(new InOut("2,3,3,3,3,4,5", 3, 4));
        }

        public static void Get_Majority_Element(int[] arr, InOut.Ergebnis erg)
        {
            IDictionary<int, int> count = new Dictionary<int, int>();
            int majorityElement = arr[0];
            count[arr[0]] = 1;

            for(int i=1, el=0; i<arr.Length; i++)
            {
                el = arr[i];
                if (!count.ContainsKey(el)) count[el] = 1;
                else count[el]++;

                if (count[el] > count[majorityElement]) majorityElement = el;
            }

            erg.Setze(new int[] { majorityElement, count[majorityElement] }, Complexity.LINEAR, Complexity.LINEAR);
        }
    }
}
