const Inout = new (require ('../Inout'))('DailyCode --- Unflatten Dictionary');

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
    {'a': 1, 'b.c': 2, 'b.d.e': 3},
    { 'a': 1, 'b': {'c': 2,'d': { 'e': 3 } } }
);
Inout.push(
    {'a': 1, 'b.c': 2, 'b.d.e': 3, 'b.d.f': 2, 'b.d.d': 4 },
    {'a': 1, 'b': {'c': 2,'d': { 'e': 3, 'f': 2, 'd': 4 } } }
);

Inout.push(
    {
        "key": 3,
        "foo.a": 5,
        "foo.bar.baz": 8
    },
    {
        "key": 3,
        "foo": {
            "a": 5,
            "bar": {
                "baz": 8
            }
        }
    }
)

Inout.solvers = [unflatten_dictionary];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function unflatten_dictionary (dict)  {

    for(let key of Object.keys(dict)){

        if(!key.includes('.')) continue;

        const sub_keys = key.split('.');
        const last_val = dict[key];
        const last_key = sub_keys.pop();

        delete dict[key];

        let curr_dict  = dict;

        for(let key of sub_keys) {
            if( !(key in curr_dict) ) curr_dict[key] = {};
            curr_dict = curr_dict[key]
        }

        curr_dict[last_key] = last_val;
    
    }

}