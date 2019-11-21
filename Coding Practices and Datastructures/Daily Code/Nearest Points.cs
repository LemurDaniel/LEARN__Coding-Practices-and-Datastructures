using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Nearest_Points : Testable
    {
        /*
         * Hi, here's your problem today. This problem was recently asked by Apple:

            Given a list of points, an interger k, and a point p, find the k closest points to p.
         * 
         * 
         */

        public class Input
        {
            public readonly Helfer.Point p;
            public readonly int k;
            public readonly List<Helfer.Point> points = new List<Helfer.Point>();
            public Input(int k, int x, int y, string points) // "1,2;2,3"
            {
                this.k = k;
                this.p = new Helfer.Point(y, x);
                this.points = InOut.ConvertToList(points);
            }

            public override string ToString() => "Point: " + p + "\nK: " + k + "\nPoints: " + Helfer.Arrayausgabe(points.ToArray());
        }
        public class InOut : InOutBase<Input, List<Helfer.Point>>
        {
            public InOut(int k, int x, int y, string coords, String coordsOut) : base(new Input(k, x, y, coords), ConvertToList(coordsOut))
            {
                outputStringConverter = arg => Helfer.Arrayausgabe("Ausgabe: ", arg.ToArray());
                ergStringConverter = arg => Helfer.Arrayausgabe("Ergebnis: ", arg.ToArray());
                CompareOutErg = (arg, arg1) => Helfer.ArrayVergleichAnyOrder(arg.ToArray(), arg1.ToArray());
                AddSolver(Solver1);
            }
            public static List<Helfer.Point> ConvertToList(string points)
            {
                List<Helfer.Point> pList = new List<Helfer.Point>();
                string[] coords = points.Split(';');
                foreach (string coord in coords)
                {
                    string[] xandY = coord.Split(',');
                    pList.Add(new Helfer.Point(int.Parse(xandY[1]), int.Parse(xandY[0])));
                }
                return pList;
            }
        }

        public Nearest_Points()
        {
            testcases.Add(new InOut(2, 0, 2, "0,0;1,1;2,2;3,3", "0,0;1,1;2,2"));
        }

        public static void Solver1(Input inp, InOut.Ergebnis erg)
        {
            List<Helfer.Point> ergList = new List<Helfer.Point>();
            foreach(Helfer.Point point in inp.points)
            {
                int distance = 0;
                distance += Math.Max(point.X, inp.p.X) - Math.Min(inp.p.X, inp.p.X);
                distance += Math.Max(point.Y, inp.p.Y) - Math.Min(point.Y, inp.p.Y);
                if (distance == inp.k) ergList.Add(point);
            }

            erg.Setze(ergList);
        }
    }
}
