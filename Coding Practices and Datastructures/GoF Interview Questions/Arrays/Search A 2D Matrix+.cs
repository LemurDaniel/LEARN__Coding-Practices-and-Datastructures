using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    //NOTE: The Matrix is Sorted in Ascending Order !!!
    class Search_A_2D_Matrix_ : Testable
    {
        private class Pos
        {
            public readonly int x;
            public readonly int y;
            public Pos (int x, int y){
                this.x = x;
                this.y = y;
            }
            public override string ToString() => "Column: " + x + "\nRow: " + y;
            public override bool Equals(object obj)
            {
                Pos p2 = obj as Pos;
                return p2.x == x && p2.y == y;
            }
            public override int GetHashCode() => base.GetHashCode();
        }   

        private class Input
        {
            public readonly int target;
            public readonly Helfer.Matrix<int> mat;
            public Input(string s, int target)
            {
                this.target = target;
                this.mat = Helfer.Matrix<int>.GetIntMatrix(s);
            }
            public override string ToString() => "Target: " + target + "\n" + mat.MatrixAusgabe("Matrix: ", 4)+"Length: "+mat.Length+"\n";
        }
        private class InOut : InOutBase<Input, Pos>
        {
            public InOut(Input s, Pos s2) : base(s, s2)
            {
                AddSolver( (arg, erg) => BinarySearchMatrix(arg, erg), "BinarySearchMatrix");
                AddSolver((arg, erg) => BinarySearchMatrix2(arg, erg), "BinarySearchMatrix2");
            }
        }

        public Search_A_2D_Matrix_()
        {
            testcases.Add(new InOut(new Input("1,2,3,4,5|6,7,8,9,10|11,12,13,14,15|16,17,18,19,20", 2), new Pos(2, 1)));
            testcases.Add(new InOut(new Input("0,1,3,4,5|6,7,8,9,10|11,12,13,14,15|16,17,18,19,20", 2), new Pos(-1, -1)));
            testcases.Add(new InOut(new Input("1,3,5,7|10,11,16,20|23,30,34,50", 3), new Pos(2, 1)));
            testcases.Add(new InOut(new Input("1,3|5,7|10,11|16,20|23,30|34,50", 3), new Pos(2, 1)));
            testcases.Add(new InOut(new Input("1,3|5,7|10,11|16,20|23,30|34,50", 10), new Pos(1, 3)));
            testcases.Add(new InOut(new Input("1,3|5,7|10,11|16,20|23,30|34,50", 1), new Pos(1, 1)));
        }


        private static void BinarySearchMatrix(Input inp, InOut.Ergebnis erg, int iterations = 1) => erg.Setze(BinarySearchMatrix(inp.mat, inp.target, ref iterations), iterations);
        private static void BinarySearchMatrix2(Input inp, InOut.Ergebnis erg, int iterations = 1) => erg.Setze(BinarySearchMatrix(inp.mat, inp.target, ref iterations), iterations);


        /*  Encoding:   posAbs = posY * T + posX    where T > MaxValueOf(posX) => T == colCount
         *  As long as T satisfies given Criteria following is true:    
         *      -   posY = (int) posAbs / T
         *      -   posX = posA mod T
         *      
         *      // !!! T must be bigger than MaxValOf(posX) so pos X can be Encoded as the remainder of the number !!!
         *      
         *  posAbs = posY * (colCount+1) + posX         
         * 
         */
        private static Pos BinarySearchMatrix(Helfer.Matrix<int> mat, int tar, ref int iterations)
        {
            int upBound = mat.Length - 1;
            int lowBound = 0;
            int current;

            while(upBound >= lowBound)
            {
                iterations++;
                current = (upBound + lowBound) / 2;
                int element = mat.GetElementAtIndex(current);
                if (element > tar) upBound = current-1;
                else if (element < tar) lowBound = current+1;
                else return new Pos(mat.GetCol(current)+1, mat.GetRow(current)+1);  //new Pos(current % mat.GetLength(0)+1, current / mat.GetLength(1)+1); //Element equals current;
            }
           return new Pos(-1, -1);
        }

        private static Pos BinarySearchMatrix2(Helfer.Matrix<int> mat, int tar, ref int iterations, int current = 0)
        {
            if (Helfer.BinarySearch(0, mat.Length, ref current, ref iterations, (ind) => mat.GetElementAtIndex(ind).CompareTo(tar))) return new Pos(mat.GetCol(current) + 1, mat.GetRow(current) + 1);
            else return new Pos(-1, -1);
        }

    }
}
