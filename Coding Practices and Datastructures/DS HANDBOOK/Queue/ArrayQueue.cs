using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.DS_HANDBOOK.Queue
{
    // Implementierung einer Queue mit einem Array


    class ArrayQueue<V> : Interfaces.IQueue<V>
    {
        private static readonly int DEFAULT_SIZE = 100; // Standartgröße des Arrays

        private V[] queue = new V[DEFAULT_SIZE];
        private int eingabe = -1, ausgabe = -1;



        public void Enqueue(V data)
        {
            if (ausgabe == queue.Length - 1) throw new InvalidOperationException("Die Queue ist Voll");
            else queue[++ausgabe] = data;
        }

        public V Dequeue()
        {
            if (eingabe == ausgabe) throw new InvalidOperationException("Die Queue ist Leer");

            V data = queue[++eingabe];
            if (eingabe == ausgabe) eingabe = ausgabe = -1;
            return data;
        }

    }
}
