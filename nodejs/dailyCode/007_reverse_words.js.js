const Inout = new (require ('../Inout'))('DailyCode --- Reverse Words');

/*
    Hi, here's your problem today. This problem was recently asked by Apple:

        Given a list of words in a string, reverse the words in-place (ie don't create a new string and reverse the words). Since python strings are not mutable, you can assume the input will be a mutable sequence (like list).

        Here's an example and some starting code:

        def reverse_words(words):
        # Fill this in.

        s = list("can you read this")
        reverse_words(s)
        print(''.join(s))
        # this read you can
*/

Inout.input_string_converter = inp => inp.join('');

Inout.convert_input = inp => inp.split('');
Inout.convert_result = res => res.join('');

// Testcases
Inout.testcases.push({  input: 'can you read this', output: 'this read you can' });
Inout.testcases.push({  input: 'can    you read this', output: 'this read you    can' });


Inout.solvers = [reverse_words_in_place];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function reverse_words_in_place (list)  {

    // reverts all characters in sequence
    reverse_sequence = (start, end) =>{
        while(start < end){
            const temp = list[end];
            list[end] = list[start];
            list[start] = temp;
            start++;
            end--;
        }
    }

    // first pass to revert all characters in place
    reverse_sequence(0, list.length);

    // second pass to revert individual words
    for(let start=0, i=0; i<list.length; i++){

        // whitespace marks the end of the previous word
        if(list[i] != ' ' && i != list.length-1 ) continue;

        // if i points to whitespace, use previous character else not
        let end = (list[i] != ' ' ? i:i-1);

        // reverse word in place
        reverse_sequence(start, end)

        // increase start pointer
        start = i+1;
    }
}