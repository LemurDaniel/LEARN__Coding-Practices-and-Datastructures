using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by Facebook:

        A Sudoku board is a 9x9 grid, where each row, column and each 3x3 subbox contains the number from 1-9. Here's an example of a Sudoku board.
        -------------
        |534|678|912|
        |672|195|348|
        |198|342|567|
        |------------
        |859|761|423|
        |426|853|791|
        |713|924|856|
        |------------
        |961|537|284|
        |287|419|635|
        |345|286|179|
        |------------

        Given a 9x9 board, determine if it is a valid Sudoku board. The board may be partially filled, where an empty cell will be represented by the space character ' '.

        Here's an example and some starting code:

        def validate_sudoku(board):
          # Fill this in.

        board = [
            [5, ' ', 4, 6, 7, 8, 9, 1, 2],
            [6, ' ', 2, 1, 9, 5, 3, 4, 8],
            [1,   9, 8, 3, 4, 2, 5, 6, 7],
            [8,   5, 9, 7, 6, 1, 4, 2, 3],
            [4,   2, 6, 8, 5, 3, 7, 9, 1],
            [7,   1, 3, 9, 2, 4, 8, 5, 6],
            [9,   6, 1, 5, 3, 7, 2, 8, 4],
            [2,   8, 7, 4, 1, 9, 6, 3, 5],
            [3,   4, 5, 2, 8, 6, 1, 7, 9],
        ]

        print(validate_sudoku(board))
        # True
        */
    class Sudoku_Check : Testable
    {
        public class InOut : InOutBase<Helfer.Matrix<int>, bool>
        {
            public InOut(string s, bool b) : base(Helfer.Matrix<int>.GetIntMatrix(s), b, true)
            {
                AddSolver(ValidateSudoku);
                //HasMaxDur = false;
            }
        }

        public Sudoku_Check()
        {
            testcases.Add(new InOut(
                "5,0,4,6,7,8,9,1,2|" +
                "6,0,2,1,9,5,3,4,8|" +
                "1,9,8,3,4,2,5,6,7|" +
                "8,5,9,7,6,1,4,2,3|" +
                "4,2,6,8,5,3,7,9,1|" +
                "7,1,3,9,2,4,8,5,6|" +
                "9,6,1,5,3,7,2,8,4|" +
                "2,8,7,4,1,9,6,3,5|" +
                "3,4,5,2,8,6,1,7,9", true));
            testcases.Add(new InOut(
                "5,0,4,6,7,8,9,1,2|" +
                "6,0,2,1,9,5,3,4,8|" +
                "1,9,8,3,4,2,5,6,7|" +
                "8,5,9,7,0,1,4,2,3|" +
                "4,2,6,8,5,3,7,9,1|" +
                "7,1,3,0,2,4,8,5,6|" +
                "9,6,1,5,3,7,2,8,4|" +
                "2,0,7,4,1,9,6,3,5|" +
                "3,4,5,2,8,6,0,7,9", true));
            testcases.Add(new InOut(
    "5,0,4,6,7,8,9,1,2|" +
    "6,0,2,1,9,5,3,4,0|" +
    "1,9,8,3,4,2,5,6,7|" +
    "8,5,9,7,0,1,4,2,3|" +
    "4,2,6,8,5,3,7,9,1|" +
    "7,1,3,0,2,4,8,5,6|" +
    "9,6,1,5,3,7,2,8,4|" +
    "2,0,7,4,1,9,6,3,5|" +
    "3,4,5,2,8,6,0,7,7", false));
            testcases.Add(new InOut(
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0", true));
        }

        public static void ValidateSudoku(Helfer.Matrix<int> mat, InOut.Ergebnis erg) => erg.Setze(ValidateSudoku(mat));

        public static bool ValidateSudoku(Helfer.Matrix<int> mat)
        {
            Stack<int> last = new Stack<int>();
            for(int i=0; i<mat.Length; i++)
            {
                //while (mat.GetElementAtIndex(i) > 0) if (++i >= mat.Length) return true;
                if (mat.GetElementAtIndex(i) > 0) {
                    if (Check_Index(mat, i)) continue;
                    else if (last.Count == 0) return false;
                    else i = last.Pop() - 1; //-1 Compensates for i++
                }
                else
                {
                    if (Find_fitting_value(mat, i)) last.Push(i);
                    else if (last.Count == 0) return false;
                    else i = last.Pop()-1; //-1 Compensates for i++
                    Console.WriteLine("index: " + i + "\n" + mat);
                    Console.WriteLine(Helfer.Arrayausgabe(last.ToArray()));
                }
            }
            return true;
        }

        private static bool Find_fitting_value(Helfer.Matrix<int> mat, int ind)
        {
            for(int i = Math.Max(0, Math.Abs(mat.GetElementAtIndex(ind))+1); i<=9; i++){
                mat.SetElementAtIndex(ind, -i);
                if(Check_Index(mat, ind)) return true;
            }
            mat.SetElementAtIndex(ind, 0);
            return false;
        }
        private static bool Check_Index(Helfer.Matrix<int> mat, int ind)
        {
            int num = Math.Abs(mat.GetElementAtIndex(ind));
            //Horizontal Check
            int row = ind / mat.RowNum;
            int col = ind % mat.ColNum;
            for (int i = 0; i < 9; i++) if (Math.Abs(mat.GetElementAtIndex(i + row*mat.ColNum)) == num && i + row * mat.ColNum != ind) return false;
            for (int i = 0; i < 9; i++) if (Math.Abs(mat.GetElementAtIndex(col + i*mat.ColNum)) == num && col + i * mat.ColNum != ind) return false;

            if (col >= 6) col = 6;
            else if (col >= 3) col = 3;
            else col = 0;
            if (row >= 6) row = 6;
            else if (row >= 3) row = 3;
            else row = 0;
            for (int i = 0; i < 9; i++)
            {
                int rel_ind = i + col + row * mat.ColNum;
                if (i > 5) rel_ind += 12;
                else if (i > 2) rel_ind += 6;
                if (Math.Abs(mat.GetElementAtIndex(rel_ind)) == num && rel_ind != ind) return false;
            }

            return true;
        }
    }
}
