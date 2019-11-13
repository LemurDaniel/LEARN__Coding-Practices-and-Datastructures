using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    public class Complexity
    {
        public class C
        {
            public readonly string complexity;
            public C(string complexity) => this.complexity = complexity;
            public override string ToString() => complexity;
        }

        // Odd or Even number,
        // Look-up table (on average)
        public static readonly C CONSTANT = new C("O(1)");
        // Finding element on sorted array with binary search
        public static readonly C LOGARITHMIC = new C("O(log n)");
        // Find max element in unsorted array,
        // Duplicate elements in array with Hash Map
        public static readonly C LINEAR = new C("O(n)");
        // Sorting elements in array with merge sort
        public static readonly C LINEARITHMIC = new C("O(n log n)");
        // Duplicate elements in array **(naïve)**,
        // Sorting array with bubble sort
        public static readonly C QUADRATIC = new C("O(n^2)");
        // 3 variables equation solver
        public static readonly C CUBIC = new C("O(n^3)");
        // Find all subsets
        public static readonly C EXPONENTIAL = new C("O(2^n)");
        // Find all permutations of a given set/string
        public static readonly C FACTORIAL = new C("O(n!)");    


        private C time;
        private C space;
        private string detail;
        public Complexity(C time, C space)
        {
            this.time = time;
            this.space = space;
        }

        public Complexity AddDetail(string detail)
        {
            this.detail = detail;
            return this;
        }

        public override string ToString() => ""+(time != null ? "---> Time: " + time + "\n" : "") + (space != null ? "---> Space: " + space : "") + (detail != null ? "\n---> "+detail:"");
    }
}
