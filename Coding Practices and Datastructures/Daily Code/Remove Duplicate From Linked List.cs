using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Amazon:

        Given a sorted linked list of integers, remove all the duplicate elements in the linked list so that all elements in the linked list are unique.

        Here's an example and some starter code:

        class Node:
          def __init__(self, value, next=None):
            self.value = value
            self.next = next

          def __repr__(self):
            return f"({self.value}, {self.next})"


        def remove_dup(lst):
          # Fill this in.

        lst = Node(1, Node(2, Node(2, Node(3, Node(3)))))

        remove_dup(lst)
        print(lst)
        # (1, (2, (3, None)))
        */
    class Remove_Duplicate_From_Linked_List : Testable
    {
        public class InOut : InOutBase<LinkedList<int>, LinkedList<int>>
        {
            public InOut(string s, string o) : base(LinkedList<int>.Assemble2(s), LinkedList<int>.Assemble2(o), true)
            {
                copiedInputProvider = arg => arg.Copy();
                AddSolver( (arg, erg) => erg.Setze(arg.Root.RemoveDuplicatesRecursive()), "Rekursiv" );
                AddSolver((arg, erg) => erg.Setze(arg.RemoveDuplicatesIterative()), "Iterativ");
            }
        }

        public Remove_Duplicate_From_Linked_List()
        {
            testcases.Add(new InOut("1,2,2,3,4,5,5,6,6,7,8,9", "1,2,3,4,5,6,7,8,9"));
        }
    }
}
