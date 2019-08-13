using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Remove_k_th_Last_Element_From_Linked_List : Testable
    {
        private class Input
        {
            public readonly int k;
            public readonly LinkedList<int> ll;
            public Input(string s, int k)
            {
                this.k = k;
                this.ll = LinkedList<int>.Assemble(s);
            }
            public Input(int k, LinkedList<int> ll)
            {
                this.k = k;
                this.ll = ll;
            }
            public override string ToString() => "K: " + k + "\nLinkedList: " + ll;
            public Input Copy() => new Input(k, ll.Copy());
            public override bool Equals(object obj) => ll.Equals(obj);
            public override int GetHashCode() => base.GetHashCode();
        }
        private class InOut : InOutBase<Input, LinkedList<int>>
        {
            public InOut(Input inp, string s) : base(inp, LinkedList<int>.Assemble(s), true)
            {
                copiedInputProvider = arg => arg.Copy();
                inputStringConverter = null;
                AddSolver( (arg, erg) => erg.Setze(arg.ll.Remove_Kth_Element(arg.k)) );
            }
        }


        public Remove_k_th_Last_Element_From_Linked_List()
        {
            testcases.Add(new InOut(new Input("12345", 3), "1245"));
        }
    }
}
