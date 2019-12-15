
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Check_Sudoku_has_only_one_Solution : Sudoku_Check
    {
        public new class InOut : InOutBase<Helfer.Matrix<int>, int>
        {
            public InOut(string s, int i) : base(Helfer.Matrix<int>.GetIntMatrix(s), i, true)
            {
                AddSolver(Check_For_Mutliple_Solutions);
                //HasMaxDur = false;
                CompareOutErg = (ou, erg) =>
                {
                    if (erg > 0) erg = 1;
                    else if (erg < 0) erg = -1;
                    return ou == erg;
                };
                Func<int, string> func1 = arg =>
                {
                    if (arg > 0) return "Multiple Solutions";
                    else if (arg < 0) return "No Solution";
                    else return "Exactly One Solution";
                };
                outputStringConverter = arg => "Erwartet: " + func1(arg);
                ergStringConverter = arg => "Ausgabe: " + func1(arg);
            }
        }

        public Check_Sudoku_has_only_one_Solution()
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
                "3,4,5,2,8,6,1,7,9", 0));
            testcases.Add(new InOut(
                "5,0,4,6,7,8,9,1,2|" +
                "6,0,2,1,9,5,3,4,8|" +
                "1,9,8,3,4,2,5,6,7|" +
                "8,5,9,7,0,1,4,2,3|" +
                "4,2,6,8,5,3,7,9,1|" +
                "7,1,3,0,2,4,8,5,6|" +
                "9,6,1,5,3,7,2,8,4|" +
                "2,0,7,4,1,9,6,3,5|" +
                "3,4,5,2,8,6,0,7,9", 0));
            testcases.Add(new InOut(
    "5,0,4,6,7,8,9,1,2|" +
    "6,0,2,1,9,5,3,4,0|" +
    "1,9,8,3,4,2,5,6,7|" +
    "8,5,9,7,0,1,4,2,3|" +
    "4,2,6,8,5,3,7,9,1|" +
    "7,1,3,0,2,4,8,5,6|" +
    "9,6,1,5,3,7,2,8,4|" +
    "2,0,7,4,1,9,6,3,5|" +
    "3,4,5,2,8,6,0,7,7", -1));
            testcases.Add(new InOut(
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0|" +
    "0,0,0,0,0,0,0,0,0", 1));
        }


        public static void Check_For_Mutliple_Solutions(Helfer.Matrix<int> matrix, InOut.Ergebnis erg) => erg.Setze(Check_For_Mutliple_Solutions(matrix));

        public static int Check_For_Mutliple_Solutions(Helfer.Matrix<int> matrix)
        {
            Stack<int> last = new Stack<int>();
            if (!Sudoku_Check.ValidateSudoku(matrix, last, 0)) return -1; // Check if Valid
            Console.WriteLine("");
            Console.WriteLine("----------------------------");
            Console.WriteLine("");
            if (Sudoku_Check.ValidateSudoku(matrix, last, 0)) return 1; // double Solution
            else return 0;
        }
    }
}
