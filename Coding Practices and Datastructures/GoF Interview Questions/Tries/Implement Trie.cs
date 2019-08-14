using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Tries
{
    class Implement_Trie : Testable
    {

        private class Input
        {
            public readonly IList<string> inserts = new List<string>();
            public readonly IList<string> searches = new List<string>();
            public readonly IList<string> completes = new List<string>();
            public Input(string inserts, string searches, string completes)
            {
                foreach (string s in inserts.Split(',')) this.inserts.Add(s.Trim(' '));
                foreach (string s in searches.Split(',')) this.searches.Add(s.Trim(' '));
                foreach (string s in completes.Split(',')) this.completes.Add(s.Trim(' '));
            }
            public override string ToString()
            {
                string s = "\n";
                s += Helfer.Arrayausgabe<string>("Inserts: ", inserts.ToArray<string>());
                s += "\n";
                s += Helfer.Arrayausgabe<string>("Searches: ", searches.ToArray<string>());
                s += "\n";
                s += Helfer.Arrayausgabe<string>("Completes: ", completes.ToArray<string>());
                return s;
            }
        }


        private class Output
        {
            private Trie trie;
            private IList<bool> searches = new List<bool>();
            private IList<IList<string>> completes = new List<IList<string>>();
            public Output(string se, string co, Trie trie = null)
            {
                foreach (string s in se.Split(',')) searches.Add(bool.Parse(s));
                foreach (string s in co.Split(';'))
                {
                    IList<string> list = new List<string>();
                    foreach (string s2 in s.Split(',')) list.Add(s2.Trim(' '));
                    completes.Add(list);
                }
                this.trie = trie;
            }
            public Output(IList<bool> se, IList<IList<string>> co, Trie trie = null)
            {
                this.searches = se;
                this.completes = co;
                this.trie = trie;
            }

            public override bool Equals(object obj)
            {
                Output op = obj as Output;
                if (op.searches.Count != searches.Count) return false;
                for(int i=0; i<searches.Count; i++)
                {
                    if (searches[i] != op.searches[i]) return false;
                }
                if (op.completes.Count != completes.Count) return false;
                for (int i = 0; i < completes.Count; i++)
                {
                    if (op.completes[i].Count != completes[i].Count) return false;
                    for (int j = 0; j < completes[i].Count; j++)
                    {
                        if (completes[i][j] != op.completes[i][j]) return false;
                    }
                }
                return true;
            }

            public override string ToString()
            {
                string s = "\n";
                s += Helfer.Arrayausgabe<bool>("Searches: ", searches.ToArray<bool>());
                s += "\nCompletes: [ ";
                foreach (IList<string> list in completes) s += Helfer.Arrayausgabe<string>(list.ToArray<string>());
                s += " ]";
                return s;
            }
        }

        private class InOut : InOutBase<Input, Output>
        {
            public InOut(Input inp, Output outp) : base(inp, outp)
            {
                AddSolver(Solve);
            }
        }

        public Implement_Trie()
        {
            testcases.Add(new InOut(
                new Input("Wurst, Wurm, Wurzel, Wand", "Wurst, Wurm, Wan", "Wur, Wa"),
                new Output("true, true, false", "wurst, wurm, wurzel;wand")
            ));

            testcases.Add(new InOut(
                new Input("Pfanne, Topf, Herd, Tonne, Tisch, Ton, Tischler", "Topf, Pfanne, Busch", "T, To, Ha"),
                null
            ));
        }


        // SOL
        private static void Solve(Input inp, InOut.Ergebnis erg)
        {
            Trie trie = new Trie();
            foreach (string word in inp.inserts) trie.Insert(word);
            IList<bool> search = new List<bool>();
            foreach (string word in inp.searches) search.Add(trie.Search(word));
            IList<IList<string>> com = new List<IList<string>>();
            foreach (string word in inp.completes) com.Add(trie.StartsWith(word));
            erg.Setze(new Output(search, com, trie));
        }
    }
}
