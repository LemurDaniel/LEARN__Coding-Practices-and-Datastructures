using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Breadth_First_Search
{
    class Symmetric_Tree : Testable
    {
        private class InOut : InOutBase<IBTree<int>, bool>
        {
            public InOut(string s, bool b) : base(Helfer.AssembleBTree(s, new BinaryCompleteTree<int>()), b, true)
            {
                inputStringConverter = arg => arg.PrintIterative(TraverseType.LevelOrder);
                AddSolver((arg, erg) => erg.Setze(arg.IsMirrorIt()), "Iterative");
                AddSolver((arg, erg) => erg.Setze(arg.IsMirrorRecurse()), "Recursive");
            }
        }

        public Symmetric_Tree()
        {
            testcases.Add(new InOut("1,2,2,3,4,4,3", true));
            testcases.Add(new InOut("1,2,2,4,4,3,3", false));
            testcases.Add(new InOut("1", true));
            testcases.Add(new InOut("", true));
        }
    }
}
