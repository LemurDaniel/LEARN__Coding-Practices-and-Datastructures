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

        protected V[] queue;
        protected int eingabe = 0, ausgabe = 0;
        private bool isFull = false;

        public ArrayQueue() => queue = new V[DEFAULT_SIZE];
        public ArrayQueue(int size) => queue = new V[Math.Max(1, size)];


        public bool IsFull { get => isFull; }
        protected int AbsPosEingabe { get => eingabe >= ausgabe && !isFull ? eingabe : eingabe + queue.Length; }
        public bool IsEmpty() => !isFull && ausgabe == eingabe;


        protected void Enqueued()
        {
            eingabe = (eingabe + 1) % queue.Length;  //Wraps around to start of Array
            if (eingabe == ausgabe) isFull = true;
        }

        public virtual void Enqueue(V data)
        {
            if (isFull) throw new InvalidOperationException("Die Queue ist Voll");   
            queue[eingabe] = data;
            Enqueued();          
        }

        public virtual V Dequeue()
        {
            if (IsEmpty()) throw new InvalidOperationException("Die Queue ist Leer");
            V data = queue[ausgabe];
            ausgabe = (ausgabe + 1) % queue.Length; //Wraps around to start of Array
            isFull = false;
            if (eingabe == ausgabe) eingabe = ausgabe = 0;
            return data;
        }




        public override string ToString()
        {
            string s = "";
            for (int i = ausgabe; i < AbsPosEingabe; i++) s += queue[i%queue.Length]+" ";
            return s;
        }
    }
}
