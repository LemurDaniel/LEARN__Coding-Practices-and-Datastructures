using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code.Datastructs
{
    public interface ICache<K, V>
    {
        V Get(K key);
        void Put(K key, V value);
    }


    public class Cache<K, V> : ICache<K, V>
    {
        private readonly int MAX_SIZE = 100;

        private IDictionary<K, V> keyVal = new Dictionary<K, V>();
        private LRU_HashList<K> LRU_List = new LRU_HashList<K>();

        public Cache() { }
        public Cache(int size) => MAX_SIZE = size;


        public V Get(K key)
        {
            if (!keyVal.ContainsKey(key)) {
                Type t = typeof(V);
                if (Nullable.GetUnderlyingType(typeof(V)) != null) return default(V);
                else throw new InvalidOperationException("Value not Present in Cache");
            }

            LRU_List.Put(key);
            return keyVal[key];
        }

        public void Put(K key, V value)
        {
            if (keyVal.ContainsKey(key)) keyVal[key] = value;
            else keyVal.Add(key, value);

            if (keyVal.Count > MAX_SIZE) keyVal.Remove(LRU_List.Pop_LRU_Node());
            LRU_List.Put(key);
        }

    }
}
