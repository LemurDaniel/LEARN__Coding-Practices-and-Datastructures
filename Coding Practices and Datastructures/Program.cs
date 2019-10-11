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
using Coding_Practices_and_Datastructures.DS_HANDBOOK.Test;
using _2019 = Coding_Practices_and_Datastructures.Daily_Coding_Problem._2019;
using Coding_Practices_and_Datastructures.Other.Own;
using Coding_Practices_and_Datastructures.GoF_Interview_Questions.Bit_Manipulations;

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

            /* DS HANDBOOK */
            // aufgabe = new Test_PrioArrayQueue();
            // aufgabe = new TestArrayQueue();

            /* OTHER */
            // aufgabe = new TreeTraversal();  //*
            // aufgabe = new MazeSolver();


            /* Daily Coding Problems  */
            //  aufgabe = new Infinite_2D_Grid__Easy_();

            /* OWN */
            // aufgabe = new Something_with_Strings();


            /* Data Structures and Algos  */

            //------>ARRAY - STRUCTURES
            //  aufgabe = new Search_Element_in_Array();
            //  aufgabe = new Two_Sum_GoF();
            //  aufgabe = new Search_A_2D_Matrix_();    //*
            //  aufgabe = new Coding_Practices_and_Datastructures.GoF_Interview_Questions.Arrays.Sort_Colors();    //*
            //  aufgabe = new Set_Matrix_Zeroes();
            //  aufgabe = new Best_Time_To_Buy_And_Sell_Stock();
            //  aufgabe = new Remove_Duplicates_from_Sorted_Array();
            //  aufgabe = new JumpGame();
            //  aufgabe = new JumpGame2();
            //  aufgabe = new Unique_Paths();
            //  aufgabe = new Unique_Paths2();
            //  aufgabe = new Remove_Element();
            //  aufgabe = new Container_with_most_water();
            //  aufgabe = new Add_One();
            //  aufgabe = new Merge_Sorted_Arrays();
            //  aufgabe = new Minimum_Path_Sum(); //*
            //  aufgabe = new Minimum_Path_Sum2(); //*
            //  aufgabe = new Find_All_Numbers_Disappeared_in_an_Array();
            //  aufgabe = new Max_Consecutive_Ones();
            //  aufgabe = new Third_Maximum_Number();
            //  aufgabe = new Contains_Duplicate();
            //  aufgabe = new Intersection_of_Two_Arrays();
            //  aufgabe = new Intersection_of_Two_Arrays2();
            //  aufgabe = new Two_Sum2_Input_Array_is_Sorted();
            //  aufgabe = new Search_Insert_Position();
            //  aufgabe = new Maximum_Subarray();  // Not Working
            //  aufgabe = new Implement_Pow();


            //------>STRING - STRUCTURES
            //  aufgabe = new Integer_To_Roman();
            //  aufgabe = new String_To_Integer();
            //  aufgabe = new ZigZag_Conversion();  //*
            //  aufgabe = new Decode_String();  //*
            //  aufgabe = new Revers_A_String();
            //  aufgabe = new Reverse_Vowels_of_a_String();
            //  aufgabe = new Count_and_Say();
            //  aufgabe = new Length_of_Last_Word();
            //  aufgabe = new Longest_Substring_without_Repeating_Characters();
            //  aufgabe = new AddNumbers();
            //  aufgabe = new AddBinary();
            //  aufgabe = new Text_Justification();
            //  aufgabe = new Pascal_s_Triangle();
            //  aufgabe = new Pascal_s_Triangle2();
            //  aufgabe = new Ransom_Note();
            //  aufgabe = new Super_Reduced_String();

            //------>LINKED LIST - STRUCTURES
            //  aufgabe = new Add_Two_Numbers();
            //  aufgabe = new Reverse_A_Linked_List();
            //  aufgabe = new Reverse_Linked_List_2();
            //  aufgabe = new Palindrom_Linked_List();  //*
            //  aufgabe = new Remove_Linked_List_Element();

            //------>STACK - STRUCTURES
            //  aufgabe = new Evaluate_Reverse_Polish_Notation();
            //  aufgabe = new Min_Stack();
            //  aufgabe = new Implement_Queue_Using_Stack();
            //  aufgabe = new Simplify_File_Path();

            //aufgabe = new Basic_Calculator(); //Nicht fertig

            //------>TWO POINTERS - EXCERCISES
            //  aufgabe = new Valid_Palindrom();
            //  aufgabe = new Add_Two_Numbers_II();
            //  aufgabe = new Move_Zeroes();
            //  aufgabe = new Implement_StrStr();
            //  aufgabe = new Trapping_Rainwater_GoF();
            //  aufgabe = new Find_the_Duplicate_Number(); //*
            // aufgabe = new Find_the_Duplicate_Number2(); //Not Finished;

            //------>MATH - EXCERCISES
            //  aufgabe = new Integer_to_English_Words();   //*
            //  aufgabe = new Base_7(); //*
            //  aufgabe = new Implement_Square_Root();
            //  aufgabe = new Implement_Sqrt_Double();

            //------>BIT MANIPULATION - EXCERCISES
            //  aufgabe = new Single_Number();
            //  aufgabe = new Power_of_Two();
            //  aufgabe = new Hamming_Distance();

            //------>BREADTH FIRST - EXCERCISES
            //  aufgabe = new Symmetric_Tree();
            aufgabe = new Binary_Tree_Right_Side_View();

            //------>TRIE - EXCERCISES
            //  aufgabe = new Implement_Trie();
            //  aufgabe = new Add_nad_Search_Word__Data_Structure_Design();

            //----------------------------------------------
            /* Daily Code  Interview PRO */

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
            //  aufgabe = new Maximum_Profit_From_Stocks();
            //  aufgabe = new Queue_Using_Two_Stacks();
            //  aufgabe = new Contiguous_Subarray_with_Maximum_Sum();
            //  aufgabe = new Merge_K_Sorted_Linked_Lists();
            //  aufgabe = new Create_a_balanced_binary_search_tree_from_a_sorted_list();
            //  aufgabe = new Trapping_Rainwater();
            //  aufgabe = new Buddy_Strings();
            //  aufgabe = new Deepest_Node_in_a_Binary_Tree();
            //  aufgabe = new Look_and_Say_Sequence();
            //  aufgabe = new First_Missing_Positive_Integer(); // NOT FINISHED
            //  aufgabe = new Validate_a_Binary_Search_Tree();
            //  aufgabe = new Get_all_Values_at_a_Certain_Height_in_a_Binary_Tree();
            //  aufgabe = new Longest_Substring_With_K_Distinct_Characters();
            //  aufgabe = new Count_Number_of_Unival_Subtrees();
            //  aufgabe = new Coding_Practices_and_Datastructures.Daily_Code.Sort_Colors();
            //  aufgabe = new Word_Ordering_in_a_Different_Alphabetical_Order();
            //  aufgabe = new Largest_BST_in_a_Binary_Tree();
            //  aufgabe = new Find_Number_of_Islands();
            //  aufgabe = new Minimal_Removals_for_Valid_Parenthesises();
            //  aufgabe = new Words_that_are_Anagrams();
            //  aufgabe = new Running_Median();
            //  aufgabe = new Room_Scheduling();
            //  aufgabe = new Reverse_Words_in_a_String();
            //  aufgabe = new Merge_List_Of_Number_Into_Ranges();
            //  aufgabe = new Product_of_Array_Except_Self();
            //  aufgabe = new Given_two_arrays_write_a_function_to_compute_their_intersection();
            //  aufgabe = new Longest_Increasing_Subsequence(); // NOT WORKING
            //  aufgabe = new Given_two_arrays_write_a_function_to_compute_their_intersection();
            //  aufgabe = new Angles_of_a_Clock();
            //  aufgabe = new Arithmetic_Binary_Tree_DailyCode();
            //  aufgabe = new Tree_Serialization();
            //  aufgabe = new Distribute_Bonuses();
            //  aufgabe = new Min_Range_Needed_to_Sort();
            //  aufgabe = new Reverse_Integer();
            //  aufgabe = new Min_Stack_DailyCode();
            //  aufgabe = new Full_Binary_Tree();
            //  aufgabe = new Decode_String_Daily_Code();
            //  aufgabe = new Circle_of_Chained_Words();
            //  aufgabe = new Jump_to__End();
            //  aufgabe = new H_Index(); //*
            //  aufgabe = new Nth_Fibonacci_Number();
            //  aufgabe = new Find_the_Single_Element_in_an_Array_of_Duplicates();
            //  aufgabe = new String_Compression();
            aufgabe = new No_Adjacent_Repeating_Characters();

            //----------------------------------------------
            /* Daily Coding Problem */
            //2019
            // aufgabe = new _2019.Daily_Coding_Problem_157___Easy();

            while (true) { aufgabe.Test(); }
        }

    }
}
