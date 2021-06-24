const Inout = new (require("../Inout"))("DailyCode --- Shift string");
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Apple:

    You are given two strings, A and B. Return whether A can be shifted some number of times to get B.

    Eg. A = abcde, B = cdeab should return true because A can be shifted 3 times to the right to get B. A = abc and B= acb should return false.

    def is_shifted(a, b):
    # Fill this in.
    
    print is_shifted('abcde', 'cdeab')
    # True


*/


Inout.output_string_converter = res => typeof res === 'number' ? 'Shift by '+(res+1) : 'String can\'t be shifted';
Inout.result_string_converter = Inout.output_string_converter;

Inout.push({
    normal: 'abcde',
    shifted: 'cdeab'
}, 2)

Inout.push({
    normal: 'abccde',
    shifted: 'cdeabc'
}, 3)

Inout.push({
    normal: 'abcede',
    shifted: 'cdeabc'
}, false)

Inout.solvers = [shiftString];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function shiftString( a, b ) {

    if(a.length != b.length) return false;

    for(let offset=0; offset < a.length; offset++) {

        // Loop until first char of 'b' apears in 'a'.
        if(a[offset] != b[0]) continue;

        let match = true;
        // Then check from there on if the shifted sequence matches.
        for(let i=0; i<a.length; i++) {
            // Offset indexes of a and wrap around from end to start.
            const idx = (i + offset) % a.length;
            if(b[i] === a[idx]) continue;
            match = false;
            break;
        }

        // If the sequence matches return trueM
        if(match) return offset;

    }

    return false;
}