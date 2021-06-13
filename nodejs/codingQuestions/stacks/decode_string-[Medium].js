const Inout = new (require ('../../Inout'))('Coding Questions --- Decode String');
const Helper = require('../../Helper');

/*

    Given an encoded string, return it's decoded string.

    The encoding rule is: k[encoded_string], where the encoded_strung inside the square brackets is being repeated exactly k times. 
    Note that k is guranteed to be a positive integer.

    You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.

    Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example
    there won't be input like 3a or 2[4]

*/



Inout.push('3[a]2[bc]', 'aaabcbc');
Inout.push('3[a2[c]]', 'accaccacc');
Inout.push('3[a2[c]d,]', 'accd,accd,accd,');
Inout.push('3[a2[c]-5-3[e],]', 'acc-5-eee,acc-5-eee,acc-5-eee,');
Inout.push('10[a]', 'aaaaaaaaaa');
Inout.push('3a', '3a');
Inout.push('2[4]', '44');

Inout.solvers = [decode_recursive];
Inout.solve(0);


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function decode_recursive( str, repeat = 1 ) {

    let decoded = '';
    let num = '';

    //console.log(' ' + str + '  ' + repeat + '  ' + decoded)

    for(let i = 0; i<str.length; i++) {

        const char = str[i];

        // Add the char to the number when it's a digit.
        if( '1234567890'.includes(char) ) num += char;

        // When the char is an open bracket then iterate through all characters until its closing bracket is found.
        // Then pass that substring recursivly into the function to decode it and append the result to the decoded string.
        else if( char === '[' ) {

            const start = i+1;
            let open_brackets = 1;

            // Find matching closing bracket.
            while( open_brackets ) {
                if(str[++i] === '[') open_brackets++;
                else if(str[i] === ']') open_brackets--;
            } 

            // Decode substring and add it to the decoded string.
            const substr =  str.substr( start, i-start );
            decoded += decode_recursive( substr , parseInt(num) );
            // Reset the numer string.
            num = '';
        }

        // If the char is a normal character then append it to the decoded string and reset the num string.
        // The num string will only be interpreted as a number if it is directly followed by an opening bracket.
        else {
            decoded += num + char;
            num = '';
        }
    }

    // Repeat the decoded string the specified number of times and return it.
    let temp = '';
    while(repeat--) temp += decoded + num;
    return temp;
}