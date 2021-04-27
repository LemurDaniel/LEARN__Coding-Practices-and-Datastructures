const Inout = new (require ('../Inout'))('DailyCode --- Remove adjacent duplicate character');

/*
    Hi, here's your problem today. This problem was recently asked by Apple:

    Given a string, we want to remove 2 adjacent characters that are the same, and repeat the process with the new string until we can no longer perform the operation.

    Here's an example and some starter code:

    def remove_adjacent_dup(s):
    # Fill this in.

    print(remove_adjacent_dup("cabba"))
    # Start with cabba
    # After remove bb: caa
    # After remove aa: c
    # print c
*/

Inout.push('cabba', 'c');

Inout.solvers = [remove_adjacent_characters];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


function remove_adjacent_characters (str)  {

    const stack = [];

    for(char of str) {
        if(stack[stack.length-1] == char) stack.pop();
        else stack.push(char)
    }

    return stack.join('');
}