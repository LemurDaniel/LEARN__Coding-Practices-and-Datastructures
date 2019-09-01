using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Word_Ordering_in_a_Different_Alphabetical_Order : Testable
    {
        private class Input
        {
            public readonly string[] words;
            public readonly string order = "zyxwvutsrqponmlkjihgfedcba";
            public Input(string words, string order = null){
                this.words = words.Split(',');
                this.order = order ?? this.order;
            }
            public override string ToString() => Helfer.Arrayausgabe<string>(words) + "\nOrder: " + order;
        }

        private class InOut : InOutBase<Input, bool>
        {
            public InOut(Input inp, bool outp) : base(inp, outp, true)
            {
                HasMaxDur = false;
                AddSolver((arg, erg) => erg.Setze(IsOrdered(arg.words, arg.order)), "IsOrdered");
                AddSolver((arg, erg) => erg.Setze(IsOrderedRecursiv(arg.words, arg.order)), "IsOrderedRekursiv");
            }
        }

        public Word_Ordering_in_a_Different_Alphabetical_Order()
        {
            testcases.Add(new InOut(new Input("abcd,efgh"), false));
            testcases.Add(new InOut(new Input("zyx,zyxw,zyxwy"), true));
            testcases.Add(new InOut(new Input("Hans,Kranz,Hand"), false));
            testcases.Add(new InOut(new Input("Ader,Adler,Apfel,Hang,Klang,Krach,Krank,Mund,Rand,Rang", "abcdefghijklmnopqrstuvwxyz"), true));
        }



        //SOL
        public static bool IsOrdered(string[] words, string order)
        {
            IDictionary<char, int> orderPriority = new Dictionary<char, int>();
            Queue<List<int>> lefToCheck = new Queue<List<int>>();
            lefToCheck.Enqueue(new List<int>());
            lefToCheck.Enqueue(null);

            for (int i = 0; i < order.Length; i++) orderPriority.Add(Char.ToLower(order[i]), i);
            for (int i = 0; i < words.Length; i++) lefToCheck.Peek().Add(i);

            int depth = 0;
            while(true)
            {
                List<int> left = lefToCheck.Dequeue();
                List<int> nextleft = new List<int>();
                for (int i=0, comp; i<left.Count-1; i++) {
                    string word1 = words[left[i]], word2 = words[left[i+1]];
                    if (word1.Length < word2.Length && depth > word1.Length - 1) continue;
                    if (word2.Length < word1.Length && depth > word2.Length - 1) return false;
                    comp = orderPriority[Char.ToLower(words[left[i]][depth])].CompareTo(orderPriority[Char.ToLower(words[left[i + 1]][depth])]);
                    if (comp == 0)
                    {
                        nextleft.Add(left[i]);
                        if(i==left.Count-2) nextleft.Add(left[i+1]);
                    }
                    else if (comp > 0) return false;  //found out of order
                }
                if (nextleft.Count > 0) lefToCheck.Enqueue(nextleft);
                if(lefToCheck.Peek() == null)
                {
                    if (lefToCheck.Count == 1) return true;
                    depth++;
                    lefToCheck.Enqueue(lefToCheck.Dequeue());
                }
            }
        }


        public static bool IsOrderedRecursiv(string[] words, string order)
        {
            IDictionary<char, int> orderPriority = new Dictionary<char, int>();
            for (int i = 0; i < order.Length; i++) orderPriority.Add(Char.ToLower(order[i]), i);

            for (int i = 0; i < words.Length - 1; i++) if (!CheckTwoWords(words[i], words[i + 1], orderPriority)) return false;
            return true;
        }

        public static bool CheckTwoWords(string word1, string word2, IDictionary<char, int> order)
        {
            int depth = 0, comp;
            while (true)
            {
                if (word1.Length == word2.Length && depth > word1.Length - 1) return true;
                if (word1.Length < word2.Length && depth > word1.Length - 1) return true;
                if (word2.Length < word1.Length && depth > word2.Length - 1) return false;  //if same shorter one should be first
                comp = order[Char.ToLower(word2[depth])].CompareTo(order[Char.ToLower(word1[depth])]);
                if (comp == 0) depth++;
                else if (comp > 0) return true;  //found out of order
                else return false;
            }
        }
    }
}
