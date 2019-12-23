using Coding_Practices_and_Datastructures.DS_HANDBOOK.Queue;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by LinkedIn:

        Given a list of points as a tuple (x, y) and an integer k, find the k closest points to the origin (0, 0).

        Here's an example and some starter code:

        def closest_points(points, k):
          # Fill this in.

        print(closest_points([(0, 0), (1, 2), (-3, 4), (3, 1)], 2))
        # [(1, 2), (0, 0)]
        */
    class Find_Closest_Points : Testable
    {
        public class InOut : St_InOuts.SameArr<Helfer.Point>
        {
            public InOut(string s, int k, string s2) : base(Helfer.Point.GetPointArray(s+";-999,"+k), Helfer.Point.GetPointArray(s2), true)
            {
                inputStringConverter = arg => Helfer.Arrayausgabe("Eingabe: \n", arg, false, ", ", null, null, new int[] { 0, arg.Length - 1 }) + "\nK: "+arg[arg.Length-1].Y;
                CompareOutErg = Helfer.ArrayVergleichAnyOrder;
                AddSolver(FindClosestPoints);
            }

        }

        public Find_Closest_Points()
        {
            testcases.Add(new InOut("0,0;1,2;-3,4;3,1;0,1", 2,"0,1;0,0")); //Last Point -999 and 2 is k
        }

        public static void FindClosestPoints(Helfer.Point[] points, InOut.Ergebnis erg) => FindClosestPoints(Helfer.GenerateSubArray(points, points.Length-2), points[points.Length-1].Y, erg);
        public static void FindClosestPoints(Helfer.Point[] points, int k, InOut.Ergebnis erg)
        {
            Func<Helfer.Point, int> GetDistance = p => p.X * p.X + p.Y * p.Y; // Distance to origin squared
            PrioArrayQueue<Helfer.Point> prioQ = new PrioArrayQueue<Helfer.Point>( k, (p, p2) => GetDistance(p).CompareTo(GetDistance(p2)), true );
            foreach (Helfer.Point p in points) prioQ.Enqueue(p);

            Helfer.Point[] ergArr = new Helfer.Point[k];
            for (int i = 0; i < ergArr.Length; i++) ergArr[i] = prioQ.Dequeue();
            erg.Setze(ergArr);
        }

    }
}
