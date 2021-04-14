const Inout = new (require ('../../Inout'))('DailyCode --- Simplify Unix-style path');

/*
    Given an absolute path for a file (Unix-Style), simplify it.

    For example:
    path = "/home/" => "/home"
    path = "/a/./b/../../c/" => "/c"
*/

Inout.testcases.push( { input: '/home/', output: '/home' } );
Inout.testcases.push( { input: '/a/./b/../../c/', output: '/c' } );

Inout.solvers = [simplify_path];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


/*
    Push all valid parts of the path to a stack.
    Whenever an '..' is encountered pop the last element of
    the stack, to go on folder upwards in path.
    Ignore all spaces ' ' and '.'
*/

function simplify_path (path)  {

    const stack = [];

    for(let token of path.split('/')) {
        if(token == '..' && stack.length != 0) stack.pop(); 
        else if(' .'.includes(token)) continue;
        else stack.push( '/' + token);
    }

    return stack.join('');
}