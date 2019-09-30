using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Breadth_First_Search
{
    /*
     * Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordred from top to bottom
     * *
     * 
     *          1           <------ 1
     *         / \
     *        2   3         <------ 3
     *         \   \
     *          5   4       <------ 4
     *         /    
     *        6             <------ 6
     * 
     *  return 1 3 4 6
     */

    class Binary_Tree_Right_Side_View : Testable
    {
        public class InOut : InOutBase<IBTree<int>, string> {
            public InOut(string s, string s2) : base(Helfer.AssembleBTreePreOrder(s), s2, true)
            {
                AddSolver(Queue);
                AddSolver(Stack);
                HasMaxDur = false;
            }
        }

        public Binary_Tree_Right_Side_View()
        {
            testcases.Add(new InOut("1,2,/,5,6,/,/,/,3,/,4", "1, 3, 4, 6"));
        }

        //SOL
        public static void Queue(IBTree<int> tree, InOut.Ergebnis erg) => erg.Setze(tree.RightSide_View_Queue());
        public static void Stack(IBTree<int> tree, InOut.Ergebnis erg) => erg.Setze(tree.RightSide_View_Stack());

    }
}
