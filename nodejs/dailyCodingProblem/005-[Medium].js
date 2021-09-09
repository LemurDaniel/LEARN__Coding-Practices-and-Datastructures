const Helper = require('../Helper');

const Inout = new (require('../Inout'))('Daily Coding Problem --- Multiply elements in array')

/*

    Good morning! Here's your coding interview problem for today.

        This problem was asked by Jane Street.

        cons(a, b) constructs a pair, and car(pair) and cdr(pair) returns the first and last element of that pair. 
        
        For example, car(cons(3, 4)) returns 3, and cdr(cons(3, 4)) returns 4.

        Given this implementation of cons:

        def cons(a, b):
            def pair(f):
                return f(a, b)
            return pair
        Implement car and cdr.

*/



function cons(a, b) {
    return function pair(f) {
        return f(a, b);
    };
}

Inout.input_stringConverter = arg => Helper.default_StringConverter(
    arg((a, b) => ({ a: a, b: b, cons: arg.toString() }))
)
Inout.input_Converter = arg => cons(...arg);


Inout.result_Equals = (out, res) => Helper.default_Equals(res.results, out);
Inout.result_Converter = (arg, { input }) => {
    return {
        functions: {
            car: arg.car.toString(),
            cdr: arg.cdr.toString()
        },
        results: {
            car: arg.car(input),
            cdr: arg.cdr(input)
        }
    }
}

Inout.push([3, 4], { car: 3, cdr: 4 })

Inout.solvers = [implementCdrAndCar];
Inout.solve();


/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/



function implementCdrAndCar() {
    return {
        car: cons => cons((a, b) => a),
        cdr: cons => cons((a, b) => b)
    }
}