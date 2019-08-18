using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.DS_HANDBOOK.Interfaces
{
    interface IQueue<V>
    {
        /*  QUEUE   --> FIFO Prinzip
          2 Basic Operations:
              -   Enqueue   (Insert/Store)
              -   Dequeue   (Delete/Access)

          AVERAGE = WORST TIME COMPLEXITY:
              -   Access      O(n)
              -   Search      O(n)
              -   Insertion   O(1)
              -   Deletion    O(1)

          SPACE COMPLEXITY:    O(n)

          TYPES:
            -   Double Ended Queues (Deque)     --> Input can be Inserted and Deleted on both Ends
                    -   Input Restricted            --> Deletion from both Ends, Insertion only from Input End
                    -   Output Restricted           --> Deletion from Output End, Insertion from both Ends
            -   Priority Queues                 --> Element with highest Priority Gets Dequeued
            -   Qircular Queue (Circular Buffer)
                    --> Has Maximum size
      */
      
        void Enqueue(V data);
        V Dequeue();

        //Additionals
        bool IsEmpty();
        void AddStringConverter(Func<V, string> converter);
    }
}
