using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Coding_Practices_and_Datastructures.DS_HANDBOOK.Queue;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;

namespace Coding_Practices_and_Datastructures.Daily_Code
{

    /*
     * 
     * 
     * Hi, here's your problem today. This problem was recently asked by Uber:

        Given a linked list of integers, remove all consecutive nodes that sum up to 0.

        Example:
        Input: 10 -> 5 -> -3 -> -3 -> 1 -> 4 -> -4
        Output: 10

        The consecutive nodes 5 -> -3 -> -3 -> 1 sums up to 0 so that sequence should be removed. 
        4 -> -4 also sums up to 0 too so that sequence should also be removed.
     * 
     * 
     * 
     */
    class Remove_Consecutive_Nodes_that_Sum_to_0 : Testable
    {
 
        private class InOut : InOutBase<LinkedList<int>, LinkedList<int>>
        {
            public InOut(string s, string s2) : base(LinkedList<int>.Assemble2(s), LinkedList<int>.Assemble2(s2), true)
            {
                copiedInputProvider = arg => arg.Copy();
            }
        }

        public Remove_Consecutive_Nodes_that_Sum_to_0()
        {
            testcases.Add(new InOut("10,5,-3,-3,1,4,-4,1", "10,1"));
        }



        //SOL

        public static void Sole(LinkedList<int> ll ,InOut.Ergebnis erg)
        {
           // LinkedList<int>.Node Root = ll.Root;

            //LLQueue<int> q;
            //int sum;

        }
    }
}
