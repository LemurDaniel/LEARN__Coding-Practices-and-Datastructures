const Inout = new (require('../Inout'))('DailyCode --- Validate balanced parentheses')

/*

    Hi, here's your problem today. This problem was recently asked by Uber:

    Imagine you are building a compiler. Before running any code, the compiler must check that the parentheses in the program are balanced. 
    Every opening bracket must have a corresponding closing bracket. We can approximate this using strings.

    Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
    An input string is valid if:
    - Open brackets are closed by the same type of brackets.
    - Open brackets are closed in the correct order.
    - Note that an empty string is also considered valid.

    Example:
    Input: "((()))"
    Output: True

    Input: "[()]{}"
    Output: True

    Input: "({[)]"
    Output: False
    class Solution:
    def isValid(self, s):
        # Fill this in.

    # Test Program
    s = "()(){(())" 
    # should return False
    print(Solution().isValid(s))

    s = ""
    # should return True
    print(Solution().isValid(s))

    s = "([{}])()"
    # should return True
    print(Solution().isValid(s))

*/

Inout.push('((())))', false);
Inout.push('((()))', true);
Inout.push('[()]{}', true);
Inout.push('({[)]', false);
Inout.push('()(){(())', false);
Inout.push('', true);
Inout.push('([{}])()', true);

Inout.solvers = [validateParentheses, validateParentheses2];
Inout.solve(0);




function validateParentheses(str) {

    const stack = [];

    for (let c of str) {
        if ('([{'.includes(c)) stack.push(c);
        else if (')]}'.includes(c)) {

            if (stack.length === 0) return false;

            if (c === ')' && stack.pop() !== '(') return false;
            else
            if (c === ']' && stack.pop() !== '[') return false;
            else
            if (c === '}' && stack.pop() !== '{') return false;
        }
    }

    return stack.length === 0;
}


function validateParentheses2(str, brackets = '(),[],{}') {

    const stack = [];
    const open = brackets.split(',').map(v => v[0]);
    const close = brackets.split(',').map(v => v[1]);

    for (let c of str) {

        if (open.includes(c)) stack.push(c);
        else if (close.includes(c)) {
            if (stack.length === 0) return false

            const idx = close.indexOf(c);
            if (stack.pop() !== open[idx]) return false;
        }

    }


    return stack.length === 0;
}