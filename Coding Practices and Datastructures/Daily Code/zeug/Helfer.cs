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

        public class Point
        {
            public int Y;
            public int X;

            public Point(int Y, int X)
            {
                this.Y = Y;
                this.X = X;
            }

            public override string ToString() => string.Format("({0}, {1})", Y, X);
            public override bool Equals(object obj)
            {
                if (obj == this) return true;
                if (!obj.GetType().Equals(typeof(Point))) return false;
                Point p2 = obj as Point;
                return p2.X == X && p2.Y == Y;
            }
            public override int GetHashCode()
            {
                var hashCode = 27121115;
                hashCode = hashCode * -1521134295 + Y.GetHashCode();
                hashCode = hashCode * -1521134295 + X.GetHashCode();
                return hashCode;
            }
        }

        public class Matrix<V>
        {
            public V[,] mat;
            public int Length { get => mat.Length; }
            public int RowNum { get => mat.GetLength(0); }
            public int ColNum { get => mat.GetLength(1); }

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
            public void SetElementAtIndex(int ind, V val) => SetElementAtIndex(ind, val, mat);
            public V GetElementAtIndex(int ind) => GetElementAtIndex(ind, mat);
            public V GetElement(int row, int col) => mat[row, col];
            public int GetRow(int ind) => GetRow(ind, mat);
            public int GetCol(int ind) => GetCol(ind, mat);
            public int EncodePos(int row, int col) => EncodePos(row, col, mat);
            public int EncodeRow(int row) => EncodeRow(row, mat);
            public int EncodeCol(int col) => EncodeCol(col, mat);
            public int IndexAddRows(int index, int add) => IndexAddRows(index, add, mat);
            public int IndexAddCols(int index, int add) => IndexAddCols(index, add, mat);
            public static void SetElementAtIndex(int ind, V val, V[,] mat) => mat[GetRow(ind, mat), GetCol(ind, mat)] = val;
            public static V GetElementAtIndex(int ind, V[,] mat) => mat[GetRow(ind, mat), GetCol(ind, mat)];
            public static int GetRow(int ind, V[,] mat) => ind / mat.GetLength(1);
            public static int GetCol(int ind, V[,] mat) => ind % mat.GetLength(1);
            public static int EncodePos(int row, int col, V[,] mat) => EncodeRow(row, mat) + EncodeCol(col, mat);
            public static int EncodeRow(int row, V[,] mat) => row * mat.GetLength(1);
            public static int EncodeCol(int col, V[,] mat) => col;
            public static int IndexAddCols(int index, int add, V[,] mat) => EncodePos(GetRow(index, mat), Math.Min(Math.Max(GetCol(index, mat) + add, mat.GetLength(1) - 1), 0), mat);
            public static int IndexAddRows(int index, int add, V[,] mat) => EncodePos(Math.Min(Math.Max(GetRow(index, mat) + add, mat.GetLength(0) - 1), 0), GetCol(index, mat), mat);

            public String MatrixAusgabe(string s="", int spacing = 2) => MatrixAusgabe(s, mat, spacing);
            public static String MatrixAusgabe(string s, V[,] mat, int spacing = 2)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append(s+"\n");
                for (int row = 0; row < mat.GetLength(0); row++)
                {
                    //if (row != 0) sb.Append(string.Format("{0, -" + s.Length + "}[", ""));
                    sb.Append("[");
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
                string[] arrS = s.Trim('|').Split('|');
                int[] arr = Assemble(arrS[0]);
                int[,] matrix = new int[arrS.Length, arr.Length];
                for (int i = 0; i < matrix.GetLength(0); i++)
                {
                    if (i != 0) arr = Assemble(arrS[i]);
                    for (int j = 0; j < matrix.GetLength(1); j++) matrix[i, j] = arr[j];
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
        public static string GenerateString(int len, string s = " ")
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0, j=0; i < len; i++)
            {
                j = (j + 1) % s.Length;
                sb.Append(s[j]);
            };
            return sb.ToString();
        }
        public static string ShortenString(int len, string s, bool middle = false, string end = "...")
        {
            if (s.Length == len) return s;
            if(len < s.Length) return s.Substring(0, len - end.Length) + end;
            if(middle) return (GenerateString((len - s.Length) / 2) + s + GenerateString((len - s.Length) / 2 + 1)).Substring(0, len);
            return s + GenerateString((len - s.Length));
        }

        // DELEGATE
        public delegate V Copy<V>(V element);


        // ARRAY
        public static String Arrayausgabe<V>(V[] arr) => Arrayausgabe<V>("", arr);
        public static String Arrayausgabe<V>(string s, V[] arr, bool len = false, string concat = ", ")
        {
            if (arr == null) return "{ <NULL> }";
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
            if (len) sb.Append("  Länge: " + arr.Length);
            return sb.ToString();
        }
        public static String _2Dim_Arrayausgabe<V>(V[][] _2dim, bool len = false, string concat = "\n") => _2Dim_Arrayausgabe<V>(_2dim, len, concat);
        public static String _2Dim_Arrayausgabe<V>(string s, V[][] _2dim, bool len = false, string concat = "\n")
        {
            if (_2dim == null) return "{ <NULL> }";
            StringBuilder sb = new StringBuilder(s+"[");
            foreach (V[] arr in _2dim) sb.Append(Arrayausgabe<V>("\n", arr, len));
            return sb.ToString() + "\n]";
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

        public static bool _2Dim_ArrayVergleich<V>(V[][] _2dim, V[][] _2dim2)
        {
            if (_2dim == _2dim2) return true;
            if (_2dim == null || _2dim2 == null) return false;
            if (_2dim.Length != _2dim2.Length) return false;

            for (int i = 0; i < _2dim.Length; i++)
            {
                if (!ArrayVergleich<V>(_2dim[i], _2dim2[i])) return false;
            }
            return true;
        }

        public static bool ArrayVergleichAnyOrder<V>(V[] arr, V[] arr2)
        {
            if (arr == arr2) return true;
            if (arr == null || arr2 == null) return false;
            if (arr.Length != arr2.Length) return false;

            Dictionary<V, int> dict = new Dictionary<V, int>();
            foreach(V el in arr)
            {
                if (dict.ContainsKey(el)) dict[el]++;
                else dict.Add(el, 1);
            }

            foreach(V el in arr2)
            {
                if (!dict.ContainsKey(el)) return false; // Not existent in arr
                else if (dict[el] <= 0) return false;
                else dict[el]--; // Appear more often in arr2 than arr
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
        public static int[][] Assemble2Dim(string s, char spliter = ',', char spliter2 = ';')
        {
            if (spliter == spliter2) throw new InvalidOperationException("Splitter must be different");
            string[] Sarr = s.Split(spliter2);
            int[][] arr = new int[Sarr.Length][];
            for (int i = 0; i < Sarr.Length; i++) arr[i] = Assemble(Sarr[i], spliter);
            return arr;
        }
        public static int[] Assemble(string s, char spliter = ',')
        {
            if (s.Contains(spliter)) return Assemble2(s, spliter);
            else if (s.Contains(";")) return Assemble2(s, ';');
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

        public static IBTree<char> AssembleBTreeCharPreOrder(string s, IBTree<char> tree = null)
        {
            if (tree == null) tree = new BinarySearchTree<char>();
            if (s == null | s.Length == 0) return tree;
            int i = 0;
            if (s[0] == '*')
            {
                tree.InvertRecursive();
                i++;
            }
            if (s[i] == '/') return tree;
            IBTreeNode<char> node = tree.CreateNode(s[i++]);
            tree.Append(node);
            Stack<IBTreeNode<char>> stack = new Stack<IBTreeNode<char>>();
            do
            {
                if ((s[i] == ',' || s[i] == ';') && i++ == i) continue;
                if (node != null)
                {
                    stack.Push(node);
                    if (s[i] == '/') node.Left = null;
                    else node.Left = tree.CreateNode(s[i]);
                    i++;
                    node = node.Left;
                    continue;
                }

                node = stack.Pop();
                if (s[i] == '/') node.Right = null;
                else node.Right = tree.CreateNode(s[i]);
                i++;
                node = node.Right;
            } while (i < s.Length);
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

        public static IBTree<int> AssembleBTreePreOrder(string s, IBTree<int> tree = null, string rem ="/")
        {
            if (tree == null) tree = new BinarySearchTree<int>();
            if (s == null | s.Length == 0) return tree;
            string[] arr = s.Split(s.Contains(';') ? ';' : ',');
            int i = 0;
            if (arr[0] == "*")
            {
                tree.InvertRecursive();
                i++;
            }
            if (arr[i] == rem) return tree;
            IBTreeNode<int> node = tree.CreateNode(int.Parse(arr[i++]));
            tree.Append(node);
            Stack<IBTreeNode<int>> stack = new Stack<IBTreeNode<int>>();
            do
            {
                if ((s[i] == ',' || s[i] == ';') && i++ == i) continue;
                if (node != null)
                {
                    stack.Push(node);
                    if (arr[i] == rem) node.Left = null;
                    else node.Left = tree.CreateNode(int.Parse(arr[i]));
                    i++;
                    node = node.Left;
                    continue;
                }

                node = stack.Pop();
                if (arr[i] == rem) node.Right = null;
                else node.Right = tree.CreateNode(int.Parse(arr[i]));
                i++;
                node = node.Right;
            } while (i < arr.Length);
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

        public static int NegateInt(int i) => i > 0 ? i * -1 : i;
        public static string removeChar(string s, string rems = ". ,")
        {
            StringBuilder sb = new StringBuilder();
            foreach (char c in s) if (!rems.Contains(c)) sb.Append(c);
            return sb.ToString();
        }
    }

}
