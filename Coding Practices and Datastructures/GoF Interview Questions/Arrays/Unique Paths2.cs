using Coding_Practices_and_Datastructures.Daily_Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays
{
    class Unique_Paths2 : Testable
    {
        private class InOut : InOutBase<int[,], BigInteger>
        {
            public InOut(string s, long outp) : this(s, new BigInteger(outp)) { }
            public InOut(string s, BigInteger outp) : this(Helfer.Matrix<int>.AssembleIntMatrix(s), outp) { }
            public InOut(int[,] s, BigInteger outp) : base(s, outp, true)
            {
                inputStringConverter = arg => Helfer.Matrix<int>.MatrixAusgabe("Eingbabe: ", arg);
               AddSolver((arg, erg) => erg.Setze(CalcPermutations(arg), Complexity.LINEAR, Complexity.CONSTANT), "Calculate Permuations");
                HasMaxDur = false;
            }
        }


        public Unique_Paths2()
        {
            testcases.Add(new InOut("0,0,0|0,1,0|0,0,0", 2));
            testcases.Add(new InOut("1,0,0|0,1,0|0,0,0", 0));
            testcases.Add(new InOut("0,0|0,1|0,0", 1));
            testcases.Add(new InOut("0,0,0|0,1,0", 1));
            testcases.Add(new InOut(Helfer.Matrix<int>.AssembleIntMatrix(0,1,5,7), -1));
        }


        //SOL
        public static BigInteger CalcPermutations(int[,] mat)
        {
            if (mat[0, 0] == 1 || mat[mat.GetLength(0) - 1, mat.GetLength(1) - 1] == 1) return 0;
            BigInteger Ways = Unique_Paths.Num_ways(mat.GetLength(0), mat.GetLength(1));
            for (int i = 0; i < mat.GetLength(0); i++)
            {
                for (int j = 0; j < mat.GetLength(1); j++)
                {
                    if (mat[i, j] != 1) continue;
                    bool b1 = (i == 0 || i == mat.GetLength(0) - 1);
                    bool b2 = (j == 0 || j == mat.GetLength(1) - 1);
                    if (b2 && b1) Ways -= 1;        //IsCorner
                    else if (b1 ^ b2) Ways -= 2;    //IsBorder
                    else Ways -= 4;                 //IsMiddle
                }
            }
            return Ways;
        }
    }
}
