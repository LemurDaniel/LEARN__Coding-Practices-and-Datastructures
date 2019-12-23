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
        protected bool overrideOnFull = false;
        private bool isFull = false;
        private Func<V, string> stringConverter = s => s.ToString()+" "; 

        public ArrayQueue() => queue = new V[DEFAULT_SIZE];
        public ArrayQueue(int size, bool overrideOnFull = false)
        {
            queue = new V[Math.Max(1, size)];
            this.overrideOnFull = overrideOnFull;
        }


        public bool IsFull { get => isFull; }
        protected int AbsPosEingabe { get => eingabe >= ausgabe && !isFull ? eingabe : eingabe + queue.Length; }
        protected int LastElement { get => (AbsPosEingabe - 1) % queue.Length; }
        public bool IsEmpty() => !isFull && ausgabe == eingabe;


        protected void Enqueued()
        {
            eingabe = (eingabe + 1) % queue.Length;  //Wraps around to start of Array
            if (eingabe == ausgabe) isFull = true;
        }

        public virtual void Enqueue(V data)
        {
            if (isFull && !overrideOnFull) throw new InvalidOperationException("Die Queue ist Voll");
            else if (isFull && overrideOnFull) PopLast();
            queue[eingabe] = data;
            Enqueued();          
        }

        protected virtual V PopLast()
        {
            if (IsEmpty()) throw new Exception("Queue is Empty");
            V payload = queue[eingabe];
            eingabe = LastElement;
            isFull = false;
            return payload;
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

        public virtual V Peek()
        {
            if (IsEmpty()) throw new InvalidOperationException("Die Queue ist Leer");
            return queue[ausgabe];
        }


        public void AddStringConverter(Func<V, string> converter) => this.stringConverter = converter;
        public override string ToString()
        {
            string s = "";
            for (int i = ausgabe; i < AbsPosEingabe; i++) s += stringConverter(queue[i%queue.Length]);
            return s;
        }
    }
}
