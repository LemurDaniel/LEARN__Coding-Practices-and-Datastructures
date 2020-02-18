using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Amazon:

        Given a binary tree, flatten the binary tree using inorder traversal. Instead of creating a new list, reuse the nodes, where the list is represented by following each right child. 
        As such the root should always be the first element in the list so you do not need to return anything in the implementation, 
        just rearrange the nodes such that following the right child will give us the list.

        #      1
        #    /   \
        #   2     3
        #  /     /
        # 5     4

        flatten_bst(n1)
        print(n1)

        # n1 should now look like
        #   1
        #    \
        #     2
        #      \
        #       5
        #        \
        #         3
        #          \
        #           4
    */
    class Flatten_Binary_Tree : Testable
    {
        public class InOut : InOutBase<IBTree<int>, IBTree<int>>
        {
            public InOut(string s, string s2) : base(Helfer.AssembleBTreePreOrder(s), Helfer.AssembleBTreePreOrder(s2), true)
            {
                copiedInputProvider = arg => arg.CopyIt();
                HasMaxDur = false;
                AddSolver(LevelTree);
                AddSolver(Bullshit_Solution);
            }
        }


        public Flatten_Binary_Tree()
        {
            testcases.Add(new InOut("1,2,5,/,/,/,3,4", "1,/,2,/,5,/,3,/,4"));
        }

        public static void LevelTree(IBTree<int> tree, InOut.Ergebnis erg)
        {
            tree.GetRoot().LevelBTreeRecurisve();
            erg.Setze(tree);
        }

        public static void Bullshit_Solution(IBTree<int> tree, InOut.Ergebnis erg)
        {
            string[] nums = tree.SerializeIt().Split('|');
            StringBuilder newTree = new StringBuilder();
            foreach(string num in nums)
                if (!num.Equals("<NULL>")) newTree.Append("|"+num+"|<NULL>");

            tree.Clear();
            tree.DeSerializeIt(newTree.ToString().Substring(1), int.Parse);
            erg.Setze(tree);
        }
    }
}
