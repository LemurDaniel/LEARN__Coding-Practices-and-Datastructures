const Inout = new (require ('../Inout'))('DailyCode --- Approximate Squareroot');
const Helper = require('../Helper');

/*
    Hi, here's your problem today. This problem was recently asked by Google:

    Given a positive integer, find the square root of the integer without using any built in square root or power functions (math.sqrt or the ** operator). Give accuracy up to 3 decimal points.

    Here's an example and some starter code:

    def sqrt(x):
    # Fill this in.
    
    print(sqrt(5))
    # 2.236
*/

function add_testcase(nums, accuray){
    
    pow = Math.pow(10, accuray);

    Inout.testcases.push({
        input: { nums: nums, accuray: accuray },
        output: nums.map( v => Math.round( Math.sqrt(v) * pow ) / pow )
    })
}

Inout.map_input = (arg, solver) => arg.nums.map( v => solver(v, arg.accuray));

add_testcase([9], 1)
add_testcase([5, 16, 25, 32, 77, 99, 100, 125, 132, 348], 3)
add_testcase([5, 16, 25, 32, 77, 99, 100, 125, 132, 348], 4)
add_testcase([5, 16, 25, 32, 77, 99, 100, 125, 132, 348], 5)

Inout.solvers = [geometric_aproximation_squareroot];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

/*
    'a' and 'b' are the side of a rectangle, having an area
    equal to the squared number: num = a*b
    
    Over several iterations the average of both sides is calculated
    and becomes the new side 'a': a = (a+b)/2
    Then the value of the new side 'b' is calculated, so that
    'num = a*b' is true again: b = num/a

    Eventually both sides converge to a square with sides equal to
    the squareroot of the number.
*/

function geometric_aproximation_squareroot(num, decimals = 3, deviation = 10e-6) {

    let max_cycles = 10e3;
    let a = num/2;
    let b = num/a;
    decimals = Math.pow(10, decimals);

    while(max_cycles--) {

        a = (a+b) / 2;
        b = num / a;

        if( Math.abs(num - (a*a)) <= deviation ) 
            return Math.round(a * decimals) / decimals;
    }
}

