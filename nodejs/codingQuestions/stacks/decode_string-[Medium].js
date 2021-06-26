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
Inout.push('3[a2[c],]', 'acc,acc,acc,');
Inout.push('3[a2[c]d,]', 'accd,accd,accd,');
Inout.push('abc3[de4[f],]', 'abcdeffff,deffff,deffff,')
Inout.push('3[a2[c]-5-3[e],]', 'acc-5-eee,acc-5-eee,acc-5-eee,');
Inout.push('10[a]', 'aaaaaaaaaa');
Inout.push('3a', '3a');
Inout.push('2[4]', '44');

Inout.solvers = [decode_iterative, decode_recursive];
Inout.solve(0);


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function decode_iterative( encoded ) {

    const stackNum    = [];
    const stackDecode = [];
    let decoded = '';
    let num = '';

    for(const c of encoded) {

        // If a character is a digit then append it to the num-String.
        if( '0123456789'.includes(c) ) num += c;
        else if ( c === '[' ) {
            // Push the parsed sequence of digits onto the numStack and reset the num-String to ''.
            stackNum.push(parseInt(num));
            // On every opening bracke the current decoded string gets pushed to the stackDecode in order to parse the sequence of chars inside the brackets.
            // In case of abc3[de4[f],] on the first bracket, the sequence 'abc' gets pushed to the stack, then 'de'. 
            // After that 'f' will be parsed and decoded into 'ffff' with sequence 'de' popped from the stack being prepended again, due to the following closing bracket. 
            // Any following characters are appended until the next closing bracket leads to 'deffff,' being decoded into 'deffff,deffff,deffff,' and the value of stackDecode being appended again: 'abcdeffff,deffff,deffff,'
            stackDecode.push(decoded);
            decoded = '';
            num = '';
        }
        else if ( c === ']' ) {
            // Repeating the current sequence k-th times when a closing bracket is hit.
            // The numString gets appended to. 
            // (When a closing bracket had been encountered its content would have already been pushed to the stackNum and its value should be ''.
            // if no closing bracket is hit, its content will be interpreted as part of the decoded sequence. )
            let temp = decoded + num;
            let repeats = stackNum.pop();
            while(--repeats) temp += decoded + num;
            
            // Prepend the value of the decoded-String before hitting the opening bracket to the decoded string inbetween the now parsed opening and closing bracket.
            decoded = stackDecode.pop() + temp;
        }
        else {
            // If the character isn't a bracket or a number then append it to the decoded sequence.
            // The num-String gets added to, because any sequence of digits gets only interpreted as a number for decoding,
            // when it's directly followed by a opening-bracket, in which case it would have been already pushed to numStack and reset back to ''.
            decoded += num + c;
            num  = '';
        }

    }

    return decoded;
}

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