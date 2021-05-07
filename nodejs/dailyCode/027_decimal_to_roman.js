const Inout = new (require ('../Inout'))('DailyCode --- Decimal to roman');
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Amazon:

    Given an integer, convert the integer to a roman numeral. You can assume the input will be between 1 to 3999.

    The rules for roman numerals are as following:

    There are 7 symbols, which correspond to the following values.
    I   1
    V   5
    X   10
    L   50
    C   100
    D   500
    M   1000

    The value of a roman numeral are the digits added together. For example the roman numeral 'XX' is V + V = 10 + 10 = 20. Typically the digits are listed from largest to smallest, so X should always come before I. Thus the largest possible digits should be used first before the smaller digits (so to represent 50, instead of XXXXX, we should use L).

    There are a couple special exceptions to the above rule.

    To represent 4, we should use IV instead of IIII. Notice that I comes before V.
    To represent 9, we should use IX instead of VIIII.
    To represent 40, we should use XL instead of XXXX.
    To represent 90, we should use XC instead of LXXXX.
    To represent 400, we should use CD instead of CCCC.
    To represent 900, we should use CM instead of DCCCC.

    Here are some examples and some starter code.

    def integer_to_roman(num):
    # Fill this in.

    print(integer_to_roman(1000))
    # M
    print(integer_to_roman(48))
    # XLVIII
    print(integer_to_roman(444))
    # CDXLIV


*/


Inout.push(1000, 'M');
Inout.push(48, 'XLVIII');
Inout.push(444, 'CDXLIV');
Inout.push(2786, "MMDCCLXXXVI");
Inout.push(141, "CXLI");
Inout.push(234, "CCXXXIV");
Inout.push(1242, "MCCXLII");
Inout.push(3999, "MMMCMXCIX");

Inout.solvers = [integer_to_roman];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function integer_to_roman(decimal) {

    roman_numerals = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1};
    let roman_number = '';

    for(let key of Object.keys(roman_numerals)){
        const value = roman_numerals[key];
        let count = Math.floor( decimal / value );
        decimal = decimal % value;

        while(count--) roman_number += key;
    }

    return roman_number;
}

