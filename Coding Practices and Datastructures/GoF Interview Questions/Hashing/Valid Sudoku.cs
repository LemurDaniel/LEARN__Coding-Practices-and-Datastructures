using GoF_Coding_Interview_Algos.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoF_Coding_Interview_Algos.GoF_Interview_Questions.Hashing
{
    class Valid_Sudoku : Testable
    {
        private class InOut : InOutBase<char[,], bool>
        {
            public InOut(char[,] input, bool output) : base(input, output)
            {
            }
        }

        public Valid_Sudoku(string aufgabe) : base(aufgabe)
        {

        }



        private static void validate(char[,] carr)
        {
            for(int i=0; i<carr.GetLength(0); i++)
            {
                ISet<char> row = new HashSet<char>();
                ISet<char> col = new HashSet<char>();
                ISet<char> cube = new HashSet<char>();
                for(int j=0; j<carr.GetLength(1); j++)
                {
                    try
                    {
                        if (carr[i, j] != '.') row.Add(carr[i, j]);
                        if (carr[j, i] != '.') col.Add(carr[j, i]);
                        int colindex = (j % 3) + (i % 3) * 3;
                        int rowindex = (j / 3) + (i / 3) * 3;
                        if (carr[rowindex, colindex] != '.') cube.Add(carr[rowindex, colindex]);
                    }
                    catch
                    {

                    }
                }

            }
        }
    }
}
