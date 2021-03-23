using Coding_Practices_and_Datastructures.Daily_Code.Datastructs;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
        Hi, here's your problem today. This problem was recently asked by Twitter:

        Given a linked list, swap the position of the 1st and 2nd node, then swap the position of the 3rd and 4th node etc.

        Here's some starter code:

        class Node:
          def __init__(self, value, next=None):
            self.value = value
            self.next = next

          def __repr__(self):
            return f"{self.value}, ({self.next.__repr__()})"

        def swap_every_two(llist):
          # Fill this in.

        llist = Node(1, Node(2, Node(3, Node(4, Node(5)))))
        print(swap_every_two(llist))
        # 2, (1, (4, (3, (5, (None)))))

     */
    class Swap_Every_Two_Nodes_in_a_Linked_List : Testable
    {

        public class InOut : InOutBase<BasicLinkedList<int>, BasicLinkedList<int>>
        {
            public InOut(string l, string l2) : base(BasicLinkedList<int>.Assemble(l), BasicLinkedList<int>.Assemble(l2), true)
            {
                AddSolver( (arg, erg) => erg.Setze(Swap_Nodes(arg.Copy())), "Swap Nodes" );
                AddSolver((arg, erg) => erg.Setze(Swap_Values(arg.Copy())), "Swap Values" );
            }
        }

        public Swap_Every_Two_Nodes_in_a_Linked_List()
        {
            testcases.Add(new InOut("12345", "21435"));
            testcases.Add(new InOut("1234", "2143"));
            testcases.Add(new InOut("12,40,9,94,-5,8", "40,12,94,9,8,-5"));
        }

   


        public static BasicLinkedList<int> Swap_Values(BasicLinkedList<int> list)
        {
            BasicLinkedList<int>.Node first = list.Root;
            BasicLinkedList<int>.Node second = first.Next;
            int temp;

            while (first != null && second != null)
            {
                // Swap values
                temp = first.Val;
                first.Val = second.Val;
                second.Val = temp;

                //jump to next pair of nodes
                first = second.Next;
                second = first != null ? first.Next:null;
            }

            return list;
        }



        public static BasicLinkedList<int> Swap_Nodes(BasicLinkedList<int> list)
        {
            BasicLinkedList<int>.Node first = list.Root;
            BasicLinkedList<int>.Node second = first.Next;
            BasicLinkedList<int>.Node prev = null;

            if (second == null) return list;
            else list.Root = second;

            while (first != null && second != null)
            {
                // Swap Nodes
                first.Next = second.Next;
                second.Next = first;
                
                // Point previos node to second node of pair
                if (prev != null) prev.Next = second;

                //jump to next pair of nodes
                prev = first;
                first = first.Next;
                second = first != null ? first.Next : null;
            }

            if (first == null) list.Last = prev;
            else list.Last = first;

            return list;
        }
    }
}
