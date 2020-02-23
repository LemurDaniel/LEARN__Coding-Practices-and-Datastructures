using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Apple:

        LRU cache is a cache data structure that has limited space, and once there are more items in the cache than available space, it will preempt the least recently used item. 
        What counts as recently used is any item a key has 'get' or 'put' called on it.

        Implement an LRU cache class with the 2 functions 'put' and 'get'. 'put' should place a value mapped to a certain key, and preempt items if needed. 
        'get' should return the value for a given key if it exists in the cache, and return None if it doesn't exist.

        Here's some examples and some starter code.

        class LRUCache:
          def __init__(self, space):
            # Fill this in.

          def get(self, key):
            # Fill this in.

          def put(self, key, value):
            # Fill this in.

        cache = LRUCache(2)

        cache.put(3, 3)
        cache.put(4, 4)
        print(cache.get(3))
        # 3
        print(cache.get(2))
        # None

        cache.put(2, 2)

        print(cache.get(4))
        # None (pre-empted by 2)
        print(cache.get(3))
        # 3

    */

    class LRU_Cache : Testable
    {
        public class InOut : St_InOuts.Arr_Primary<Helfer.Point, int?>
        {
            public InOut(string s, int? i) : base(Helfer.Point.GetPointArray(s), i) // (SIZE, GET), .... PUT(Key, Val)
            {
                ergStringConverter = arg => "Ergebnis: " + (arg == null ? "None" : arg+"");
                outputStringConverter = arg => "Erwartet: " + (arg == null ? "None" : arg + "");
                HasMaxDur = false;

                AddSolver(Solver1);
            }
        }

        public LRU_Cache()
        {
            testcases.Add(new InOut("2,4; 3,3; 4,4; 5,5; 5,33", null));
            testcases.Add(new InOut("2,5; 3,3; 4,4; 5,27", 27));
        }

        public static void Solver1 (Helfer.Point[] arr, InOut.Ergebnis erg)
        {
            Datastructs.ICache<int, int> cache = new Datastructs.Cache<int, int>(arr[0].X);
            for (int i = 1; i < arr.Length; i++) cache.Put(arr[i].X, arr[i].Y);

            int? val = null;
            try { val = cache.Get(arr[0].Y);  } catch { }
            erg.Setze(val, Complexity.CONSTANT, Complexity.LINEAR, "For every Single Operation");
        }
    }
}
