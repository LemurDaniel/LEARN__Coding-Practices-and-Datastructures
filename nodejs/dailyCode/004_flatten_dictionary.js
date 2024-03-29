const Inout = new (require('../Inout'))('DailyCode --- Flatten Dictionary');

/*
        Hi, here's your problem today. This problem was recently asked by Google:

        Given a nested dictionary, flatten the dictionary, where nested dictionary keys can be represented through dot notation.

        Example:
        Input: {
            'a': 1,
            'b': {
                'c': 2,
                'd': {
                'e': 3
                }
            }
        }
        Output: {
            'a': 1,
            'b.c': 2,
            'b.d.e': 3
        }
        You can assume there will be no arrays, and all keys will be strings.

        Here's some starter code:

        def flatten_dictionary(d):
        # Fill this in.

        d = {
            'a': 1,
            'b': {
                'c': 2,
                'd': {
                    'e': 3
                }
            }
        }
        print(flatten_dictionary(d))
        # {'a': 1, 'b.c': 2, 'b.d.e': 3}
*/



Inout.map_input = (inp, solver) => solver(inp);

// Testcases
Inout.push(
    { 'a': 1, 'b': { 'c': 2, 'd': { 'e': 3 } } },
    { 'a': 1, 'b.c': 2, 'b.d.e': 3 }
);
Inout.push(
    { 'a': 1, 'b': { 'c': 2, 'd': { 'e': 3, 'f': 2, 'd': 4 } } },
    { 'a': 1, 'b.c': 2, 'b.d.e': 3, 'b.d.f': 2, 'b.d.d': 4 }
);

Inout.push({
    "key": 3,
    "foo": {
        "a": 5,
        "bar": {
            "baz": 8
        }
    }
},
    {
        "key": 3,
        "foo.a": 5,
        "foo.bar.baz": 8
    }
)

Inout.solvers = [flatten_dictionary, flatten_dictionary2, flatten_dictionary_recursive];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function flatten_dictionary(dict) {

    let stack = Object.keys(dict);

    while (stack.length > 0) {

        // Pop next key and its value
        const key = stack.pop();
        const val = dict[key];

        // When already flat continue to next key
        if (typeof (val) != 'object') continue;

        // delete the to be flattened key from the main dicionary
        delete dict[key];

        // Parse keys of sub dictionary
        Object.keys(val).forEach(k => {
            // create new flattened key
            const flattend_key = key + '.' + k;
            // Put new flattend key and value back in the main dictionary
            dict[flattend_key] = val[k];

            // if the value of the flattend key can still be flattened even more
            // put it back as a key in the stack
            if (typeof (val[k]) == 'object')
                stack.push(flattend_key);
        });

    }

    return dict;
}

function flatten_dictionary2(dict) {

    const stack = Object.entries(dict);

    while (stack.length > 0) {

        const [key, val] = stack.pop();

        // Already flattened
        if (typeof val !== 'object') continue;

        delete dict[key];

        for (const [k, v] of Object.entries(val)) {

            const fK = key + '.' + k;
            dict[fK] = v;

            if (typeof v === 'object')
                stack.push([fK, v]);
        }

    }
}




function flatten_dictionary_recursive(dict) {

    let keys = Object.keys(dict);

    for (let i = 0; i < keys.length; i++) {

        // Pop next key and its value
        const key = keys[i];
        const val = dict[key];

        // When already flat continue to next key
        if (typeof (val) != 'object') continue;

        // delete the to be flattened key from the main dicionary
        delete dict[key];

        // Call itself again to clean out all possible sub dictionaries
        flatten_dictionary_recursive(val);

        // Parse keys of flattend sub dictionary
        Object.keys(val).forEach(k => dict[key + '.' + k] = val[k]);

    }

    return dict;
}