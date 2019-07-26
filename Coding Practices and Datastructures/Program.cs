using GoF_Coding_Interview_Algos.Coding_Train.Challenges.TicTacToe;
using GoF_Coding_Interview_Algos.Daily_Code;
using GoF_Coding_Interview_Algos.Data_Structures_and_Algos;
using GoF_Coding_Interview_Algos.GoF_Interview_Questions.LinkedLists;
using GoF_Coding_Interview_Algos.GoF_Interview_Questions.Stack;
using GoF_Coding_Interview_Algos.GoF_Interview_Questions.Strings;
using GoF_Coding_Interview_Algos.GoF_Interview_Questions.Two_Pointers;
using GoF_Coding_Interview_Algos.Other.Daily_Coding_Problem;
using GoF_Coding_Interview_Algos.Tower_of_Hanoi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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


            /* Daily Coding Problems  */
            //  aufgabe = new Infinite_2D_Grid__Easy_();


            /* Data Structures and Algos  */

            //------>ARRAY - STRUCTURES
            //  aufgabe = new Search_Element_in_Array();
            //  aufgabe = new GoF_Interview_Questions.Arrays.Two_Sum();

            //------>STRING - STRUCTURES
            //  aufgabe = new Integer_To_Roman();
            //  aufgabe = new String_To_Integer();
            //  aufgabe = new ZigZag_Conversion();

            //------>LINKED LIST - STRUCTURES
            //  aufgabe = new Add_Two_Numbers();
            //  aufgabe = new Reverse_A_Linked_List();
            //  aufgabe = new Reverse_Linked_List_2();

            //------>STACK - STRUCTURES
            //  aufgabe = new Validate_Balanced_Parentheses(); ???????????? IMPLEMENT OWN STACK STRUCTURE
            //  aufgabe = new Evaluate_Reverse_Polish_Notation();

            //aufgabe = new Basic_Calculator(); NIcht fertig

            //------>TWO POINTERS - EXCERCISES
            //  aufgabe = new Valid_Palindrom();
            //  aufgabe = new Add_Two_Numbers_II();
            //  aufgabe = new Move_Zeroes();


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
            //  aufgabe = new Number_of_Ways_to_Climb_Stairs();     // Hard
            aufgabe = new Invert_a_Binary_Tree();

            while (true) { aufgabe.Test(); }
        }
    }
}
