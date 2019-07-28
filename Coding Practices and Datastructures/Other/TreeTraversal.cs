using GoF_Coding_Interview_Algos.Daily_Code;
using GoF_Coding_Interview_Algos.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Other
{
    class TreeTraversal : Testable
    {

        private class Input{
            public readonly TraverseType traverseType;
            public readonly BinaryTree<int> tree;

            public Input(string s, TraverseType traverseType)
            {
                tree = Helfer.AssembleBTree(s);
                this.traverseType = traverseType;
            }

            public override string ToString() => "BinaryTree: " + tree.ToString() + "\nTraverseTyp: " + traverseType.ToString();
        }   

        private class InOut : InOutBase<Input, string>
        {
            public InOut(Input inp, string output) : base (inp, output, true)
            {
                inputStringConverter = null;
                AddSolver(TraverseTree);
            }
        }


        public TreeTraversal()
        {
            testcases.Add(new InOut(new Input("4;5;2;1;3", TraverseType.InOrder),"1; 2; 3; 4; 5"));
            testcases.Add(new InOut(new Input("4;5;2;1;3", TraverseType.PreOrder), "4; 2; 1; 3; 5"));
            testcases.Add(new InOut(new Input("4;5;2;1;3", TraverseType.PostOrder), "1; 3; 2; 5; 4"));
            testcases.Add(new InOut(new Input("4;5;2;1;3", TraverseType.LevelOrder), "4; 2; 5; 1; 3"));

            testcases.Add(new InOut(new Input("30;15;36;41;34;32;35;7;9", TraverseType.PreOrder), "30; 15; 7; 9; 36; 34; 32; 35; 41"));
            testcases.Add(new InOut(new Input("30;15;36;41;34;32;35;7;9", TraverseType.InOrder), "7; 9; 15; 30; 32; 34; 35; 36; 41"));
            testcases.Add(new InOut(new Input("30;15;36;41;34;32;35;7;9", TraverseType.PostOrder), "9; 7; 15; 32; 35; 34; 41; 36; 30"));
            testcases.Add(new InOut(new Input("30;15;36;41;34;32;35;7;9", TraverseType.LevelOrder), "30; 15; 36; 7; 34; 41; 9; 32; 35"));
        }


        private static void TraverseTree(Input inp, InOut.Ergebnis erg) => erg.Setze(inp.tree.PrintInOrder(inp.traverseType));

    }
}
