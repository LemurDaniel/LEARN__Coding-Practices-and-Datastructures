using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.DS_HANDBOOK.Interfaces
{
    interface IStack<V>
    {
        /*  STACK   --> LIFO Prinzip
            3 Basic Operations:
                -   POP
                -   PEEK
                -   PUSH

            AVERAGE = WORST TIME COMPLEXITY:
                -   Access      O(n)
                -   Search      O(n)
                -   Insertion   O(1)
                -   Deletion    O(1)

            SPACE COMPLEXITY:    O(n)

            USECASES:
                -   Undo
                -   Parentheses Checker
                -   Expression Parsing      -> https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/
        */


        V Pop();
        V Peek();
        void Push(V data);


    }
}
