using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures
{
    class Trie
    {
        public class Node
        {
            private char c;
            private string s;
            private IDictionary<char, Node> nodes = new Dictionary<char, Node>();
            public Node(char c) => this.c = Char.ToLower(c);
            public void Insert(string s) => Insert(s, 0);
            private void Insert(string s, int depth) {
                char nc = Char.ToLower(s[depth]);
                if(!nodes.Keys.Contains(nc)) nodes.Add(nc, new Node(nc));
                if (s.Length == depth + 1) nodes[nc].s = s;
                else nodes[nc].Insert(s, depth + 1);
            }

            public Node GetNode(char c)
            {
                c = Char.ToLower(c);
                if (nodes.Keys.Contains(c)) return nodes[c];
                else return null;
            }

            public IList<string> Retrieve(IList<string> words)
            {
                if (s != null) words.Add(s);
                foreach (Node n in nodes.Values) n.Retrieve(words);
                return words;
            }

            public bool Has(string s) => this.s == s.ToLower();
        }
        //NODE END

        private Node root;
        public Trie() => this.root = new Node(' ');


        public void Insert(string s) => root.Insert(s.Trim(' ').ToLower());
        public bool Search(string s)
        {
            Node n = root;
            foreach (char c in s.Trim(' '))
            {
                n = n.GetNode(c);
                if (n == null) return false;
            }
            return n.Has(s);
        }
        public IList<string> StartsWith(string s)
        {
            IList<string> list = new List<string>();
            Node n = root;
            foreach(char c in s.Trim(' ')) n = n?.GetNode(c);
            n?.Retrieve(list);
            return list;
        }

        public override string ToString()
        {
            string s = "[ ";
            foreach (string word in root.Retrieve(new List<string>())) s += word + ", ";
            return s.Substring(0, s.Length - 2) + "] ";
        }
    }
}
