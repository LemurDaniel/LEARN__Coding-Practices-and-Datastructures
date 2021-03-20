using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
   * 
   * Hi, here's your problem today. This problem was recently asked by Amazon:

        Given a 2d n x m matrix where each cell has a certain amount of change on the floor, 
        your goal is to start from the top left corner mat[0][0] 
        and end in the bottom right corner mat[n - 1][m - 1] with the most amount of change. 
        You can only move either left or down.

        Here's some starter code:

        def max_change(mat):
          # Fill this in.

        mat = [
            [0, 3, 0, 2],
            [1, 2, 3, 3],
            [6, 0, 3, 2]
        ]

        print(max_change(mat))
        # 13   * 
   * 
   */

    class Picking_Up_Change : Testable
    {
        public class InOut : InOutBase<Helfer.Matrix<int>, int>
        {
            public InOut(string s, int i) : base(Helfer.Matrix<int>.GetIntMatrix(s), i, true)
            {
                AddSolver(BacktrackSolver);
                AddSolver((arg, erg) => erg.Setze(max_change_recursive(arg.mat, 0, 0, arg.mat[0,0])), "Recursive Solver");
                            HasMaxDur = false;
            }

        }

        public Picking_Up_Change()
        {
            testcases.Add(new InOut(
                "0,3,0,2|" +
                "1,2,3,3|" +
                "6,0,3,2", 13));
        }
        /*
         * Der Algorithums start beim Endpunkt der Matrix m,n => m-1m n-1
         * Vom Endpunkt aus werden alle Felder beginnend von rechts nach links und dabei zeilenweise nach oben passiert.
         * Bei auftreffen jedes Feldes wird der untere und rechte Wert betrachte und der jeweils Gößere auf das jetzige Feld aufaddiert.
         * Dies simuliert das Wählen des besten Pfades. Sind alle Werte aufaddiert befindet man sich auf dem Feld n=0,m=0. 
         * Die endgültige Summe dieses Feldes entählt eine Akkumulation aller Münzen des optimalen Pfades.
         * 
         * 
         * 
         * 
         */

        public static void BacktrackSolver(Helfer.Matrix<int> matObj, InOut.Ergebnis erg)
        {
            int[,] mat = matObj.GetCopy().mat;
            for (int row = matObj.RowNum - 1; row >= 0; row--)
            {
                int right = 0;
                for (int col = matObj.ColNum - 1; col >= 0; col--)
                {
                    int down = row == matObj.RowNum - 1 ? 0 : mat[row + 1, col];
                    mat[row, col] = mat[row, col] + Math.Max(down, right);
                    right = mat[row, col];
                }
            }

            Console.WriteLine(matObj);
            erg.Setze(mat[0,0], Complexity.LINEAR, Complexity.CONSTANT);
        }

        /*
            Der Algorithmus startet bei [0,0] und ruft sich selbst rekursiv einmal auf den pfad nach unten und 
            nach rechts auf und addiert dabei den Wert den Inhalt des momentanten Feldes. Die rekursive Aufrufe machen dasselbe. 
            Ist das untere rechte Feld erreicht, endet die Rekursion und der errechnete Wert 'num' wird mit dem Wert
            im letzten Feld addiert zurückgegeben. Alle rekusiven Methodenaufrufe geben schließlich den Wert
            des Pfade, links oder unten, der größer ist zurück.
         */
        public static int max_change_recursive(int[,] mat, int row, int col, int num)
        {
            if (row == mat.GetLength(0) - 1 && col == mat.GetLength(1) - 1) return num + mat[row, col];

            int down = 0;
            int right = 0;
            if (row < mat.GetLength(0) - 1) down = max_change_recursive(mat, row + 1, col, num + mat[row, col]);
            if (col < mat.GetLength(1) - 1) right = max_change_recursive(mat, row, col + 1, num + mat[row, col]);

            return down > right ? down : right;
        }

    }
}
