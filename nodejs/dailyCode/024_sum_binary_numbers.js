const Inout = new (require ('../Inout'))('DailyCode --- Sum Binary Numbers');

/*
    Hi, here's your problem today. This problem was recently asked by Facebook:

    Given two binary numbers represented as strings, return the sum of the two binary numbers as a new binary represented as a string. Do this without converting the whole binary string into an integer.

    Here's an example and some starter code.

    def sum_binary(bin1, bin2):
    # Fill this in.
    
    print(sum_binary("11101", "1011"))
    # 101000
*/

Inout.push({ num: "11101", num2: "1011" }, "101000");
Inout.push({ num: "111111", num2: "1" }, "1000000");
Inout.push({ num: "1", num2: "111111" }, "1000000");

Inout.solvers = [sum_binary_numbers, sum_binary_numbers_2];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function sum_binary_numbers (num, num2)  {

    let stack_1 = (num.length >= num2.length ? num : num2).split('');
    let stack_2 = (num.length < num2.length ? num : num2).split('');

    let result  = '';

    let carry   = 0;
    while(stack_1.length > 0) {
        const sum  = parseInt(stack_1.pop()) + parseInt(stack_2.length > 0 ? stack_2.pop() : 0) + carry;
        result     = (sum % 2) + result;
        carry      = Math.floor(sum / 2);

        if(carry && stack_1.length == 0) stack_1.push(0);
    }

    return result;
}

function sum_binary_numbers_2 (num, num2)  {
    
    let index_1 = num.length - 1;
    let index_2 = num2.length - 1;

    let result  = '';
    let carry   = 0;

    while(index_1 >= 0 || index_2 >= 0 || carry) {
        const val_1 = parseInt(index_1 >= 0 ? num[index_1--] : 0);
        const val_2 = parseInt(index_2 >= 0 ? num2[index_2--] : 0);

        const sum  = val_1 + val_2 + carry;
        result     = (sum % 2) + result;
        carry      = Math.floor(sum / 2);

    }

    return result;
}