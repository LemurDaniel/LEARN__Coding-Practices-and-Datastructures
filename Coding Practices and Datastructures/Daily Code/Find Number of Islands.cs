using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by LinkedIn:

        Given a 2-dimensional grid consisting of 1's (land blocks) and 0's (water blocks), count the number of islands present in the grid. The definition of an island is as follows:
        1.) Must be surrounded by water blocks.
        2.) Consists of land blocks (1's) connected to adjacent land blocks (either vertically or horizontally). 
        Assume all edges outside of the grid are water.     
    */
    class Find_Number_of_Islands : Testable
    {
        private class InOut : InOutBase<Helfer.Matrix<int>, int>
        {
            public InOut(string s, int i) : base(Helfer.Matrix<int>.GetIntMatrix(s), i, true)
            { 
                AddSolver(FindNumIslands);
            }
        }

        public Find_Number_of_Islands()
        {
            testcases.Add(new InOut(
                "10001|" +
                "11000|"  +
                "10110|"  +
                "00000|", 3));
        }


        //SOL
        public static void FindNumIslands(Helfer.Matrix<int> mat, InOut.Ergebnis erg)
        {
            HashSet<int> pos = new HashSet<int>();
            int count = 0;
            for (int i = 0; i < mat.Length; i++)
            {
                if (pos.Contains(i)) continue;
                if (mat.GetElementAtIndex(i) == 0) continue;
                count++;
                FindAdjacent(0, mat, i, pos);
            }
            erg.Setze(count, Complexity.LINEAR, Complexity.LINEAR);
        }

        public static void FindAdjacent(int origin, Helfer.Matrix<int> mat, int index, HashSet<int> pos)
        {
            if (mat.GetElementAtIndex(index) == 0) return;
            pos.Add(index);
            int col = mat.GetCol(index);
            int row = mat.GetRow(index);
            if (origin != 3 && col > 0) FindAdjacent(1, mat, mat.EncodePos(row, col - 1), pos);
            if (origin != 4 && row > 0) FindAdjacent(2, mat, mat.EncodePos(row - 1, col), pos);
            if (origin != 1 && col < mat.mat.GetLength(1) - 1) FindAdjacent(3, mat, mat.EncodePos(row, col + 1), pos);
            if (origin != 2 && row < mat.mat.GetLength(0) - 1) FindAdjacent(4, mat, mat.EncodePos(row + 1, col), pos);
        }
    }
}
