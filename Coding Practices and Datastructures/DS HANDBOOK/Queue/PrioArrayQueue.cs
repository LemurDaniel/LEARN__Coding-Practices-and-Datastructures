using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.DS_HANDBOOK.Queue
{
    class PrioArrayQueue<V> : ArrayQueue<V>
    {

        public delegate int Priotize(V data, V data2); // 1 = data > data2 ;; 0 = data == data2 ;; -1 = data < data2
        private Priotize priotize = null;   // data which = 1 gets priotized

        public PrioArrayQueue(int size, Priotize priotize, bool overrideOnFull = false) : base(size, overrideOnFull) => this.priotize = priotize;
        public PrioArrayQueue(Priotize priotize) => this.priotize = priotize;

        public override void Enqueue(V data)
        {
            if (IsFull && !overrideOnFull) throw new InvalidOperationException("Die Queue ist Voll");
            if (IsFull && overrideOnFull) PopLast(data);
            else if (IsEmpty() || priotize(data, queue[LastElement]) > -1)  base.Enqueue(data);  // if empty or data >= last element of queue
            else if(priotize(data, queue[ausgabe]) < 1) InsertAtIndex(data, ausgabe);   // if data < first element of queue
            else InsertAtIndex(data, BSearchLowBound(data));
        }

        protected void PopLast(V data)
        {
            if (IsEmpty()) throw new InvalidOperationException("Queue is Empty");
            if (priotize(data, queue[LastElement]) > 0) return;
            base.PopLast();
            Enqueue(data);
        }

        private int BSearchLowBound(V data)
        {
            int current = 0, lowBound = ausgabe + 1, upBound = AbsPosEingabe;
            while(lowBound != upBound)
            {
                current = (lowBound + upBound) / 2;
                int comp = priotize(queue[current % queue.Length], data);
                if (comp > 0) upBound = current;
                else if (comp < 0) lowBound = Math.Min(current + 1, upBound);
                else return current;
            }
            return lowBound;
        }

        private void InsertAtIndex(V data, int index)
        {        
            for (int i=index, relIndex; i<=AbsPosEingabe; i++)
            {
                relIndex = i % queue.Length;
                V tmp = queue[relIndex];
                queue[relIndex] = data;
                data = tmp;
            }
            Enqueued();
        }

    }
}
