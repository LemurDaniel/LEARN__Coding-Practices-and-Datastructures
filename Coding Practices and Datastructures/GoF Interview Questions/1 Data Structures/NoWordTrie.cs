using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions
{
    class WordDictionary
    {
        private class Node
        {
            public char c;
            public IDictionary<char, Node> subnodes = new Dictionary<char, Node>();
            public Node(char c) => this.c = char.ToLower(c);

            public Node Insert(char c)
            {
                if (!char.IsLetter(c)) return this;
                c = Char.ToLower(c);
                if (!subnodes.Keys.Contains(c)) subnodes.Add(c, new Node(c));
                return subnodes[c];
            }

            public bool Search(string s)
            {
                if (s.Length == 0) return true;
                if (s[0] == '.') { foreach (Node n in subnodes.Values) if (n.Search(s.Substring(1))) return true; }
                else if (subnodes.ContainsKey(s[0])) return subnodes[s[0]].Search(s.Substring(1));
                return false;
            }

            public IList<string> Retrieve(IList<string> list, string s)
            {
                foreach (Node n in subnodes.Values) n.Retrieve(list, s+c);
                if (subnodes.Count == 0) list.Add(s+c);
                return list;
            }

        }

        private Node root = new Node(' ');

        public void AddWord(string word)
        {
            Node node = root;
            foreach (char c in word) node = node.Insert(c);
        }

        public bool SearchWord(string word) => root.Search(word.Trim(' '));

        public override string ToString() => Helfer.Arrayausgabe<string>(root.Retrieve(new List<string>(), "").ToArray<string>());

    }
}
