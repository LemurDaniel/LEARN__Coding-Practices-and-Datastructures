const Inout = new (require ('../Inout'))('DailyCode --- Character Map');

/*
    Hi, here's your problem today. This problem was recently asked by Google:

    Given two strings, find if there is a one-to-one mapping of characters between the two strings.

    Example
    Input: abc, def
    Output: True # a -> d, b -> e, c -> f

    Input: aab, def
    Ouput: False # a can't map to d and e 
    Here's some starter code:

    def has_character_map(str1, str2):
    # Fill this in.

    print(has_character_map('abc', 'def'))
    # True
    print(has_character_map('aac', 'def'))
    # False
*/

Inout.push({  str: 'abc', str2: 'def' }, true);
Inout.push({  str: 'aac', str2: 'def' }, false);

Inout.solvers = [solver1];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function solver1 (str1, str2)  {

    // length of shortest string
    const max_len = Math.min(str1.length, str2.length);

    // Always two entries required
    // if 'a' maps to 'd', then 'd' can only map back to 'a'
    const dict = {};
    for(let i=0; i<max_len; i++){

        const c1 = str1[i];
        const c2 = str2[i];

        // if values are already mapped to something else, 
        //  then no one-to-one mapping is possible anymore ==> return false
        if (c1 in dict && dict[c1] != c2) return false
        else if (c2 in dict && dict[c2] != c1) return false;

        // enter new entries, when not present
        else if(!(c1 in dict) && !(c2 in dict) ){
            dict[c1] = c2;
            dict[c2] = c1;
        }
    
    }

    return true;
}




