using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Level_of_tree_with_Maximum_Sum : Testable
    {
        public class InOut : InOutBase<IBTree<int>, int>
        {
            public InOut(string preOrder, int i) : base(Helfer.AssembleBTreePreOrder(preOrder), i, true)
            {
                AddSolver(Solver1);
            }
        }

        public Level_of_tree_with_Maximum_Sum()
        {
            testcases.Add(new InOut("1,4,3,/,/,2,/,/,5,4,/,/,-1", 1));
        }

        public static void Solver1(IBTree<int> tree, InOut.Ergebnis erg) => erg.Setze(tree.GetLevelOfTreeSum(), Complexity.LINEAR, Complexity.LINEAR);
    }
}
