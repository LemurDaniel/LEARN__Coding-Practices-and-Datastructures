const LinkedList = require('./datastructures/linkedList');
const BTree = require('./datastructures/bTree');
const Queue = require('./datastructures/queue');
const { LinkedListFromString_Int } = require('./datastructures/linkedList');

const classes = [LinkedList, BTree.BinaryTree, Queue.NodeQueue, Queue.ArrayQueue];

const Helper = {};

Helper.uniform_string = function(str, len){
    while(str.length < len) str = ' '+str;
    return str;
}

Helper.random_Array = function(min, max, min_len, max_len) {
    const arr = [];
    const len = Math.round( Math.random() * (max_len - min_len) + min_len );
    for(let i=0; i<len; i++){
        arr.push( Math.floor( Math.random() * (max - min) + min ) );
    }
    return arr;
}

// ############################################################################
// ######### PRINT METHODS
// ############################################################################

Helper.matrix_toString = function(mat, len = 4) {

    let str = '\n';
    for(let row = 0; row<mat.length; row++) {
        str += '    ';
        for(let col = 0; col<mat[row].length; col++) 
            str += Helper.uniform_string(mat[row][col].toString(), len);
        str += '\n';
    }
    return str;

}

Helper.print_Array = function(arr, bl = ', ', open = '[ ', close = ' ]') {

    str = '';
    for(let i=0; i<arr.length; i++) {

        if(Array.isArray(arr[i]))          str += Helper.print_Array(arr[i], bl, '( ', ' )');
        else if(typeof arr[i] == 'string') str += "'"+arr[i]+"'";
        else                               str += arr[i]

        str += (i != arr.length-1 ? bl : '');
    }
    return open + str + close;
}

Helper.print_map = function(map, depth = 5) {

    // return nothing if map is null
    if(!map) return '';

    // Get all keys of the map an loop though them.
    const keys = Object.keys(map);

    let str = '';
    keys.forEach( k => {

        // Get value for the corresponding key.
        let val = map[k];

        // If the value of the key is an array, then call the specific function for printing arrays.
        if(Array.isArray(val)) val = Helper.print_Array(val);

        // Call toString funtions if the type is a LinkedList or BinaryTree or Queue
        else if(val instanceof LinkedList) val = val.toString();
        else if(val instanceof BTree.BinaryTree) val = val.toString();
        else if(val instanceof Queue.NodeQueue)  val = val.toString();
        else if(val instanceof Queue.ArrayQueue) val = val.toString();

        // If the value is itself an object, then print its content recursivley.
        else if(typeof val == 'object') val = Helper.print_map(val, depth+2);

        // Create a string with correct indentations and the key and value.
        str += '\n' + Helper.uniform_string('  ', depth) + k + ': ' + val
    });

    return str;
}

// ############################################################################
// ######### EUQALS METHODS
// ############################################################################

Helper.Array_equals = function(arr, arr1){


    if(!Array.isArray(arr) || !Array.isArray(arr1)) return false;
    if(arr.length != arr1.length) return false;

    for(let i=0; i<arr.length; i++){

        const el = arr[i];
        const el1 = arr1[i];

        if(Array.isArray(el)) {
            if(!Helper.Array_equals(el, el1)) return false;
        } else if(typeof el == 'object') {
            if(!el.equals(el1)) return false;
        }
        else if(el != el1)
            return false; 
    }

    return true;
}

Helper.Array_has_same_values = function(arr, arr1){

    if(!Array.isArray(arr) || !Array.isArray(arr1)) return false;
    if(arr.length != arr1.length) return false;

    const dict = {};

    for(let i=0; i<arr.length; i++){

        const el = arr[i];
        const el1 = arr1[i];

        if(el in dict) delete dict[el];
        else dict[el] = 0;

        if(el1 in dict) delete dict[el1];
        else dict[el1] = 0;

    }

    return Object.keys(dict).length == 0;
}

Helper.scramble_Array = function (arr, cycles = 10e2) {

    for(let i = 0; i<cycles; i++) {
        const r1 = Math.floor(Math.random() * arr.length);
        const r2 = Math.floor(Math.random() * arr.length);

        const temp = arr[r1];
        arr[r1] = arr[r2];
        arr[r2] = temp;

    }

    return arr;
}


// ############################################################################
// ######### CONVERT STRINGS TO OBJECTS
// ############################################################################

Helper.string_toArray = function(str) {

    // Define variables.
    const matrix = [];
    const sub_strs = str.split('|');

    for(let i=0; i<sub_strs.length; i++) {
        
        // Define char for splitting array.
        let split = '';
        if(sub_strs[i].includes(',')) split = ',';
        else if(sub_strs[i].includes(' ')) split = ' ';

        // Split array and trim its contents.
        const array = sub_strs[i].split(split);
        for(let i in array) array[i] = array[i].trim();

        // return 1D array or generate matrix depending on input string.
        if(sub_strs.length == 1) return array
        else matrix.push(array);
    }
    return matrix;

}

