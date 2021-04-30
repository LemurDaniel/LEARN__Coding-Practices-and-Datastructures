const Inout = new (require ('../Inout'))('DailyCode --- Plus One');

/*
    Hi, here's your problem today. This problem was recently asked by LinkedIn:

    Given a non-empty array where each element represents a digit of a non-negative integer, add one to the integer. The most significant digit is at the front of the array and each element in the array contains only one digit. Furthermore, the integer does not have leading zeros, except in the case of the number '0'.

    Example:
    Input: [2,3,4]
    Output: [2,3,5]
    class Solution():
    def plusOne(self, digits):
        # Fill this in.

    num = [2, 9, 9]
    print(Solution().plusOne(num))
    # [3, 0, 0]
*/


Inout.push('&AR'+'2,3,4', '&AR'+'2,3,5');
Inout.push('&AR'+'2,9,9', '&AR'+'3,0,0');
Inout.push('&AR'+'9,9,9', '&AR'+'1,0,0,0');

Inout.solvers = [plus_one];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function plus_one (num)  {

    for(let i=num.length-1; i>=0; i--) {
        num[i] = (num[i] + 1) % 10;
        if(num[i] != 0) return;
    }

    num.unshift(1);
}