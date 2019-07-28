using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    public class Wrapper<V>
    {
        private bool isNull;
        private V val;
        public bool IsNull { get; set; }
        public V Val { get => val; }
        public void Value(object obj)
        {
            if (obj == null) IsNull = true;
            else if (!obj.GetType().Equals(typeof(V))) IsNull = true;
            else val = (V)obj;
        }

        //KONSTRUKTOR
        public Wrapper(V val) => Value(val);

        public override string ToString() => IsNull ? "<NULL>" : val.ToString();
        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            else if (!obj.GetType().Equals(typeof(Wrapper<V>))) return false;

            Wrapper<V> w2 = (Wrapper<V>) obj;
            if (w2.IsNull && IsNull) return true;
            else if (!IsNull && !w2.IsNull) return w2.Val.Equals(val);
            else return false;
        }
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}
