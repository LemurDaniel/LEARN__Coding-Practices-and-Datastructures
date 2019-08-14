using Coding_Practices_and_Datastructures.Other;
using Coding_Practices_and_Datastructures.Coding_Train.Challenges.TicTacToe;
using Coding_Practices_and_Datastructures.Daily_Code;
using Coding_Practices_and_Datastructures.Data_Structures_and_Algos;
using Coding_Practices_and_Datastructures.Other.Daily_Coding_Problem;
using Coding_Practices_and_Datastructures.Tower_of_Hanoi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions.MathEx;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions.LinkedLists;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions.Stack;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions.Strings;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions.Two_Pointers;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions.Breadth_First_Search;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions.Tries;

namespace GoF_Coding_Interview_Algos
{
    class Program
    {
        static void Main(string[] args)
        {
            //new Design_Twitter.TwitterTest();

            //Hanoi.TowerAsync(10);


            // new Konsolenbedinung();

            ITestable aufgabe;

            /* OTHER */
            // aufgabe = new TreeTraversal();  //*


            /* Daily Coding Problems  */
            //  aufgabe = new Infinite_2D_Grid__Easy_();


            /* Data Structures and Algos  */

            //------>ARRAY - STRUCTURES
            //  aufgabe = new Search_Element_in_Array();
            //  aufgabe = new GoF_Interview_Questions.Arrays.Two_Sum();
            //  aufgabe = new Search_A_2D_Matrix_();    //*
            //  aufgabe = new Sort_Colors();    //*
            //  aufgabe = new Set_Matrix_Zeroes();

            //------>STRING - STRUCTURES
            //  aufgabe = new Integer_To_Roman();
            //  aufgabe = new String_To_Integer();
            //  aufgabe = new ZigZag_Conversion();  //*
            //  aufgabe = new Decode_String();  //*

            //------>LINKED LIST - STRUCTURES
            //  aufgabe = new Add_Two_Numbers();
            //  aufgabe = new Reverse_A_Linked_List();
            //  aufgabe = new Reverse_Linked_List_2();
            //  aufgabe = new Palindrom_Linked_List();  //*
            //  aufgabe = new Remove_Linked_List_Element();

            //------>STACK - STRUCTURES
            //  aufgabe = new Evaluate_Reverse_Polish_Notation();
            //  aufgabe = new Min_Stack();

            //aufgabe = new Basic_Calculator(); Nicht fertig

            //------>TWO POINTERS - EXCERCISES
            //  aufgabe = new Valid_Palindrom();
            //  aufgabe = new Add_Two_Numbers_II();
            //  aufgabe = new Move_Zeroes();
            //  aufgabe = new Implement_StrStr();

            //------>MATH - EXCERCISES
            //  aufgabe = new Integer_to_English_Words();   //*
            //  aufgabe = new Base_7(); //*

            //------>BREADTH FIRST - EXCERCISES
            //  aufgabe = new Symmetric_Tree();

            //------>TRIE - EXCERCISES
            //  aufgabe = new Implement_Trie();

            /* Daily Code  */

            //  aufgabe = new Longest_Palindrom();
            //  aufgabe = new First_and_Last_Indices_of_an_Element_in_a_Sorted_Array();
            //  aufgabe = new Validate_Balanced_Parentheses();
            //  aufgabe = new Reverse_A_Linked_List();
            //  aufgabe = new Sorting_a_list_with_3_unique_numbers();
            //  aufgabe = new Daily_Code.Two_Sum();
            //  aufgabe = new Find_the_non_duplicate_number();
            //  aufgabe = new Non_decreasing_Array_with_Single_Modification();
            //  aufgabe = new Floor_and_Ceiling_of_a_Binary_Search_Tree();
            //  aufgabe = new Max_Stack();
            //  aufgabe = new Number_of_Ways_to_Climb_Stairs();     //*
            //  aufgabe = new Invert_a_Binary_Tree();
            //  aufgabe = new Simple_Calculator();      
            //  aufgabe = new Longest_Sequence_with_Two_Unique_Numbers();
            //  aufgabe = new Word_Search();
            //  aufgabe = new Minimum_Size_Subarray_Sum();
            //  aufgabe = new Ways_to_Traverse_a_Grid();    //*
            //  aufgabe = new Remove_Consecutive_Nodes_that_Sum_to_0();
            //  aufgabe = new Remove_k_th_Last_Element_From_Linked_List();
            //  aufgabe = new Witness_of_The_Tall_People();
            //  aufgabe = new Course_Prerequisites();
            //  aufgabe = new Move_Zeroes();    //*
            //  aufgabe = new Spiral_Traversal_of_Grid();
            //  aufgabe = new Find_the_k_th_Largest_Element_in_a_List();
            //  aufgabe = new Largest_Product_of_3_Elements();  //*
            aufgabe = new Maximum_Profit_From_Stocks();


            while (true) { aufgabe.Test(); }
        }

    }
}
