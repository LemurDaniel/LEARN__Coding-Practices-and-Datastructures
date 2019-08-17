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

        public PrioArrayQueue(Priotize priotize) => this.priotize = priotize;

        public override void Enqueue(V data)
        {
            if (eingabe == ausgabe || priotize(data, queue[eingabe]) > -1)  base.Enqueue(data);
            else if(priotize(data, queue[ausgabe+1]) < 1) InsertAtIndex(data, ausgabe+1);
            else InsertAtIndex(data, BSearchLowBound(data));
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
            for (int i=index, relIndex; i<=AbsPosEingabe+1; i++)
            {
                relIndex = i % queue.Length;
                V tmp = queue[relIndex];
                queue[relIndex] = data;
                data = tmp;
            }
            eingabe++;
        }

    }
}
