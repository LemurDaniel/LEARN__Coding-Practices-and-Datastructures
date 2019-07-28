using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Other.Daily_Coding_Problem
{
    class Infinite_2D_Grid__Easy_ : ITestable
    {
        private class Point
        {
            int x, y;
            public Point(int x, int y)
            {
                this.x = x;
                this.y = y;
            }

            public int MoveDistance(Point p) => Math.Max( Math.Abs(p.x-x) , Math.Abs(p.y - y));
            public override string ToString() => String.Format("( {0}, {1} )", x, y);
        }

        //private Point[] directions = new Point[8];
        //public Infinite_2D_Grid__Easy_()
        //{
        //    directions[0] = new Point(1, 0);
        //    directions[1] = new Point(-1, 0);
        //    directions[2] = new Point(0, 1);
        //    directions[3] = new Point(0, -1);
        //    directions[4] = new Point(1, 1);
        //    directions[5] = new Point(-1, -1);
        //    directions[6] = new Point(1, -1);
        //    directions[7] = new Point(-1, 1);
        //}

        private Dictionary<Point[], int> inOut = new Dictionary<Point[], int>();
        public Infinite_2D_Grid__Easy_()
        {
            inOut.Add(new Point[] { new Point(0, 0), new Point(1, 1), new Point(1, 2) }, 2);
        }


        public void Test()
        {
            Console.WriteLine("-----------------------------------");
            Console.WriteLine("Infinite 2D Grid | Find Distance");

            int i = 0;
            foreach (Point[] points in inOut.Keys)
            {
                Console.WriteLine("Test: " + ++i);
                Console.WriteLine(Helfer.Arrayausgabe("Eingabe: ", points));
                Console.WriteLine();
                Console.WriteLine("Erwartet: " + inOut[points]);
                int outp = Solve(points);
                Console.WriteLine("Output: " + outp);
                Console.WriteLine("Success: " + (outp == inOut[points] ? "Success":"Failure") );
                Console.WriteLine();
            }
        }


        private int Solve(Point[] points)
        {
            int distance = 0;
            for(int i=1; i<points.Length; i++)  distance += points[i-1].MoveDistance(points[i]);
            return distance;
        }

    }
}
