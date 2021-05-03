
const Inout = new (require ('../Inout'))('Coding Questions --- Partition list into three parts');
const Helper = require('../Helper');

/*
    Good morning! Here's your coding interview problem for today.

    This problem was asked by Amazon.

    Given a pivot x, and a list lst, partition the list into three parts.

    The first part contains all elements in lst that are less than x
    The second part contains all elements in lst that are equal to x
    The third part contains all elements in lst that are larger than x
    Ordering within a part can be arbitrary.

    For example, given x = 10 and lst = [9, 12, 3, 5, 14, 10, 10], one partition may be [9, 3, 5, 10, 10, 12, 14].

    Similar Principle as 'node .\codingQuestions\arrays\sort_colors.js'
*/

function Check_output (testcase, result) {
    const num = testcase.input.num;
    
    let mark_part = 0;
    for(let i=0; i<result.length; i++) {
        const el = result[i];

        if(mark_part == 0 && el == num) mark_part = 1;
        else if(mark_part == 1 && el > num) mark_part = 2;

        if( el < num && mark_part != 0 ) return false;
        else if( el == num && mark_part != 1) return false;
        else if( el > num && mark_part != 2) return false;
  
    }

    return true;
}

Inout.push({ nums: '9, 12, 3, 5, 14, 10, 10', num: 10 }, Check_output);

Inout.solvers = [partition_list_one_pass];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*
    space complexity: O(1)  - constant 
    time  complexity: O(n)  - linear

*/

function partition_list_one_pass (list, num = 10)  {

   let ptr_end = list.length-1;
   let ptr_start = 0; 

   for(let i=0; i<=ptr_end; i++) {

        if(list[i] > num) {
            while(list[ptr_end] > num && ptr_end > i) ptr_end--;
            const temp = list[i];
            list[i] = list[ptr_end];
            list[ptr_end--] = temp;
        }

        if(list[i] < num) {
            const temp = list[i];
            list[i] = list[ptr_start];
            list[ptr_start++] = temp;
        }
   }

   return list;
}