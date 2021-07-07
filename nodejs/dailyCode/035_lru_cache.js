const Inout = new (require("../Inout"))("DailyCode --- Implement LRU Cache");
const { LRU_Node_Cache } = require('../datastructures/other');
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by Apple:

    LRU cache is a cache data structure that has limited space, and once there are more items in the cache than available space, it will preempt the least recently used item. What counts as recently used is any item a key has 'get' or 'put' called on it.

    Implement an LRU cache class with the 2 functions 'put' and 'get'. 'put' should place a value mapped to a certain key, and preempt items if needed. 'get' should return the value for a given key if it exists in the cache, and return None if it doesn't exist.

    Here's some examples and some starter code.

    class LRUCache:
    def __init__(self, space):
        # Fill this in.

    def get(self, key):
        # Fill this in.

    def put(self, key, value):
        # Fill this in.

    cache = LRUCache(2)

    cache.put(3, 3)
    cache.put(4, 4)
    print(cache.get(3))
    # 3
    print(cache.get(2))
    # None

    cache.put(2, 2)

    print(cache.get(4))
    # None (pre-empted by 2)
    print(cache.get(3))
    # 3

*/

Inout.push({ size: 2, operations: '&AR PUT 3 3|PUT 4 4|GET 4|GET 3|PUT 2 2|GET 4|GET 3' },
    '&AR ,,4,3,,None,3');

Inout.solvers = [lru_cache];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function lru_cache(size, operations) {

    const cache = new LRU_Node_Cache(size)
    const log = [];

    for (let op of operations) {

        if (op[0] == 'GET')
            log.push(cache.get(op[1]));
        else if (op[0] == 'PUT') {
            cache.put(op[1], op[2])
            log.push('');
        }
    }

    return log;
}