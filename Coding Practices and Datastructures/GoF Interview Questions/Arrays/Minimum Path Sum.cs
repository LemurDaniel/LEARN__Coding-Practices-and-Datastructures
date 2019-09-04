using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Minimum_Path_Sum : Testable
    {
        public class InOut : InOutBase<Helfer.Matrix<int>, int>
        {
            public InOut(string s, int i) : base(Helfer.Matrix<int>.GetIntMatrix(s), i, true)
            {
                copiedInputProvider = arg => Helfer.Matrix<int>.GetIntMatrix(s);
                AddSolver(TraverseMatrixFromBack);
                AddSolver(TraverseMatrixFromBack_WithoutExtraMethods);
            }
        }

        public Minimum_Path_Sum()
        {
            testcases.Add(new InOut("" +
                "1,2,5,6,4|" +
                "3,3,6,9,1|" +
                "8,7,6,5,1|" +
                "1,4,2,9,0|", 20));
        }


        /*
         * 
            Get Path with minimum Sum from topleft to bottomright:
            You can only go right or down at any given time!


            Start from bottomright - 1
            Traverse from right to left

            Collect value from node to the right and node to the left
            Save Minimum value at current node
            continue to next node
            WHEN Top Left: END

            Topleft now contains minimum path sum.



            1  2  4  5  6
            3  3  6  9  1
            8  7  6  5  1
            1  4  2  9  0
                     x

            1  2  4   5  6
            3  3  6   9  1
            8  7  6   5  1
            1  4  11  9  0
                  x

            1  2  4   5  6
            3  3  6   9  1
            8  7  6   5  1
            1  16  11  9  0
               x
         */
        public static void TraverseMatrixFromBack(Helfer.Matrix<int> mat, InOut.Ergebnis erg) => erg.Setze(TraverseMatrixFromBack(mat), Complexity.LINEAR, Complexity.CONSTANT);
        public static void TraverseMatrixFromBack_WithoutExtraMethods(Helfer.Matrix<int> mat, InOut.Ergebnis erg) => erg.Setze(TraverseMatrixFromBack_WithoutExtraMethods(mat.mat), Complexity.LINEAR, Complexity.CONSTANT);

        public static int TraverseMatrixFromBack(Helfer.Matrix<int> mat)
        {
            for(int index=mat.Length - 2; index >= 0; index--)
            {
                int botEl = mat.GetRow(index) == mat.RowNum - 1 ? int.MaxValue : mat.GetElement(mat.GetRow(index) + 1, mat.GetCol(index));      // If LAST ROW: int.Max ELSE: take bottom element
                int rightEl = mat.GetCol(index) == mat.ColNum - 1 ? int.MaxValue : mat.GetElement(mat.GetRow(index), mat.GetCol(index) + 1);    // If LAST COL: int.Max ELSE: take right element
                mat.SetElementAtIndex(index, mat.GetElementAtIndex(index)+Math.Min(botEl, rightEl)); // Add smaller accumulated element to current
                // This means it goes along the path with the smaller sum
                // The smaller sum accumulates along the path
            }

            return mat.GetElementAtIndex(0);
        }


        public static int TraverseMatrixFromBack_WithoutExtraMethods(int[,] mat)
        {
            for (int index = mat.Length - 2; index >= 0; index--)
            {
                int col = index % mat.GetLength(1);
                int row = index / mat.GetLength(1);

                int botEl = row == mat.GetLength(0) - 1 ? int.MaxValue : mat[row+1, col];      // If LAST ROW: int.Max ELSE: take bottom element
                int rightEl = col == mat.GetLength(1) - 1 ? int.MaxValue : mat[row, col+1];    // If LAST COL: int.Max ELSE: take right element
                mat[row, col] += Math.Min(botEl, rightEl); // Add smaller accumulated element to current
                // This means it goes along the path with the smaller sum
                // The smaller sum accumulates along the path
            }

            return mat[0, 0];
        }
    }
}
