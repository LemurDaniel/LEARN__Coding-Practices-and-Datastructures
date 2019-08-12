using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    class Word_Search : Testable
    {
        /*
         * 
         * 
         * Hi, here's your problem today. This problem was recently asked by Amazon:
         * 
         * You are given a 2D array of characters, and a target string. 
         * Return whether or not the word target word exists in the matrix. 
         * Unlike a standard word search, the word must be either going left-to-right, or top-to-bottom in the matrix.
         * 
         * 
         * 
         * 
         * 
         */
        private class Input
        {
            public readonly string word;
            public readonly char[,] matrix;

            public Input(string s, string w)
            {
                word = s;
                matrix = Helfer.Matrix<char>.AssembleCharMatrix(w);
            }

            public override string ToString() => "Wort: " + word + "\n" + Helfer.Matrix<char>.MatrixAusgabe("Matrix: ", matrix);
        }

        private class InOut : InOutBase<Input, bool>
        {
            public InOut(Input inp, bool oup) : base(inp, oup, true)
            {
                inputStringConverter = null;
                AddSolver(Word_search);
            }
        }


        public Word_Search(){

            testcases.Add(new InOut(new Input("FOAM", "FOAM|OBQP|ANOP|MASS"), true));
            testcases.Add(new InOut(new Input("FOAM", "FACI|OBQP|ANOP|MASS"),true));
        }








        // SOL
        private static void Word_search(Input inp, InOut.Ergebnis erg) => erg.Setze(Word_search(inp));
        private static bool Word_search(Input inp)
        {
            char[,] mat = inp.matrix;
            string word = inp.word;
            for(int i=0; i<mat.GetLength(0); i++)
            {
                for (int j = 0; j < mat.GetLength(1); j++)
                {
                    if (mat[i, j] != word[0]) continue;
                    int j2 = j;
                    int i2 = i;

                    // Search row
                    int count = 1;
                    while (++j < mat.GetLength(1) && count <= word.Length)
                        if (mat[i, j] != word[count++]) break;
                    if (count == word.Length) return true;

                    // Search Col
                    count = 1;
                    while (++i2 < mat.GetLength(0) && count <= word.Length)
                        if (mat[i2, j2] != word[count++]) break;
                    if (count == word.Length) return true;
                }
            }
            return false;
        }
    }

}
