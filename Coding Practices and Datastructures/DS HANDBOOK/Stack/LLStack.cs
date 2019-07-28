using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.DS_HANDBOOK.Stack
{
    // Implementierung eines Stacks mit einer LinkedList


    class LLStack<V> : Interfaces.IStack<V>
    {
        // Node mit Datenpaket
        private class Node
        {
            public Node next;
            public V data;
            public Node (Node next, V data)
            {
                this.next = next;
                this.data = data;
            }
        }


        private Node top;   // Pointer zum Ersten Element des Stacks

        /* KONSTRUKTOR */


        /* METHODEN */
        public V Pop() => Pop(true);
        public V Peek() => Pop(false);
        public void Push(V data) => top = new Node(top, data);   // Neue Node als Top-Element, die auf das vorherige Top-Element zeigt 


        private V Pop(bool pop)
        {
            if (top == null) throw new InvalidOperationException("Der Stack ist Leer");

            V data = top.data;
            if(pop) top = top.next;     
            return data;  
        }
    }
}
