using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    // Note when 0 encountered Set entire Row and Col to Zero
    class Set_Matrix_Zeroes : Testable
    {
        private class InOut : InOutBase<Helfer.Matrix<int>, Helfer.Matrix<int>>
        {
            public InOut() : base(Helfer.Matrix<int>.GetIntMatrix(-9, 9), null, true)
            {
                inputStringConverter = arg => arg.MatrixAusgabe("",3);
                ergStringConverter = arg => arg.MatrixAusgabe("",3);
                AddSolver(SetZero_ConstantSpace);
            }
        }

        public Set_Matrix_Zeroes()
        {
            for(int i=0;i<10; i++)
            {
                testcases.Add(new InOut());
            }
        }


        //SOL

        private static void SetZero_ConstantSpace(Helfer.Matrix<int> matrix, InOut.Ergebnis erg)
        {
            int[,] mat = matrix.mat;
            for (int i = 0; i < mat.GetLength(1); i++)
            {
                for (int j = 0; j < mat.GetLength(0); j++)
                {
                    if (mat[j, i] != 0) continue;
                    mat[j, 0] = 0;
                    mat[0, i] = 0; 
                }
            }
            // Parse first row and skip first col
            for (int i = 1; i < mat.GetLength(0); i++) if (mat[i, 0] == 0) SetColZero(mat, i);
            // Parse first col
            for (int i = 0; i < mat.GetLength(1); i++) if (mat[0, i] == 0) SetRowZero(mat, i);
            erg.Setze(matrix);
        }

        private static void SetRowZero(int[,] mat, int row)
        {
            for (int j = 0; j < mat.GetLength(0); j++) mat[j, row] = 0;
        }
        private static void SetColZero(int[,] mat, int col)
        {
            for (int j = 0; j < mat.GetLength(1); j++) mat[col, j] = 0;
        }

    }
}
