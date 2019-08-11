using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Spiral_Traversal_of_Grid : Testable
    {
        private class InOut : InOutBase<int[,], string>
        {
            public InOut(string s, string s2) : base(Helfer.AssembleIntMatrix(s),s2, true)
            {
                inputStringConverter = arg => Helfer.MatrixAusgabe<int>("Eingabe: ", arg, 4);
                AddSolver(SprialTraverseRecursive);
            }
        }


        public Spiral_Traversal_of_Grid()
        {
            testcases.Add(new InOut("1,2,3,4,5|6,7,8,9,10|11,12,13,14,15|16,17,18,19,20", "1 2 3 4 5 10 15 20 19 18 17 16 11 6 7 8 9 14 13 12"));
        }




        private static void SprialTraverseRecursive(int[,] mat, InOut.Ergebnis erg) => erg.Setze(SprialTraverseRecursive(mat,0,0).Trim(' '));

        //SOL
        //Prints spiral depending on starting Position
        // If x=0; y=0; prints outer most spiral
        // then calls itself starting on x=1;y=1;... recursivley
        private static string SprialTraverseRecursive(int[,] mat, int x, int y) {   
            int lenX = mat.GetLength(0) - x*2 ;            // Number of Elements to be printed in Tob and Bottom X Row
            int lenY = mat.GetLength(1) - y*2 - 2 ;        // Number of Elements to be printed in Left and Right Y Col // -2 because they are included in top and bottom row
            string s = "";
            for (int i = 0; i < lenX; i++) s += " " + mat[x+i, y];  //Topleft to Right
            for (int i = 0; i < lenY; i++) s += " " + mat[mat.GetLength(0)-x-1, y+i+1];  //Topright downwards
            for (int i = 0; i < lenX; i++) s += " " + mat[mat.GetLength(0)-i-x-1, mat.GetLength(1)-y-1];  //Botright to left
            for (int i = 0; i < lenY; i++) s += " " + mat[x, mat.GetLength(1)-i-y-2];  //Botleft upwards
            if (lenY <= 1 || lenX <= 1) return s;
            else return s + SprialTraverseRecursive(mat, x + 1, y + 1);
        }

        //Math Aproach => Map 0,1,2,3,4,5 through function to right index
    }
}
