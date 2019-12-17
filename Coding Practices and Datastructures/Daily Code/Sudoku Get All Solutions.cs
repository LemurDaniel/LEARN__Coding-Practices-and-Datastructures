using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Sudoku_Get_All_Solutions : Sudoku_Check
    {
        private static readonly int MAX_COUNT_BEFORE_EXIT = 1_000;
        public new class InOut : InOutBase<Helfer.Matrix<int>, int>
        {
            public InOut(string s, int i) : base(Helfer.Matrix<int>.GetIntMatrix(s), i, true)
            {
                AddSolver(Print_All_Solutions);
                HasMaxDur = false;
                copiedInputProvider = arg => arg.GetCopy();
                CompareOutErg = (ou, erg) =>
                {
                    if (erg > MAX_COUNT_BEFORE_EXIT && ou > MAX_COUNT_BEFORE_EXIT) return true;
                    return ou == erg;
                };
                Func<int, string> func1 = arg =>
                {
                    if (arg > MAX_COUNT_BEFORE_EXIT) return "More than "+MAX_COUNT_BEFORE_EXIT+" Solutions";
                    else if (arg == 0) return "No Solution";
                    else return "Exactly "+arg+" Solutions";
                };
                outputStringConverter = arg => "Erwartet: " + func1(arg);
                ergStringConverter = arg => "Ausgabe: " + func1(arg);
            }
        }

        public Sudoku_Get_All_Solutions()
        {
            testcases.Clear();
            testcases.Add(new InOut(
                "5,0,4,6,7,8,9,1,2|" +
                "6,0,2,1,9,5,3,4,8|" +
                "1,9,8,3,4,2,5,6,7|" +
                "8,5,9,7,6,1,4,2,3|" +
                "4,2,6,8,5,3,7,9,1|" +
                "7,1,3,9,2,4,8,5,6|" +
                "9,6,1,5,3,7,2,8,4|" +
                "2,8,7,4,1,9,6,3,5|" +
                "3,4,5,2,8,6,1,7,9", 1));
            testcases.Add(new InOut(
                "5,0,4,6,7,8,9,1,2|" +
                "6,0,2,1,9,5,3,4,8|" +
                "1,9,8,3,4,2,5,6,7|" +
                "8,5,9,7,0,1,4,2,3|" +
                "4,2,6,8,5,3,7,9,1|" +
                "7,1,3,0,2,4,8,5,6|" +
                "9,6,1,5,3,7,2,8,4|" +
                "2,0,7,4,1,9,6,3,5|" +
                "3,4,5,2,8,6,0,7,9", 1));
            testcases.Add(new InOut(
    "5,0,4,6,7,8,9,1,2|" +
    "6,0,2,1,9,5,3,4,0|" +
    "1,9,8,3,4,2,5,6,7|" +
    "8,5,9,7,0,1,4,2,3|" +
    "4,2,6,8,5,3,7,9,1|" +
    "7,1,3,0,2,4,8,5,6|" +
    "9,6,1,5,3,7,2,8,4|" +
    "2,0,7,4,1,9,6,3,5|" +
    "3,4,5,2,8,6,0,7,7", 0));
            testcases.Add(new InOut(
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0", int.MaxValue));
        }


        public static void Print_All_Solutions(Helfer.Matrix<int> matrix, InOut.Ergebnis erg) => erg.Setze(Print_All_Solutions(matrix));

        public static int Print_All_Solutions(Helfer.Matrix<int> matrix)
        {
            Stack<int> last = new Stack<int>();
            int i = 0;
            while (Sudoku_Check.ValidateSudoku(matrix, last, -1) && i <= MAX_COUNT_BEFORE_EXIT) i++;
            return i;
        }
    }
}
