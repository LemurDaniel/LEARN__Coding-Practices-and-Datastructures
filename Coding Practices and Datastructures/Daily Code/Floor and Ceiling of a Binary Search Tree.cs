using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Floor_and_Ceiling_of_a_Binary_Search_Tree : Testable
    {
        // Dia Aufgabe mach keinen Sinn ???
        private class Input
        {
            private string s;
            private BinarySearchTree<int> tree;
            public BinarySearchTree<int>.Node Root { get => tree.Root; }
            public int k;

            public Input(String s, int k)
            {
                this.s = s;
                this.k = k;
                tree = Helfer.AssembleBTree(s);
            }

            public override string ToString() => "Eingabe: " + s + "\nK: " + k;
        }

        private class Output
        {
            public Wrapper<int> m, n;
            public Output(int n, int m)
            {
                this.m = new Wrapper<int>(m);
                this.n = new Wrapper<int>(n);
            }
            public override bool Equals(object obj)
            {
                if (obj.GetType() != typeof(Output)) return false;
                Output outp = obj as Output;
                if (!m.Equals(m)) return false;
                if (!n.Equals(n)) return false;
                return true;
            }
            public override string ToString() => String.Format("Erwartet: ({0}, {1})", m, n);
            public override int GetHashCode() => base.GetHashCode();
        }

        private class InOut : InOutBase<Input, Output>{

            public InOut(Input inp, Output outp) : base(inp, outp) => AddSolver(FindCeilingFloor);
        }

        public Floor_and_Ceiling_of_a_Binary_Search_Tree()
        {
            testcases.Add(new InOut(new Input("8;4;12;2;6;10;14", 5), new Output(4, 6)));
        }


        //SOLUTION

        private static void FindCeilingFloor(Input test, InOut.Ergebnis erg)
        {
            Output outp = new Output(test.k-1 , test.k+1);
            outp.m.IsNull = !Find(test.Root, outp.m.Val);
            outp.n.IsNull = !Find(test.Root, outp.n.Val);

            erg.Setze(outp);
        }

        private static bool Find(BinarySearchTree<int>.Node root, int k)
        {
            while (root != null)
            {
                int comp = k.CompareTo(root.Val);
                if (comp == 0) return true;
                else if (comp == 1) root = root.Right;
                else root = root.Left;
            }
            return false;
        }
    }
}
