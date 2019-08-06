using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.LinkedLists
{
    class Remove_Linked_List_Element : Testable
    {

        private class Input
        {
            public readonly char tar;
            public readonly LinkedList<char> ll;
            public Input(string s, char k)
            {
                this.tar = k;
                this.ll = LinkedList<char>.AssembleChar(s);
            }
            public Input(char k, LinkedList<char> ll)
            {
                this.tar = k;
                this.ll = ll;
            }
            public override string ToString() => "Target: " + tar + "\nLinkedList: " + ll;
            public Input Copy() => new Input(tar, ll.Copy());
            public override bool Equals(object obj) => ll.Equals(obj);
        }

        private class InOut : InOutBase<Input, LinkedList<char>>
        {
            public InOut(Input inp, string s2) : base(inp, LinkedList<char>.AssembleChar(s2), true)
            {
                inputStringConverter = null;
                AddSolver((arg, erg) => erg.Setze(arg.ll.RemoveElements(arg.tar)));
            }
        }


        public Remove_Linked_List_Element()
        {
            testcases.Add(new InOut(new Input("radar",'a'), "rdr"));
            testcases.Add(new InOut(new Input("radara", 'r'), "adaa"));
            testcases.Add(new InOut(new Input("anna", 'a'), "nn"));
        }
    }
}
