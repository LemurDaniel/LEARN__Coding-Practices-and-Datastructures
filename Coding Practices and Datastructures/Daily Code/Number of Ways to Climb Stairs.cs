using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Coding_Practices_and_Datastructures.Daily_Code
{
    /*
     * Hi, here's your problem today. This problem was recently asked by LinkedIn:

You are given a positive integer N which represents the number of steps in a staircase. You can either climb 1 or 2 steps at a time. Write a function that returns the number of unique ways to climb the stairs.
*/
    class Number_of_Ways_to_Climb_Stairs : Testable
    {

        private class InOut : InOutBase<int, int>
        {
            public InOut(int inp, int outp) : base(inp, outp, true)
            {
                AddSolver(BinaryTree_Solver);
                AddSolver(BinaryTree_Solver_Optimized1);
                AddSolver(Counting_Subtrees);
                AddSolver(Counting_Subtrees_2);
                MaxDur = new TimeSpan(0, 0, 5);
            }
        }


        private static int MAX_ITERATIONS = 1_000_000_000;
        public Number_of_Ways_to_Climb_Stairs()
        {
            testcases.Add(new InOut(int.MinValue, 0));
            testcases.Add(new InOut(0, 0));
            testcases.Add(new InOut(1, 1));
            testcases.Add(new InOut(2, 2));
            testcases.Add(new InOut(3, 3));
            testcases.Add(new InOut(4, 5));
            testcases.Add(new InOut(5, 8));
            testcases.Add(new InOut(6, 13));

            testcases.Add(new InOut(20, 10946));

            testcases.Add(new InOut(33, 5702887));

            testcases.Add(new InOut(35, 14930352));

            testcases.Add(new InOut(40, 165580141));

            testcases.Add(new InOut(50, -1));
        }


        // SOLUTION

        /*
         * Travering all Posibillities throug a Binary Tree Structure with Root == 0
         * Go Left: Add 1;
         * Go Right: Add 2;
         * if value==n: k++; procced to Traverse other Nodes
         * 
         *                     0
         *                1         2
         *              2   3     3   4
         *            3
         * 
         * RULES:
         *          1.  Always go Left
         *          2.  if value >= 3: (if value==3: k++) Go Back and Right
         *          3.  if right==Node:     
         *                      if Back == Root: End;
         *                      else Repeat 3;
         *          4.  if right >= 3: (if value==3: k++) Go Back and Right
         *          5.  else Procced to 1.
         *          
         */

    private class Node
        {
            public int data;
            public Node prev;   // No Next Node needed; only Node to Find back
            public bool right;
            public Node(Node prev, int data) : this(prev, data, false) { }
            public Node(Node prev, int data, bool right)
            {
                this.prev = prev;
                this.data = data;
                this.right = right;
            }
        }

        private static void BinaryTree_Solver(int n, InOut.Ergebnis erg)
        {
            Node Root = new Node(null, 0);
            int iterations = 0;
            int k = 0;

            bool loop = true;
            Node curr = Root;
            while (loop)
            {
                iterations++;
                bool it = true;
                if (iterations >= MAX_ITERATIONS) throw new Exception("Exceeded Maximum Iterations of " + MAX_ITERATIONS + ": Solver has been terminated");

                //Go Left:
                int data = curr.data + 1;
                if (data >= n)
                {
                    if (data == n) k++;

                    while (data >= n)
                    {
                        if (!it) iterations++;   // Iterations korrekt zählen
                        it = false;
                        if (curr == Root) // Attempting to go back and right on Root Node means that all values have been traversed on the right part of the tree
                        {
                            loop = false;
                            break;
                        };
                        //Go Back Right
                        Node tmp = curr;
                        curr = curr.prev;
                        if (tmp.right) continue;
                        data = curr.data + 2;   // Calculate Val of right Node and Keep Going Back until data < n => Then Procced Left
                        if (data == n) k++;
                    }
                    // Create Right Node and Proceed Left from there
                    curr = new Node(curr, data, true);
                }
                else curr = new Node(curr, data); // If left < n Create new Left Node
            }

            erg.Setze(k, iterations, Complexity.EXPONENTIAL, Complexity.EXPONENTIAL);
        }

        private static void BinaryTree_Solver_Optimized1(int n, InOut.Ergebnis erg)
        {
            // Idea: Right Tree of 0 Root is the same as the first subtree of left with value == 2; count all values of this subtree two times
            if(n == 1)
            {
                erg.Setze(1, 1);
                return;
            }
            Node Root = new Node(null, 1);
            int iterations = 0;
            int k = 0;

            bool loop = true;
            bool subtreeOfOne = true; //Always goes Left first;
            Node curr = Root;
            while (loop)
            {
                iterations++;
                bool it = true;
                if (iterations >= MAX_ITERATIONS) throw new Exception("Exceeded Maximum Iterations of "+MAX_ITERATIONS+": Solver has been terminated");

                //Go Left:
                int data = curr.data + 1;
                if (data >= n)
                {
                    if (data == n) k = k + (subtreeOfOne ? 2 : 1);

                    while (data >= n)
                    {
                        if (!it) iterations++;   // Iterations korrekt zählen
                        it = false;
                        if (curr == Root) // Attempting to go back and right on Root Node means that all values have been traversed on the right part of the tree
                        {
                            loop = false;
                            break;
                        };
                        //Go Back Right
                        Node tmp = curr;
                        curr = curr.prev;
                        if (tmp.right) continue;
                        if (curr == Root) subtreeOfOne = false; // if it goes back to Root it'll switch to the Right side
                        data = curr.data + 2;   // Calculate Val of right Node and Keep Going Back until data < n => Then Procced Left
                        if (data == n) k = k + (subtreeOfOne ? 2 : 1);
                    }
                    // Create Right Node and Proceed Left from there
                    curr = new Node(curr, data, true);
                }
                else curr = new Node(curr, data); // If left < n Create new Left Node
            }

            erg.Setze(k, iterations, Complexity.EXPONENTIAL, Complexity.EXPONENTIAL);
        }


        // OPT 3 Idea: All Right Nodes are Subtrees of the Left

        private static void Counting_Subtrees(int n, InOut.Ergebnis erg)
        {
            // Counting all Subtrees Starting from Bottom Left Node of Tree
            int sub1 = 0;
            int sub2 = 1;
            int iterations = 0;

            // Those values are constantly added to each other, because each Node holds all Subtrees of the previous two Nodes

            for (int i = n, tmp; i > 0; i--)
            {
                iterations++;
                tmp = Math.Max(sub1,1);
                if (sub1 + sub2 < sub1) throw new OverflowException("Integer Overflow");
                sub1 += sub2;
                sub2 = tmp;
            }
            erg.Setze(sub1, iterations == 0 ? 1 : iterations, Complexity.LINEAR, Complexity.CONSTANT);

            /*         13:      0
             *         8:      1
             *         5:     2
             *         3:    3 
             *         2:   4
             *         1:  5
             *         1: 6
             * 
             * 
             * 
             */
        }

        private static void Counting_Subtrees_2(int n, InOut.Ergebnis erg)
        {
            if (n < 1)
            {
                erg.Setze(0, 1);
                return;
            }

            int sub1 = 1;
            int sub2 = 1;
            int iterations = 0;

            for (int i = n - 1, tmp; i > 0; i--)
            {
                iterations++;
                tmp = Math.Max(sub1, 1);
                if (sub1 + sub2 < sub1) throw new OverflowException("Integer Overflow");
                sub1 += sub2;
                sub2 = tmp;
            }

            erg.Setze(sub1, iterations == 0 ? 1:iterations, Complexity.LINEAR, Complexity.CONSTANT);
        }
    }
}