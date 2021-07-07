const Inout = new (require('../../Inout'))('Coding Questions --- Decode Strings - [difficulty: Medium]');

/*
    
    Given a roman numeral, convert it to an integer.

    Input is guaranteed to be within the range from 1 to 3999.

*/

Inout.push('XIV', 14)
Inout.push('M', 1000);
Inout.push('XLVIII', 48);
Inout.push('CDXLIV', 444);
Inout.push('MMDCCLXXXVI', 2786);
Inout.push('CXLI', 141);
Inout.push('CCXXXIV', 234);
Inout.push('MCCXLII', 1242);
Inout.push('MMMCMXCIX', 3999);

Inout.solvers = [roman_to_integer, roman_to_integer2];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function roman_to_integer(roman) {

    doubles = { CM: -200, CD: -200, XC: -20, XL: -20, IX: -2, IV: -2 };
    roman_numerals = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
    let decimal = 0;

    for (let key of Object.keys(doubles))
        if (roman.includes(key)) decimal += doubles[key];

    for (let c of roman)
        decimal += roman_numerals[c];

    return decimal;
}

function roman_to_integer2(roman) {

    roman_numerals = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let decimal = 0;

    for (let i = 0; i < roman.length; i++) {

        const digit = roman[i];
        const double = roman[i] + (i < roman.length ? roman[i + 1] : '');

        if (double in roman_numerals) {
            decimal += roman_numerals[double];
            i++;
        }
        else decimal += roman_numerals[digit];
    }

    return decimal;
}