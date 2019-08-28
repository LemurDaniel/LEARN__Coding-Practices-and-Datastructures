using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Coding_Practices_and_Datastructures.Other
{
    class MazeSolver : Testable
    {
        public class Point
        {
            public int X;
            public int Y;
            public Point(int X, int Y)
            {
                this.X = X;
                this.Y = Y;
            }
            public override string ToString() => string.Format("({0},{1})", X, Y);
            public override bool Equals(object obj)
            {
                Point p2 = obj as Point;
                return p2.X == X && p2.Y == Y;
            }

            public override int GetHashCode()
            {
                var hashCode = 1861411795;
                hashCode = hashCode * -1521134295 + X.GetHashCode();
                hashCode = hashCode * -1521134295 + Y.GetHashCode();
                return hashCode;
            }
        }
        private class InOut : InOutBase<Helfer.Matrix<char>, MazeSolver.Point[]>
        {
            public InOut(string s, string s2) : base(Helfer.Matrix<char>.GetCharMatrix(s, ","), GenerateArr(s2), true)
            {
                outputStringConverter = arg => Helfer.Arrayausgabe<Point>("Erwartet: ", arg);
                ergStringConverter = arg => Helfer.Arrayausgabe<Point>("Ausgabe: ", arg);
                CompareOutErg = Helfer.ArrayVergleich;
                AddSolver(SolveMaze);
                HasMaxDur = false;
            }
            private static Point[] GenerateArr(string s)
            {
                string[] arr1 = s.Split(')');
                Point[] points = new Point[arr1.Length-1];
                for (int i = 0; i < points.Length; i++)
                {
                    string[] temp = arr1[i].Split(',');
                    points[i] = new Point(int.Parse(temp[0].Substring(1)), int.Parse(temp[1]));
                }
                return points;
            }
        }

        public MazeSolver()
        {
            testcases.Add(new InOut("" +
                "P,X,P, ,P,X, |" +
                " ,X, ,X,P, ,P|" +
                " ,X,P, ,X,X, |" +
                "P, ,P,X,X,X, |" +
                " ,X, , , ,X, |" +
                " ,X, ,X, ,X, |" +
                " , , , ,X, ,P|",
                "(0,0)(0,3)(2,3)(2,2)(2,0)(4,0)(4,1)(6,1)(6,6)"));
        }


        private static void SolveMaze(Helfer.Matrix<char> mat, InOut.Ergebnis erg) => erg.Setze(SolveMaze(mat));

        //SOL
        private static Point[] SolveMaze(Helfer.Matrix<char> mat)
        {
            Point current = new Point(0, 0), prev = new Point(0, 0);

            Stack<Point> path = new Stack<Point>();
            HashSet<Point> visited = new HashSet<Point>();

            do
            {
                IList<Point> next = GetNeighbours(mat.mat, current, prev);
                if (next.Count == 1)
                {
                    if (next[0].X != prev.X + 2 && next[0].Y != prev.Y + 2 && next[0].X != prev.X - 2 && next[0].Y != prev.Y - 2)
                    {
                        visited.Add(prev);
                        path.Push(current);
                        visited.Add(next[0]);
                    }
                    prev = current;
                    current = next[0];
                    continue;
                }
                else if (next.Count > 1) path.Push(current);

                if (!visited.Contains(prev)) visited.Add(prev);
                prev = current;
                current = null;
                foreach (Point p in next)
                {
                    if (visited.Contains(p)) continue;
                    current = p;
                    break;
                }

                if (current == null)
                {
                    if (path.Count > 0) current = path.Pop();
                    else throw new Exception("No Path Possible");
                }
                else visited.Add(current);
            } while (path.Peek().X != mat.mat.GetLength(1)-1 || path.Peek().Y != mat.mat.GetLength(0)-1);
            Point[] arr = new Point[path.Count];
            for (int i = arr.Length - 1; i >= 0; i--) arr[i] = path.Pop();
            return arr;
        }

        private static IList<Point> GetNeighbours(char[,] mat, Point pos, Point prev)
        {
            List<Point> neighs = new List<Point>();
            if (pos.X > 0) neighs.Add(new Point(pos.X - 1, pos.Y));
            if (pos.X < mat.GetLength(1) - 1) neighs.Add(new Point(pos.X + 1, pos.Y));
            if (pos.Y > 0) neighs.Add(new Point(pos.X, pos.Y - 1));
            if (pos.Y < mat.GetLength(0) - 1) neighs.Add(new Point(pos.X, pos.Y + 1));

            List<Point> neighs2 = new List<Point>();
            foreach (Point p in neighs)
            {
                if (mat[p.Y, p.X] != 'X' && !p.Equals(prev)) neighs2.Add(p);
            }
            if(neighs2.Count == 0)
            {
                Console.WriteLine();
            }
            return neighs2;
        }
    }
}
