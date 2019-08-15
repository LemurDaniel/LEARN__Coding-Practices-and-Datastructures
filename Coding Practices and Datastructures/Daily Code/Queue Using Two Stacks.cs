using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * 
     * Hi, here's your problem today. This problem was recently asked by Apple:

        Implement a queue class using two stacks. A queue is a data structure that supports the FIFO protocol (First in = first out). 
        Your class should support the enqueue and dequeue methods like a standard queue.
     * 
     * 
     */
    class Queue_Using_Two_Stacks : Testable
    {
        private class StackQueue<V>
        {
            private Stack<V> inp = new Stack<V>();
            private Stack<V> outp = new Stack<V>();
            public V Dequeue() {
                if(outp.Count == 0) while (inp.Count > 0) outp.Push(inp.Pop());
                if (outp.Count == 0) throw new InvalidOperationException("Queue is empty");
                return outp.Pop();
            }
            public void Enqueue(V val) => inp.Push(val);
        }

        private class InOut : InOutBase<int[], string>
        {
            public InOut(string s, string s2) : base (Helfer.Assemble(s), s2, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe<int>("Eingabe: ",arg);
                AddSolver(solve);
            }
        } 


        public Queue_Using_Two_Stacks()
        {
            testcases.Add(new InOut("1,2,3,4,5,-1,-1,-1,-1,-1","1 2 3 4 5"));
        }


        //SOL
        private static void solve(int[] arr, InOut.Ergebnis erg)
        {
            StackQueue<int> q = new StackQueue<int>();
            string s = "";
            foreach(int i in arr)
            {
                if (i != -1) q.Enqueue(i);
                else s += " " + q.Dequeue();
            }
            erg.Setze(s.Trim(' '));
        }
    }
}
