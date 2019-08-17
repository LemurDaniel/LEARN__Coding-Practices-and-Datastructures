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

        protected V[] queue = new V[DEFAULT_SIZE];
        protected int eingabe = -1, ausgabe = -1;
        protected int AbsPosEingabe { get => eingabe >= ausgabe ? eingabe : eingabe + queue.Length; }

        public ArrayQueue() { }
        public ArrayQueue(int size) => queue = new V[size];

        public virtual void Enqueue(V data)
        {
            if (eingabe == ausgabe-1) throw new InvalidOperationException("Die Queue ist Voll");    //Wenn eingabe direkt hinter ausgabe => Note this queue wraps at the end of the Array back to the begining
            eingabe = (eingabe + 1) % queue.Length; //Wraps around to start of Array
            queue[eingabe] = data;
        }

        public virtual V Dequeue()
        {
            if (eingabe == ausgabe) throw new InvalidOperationException("Die Queue ist Leer");

            ausgabe = (ausgabe + 1) % queue.Length; // Wraps back around
            V data = queue[ausgabe];
            if (eingabe == ausgabe) eingabe = ausgabe = -1;
            return data;
        }

        public bool IsEmpty() => eingabe == ausgabe;



        public override string ToString()
        {
            string s = "";
            for (int i = ausgabe+1; i < AbsPosEingabe + 1; i++) s += queue[i%queue.Length]+" ";
            return s;
        }
    }
}
