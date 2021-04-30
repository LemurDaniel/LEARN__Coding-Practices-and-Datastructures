const Inout = new (require ('../Inout'))('DailyCode --- Remove outermost layer of parenthesis');
const Helper = require('../Helper');

/*
    Hi, here's your problem today. This problem was recently asked by Microsoft:

    Given a valid parenthesis string (with only '(' and ')', an open parenthesis will always end with a close parenthesis, and a close parenthesis will never start first), remove the outermost layers of the parenthesis string and return the new parenthesis string.

    If the string has multiple outer layer parenthesis (ie (())()), remove all outer layers and construct the new string. So in the example, the string can be broken down into (()) + (). By removing both components outer layer we are left with () + '' which is simply (), thus the answer for that input would be ().

    Here are some examples and some starter code.

    def remove_outermost_parenthesis(s):
    # Fill this in.

    print(remove_outermost_parenthesis('(())()'))
    # ()

    print(remove_outermost_parenthesis('(()())'))
    # ()()

    print(remove_outermost_parenthesis('()()()'))
*/

Inout.push( { input: '(())()', output: '()' } )
Inout.push( { input: '(()())', output: '()()' } )
Inout.push( { input: '()()()', output: '' } )
Inout.push( { input: '( (  )   )( )  ', output: '()' } )


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function remove_outermost_parenthesis(str) {

    result = '';
    let count = 0;

    for(let c of str) {
        if( c == '(' && count++ > 0) 
            result += c;
        else if ( c == ')' && count-- > 1 )
            result += c;
    }
    
    return result;
}


const rmp_one_line = (str, count = 0)  => str.split('').filter( c => (c == '(' && count++ > 0)  ||  (c == ')' && count-- > 1) ).join('');


Inout.solvers = [remove_outermost_parenthesis, rmp_one_line];
Inout.solve();