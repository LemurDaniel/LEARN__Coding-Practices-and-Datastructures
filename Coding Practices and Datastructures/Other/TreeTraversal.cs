﻿using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
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
            public readonly IBTree<int> tree;

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
                AddSolver(TraverseTreeRecursive);
                AddSolver(TraverseTreeIterative);
                AddSolver(TraverseTreeIterator);

                HasMaxDur = false;
            }
        }


        public TreeTraversal()
        {
            testcases.Add(new InOut(new Input("4;5;2;1;3", TraverseType.PreOrder), "4; 2; 1; 3; 5"));
            testcases.Add(new InOut(new Input("4;5;2;1;3", TraverseType.InOrder),"1; 2; 3; 4; 5"));
            testcases.Add(new InOut(new Input("4;5;2;1;3", TraverseType.PostOrder), "1; 3; 2; 5; 4"));
            testcases.Add(new InOut(new Input("4;5;2;1;3", TraverseType.LevelOrder), "4; 2; 5; 1; 3"));
            testcases.Add(new InOut(new Input("4;5;2;1;3", TraverseType.ZigZagLevelOrder), "4; 5; 2; 1; 3"));
            testcases.Add(new InOut(new Input("4;5;2;1;3", TraverseType.BottomUpLevelOrder), "1; 3; 2; 5; 4"));

            testcases.Add(new InOut(new Input("30;15;36;41;34;32;35;7;9", TraverseType.PreOrder), "30; 15; 7; 9; 36; 34; 32; 35; 41"));
            testcases.Add(new InOut(new Input("30;15;36;41;34;32;35;7;9", TraverseType.InOrder), "7; 9; 15; 30; 32; 34; 35; 36; 41"));
            testcases.Add(new InOut(new Input("30;15;36;41;34;32;35;7;9", TraverseType.PostOrder), "9; 7; 15; 32; 35; 34; 41; 36; 30"));
            testcases.Add(new InOut(new Input("30;15;36;41;34;32;35;7;9", TraverseType.LevelOrder), "30; 15; 36; 7; 34; 41; 9; 32; 35"));
            testcases.Add(new InOut(new Input("30;15;36;41;34;32;35;7;9", TraverseType.ZigZagLevelOrder), "30; 36; 15; 7; 34; 41; 35; 32; 9"));
            testcases.Add(new InOut(new Input("30;15;36;41;34;32;35;7;9", TraverseType.BottomUpLevelOrder), "9; 32; 35; 7; 34; 41; 15; 36; 30"));
        }


        private static void TraverseTreeRecursive(Input inp, InOut.Ergebnis erg) => erg.Setze(inp.tree.PrintRecursive(inp.traverseType));
        private static void TraverseTreeIterative(Input inp, InOut.Ergebnis erg) => erg.Setze(inp.tree.PrintIterative(inp.traverseType));

        private static void TraverseTreeIterator(Input inp, InOut.Ergebnis erg)
        {
            StringBuilder sb = new StringBuilder();
            foreach (int i in inp.tree.GetIEnumerable(inp.traverseType)) sb.Append(i+"; ");
            erg.Setze(sb.ToString().Substring(0, sb.Length-2));
        }

    }
}
