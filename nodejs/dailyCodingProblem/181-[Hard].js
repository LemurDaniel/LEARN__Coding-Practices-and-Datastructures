const Inout = new (require('../Inout'))('Daily Coding Problem --- Split string into fewest palindromes');
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Google.

    Given a string, split it into as few strings as possible such that each string is a palindrome.

    For example, given the input string racecarannakayak, return ["racecar", "anna", "kayak"].
                                        kayakannaracecar
    Given the input string abc, return ["a", "b", "c"].

*/

Inout.push('racecarannakayak', '&NA racecar anna kayak');
Inout.push('racecarrrrannakayak', '&NA racecar rrr anna kayak');
Inout.push('abc', '&NA a b c');

Inout.solvers = [Split_into_palindromes];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function Split_into_palindromes(str) {

    // Define submethod for checking whether a substring is a palindrome or not.
    const isPalindrome = (str) => {
        for (let start = 0, end = str.length - 1; start <= end;)
            if (str[start++] != str[end--]) return false;
        return true;
    }

    // Define variables
    const palindromes = [];
    let end = str.length;

    for (let start = 0; start < str.length;) {

        // Parse the string from the end back to the start until the same char is found again.
        // In case of the palindrome 'racecar' in 'racecarannakayak' parsing back will then find the corresponding second 'r' marking the end of the palindrome.
        do end--; while (end > start && str[end] != str[start]);


        // Genrate a substring containing the suspected palindrome and check if it's valid.
        const substring = str.substr(start, end - start + 1);
        if (isPalindrome(substring)) {
            palindromes.push(substring);

            // Mark the new start at the first index after the found palindrome.
            // For example: if 'racecar' was found in 'racecarannakayak', then start will point to the beginning of 'anna'.
            // After that move the end pointer back to the end of the string.
            start = end + 1;
            end = str.length;
        }
        // if the string isn't a palindrome then the end pointer won't be reset for the next iteration.
        // This means after the first found possibly start of a palindrome it will search for other possible palindromes.
        // For Example in 'racecarrrranna' the loop will go through all r's starting from the back until the valid palindrome 'racecar' is found. 

        // The problem requires to cut into as littles strings as possible. Searching from the end guarantees finding the longest possible palindromes.
    }

    return palindromes;
}

/*
const isPalindrome_onliner = str => str.split('').map( (v,i) => v == str[str.length-1-i] ).reduce( (a,b) => a && b );
console.log(isPalindrome_onliner('cabac'))
console.log(isPalindrome_onliner('cabbac'))
console.log(isPalindrome_onliner('cabacc'))
*/