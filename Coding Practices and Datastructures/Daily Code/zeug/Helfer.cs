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

        public static Random random = new Random();
        public static string RandomString(int len)
        {
            string s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < len; i++) sb.Append(s[random.Next(0, s.Length - 1)]);
            return sb.ToString();
        }

        // DELEGATE
        public delegate V Copy<V>(V element);


        // ARRAY
        public static String Arrayausgabe<V>(V[] arr) => Arrayausgabe<V>("", arr, false);
        public static String Arrayausgabe<V>(string s, V[] arr) => Arrayausgabe<V>(s, arr, false);
        public static String Arrayausgabe<V>(string s, V[] arr, bool len)
        {
            if (arr == null) return "{ NULL }";
            if (arr.Length == 0) return s;
            StringBuilder sb = new StringBuilder();
            sb.Append(s + " { " + arr[0]);
            for (int i = 1; i < arr.Length; i++)
            {
                sb.Append(", " + arr[i]);
                if (i > 25)
                {
                    sb.Append(", ...");
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
        public static int[] Assemble(string s)
        {
            if (s.Contains(";")) return Assemble2(s);
            int[] arr = new int[s.Length];
            for (int i = 0; i < s.Length; i++) arr[i] = GetNumber(s[i]);
            return arr;
        }
        private static int[] Assemble2(string s)
        {
            string[] arrS = s.Split(';');
            int[] arr = new int[arrS.Length];
            for (int i = 0; i < arrS.Length; i++) arr[i] = int.Parse(arrS[i]);
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
        public static BinaryTree<char> AssembleBTreeChar(string s)
        {
            BinaryTree<char> tree = new BinaryTree<char>();
            if (s[0] == '*')
            {
                tree.InvertRecursive();
                s = s.Substring(1);
            }
            foreach (char c in s) tree.Append(c);
            return tree;
        }
        public static BinaryTree<int> AssembleBTree(string s) => AssembleBTree(Assemble(s));
        public static BinaryTree<int> AssembleBTree(int[] arr)
        {
            BinaryTree<int> tree = new BinaryTree<int>();
            foreach (int el in arr) tree.Append(el);
            return tree;
        }
    }
}
