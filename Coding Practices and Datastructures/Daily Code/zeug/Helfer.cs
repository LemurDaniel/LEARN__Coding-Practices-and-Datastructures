using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions._1_Data_Structures;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    public class Helfer
    {
        public static readonly Random Rand = new Random();
        public class Matrix<V>
        {
            public V[,] mat;
            public int Length { get => mat.Length; }
            public Matrix(V[,] mat) => this.mat = mat;


            /*  Encoding:   posAbs = posY * T + posX    where T > MaxValueOf(posX) => T == colCount
           *  As long as T satisfies given Criteria following is true:    
           *      -   posY = (int) posAbs / T
           *      -   posX = posA mod T
           *      
           *      // !!! T must be bigger than MaxValOf(posX) so pos X can be Encoded as the remainder of the number !!!
           *      
           *  posAbs = posY * (colCount+1) + posX         
           * 
           */
            public V GetElementAtIndex(int ind) => GetElementAtIndex(ind, mat);
            public int GetRow(int ind) => GetRow(ind, mat);
            public int GetCol(int ind) => GetCol(ind, mat);
            public int EncodePos(int col, int row) => EncodePos(col, row, mat);
            public int EncodeRow(int row) => EncodeRow(row, mat);
            public int EncodeCol(int col) => EncodeCol(col, mat);
            public static V GetElementAtIndex(int ind, V[,] mat) => mat[GetCol(ind, mat), GetRow(ind, mat)];
            public static int GetRow(int ind, V[,] mat) => ind / mat.GetLength(0);
            public static int GetCol(int ind, V[,] mat) => ind % mat.GetLength(0);
            public static int EncodePos(int col, int row, V[,] mat) => EncodeRow(row, mat) + EncodeCol(col, mat);
            public static int EncodeRow(int row, V[,] mat) => row * mat.GetLength(0);
            public static int EncodeCol(int col, V[,] mat) => col;

            public String MatrixAusgabe(string s="", int spacing = 2) => MatrixAusgabe(s, mat, spacing);
            public static String MatrixAusgabe(string s, V[,] mat, int spacing = 2)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append(s+"\n");
                for (int row = 0; row < mat.GetLength(0); row++)
                {
                    if (row != 0) sb.Append(string.Format("{0, -" + s.Length + "}[", ""));
                    else sb.Append("[");
                    for (int col = 0; col < mat.GetLength(1); col++) sb.Append(string.Format("{0," + spacing + "}" +(col == mat.GetLength(1) - 1 ? "{1,"+(spacing-1)+"}" : ""), mat[row, col], ""));
                    sb.Append("]\n");
                }
                return sb.ToString();
            }


            public static Matrix<char> GetCharMatrix(string s, string splitter = null, bool flip = false) => new Matrix<char>(AssembleCharMatrix(s, splitter, flip));
            public static Matrix<int> GetIntMatrix(string s) => new Matrix<int>(AssembleIntMatrix(s));
            public static Matrix<int> GetIntMatrix(int min, int max, int col = -1, int row = -1) => new Matrix<int>(AssembleIntMatrix(min, max, col, row));

            public static char[,] AssembleCharMatrix(string s, string splitter = null, bool flip = false)
            {
                s = s.Trim('|');
                string[] arrS = s.Split('|');
                int count = 0;
                char[,] matrix;

                if (splitter == null)
                {
                    for (int i = 0; i < arrS[0].Length; i++) if (Char.IsLetter(arrS[0][i])) count++;
                    if (!flip) matrix = new char[arrS.Length, count];
                    else matrix = new char[count, arrS.Length];
                }
                else
                {
                    if(!flip)   matrix = new char[arrS.Length, arrS[0].Split(splitter[0]).Length];
                    else matrix = new char[arrS[0].Split(splitter[0]).Length, arrS.Length];
                }

                for (int i = 0; i < arrS.Length; i++)
                {
                    for (int j = 0, z = 0; j < matrix.GetLength(1); j++)
                    {
                        if (splitter == null)
                        {
                            while (!Char.IsLetter(arrS[i][z])) z++;
                            if (!flip) matrix[i, j] = arrS[i][z++];
                            else matrix[i, j] = arrS[z++][i];
                        }
                        else
                        {
                            if (!flip) matrix[i, j] = arrS[i].Split(',')[j][0];
                            else matrix[i, j] = arrS[j].Split(',')[i][0];
                        }
                    }
                }
                return matrix;
            }

            public static int[,] AssembleIntMatrix(int min, int max, int col=-1, int row=-1)
            {
                if (col == -1) col = Rand.Next(1, 15);
                if (row == -1) row = Rand.Next(1, 15);
                int[,] matrix = new int[col, row];
                for (int i = 0; i < row; i++)
                {
                    for (int j = 0; j < col; j++) matrix[j, i] = Rand.Next(min, max + 1);
                }
                return matrix;

            }
            public static int[,] AssembleIntMatrix(string s)
            {
                string[] arrS = s.Split('|');
                int[] arr = Assemble(arrS[0]);
                int[,] matrix = new int[arr.Length, arrS.Length];
                for (int i = 0; i < matrix.GetLength(1); i++)
                {
                    if (i != 0) arr = Assemble(arrS[i]);
                    for (int j = 0; j < matrix.GetLength(0); j++) matrix[j, i] = arr[j];
                }
                return matrix;
            }

            public override string ToString() => MatrixAusgabe();
        }

        public static Random random = new Random();
        public static string RandomString(int len, bool report = false)
        {
            string s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < len; i++) {
                sb.Append(s[random.Next(0, s.Length - 1)]);
                if (report && i % (len/100) == 0) Console.WriteLine("Length: " + sb.Length + "    ---    Done: " + (((double)sb.Length) / len * 100) + "%");
            };
            return sb.ToString();
        }

        // DELEGATE
        public delegate V Copy<V>(V element);


        // ARRAY
        public static String Arrayausgabe<V>(V[] arr) => Arrayausgabe<V>("", arr, false);
        public static String Arrayausgabe<V>(string s, V[] arr) => Arrayausgabe<V>(s, arr, false);
        public static String Arrayausgabe<V>(string s, V[] arr, bool len) => Arrayausgabe<V>(s, arr, false, ", ");
        public static String Arrayausgabe<V>(string s, V[] arr, bool len, string concat = ", ")
        {
            if (arr == null) return "{ NULL }";
            if (arr.Length == 0) return s;
            StringBuilder sb = new StringBuilder();
            sb.Append(s + " { " + arr[0]);
            for (int i = 1; i < arr.Length; i++)
            {
                sb.Append(concat + arr[i]);
                if (i > 25)
                {
                    sb.Append(concat+"...");
                    break;
                }
            }
            sb.Append(" }");
            if (len) sb.Append("\nLänge: " + arr.Length);
            return sb.ToString();
        }
     
        public static bool ArrayVergleich<V>(V[] arr, V[] arr2)
        {
            if (arr == arr2) return true;
            if (arr == null || arr2 == null) return false;
            if (arr.Length != arr2.Length) return false;
            for (int i = 0; i < arr.Length; i++)
            {
                if (!arr[i].Equals(arr2[i])) return false;
            }
            return true;
        }

        public static V[] ArrayCopy<V>(V[] arr) => ArrayCopy<V>(arr, el => el);
        public static V[] ArrayCopy<V>(V[] arr, Copy<V> copy)
        {
            V[] copyarr = new V[arr.Length];
            for (int i = 0; i < arr.Length; i++) copyarr[i] = copy(arr[i]);
            return copyarr;
        }

        // INT ARRAY
        public static int[] Assemble(int min, int max, int len)
        {
            int[] arr = new int[len];
            for (int i = 0; i < len; i++) arr[i] = Rand.Next(min, max+1);
            return arr;
        }
        public static int[] Assemble(string s)
        {
            if (s.Contains(";")) return Assemble2(s, ';');
            else if (s.Contains(",")) return Assemble2(s, ',');
            int[] arr = new int[s.Length];
            for (int i = 0; i < s.Length; i++) arr[i] = GetNumber(s[i]);
            return arr;
        }
        public static char[] AssembleChar(string s)
        {
            string[] arr = null;
            char[] carr = null;
            if (s.Contains(";")) arr = s.Split(';');
            else if (s.Contains(",")) arr = s.Split(',');
            else carr = new char[s.Length];

            if (carr == null) carr = new char[arr.Length];

            if (arr != null) for (int i = 0; i < arr.Length; i++) carr[i] = arr[i][0];
            else for (int i = 0; i < s.Length; i++) carr[i] = s[i];
            return carr;
        }
        private static int[] Assemble2(string s) => Assemble2(s, ';');
        private static int[] Assemble2(string s, char spliter)
        {
            string[] arrS = s.Split(spliter);
            int[] arr = new int[arrS.Length];
            for (int i = 0; i < arrS.Length; i++) arr[i] = int.Parse(arrS[i]);
            return arr;
        }
        public static bool[] AssembleBool(string s)
        {
            string[] arrS = s.Split(',');
            bool[] arr = new bool[arrS.Length];
            for (int i = 0; i < arrS.Length; i++) arr[i] = bool.Parse(arrS[i]);
            return arr;
        }
        public static int GetNumber(char c)
        {
            switch (c)
            {
                case '0': return 0;
                case '1': return 1;
                case '2': return 2;
                case '3': return 3;
                case '4': return 4;
                case '5': return 5;
                case '6': return 6;
                case '7': return 7;
                case '8': return 8;
                case '9': return 9;
                default: return -1;
            }
        }


        // INT BINARY TREE
        public static IBTree<char> AssembleBTreeChar(string s, IBTree<char> tree = null)
        {
            if (s.Contains(',') || s.Contains(';')) return AssembleBTreeChar(Helfer.AssembleChar(s), tree);
            if(tree == null) tree = new BinarySearchTree<char>();
            if (s[0] == '*')
            {
                tree.InvertRecursive();
                s = s.Substring(1);
            }
            foreach (char c in s) tree.Append(c);
            tree.RemoveNodeVals('/');
            return tree;
        }
        public static IBTree<char> AssembleBTreeChar(char[] arr, IBTree<char> tree = null)
        {
            if (tree == null) tree = new BinarySearchTree<char>();
            int i = 0;
            if (arr[0] == '*')
            {
                tree.InvertRecursive();
                i++;
            }
            for (; i < arr.Length; i++) tree.Append(arr[i]);
            tree.RemoveNodeVals('/');
            return tree;
        }

        public static IBTree<int> AssembleBTree(string s, IBTree<int> tree = null, bool rem = false, int val = 2) => AssembleBTree(Assemble(s), tree, rem, val);
        public static IBTree<int> AssembleBTree(int[] arr, IBTree<int> tree = null, bool rem = false, int val = 2)
        {
            if(tree == null) tree = new BinarySearchTree<int>();
            foreach (int el in arr) tree.Append(el);
            if (rem) tree.RemoveNodeVals(val);
            return tree;
        }




        public static bool BinarySearch(int lowBound, int upBound, ref int current, ref int iterations, Func<int,int> compare)
        {
            while(lowBound != upBound)
            {
                iterations++;
                current = (lowBound + upBound) / 2;
                int comp = compare(current);
                if (comp > 0) upBound = Math.Max(current - 1, lowBound);
                else if (comp < 0) lowBound = Math.Min(current + 1, upBound);
                else return true;
            }
            current = lowBound;
            return compare(current) == 0;
        }
    }
}
