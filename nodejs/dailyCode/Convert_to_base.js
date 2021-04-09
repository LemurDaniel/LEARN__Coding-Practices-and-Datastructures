const Inout = new (require ('../Inout'))('DailyCode --- Convert decimal to other base');

/*
    Hi, here's your problem today. This problem was recently asked by Apple:

    Given a non-negative integer n, convert n to base 2 in string form. Do not use any built in base 2 conversion functions like bin.

    Here's an example and some starter code:

    def base_2(n):
    # Fill this in.

    print(base_2(123))
    # 1111011

    In the above example, 2^6 + 2^5 + 2^4 + 2^3 + 2^1 + 2^0 = 123. 
*/

const add_Testcase = (num, base) => Inout.push({  input: {num: num, base: base}, output: num.toString(base).toUpperCase() });

Inout.map_input = (input, solver) => solver(input.num, input.base) 

add_Testcase(123, 2);
add_Testcase(123, 3);
add_Testcase(123, 4);
add_Testcase(123, 8);
add_Testcase(123, 10);
add_Testcase(123, 16);
add_Testcase(255*8, 16);
add_Testcase(255*8, 2);

Inout.solvers = [Convert_to_base];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function Convert_to_base (num, base)  {

    const digits = "0123456789ABCDEF";
    if(base <= 0 || base > digits.length) throw "Invalid base"

    let converted = "";

    while(num > 0) {
        converted = digits[num % base] + converted;
        num = Math.floor(num / base);
    }

    return converted
}


