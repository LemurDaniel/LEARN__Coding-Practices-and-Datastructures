const LinkedList = require('./datastructures/linkedList');
const BTree = require('./datastructures/bTree');
const Queue = require('./datastructures/queue');
const { Vector } = require('./datastructures/other')
const fs = require('fs');

const classes = [LinkedList, BTree.BinaryTree, BTree.BinaryTree.Node, Queue.NodeQueue, Queue.ArrayQueue];

const Helper = {};

Helper.reapeatSequence = function (sequence, len) {
    return new Array(len).fill(sequence).join('');
}

Helper.uniformString = function (str, len) {
    while (str.length < len) str = ' ' + str;
    return str;
}

Helper.randomArray = function (min, max, min_len, max_len) {
    const arr = [];
    const len = Math.round(Math.random() * (max_len - min_len) + min_len);
    for (let i = 0; i < len; i++) {
        arr.push(Math.floor(Math.random() * (max - min) + min));
    }
    return arr;
}

// ############################################################################
// ######### PRINT METHODS
// ############################################################################

Helper.printMatrix = function (mat, rows_vertical = true, len = 4) {

    let str = '\n';
    if (!rows_vertical) {
        for (let col = mat[0].length - 1; col >= 0; col--, str += '\n') {
            for (let row = 0; row < mat.length; row++)
                str += Helper.uniformString(mat[row][col].toString(), len);
        }
    }
    else {
        for (let row = 0; row < mat.length; row++, str += '\n') {
            for (let col = 0; col < mat[row].length; col++)
                str += Helper.uniformString(mat[row][col].toString(), len);
        }
    }
    return str;
}

Helper.printArray = function (arr, mapDepth = 0, bl = ', ', open = '[ ', close = ' ]') {

    str = open;
    for (let i = 0; i < arr.length; i++) {

        if (Array.isArray(arr[i]))
            str += Helper.printArray(arr[i], mapDepth, bl, '( ', ' )');
        else
            str += Helper.default_StringConverter(arr[i], mapDepth + 2);

        if (i > 100) {
            str += ' >>> ' + (arr.length - i) + ' more items ';
            break;
        }

        str += (i != arr.length - 1 ? bl : '');
    }

    if (str.includes('\n')) str += '\n' + Helper.reapeatSequence(' ', mapDepth)
    return str + close;
}

Helper.printMap = function (map, mapDepth = 0) {

    let str = mapDepth === -1 ? '\n     { ' : '';

    for (let [key, val] of Object.entries(map)) {

        if (key.includes('matrix'))
            val = Helper.printMatrix(val);
        else
            val = Helper.default_StringConverter(val, mapDepth + 2);

        // Create a string with correct indentations and the key and value.
        if (mapDepth > 0)
            str += `\n${Helper.reapeatSequence(' ', mapDepth)}${key}: ${val}`
        else
            str += `${key}: ${val}\n`;
    }

    if (mapDepth === -1)
        return str.substr(0, str.length - 2) + ' }';
    else
        return str;
}


// ############################################################################
// ######### EUQALS METHODS
// ############################################################################

Helper.ArrayEquals = function (arr, arr1) {


    if (!Array.isArray(arr) || !Array.isArray(arr1)) return false;
    if (arr.length != arr1.length) return false;

    for (let i = 0; i < arr.length; i++) {

        const el = arr[i];
        const el1 = arr1[i];

        if (Array.isArray(el)) {
            if (!Helper.ArrayEquals(el, el1)) return false;
        } else if (typeof el == 'object') {
            if (!el.equals(el1)) return false;
        }
        else if (el != el1)
            return false;
    }

    return true;
}

Helper.hasArray_sameValues = function (arr, arr1) {

    if (!Array.isArray(arr) || !Array.isArray(arr1)) return false;
    if (arr.length != arr1.length) return false;

    const dict = {};

    for (let i = 0; i < arr.length; i++) {

        const el = arr[i];
        const el1 = arr1[i];

        if (el in dict) delete dict[el];
        else dict[el] = 0;

        if (el1 in dict) delete dict[el1];
        else dict[el1] = 0;

    }

    return Object.keys(dict).length == 0;
}

