using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.DS_HANDBOOK.Queue
{
    // Implementierung einer Queue mit einer Linked List

    class LLQueue<V> : Interfaces.IQueue<V>
    {
        // Node mit Datenpaket
        private class Node
        {
            public Node next;
            public V data;
            public Node(V data) => this.data = data;
            public Node(Node next, V data)
            {
                this.next = next;
                this.data = data;
            }
        }

        // eingabe(node) <-- node <-- node <-- node <-- ausgabe(node)
        private Node eingabe, ausgabe;


        public void Enqueue(V data)
        {
            if (ausgabe == null) eingabe = ausgabe = new Node(data);
            else
            {
                Node insert = new Node(data);
                eingabe.next = insert;          // Eingabe zeigt auf eingfügtes Element
                eingabe = insert;               // Eingefügtes Element ist nun Anfang der Queue
            }
        }

        public V Dequeue()
        {
            if (ausgabe == null) throw new InvalidOperationException("Die Queue ist Leer");

            V data = ausgabe.data;
            ausgabe = ausgabe.next;
            return data;
        }

    }
}
