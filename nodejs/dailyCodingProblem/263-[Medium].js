const Inout = new (require("../Inout"))("Daily Coding Problem --- Make a sentence checker");
const Helper = require("../Helper");


/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Nest.

    Create a basic sentence checker that takes in a stream of characters and determines whether they form valid sentences. 
    If a sentence is valid, the program should print it out.

    We can consider a sentence valid if it conforms to the following rules:

    1. The sentence must start with a capital letter, followed by a lowercase letter or a space.

    2. All other characters must be lowercase letters, separators (,,;,:) or terminal marks (.,?,!,‽).

    3. There must be a single space between each word.

    4. The sentence must end with a terminal mark immediately following a word.

*/

Inout.result_Equals = res => true

Inout.push('This is a correct sentence?', true)
Inout.push('this is a  sentence ? Another sentence. and another!Fourth Sentence, is born,or not..', true)
Inout.push('Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet.', 1)

Inout.solvers = [validateSentence];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function validateSentence(sentence) {

    // A - Z => 65 - 90
    // a - z => 97 - 122

    const seperators = ',;:'
    const terminators = '.?!'

    const errors = [];

    let lastTerminator = 1;

    let expectSentenceStart = true;
    let expectWordStart = true;

    let whiteSpaceOccured = false;
    let expectWhiteSpace = false;

    for (let idx = 0; idx < sentence.length; idx++) {

        const char = sentence[idx];
        const push = err => errors.push({
            position: idx,
            character: char,
            slice: sentence.slice(idx - 3, idx + 3),
            error: err
        });

        const isWhitespace = char === ' ';
        const isUppercase = char <= 'Z' && char >= 'A';

        const isTerminator = terminators.includes(char);
        const isSperator = seperators.includes(char);

        // Tests for character before terminators and seperators.
        if (whiteSpaceOccured) {
            if (isTerminator)
                push('Terminators must have a alphabetic letter as predecessor.')
            if (isSperator)
                push('Seperators must have a alphabetic letter as predecessor.')
            if (isWhitespace)
                push('Each word must be seperated by at moste one whitespace.')
            // Tests for Sentencestart with uppercase letter.
            if (expectSentenceStart && !isUppercase)
                push('An uppercase letter is expected after a termination mark and a whitespace.');
        }

        // Tests for whitespace after terminators or seperators.
        if (expectWhiteSpace && !isWhitespace)
            push('A Whitespace is expected after a terminating or seperating character.');

        if (!expectSentenceStart && !expectWhiteSpace && isUppercase)
            push('All characters in a the sentence must be terminators, seperators or lowercase.');


        lastTerminator = isTerminator ? 0 : (lastTerminator + 1);

        expectSentenceStart = lastTerminator === 1;
        expectWhiteSpace = isTerminator || isSperator;
        expectWordStart = isWhitespace;

        whiteSpaceOccured = isWhitespace;
    }

    return errors;
}