Helper.string_toIntArray = function(str, split = ' ') {

    // Define variables.
    const matrix = [];
    const sub_strs = str.split('|');

    for(let i=0; i<sub_strs.length; i++) {

        // Split the curren substring according to chosen split char.
        if(sub_strs[i].includes(',')) split = ',';
        const array = sub_strs[i].split(split);

        // Loop through the array and convert its contents to numbers.
        for(let i in array){
            array[i]    = array[i].trim();
            const num   = parseInt( array[i] );
            if( !isNaN(num) ) array[i] = num;
        }

        // If there is only one substring in 'str' then return a 1D array.
        if(sub_strs.length == 1) return array;
        // else push the array into a matrix.
        else matrix.push(array);
    }
    return matrix;
}

// converts all strings in an object to the desired object
Helper.convert_strings_in_object = function(obj) {

    const keywords_arr = ['nums', 'arr', 'points'];
    const keywords_list = ['list'];
    const keywords_tree = ['tree','subtree'];

    if (typeof obj == 'function') return obj;
    else if (typeof obj == 'string') return convert_string(obj);
    else if (typeof obj == 'object') {
        for (let key of Object.keys(obj)) {

            if( typeof obj[key] == 'string' ){

                if(obj[key][0] == '&') obj[key] = convert_string(obj[key]);
                else if( keywords_arr.includes(key) ) obj[key] = Helper.string_toIntArray(obj[key]);
                else if( keywords_list.includes(key) ) obj[key] = LinkedList.LinkedListFromString_Int(obj[key]);
                else if( keywords_tree.includes(key) ) obj[key] = BTree.BinaryTree.GenerateIntPreorderFromString(obj[key]);
            }

            else if( typeof obj[key] == 'object' ) obj[key] = Helper.convert_strings_in_object(obj[key]);
        }
    }

    return obj;
}

// converts string to the desired object
function convert_string(str) {

    const keychars_normal_arr = '&NA';
    const keychars_normal_int_arr = '&NI';
    const keychars_int_arr = '&AR';
    const keychars_list = '&LL';
    const keychars_tree = '&BT';

    if(str[0] == '&') {
        const chars = str.substr(0,3);
        const substr = str.substr((str[3] == ' ' ? 4 : 3), str.length);

        if( chars == keychars_normal_arr ) return Helper.string_toArray(substr);
        else if( chars == keychars_int_arr ) return Helper.string_toIntArray(substr);
        else if( chars == keychars_normal_int_arr ) return Helper.string_toIntArray(substr, '');
        else if( chars == keychars_list ) return LinkedList.LinkedListFromString_Int(substr);
        else if( chars == keychars_tree ) return BTree.BinaryTree.GenerateIntPreorderFromString(substr);
    }
    else return str;
}


// ############################################################################
// ######### DEFAULT METHODS
// ############################################################################

// Copys 
Helper.default_copy = function(arg) {

    // If object has a copy method, then use it.
    if(arg.copy) return arg.copy();

    // If arg is an object then copy all keys and their values.
    if(typeof arg == 'object' && !Array.isArray(arg)) {
        const copy = {};
        for(let key of Object.keys(arg))
            copy[key]   = Helper.default_copy(arg[key]);

        return copy;
    }

    return JSON.parse(JSON.stringify(arg));

}

// Standard converter to convert arguments into string for display in console.
Helper.default_converter = function(arg) {

    for(let c of classes)
        if ( arg instanceof c ) return arg.toString();

    if(Array.isArray(arg)) return Helper.print_Array(arg);
    else if(typeof arg == 'function') return '(function) ' + arg.name;
    else if(typeof arg == 'object')   return Helper.print_map(arg);
    else return arg.toString();

}

// Standard mapper to map arguments to the solver functions
Helper.default_mapper = function(arg, solver) {

    for(let c of classes)
        if ( arg instanceof c ) return solver(arg);

    if(Array.isArray(arg) || typeof arg != 'object')    return solver(arg);
    else    return solver(...Object.values(arg));
}


// ############################################################################
// ######### BINARY SEARCH
// ############################################################################

Helper.binary_search = function(nums, target, lower, upper)  {

    upper = upper ?? nums.length-1;
    lower = lower ?? 0;

    while(upper > lower) {
        const mid = Math.round( (upper + lower) / 2 );

        if( nums[mid] < target ) lower = mid + 1;
        else if( nums[mid] > target ) upper = mid - 1;
        else return mid;
    }

    return -1;
}


// Note: https://medium.com/@CalvinChankf/how-to-deal-with-lower-upper-bound-binary-search-b9ce744673df

Helper.binary_search_lower_bound = function(nums, target, lower, upper)  {

    upper = upper ?? nums.length-1;
    lower = lower ?? 0;

    while(upper > lower) {
        const mid = Math.floor( (upper + lower) / 2 );

        // console.log( '  Upper: ' + upper + '    Lower: ' + lower + '    Mid: ' + mid + '    Element: ' + nums[mid])
        if( nums[mid] >= target ) upper = mid;
        else lower = mid + 1;
       
        if( nums[lower] == target )
            return lower;
    }

    return -1;
}

Helper.binary_search_upper_bound = function(nums, target, lower, upper)  {

    upper = upper ?? nums.length-1;
    lower = lower ?? 0;

    while(upper > lower) {
        const mid = Math.ceil( (upper + lower) / 2 );

        if( nums[mid] <= target ) lower = mid;
        else upper = mid - 1;
       
        if( nums[upper] == target )
            return upper;
    }

    return -1;
}

module.exports = Helper;