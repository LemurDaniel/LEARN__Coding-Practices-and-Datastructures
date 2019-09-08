using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Google:

        You are given an array of tuples (start, end) representing time intervals for lectures. The intervals may be overlapping. Return the number of rooms that are required.

        For example. [(30, 75), (0, 50), (60, 150)] should return 2.
        */
    class Room_Scheduling : Testable
    {
        public class InOut : InOutBase<Schedule[], int>
        {
            public InOut(string s, int z) : base(Convert(s), z, true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe("Eingbae: ", arg);
                HasMaxDur = false;
                AddSolver(Solve);
            }
            public static Schedule[] Convert(string s)
            {
                string[] sarr = s.Split(';');
                Schedule[] arr = new Schedule[sarr.Length];
                for (int i = 0; i < arr.Length; i++) arr[i] = new Schedule( int.Parse(sarr[i].Split(',')[0].Trim(' ')), int.Parse(sarr[i].Split(',')[1].Trim(' ')));
                return arr;
            }
        }

        public Room_Scheduling()
        {
            testcases.Add(new InOut("30,75;0,50;60,150", 2));
        }

        //SOL
        public static void Solve(Schedule[] schedules, InOut.Ergebnis erg) => erg.Setze(Solve(schedules));
        public static int Solve(Schedule[] schedules)
        {
            BinarySearchList<Schedule> slist = new BinarySearchList<Schedule>();
            int count = 0;
            foreach(Schedule sc in schedules)
            {
                int pos = slist.Insert(sc);
                bool b = false;
                for (int i = pos-1; i >= 0; i--)
                {
                    if (slist.Get(i).End <= sc.Start) continue;
                    b = true;
                    break;
                }
                if (!b)
                {
                    for (int i = pos + 1; i < slist.Count; i++)
                    {
                        if (slist.Get(i).Start >= sc.End) continue;
                        b = true;
                        break;
                    }
                }
                if (b) count++;
            }
            return count;
        }




        public class Schedule : IComparable<Schedule>
        {
            public readonly int Start, End;
            public Schedule(int start, int end)
            {
                Start = start;
                End = end;
            }
            public int CompareTo(Schedule other) => Start.CompareTo(other.Start);
            public override string ToString() => string.Format("({0}, {1})", Start, End);
        }
   
    }
}
