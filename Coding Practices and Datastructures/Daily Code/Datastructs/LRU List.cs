using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code.Datastructs
{
    class LRU_HashList<K>
    {
        // ROOT <=== NODE <=== NODE <=== NODE <=== END
        private class Node
        {
            public Node next, prev;
            public int hits = 1;
            public K key;
            public Node(K key, Node next = null, Node prev = null, int hits = 1)
            {
                this.key = key;
                this.hits = hits;
                this.next = next;
                this.prev = prev;
            }
        }
        private IDictionary<K, Node> KeyNode = new Dictionary<K, Node>();
        private IDictionary<int, Node> HitsNode = new Dictionary<int, Node>();
        private Node root = null, end = null; // least recently used at end

        public void Put(K key)
        {
            if(root == null)
            {
                root = end = new Node(key);
                KeyNode.Add(key, root);
                HitsNode.Add(1, root);
                return;
            }

            if (!KeyNode.ContainsKey(key))
            {
                end = new Node(key, end);
                KeyNode.Add(key, end);
                return;
            }

            Node node = KeyNode[key];
            Node border = HitsNode[node.hits];
            node.hits++;
            InsertNode(node, border);
            if (!HitsNode.ContainsKey(node.hits)) HitsNode.Add(node.hits, node);

        }

        private void InsertNode(Node source, Node target)
        {
            Node tTempNext = target.next;
            Node sTempNext = source.next;
            Node sTempPrev = source.prev;

            target.next = source;
            source.next = tTempNext;
            source.prev = target;
            if (tTempNext != null) tTempNext.prev = source;

            if (sTempPrev != null)  sTempPrev.next = sTempNext;
            if(sTempNext != null)   sTempNext.prev = sTempPrev;

            if (source == end) end = sTempNext;
            if (source == root) root = sTempPrev;
            if (target == root) root = source;
        }

        public K RemoveKey(K key)
        {
            if (!KeyNode.ContainsKey(key)) return key;
            Node node = KeyNode[key];
            KeyNode.Remove(key);

            if(HitsNode[node.hits] == node)
            {
                if (node.prev != null && node.prev.hits == node.hits) HitsNode[node.hits] = node.prev;
                else HitsNode.Remove(node.hits);
            }

            if (node.prev != null) node.prev.next = node.next;
            if (node.next != null) node.next.prev = node.prev;

            if (node == root) root = node.prev;
            if (node == end) end = node.next;

            return key;
        }

        public K Get_LRU_Node()
        {
            if (end == null) throw new InvalidOperationException("List is empty");
            else return end.key;
        }
        public K Pop_LRU_Node() => RemoveKey(Get_LRU_Node());
   
    }
}
