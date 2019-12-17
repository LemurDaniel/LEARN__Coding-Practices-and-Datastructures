using Coding_Practices_and_Datastructures.DS_HANDBOOK.Queue;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Schedule_Tasks : Testable
    {
        private static char[] replace = new char[] { '/' };
        private static string[] replacement = new string[] { "idle" };
        public class Input
        {
            public readonly char[] tasks;
            public readonly int delay;
            public Input(string tasks, int delay)
            {
                this.tasks = Helfer.AssembleChar(tasks);
                this.delay = delay;
            }
            public override string ToString() => Helfer.Arrayausgabe("", tasks, false, ", ", replace, replacement) + "\nDelay: "+delay;
        }
        public class InOut : InOutBase<Input, char[]>{
            public InOut(string s, int i, string o) : base(new Input(s, i), Helfer.AssembleChar(o))
            { 
                outputStringConverter = arg => Helfer.Arrayausgabe("Erwartet: ", arg, false, ", ", replace, replacement);
                ergStringConverter = arg => Helfer.Arrayausgabe("Ausgabe: ", arg, false, ", ", replace, replacement);
                CompareOutErg = Helfer.ArrayVergleich;
                HasMaxDur = false;
                AddSolver(Scheduler);
            }
        }
        public Schedule_Tasks()
        {
            testcases.Add(new InOut("q,q,s,w,w",3, "q,s,w,/,/,q,w"));
        }

        private class Payload
        {
            public readonly char c;
            public readonly int wait;
            public Payload(char c, int wait)
            {
                this.wait = wait;
                this.c = c;
            }
        }
        public static void Scheduler(Input inp, InOut.Ergebnis erg) => Scheduler(inp.tasks, inp.delay, erg);
        public static void Scheduler(char[] tasks, int delay, InOut.Ergebnis erg)
        {
            Dictionary<char, int> lastPos = new Dictionary<char, int>();
            LinkedList<char> list = new LinkedList<char>();
            PrioArrayQueue<Payload> q = new PrioArrayQueue<Payload>((p, p2) => p.wait.CompareTo(p2.wait));
            q.AddStringConverter(p => p.c+", ");

            int time = 0;
            int count = 0;
            Wrapper<char> task = new Wrapper<char>();
            while (!q.IsEmpty() || count < tasks.Length)
            {
                task.IsNull = true;
                if (count < tasks.Length)
                {
                    task.Val = tasks[count++];
                    if (lastPos.ContainsKey(task.Val)) // Check if already encounterd
                    {
                        if (time - lastPos[task.Val] <= delay) // Check if delay time has run out; If then immideatly add to List instead of queuing // Still in Delay
                        {
                            q.Enqueue(new Payload(task.Val, time + 1 +(delay - time + lastPos[task.Val]))); // Put in Prio qeue (calculate minimum next time step)
                            lastPos[task.Val] += delay + 1; // simulate listing by adding delay time
                            continue;
                        }
                    }
                    else lastPos.Add(task.Val, 0);
                }

                if(task.IsNull) task.Val = q.Peek().wait <= time ? q.Dequeue().c : '/';
                list.AddLast(task.Val);
                if(task.Val != '/') lastPos[task.Val] = Math.Max(time, lastPos[task.Val]);
                time++;
            }

            erg.Setze(list.ToArray());
        }
    }
}