Helper.scrambleArray = function (arr, cycles = 10e2) {

    for (let i = 0; i < cycles; i++) {
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

Helper.string_toArray = function (str, split = '') {

    // Define variables.
    const matrix = [];
    const sub_strs = str.split('|');

    for (let i = 0; i < sub_strs.length; i++) {

        // Define char for splitting array.
        if (sub_strs[i].includes(',')) split = ',';
        else if (sub_strs[i].includes('\r\n')) split = '\r\n';
        else if (sub_strs[i].includes(' ')) split = ' ';

        // Split array and trim its contents.
        const array = sub_strs[i].split(split);
        for (let i in array) array[i] = array[i].trim();

        // return 1D array or generate matrix depending on input string.
        if (sub_strs.length == 1) return array
        else matrix.push(array);
    }
    return matrix;

}

Helper.string_toIntArray = function (str, split = ' ') {

    // Define variables.
    const matrix = [];
    const sub_strs = str.split('|');

    for (let i = 0; i < sub_strs.length; i++) {

        // Split the curren substring according to chosen split char.
        if (sub_strs[i].includes(',')) split = ',';
        else if (sub_strs[i].includes('\r\n')) split = '\r\n';
        else if (sub_strs[i].includes(' ')) split = ' ';

        const array = sub_strs[i].split(split);

        // Loop through the array and convert its contents to numbers.
        for (let i in array) {
            array[i] = array[i].trim();
            const num = parseInt(array[i]);
            if (!isNaN(num)) array[i] = num;
        }

        // If there is only one substring in 'str' then return a 1D array.
        if (sub_strs.length == 1) return array;
        // else push the array into a matrix.
        else matrix.push(array);
    }
    return matrix;
}

// ############################################################################
// ######### DEFAULT METHODS
// ############################################################################

// converts all strings in an object to the desired object
Helper.default_Converter = function (obj, testcase) {

    if (typeof obj === 'string') return convertString(obj, testcase);

    else if (typeof obj === 'object') {
        for (const [key, val] of Object.entries(obj)) {

            if (typeof val === 'string' && val[0] === '&')
                obj[key] = convertString(val, testcase);

            else if (typeof val === 'object')
                obj[key] = Helper.default_Converter(obj[key], testcase);
        }
    }

    return obj;
}

// converts string to the desired object
function convertString(str, testcase) {

    if (str[0] !== '&') return str;

    const keychars = {
        '&NA': str => Helper.string_toArray(str),
        '&NI': str => Helper.string_toIntArray(str, ''),
        '&AR': str => Helper.string_toIntArray(str),
        '&PT': str => Helper.string_toIntArray(str).map(v => new Vector(v[0], v[1])),
        '&LL': str => LinkedList.LinkedListFromString(str),
        '&BT': str => BTree.BinaryTree.GenerateIntPreorderFromString(str),
        '&FS': str => {
            const args = Helper.string_toArray(str);
            const file = fs.readFileSync(args[0], 'utf-8');
            return convertString(args[1] + ' ' + file);
        },
        '&RF': str => {
            let obj = testcase;
            for (ref of str.split('.')) obj = obj[ref];
            return obj;
        }
    }

    const chars = str.substr(0, 3);
    const substr = str.substr((str[3] == ' ' ? 4 : 3), str.length);

    if (chars in keychars)
        return keychars[chars](substr);
    else
        return str;
}

// Copys 
Helper.default_Copy = function (arg) {

    // If object has a copy method, then use it.
    if (arg === undefined || arg === null)
        return arg
    else if (typeof arg === 'function')
        return arg;
    else if (arg.copy)
        return arg.copy();

    // If arg is an object then copy all keys and their values.
    if (typeof arg === 'object' && !Array.isArray(arg)) {
        const copy = {};
        for (let key of Object.keys(arg))
            copy[key] = Helper.default_Copy(arg[key]);

        return copy;
    }

    return JSON.parse(JSON.stringify(arg));
}

// Standard converter to convert arguments into string for display in console.
Helper.default_StringConverter = function (arg, mapDepth = 0) {

    if (arg === undefined) return '<undefined>';
    if (arg === null) return '<null>';
    if (arg.print) return arg.print();

    if (typeof arg === 'string') {
        if (arg.includes('\n'))
            return `\n'${arg}'`;
        else
            return `'${arg}'`;
    }

    if (Array.isArray(arg))
        return Helper.printArray(arg, mapDepth);

    if (typeof arg === 'function')
        return `[Function (${!arg.name ? 'anonymous' : arg.name})]`;

    if (typeof arg === 'object')
        return Helper.printMap(arg, mapDepth);

    return arg.toString();

}

Helper.default_Comparator = function (arg1, arg2) {

    if (arg1 === arg2) return true;
    if (typeof arg1 !== typeof arg2) return false;

    if (arg1.compare) return arg1.compare(arg2);

    if (typeof arg1 === 'object') {

        for (const key of Object.keys({ ...arg1, ...arg2 })) {

            const [val1, val2] = [arg1[key], arg2[key]];
            const res = Helper.default_Comparator(val1, val2);

            if (!res) return false;
        }
        return true;
    }

    return JSON.stringify(arg1) === JSON.stringify(arg2);
}


// Standard mapper to map arguments to the solver functions
Helper.default_Mapper = function (arg, solver) {

    for (let c of classes) {
        if (arg instanceof c) return solver(arg);
    }

    if (Array.isArray(arg) || typeof arg !== 'object') return solver(arg);

    const methodHead = solver.toString().split('{')[0];
    const argStartIndex = methodHead.indexOf('(');
    const argEndIndex = methodHead.lastIndexOf(')');

    const parameters = methodHead
        .slice(argStartIndex + 1, argEndIndex).split(',')
        .map(param => param.trim());

    const keysArg = { ...arg };
    const mapping = parameters.map(v => {
        delete keysArg[v];
        return arg[v];
    })
        .filter(v => v !== undefined)
        .concat(Object.values(keysArg));

    return solver(...mapping);
}


// ############################################################################
// ######### BINARY SEARCH
// ############################################################################

Helper.binarySearch = function (nums, target, lower, upper) {

    upper = upper ?? nums.length - 1;
    lower = lower ?? 0;

    while (upper > lower) {
        const mid = lower + Math.round((upper - lower) / 2);

        if (nums[mid] < target) lower = mid + 1;
        else if (nums[mid] > target) upper = mid - 1;
        else return mid;
    }

    return -1;
}


// Note: https://medium.com/@CalvinChankf/how-to-deal-with-lower-upper-bound-binary-search-b9ce744673df

Helper.binarySearch_lowerBound = function (nums, target, lower, upper) {

    upper = upper ?? nums.length - 1;
    lower = lower ?? 0;

    while (upper > lower) {
        const mid = lower + Math.floor((upper - lower) / 2);

        // console.log( '  Upper: ' + upper + '    Lower: ' + lower + '    Mid: ' + mid + '    Element: ' + nums[mid])
        if (nums[mid] >= target) upper = mid;
        else lower = mid + 1;

        if (nums[lower] == target)
            return lower;
    }

    return -1;
}

Helper.binarySearch_upperBound = function (nums, target, lower, upper) {

    upper = upper ?? nums.length - 1;
    lower = lower ?? 0;

    while (upper > lower) {
        const mid = lower + Math.ceil((upper - lower) / 2);

        if (nums[mid] <= target) lower = mid;
        else upper = mid - 1;

        if (nums[upper] == target)
            return upper;
    }

    return -1;
}

// ############################################################################
// ######### SORTING
// ############################################################################

Helper.MergeSort = {};

Helper.MergeSort.sort = function (list) {
    if (list instanceof LinkedList) Helper.MergeSort.sortLinkedList(list);
    else if (Array.isArray(list)) Helper.MergeSort.sortArray(list);
    else throw 'Datatype not supported';
}

Helper.MergeSort.sortLinkedList = function (list, lower, upper) {
    if (lower == null) lower = list.head;
    if (upper == null) upper = list.tail;

    // If partition is of size on then return.
    if (lower == upper) return list;

    // Find middle node via runner and walker pattern.
    let walker = lower;
    let runner = walker.next;

    while (runner != upper) {
        walker = walker.next;
        runner = runner.next;
        if (runner == upper) break;
        else runner = runner.next;
    }

    // Partition list until it each partition is of size 1.
    Helper.MergeSort.sortLinkedList(list, lower, walker);
    Helper.MergeSort.sortLinkedList(list, walker.next, upper);

    // Sort and Merge partitions recursivley.
    Helper.MergeSort.mergeLinkedList(list, lower, walker, upper);
}

Helper.MergeSort.mergeLinkedList = function (list, lower, middle, upper) {

    // Create temporary array containing the elements of the lower and upper parts.
    const arr_lower = [];
    const arr_upper = [];

    for (let i = lower; i != middle.next; i = i.next) arr_lower.push(i.val);
    for (let i = middle.next; i != upper.next; i = i.next) arr_upper.push(i.val);

    /*
 
        console.log(list.toString());
        console.log('LOWER: ' + lower.val + ' MID: ' + middle.val + ' UPPER: ' + upper.val)
        console.log(arr_lower);
        console.log(arr_upper);
        console.log('--------------------------------')

    */

    // Merge temporary arrays into the original array.
    let idx_lower = 0;
    let idx_upper = 0;
    let node = lower;

    while (idx_lower < arr_lower.length && idx_upper < arr_upper.length) {

        if (arr_lower[idx_lower] <= arr_upper[idx_upper])
            node.val = arr_lower[idx_lower++];
        else
            node.val = arr_upper[idx_upper++];

        node = node.next;
    }

    while (idx_lower < arr_lower.length) {
        node.val = arr_lower[idx_lower++];
        node = node.next;
    };
    while (idx_upper < arr_upper.length) {
        node.val = arr_upper[idx_upper++];
        node = node.next;
    };

}

Helper.MergeSort.sortArray = function (arr, lower, upper) {
    if (lower == null) lower = 0;
    if (upper == null) upper = arr.length;

    // Recursive divding of array into partitions until length of 1.
    if (upper - lower == 1) return arr;

    const middle = Math.floor(lower + (upper - lower) / 2);
    //console.log( 'LOWER: ' + lower + '    UPPER: ' + upper + '  MIDDLE:  ' + middle)

    Helper.MergeSort.sortArray(arr, lower, middle);
    Helper.MergeSort.sortArray(arr, middle, upper);

    // Sorting and merging each partition recursivley back.
    Helper.MergeSort.mergeArray(arr, lower, middle, upper);
}

Helper.MergeSort.mergeArray = function (arr, lower, middle, upper) {

    // Create temporary array containing the elements of the lower and upper parts.
    const arr_lower = [];
    const arr_upper = [];

    for (let i = lower; i < middle; i++) arr_lower.push(arr[i]);
    for (let i = middle; i < upper; i++) arr_upper.push(arr[i]);
    /*
        console.log( 'LOWER: ' + lower + '    UPPER: ' + upper + '  MIDDLE:  ' + middle)
        console.log(arr_lower);
        console.log(arr_upper);
        console.log('---------------------------')
    */

    // Merge temporary arrays into the original array.
    let idx_lower = 0;
    let idx_upper = 0;
    let idx_target = lower;

    while (idx_lower < arr_lower.length && idx_upper < arr_upper.length) {

        if (arr_lower[idx_lower] <= arr_upper[idx_upper])
            arr[idx_target++] = arr_lower[idx_lower++];
        else
            arr[idx_target++] = arr_upper[idx_upper++];

    }

    while (idx_lower < arr_lower.length) arr[idx_target++] = arr_lower[idx_lower++];
    while (idx_upper < arr_upper.length) arr[idx_target++] = arr_upper[idx_upper++];
}


Helper.CountingSort = {}
Helper.CountingSort.Find_Bounds = function (list) {


    let max;
    let min;

    for (let val of list) {
        max = Math.max(val, max ?? val);
        min = Math.min(val, min ?? val);
    }

    return [min, max];

}

Helper.CountingSort.sort = function (list) {

    const bounds = Helper.CountingSort.Find_Bounds(list);

    const min = bounds[0];
    const max = bounds[1];

    const offset = -min;
    const size = max - min + 1;


    const index_array = new Array(size).fill(0);

    for (let val of list)
        index_array[val + offset]++;


    let node;
    let pos = 0;
    if (list instanceof LinkedList) node = list.head;

    for (let i = 0; i < index_array.length; i++) {
        while (index_array[i]--) {
            if (node) {
                node.val = i - offset;
                node = node.next;
            }
            else list[pos++] = i - offset;

        }
    }

}


module.exports = Helper;