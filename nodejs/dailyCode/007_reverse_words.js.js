const Inout = new (require('../Inout'))('DailyCode --- Reverse Words');

/*
    Hi, here's your problem today. This problem was recently asked by Apple:

        Given a list of words in a string, reverse the words in-place (ie don't create a new string and reverse the words). 
        Since python strings are not mutable, you can assume the input will be a mutable sequence (like list).

        Here's an example and some starting code:

        def reverse_words(words):
        # Fill this in.

        s = list("can you read this")
        reverse_words(s)
        print(''.join(s))
        # this read you can
*/


Inout.input_Converter = arg => arg.split('')
Inout.result_Converter = res => res.join('');

// Testcases
Inout.push('can you read this', 'this read you can');
Inout.push('can    you read this', 'this read you    can');


Inout.solvers = [reverseWords_inPlace];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function reverseWords_inPlace(list) {

    // Reverse all characters in the list.
    let [st, en] = [0, list.length];
    do[list[en], list[st]] = [list[st], list[en]]
    while (++st < --en)


    // Second pass to revert individual words.
    for (let start = 0, i = 0; i <= list.length; i++) {

        // Ensure that last character of the list is always a whitespace.
        const c = i !== list.length ? list[i] : ' ';

        // If a whitespace is encountered then a word has ended,
        // which subsequently gets reversed in the following code.
        if (c !== ' ') continue;

        // Determine end index of the word and move it back by one
        // when the current character is a whitespace.
        let end = i;
        if (c === ' ') end--;

        // Reverse word in place
        let [st, en] = [start, end]
        do[list[en], list[st]] = [list[st], list[en]]
        while (++st < --en)

        // Determine the StartPointer of the next word.
        // Incremented by one to account for one whitespace between words.
        start = i + 1;
    }
}