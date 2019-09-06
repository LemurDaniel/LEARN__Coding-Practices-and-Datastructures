using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures
{
    public class BinarySearchList<V> where V : IComparable<V>
    {
        private IList<V> list = new List<V>();
        public readonly bool ModeReverse;
        public int Count { get => list.Count; }
        public BinarySearchList(bool ModeReverse = false) => this.ModeReverse = ModeReverse;

        public V Get(int index) => list[index];
        public int Insert(V val)
        {
            if (list.Count == 0 || list[list.Count - 1].CompareTo(val) <= 0 ^ ModeReverse) { list.Add(val); return list.Count - 1; }
            else if (list[0].CompareTo(val) >= 0 ^ ModeReverse) { list.Insert(0, val); return 0; }
            else return BinaryInsert(val);
        }

        //public int InsertAt(int index, V val)
        //{
        //    if (index < 0 || index >= list.Count) throw new InvalidOperationException();
        //    if(index == 0 && )
        //}

        private int BinaryInsert(V val)
        {
            int low = 0, high = list.Count - 1, curr = high / 2;
            while (high > low)
            {
                int comp = val.CompareTo(list[curr]);
                if (comp == 0) return curr;
                else if (comp > 0 ^ ModeReverse) low = curr + 1;
                else high = curr - 1;
                curr = (high + low) / 2;
            }
            if (list[curr].CompareTo(val) > 0 ^ ModeReverse) list.Insert(curr, val);
            else list.Insert(++curr, val);
            return curr;
        }

        private int BinarySearch(V val)
        {
            int low = 0, high = list.Count - 1, curr = high / 2;
            while (high > low)
            {
                int comp = val.CompareTo(list[curr]);
                if (comp == 0) return curr;
                else if (comp > 0 ^ ModeReverse) low = curr + 1;
                else high = curr - 1;
                curr = (high + low) / 2;
            }
            return curr;
        }

        public override string ToString() => Helfer.Arrayausgabe(list.ToArray());
    }
}
