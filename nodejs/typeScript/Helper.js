"use strict";
exports.__esModule = true;
exports.Helper = void 0;
var BTree = require('./datastructures/bTree');
var Queue = require('./datastructures/queue');
var fs = require('fs');
var LinkedList_1 = require("./datastructures/LinkedList");
var classes = [BTree.BinaryTree, BTree.BinaryTree.Node, Queue.NodeQueue, Queue.ArrayQueue];
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.uniform_string = function (str, len) {
        while (str.length < len)
            str = ' ' + str;
        return str;
    };
    Helper.random_Array = function (min, max, min_len, max_len) {
        var arr = [];
        var len = Math.round(Math.random() * (max_len - min_len) + min_len);
        for (var i = 0; i < len; i++) {
            arr.push(Math.floor(Math.random() * (max - min) + min));
        }
        return arr;
    };
    // ############################################################################
    // ######### PRINT METHODS
    // ############################################################################
    Helper.matrix_toString = function (mat, rows_vertical, len) {
        if (rows_vertical === void 0) { rows_vertical = true; }
        if (len === void 0) { len = 4; }
        var str = '\n';
        if (!rows_vertical) {
            for (var col = mat[0].length - 1; col >= 0; col--) {
                str += '    ';
                for (var row = 0; row < mat.length; row++)
                    str += Helper.uniform_string(mat[row][col].toString(), len);
                str += '\n';
            }
        }
        else {
            for (var row = 0; row < mat.length; row++) {
                str += '    ';
                for (var col = 0; col < mat[row].length; col++)
                    str += Helper.uniform_string(mat[row][col].toString(), len);
                str += '\n';
            }
        }
        return str;
    };
    // ############################################################################
    // ######### EUQALS METHODS
    // ############################################################################
    Helper.Array_equals = function (arr, arr1) {
        if (!Array.isArray(arr) || !Array.isArray(arr1))
            return false;
        if (arr.length != arr1.length)
            return false;
        for (var i = 0; i < arr.length; i++) {
            var el = arr[i];
            var el1 = arr1[i];
            if (Array.isArray(el)) {
                if (!Helper.Array_equals(el, el1))
                    return false;
            }
            else if (typeof el == 'object') {
                if (!el.equals(el1))
                    return false;
            }
            else if (el != el1)
                return false;
        }
        return true;
    };
    Helper.Array_has_same_values = function (arr, arr1) {
        if (!Array.isArray(arr) || !Array.isArray(arr1))
            return false;
        if (arr.length != arr1.length)
            return false;
        var dict = {};
        for (var i = 0; i < arr.length; i++) {
            var el = arr[i];
            var el1 = arr1[i];
            if (el in dict)
                delete dict[el];
            else
                dict[el] = 0;
            if (el1 in dict)
                delete dict[el1];
            else
                dict[el1] = 0;
        }
        return Object.keys(dict).length == 0;
    };
    Helper.scramble_Array = function (arr, cycles) {
        if (cycles === void 0) { cycles = 10e2; }
        for (var i = 0; i < cycles; i++) {
            var r1 = Math.floor(Math.random() * arr.length);
            var r2 = Math.floor(Math.random() * arr.length);
            var temp = arr[r1];
            arr[r1] = arr[r2];
            arr[r2] = temp;
        }
        return arr;
    };
    // ############################################################################
    // ######### CONVERT STRINGS TO OBJECTS
    // ############################################################################
    Helper.string_toArray = function (str, split) {
        if (split === void 0) { split = ''; }
        // Define variables.
        var matrix = [];
        var sub_strs = str.split('|');
        for (var i = 0; i < sub_strs.length; i++) {
            // Define char for splitting array.
            if (sub_strs[i].includes(','))
                split = ',';
            else if (sub_strs[i].includes('\r\n'))
                split = '\r\n';
            else if (sub_strs[i].includes(' '))
                split = ' ';
            // Split array and trim its contents.
            var array = sub_strs[i].split(split);
            for (var i_1 in array)
                array[i_1] = array[i_1].trim();
            // return 1D array or generate matrix depending on input string.
            if (sub_strs.length == 1)
                return array;
            else
                matrix.push(array);
        }
        return matrix;
    };
    Helper.string_toIntArray = function (str, split) {
        if (split === void 0) { split = ' '; }
        // Define variables.
        var matrix = [];
        var sub_strs = str.split('|');
        for (var i = 0; i < sub_strs.length; i++) {
            // Split the curren substring according to chosen split char.
            if (sub_strs[i].includes(','))
                split = ',';
            else if (sub_strs[i].includes('\r\n'))
                split = '\r\n';
            else if (sub_strs[i].includes(' '))
                split = ' ';
            var array = sub_strs[i].split(split);
            // Loop through the array and convert its contents to numbers.
            for (var i_2 in array) {
                array[i_2] = array[i_2].trim();
                var num = parseInt(array[i_2]);
                if (!isNaN(num))
                    array[i_2] = num;
            }
            // If there is only one substring in 'str' then return a 1D array.
            if (sub_strs.length == 1)
                return array;
            // else push the array into a matrix.
            else
                matrix.push(array);
        }
        return matrix;
    };
    // converts all strings in an object to the desired object
    Helper.convert_strings_in_object = function (obj, testcase) {
        var keywords_arr = ['nums', 'arr', 'points'];
        var keywords_list = ['list'];
        var keywords_tree = ['tree', 'subtree'];
        if (typeof obj == 'function')
            return obj;
        else if (typeof obj == 'string')
            return Helper.convert_string(obj, testcase);
        else if (typeof obj == 'object') {
            for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
                var key = _a[_i];
                if (typeof obj[key] == 'string') {
                    if (obj[key][0] == '&')
                        obj[key] = Helper.convert_string(obj[key], testcase);
                    else if (keywords_arr.includes(key))
                        obj[key] = Helper.string_toIntArray(obj[key]);
                    else if (keywords_list.includes(key))
                        obj[key] = LinkedList_1.LinkedList.LinkedListFromString_Int(obj[key]);
                    else if (keywords_tree.includes(key))
                        obj[key] = BTree.BinaryTree.GenerateIntPreorderFromString(obj[key]);
                }
                else if (typeof obj[key] == 'object')
                    obj[key] = Helper.convert_strings_in_object(obj[key], testcase);
            }
        }
        return obj;
    };
    // converts string to the desired object
    Helper.convert_string = function (str, testcase) {
        var keychars = {
            '&NA': function (str) { return Helper.string_toArray(str); },
            '&NI': function (str) { return Helper.string_toIntArray(str, ''); },
            '&AR': function (str) { return Helper.string_toIntArray(str); },
            '&LL': function (str) { return LinkedList_1.LinkedList.LinkedListFromString_Int(str); },
            '&BT': function (str) { return BTree.BinaryTree.GenerateIntPreorderFromString(str); },
            '&FS': function (str) {
                var args = Helper.string_toArray(str);
                var file = fs.readFileSync(args[0], 'utf-8');
                return Helper.convert_string(args[1] + ' ' + file, testcase);
            },
            '&RF': function (str) {
                var obj = testcase;
                for (var _i = 0, _a = str.split('.'); _i < _a.length; _i++) {
                    var ref = _a[_i];
                    obj = obj[ref];
                }
                return obj;
            }
        };
        if (str[0] == '&') {
            var chars = str.substr(0, 3);
            var substr = str.substr((str[3] == ' ' ? 4 : 3), str.length);
            if (chars in keychars)
                return keychars[chars](substr);
        }
        return str;
    };
    // ############################################################################
    // ######### DEFAULT METHODS
    // ############################################################################
    // Copys 
    Helper.default_copy = function (arg) {
        // If object has a copy method, then use it.
        if (!arg)
            return null;
        // TODO else if(arg.copy != null) return arg.copy();
        else if (typeof arg == 'function')
            return arg;
        // If arg is an object then copy all keys and their values.
        if (typeof arg == 'object' && !Array.isArray(arg)) {
            var copy = {};
            for (var _i = 0, _a = Object.keys(arg); _i < _a.length; _i++) {
                var key = _a[_i];
                copy[key] = Helper.default_copy(arg[key]);
            }
            return copy;
        }
        return JSON.parse(JSON.stringify(arg));
    };
    // Standard converter to convert arguments into string for display in console.
    Helper.default_converter = function (arg) {
        if (arg == null)
            return '(undefined)';
        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
            var c = classes_1[_i];
            if (arg instanceof c)
                return arg.toString();
        }
        if (Array.isArray(arg))
            return Helper.print_Array(arg);
        else if (typeof arg == 'function')
            return '(function) ' + arg.name;
        else if (typeof arg == 'object')
            return Helper.print_map(arg);
        else
            return arg.toString();
    };
    // ############################################################################
    // ######### BINARY SEARCH
    // ############################################################################
    Helper.binary_search = function (nums, target, lower, upper) {
        upper = upper !== null && upper !== void 0 ? upper : nums.length - 1;
        lower = lower !== null && lower !== void 0 ? lower : 0;
        while (upper > lower) {
            var mid = Math.round((upper + lower) / 2);
            if (nums[mid] < target)
                lower = mid + 1;
            else if (nums[mid] > target)
                upper = mid - 1;
            else
                return mid;
        }
        return -1;
    };
    // Note: https://medium.com/@CalvinChankf/how-to-deal-with-lower-upper-bound-binary-search-b9ce744673df
    Helper.binary_search_lower_bound = function (nums, target, lower, upper) {
        upper = upper !== null && upper !== void 0 ? upper : nums.length - 1;
        lower = lower !== null && lower !== void 0 ? lower : 0;
        while (upper > lower) {
            var mid = Math.floor((upper + lower) / 2);
            // console.log( '  Upper: ' + upper + '    Lower: ' + lower + '    Mid: ' + mid + '    Element: ' + nums[mid])
            if (nums[mid] >= target)
                upper = mid;
            else
                lower = mid + 1;
            if (nums[lower] == target)
                return lower;
        }
        return -1;
    };
    Helper.binary_search_upper_bound = function (nums, target, lower, upper) {
        upper = upper !== null && upper !== void 0 ? upper : nums.length - 1;
        lower = lower !== null && lower !== void 0 ? lower : 0;
        while (upper > lower) {
            var mid = Math.ceil((upper + lower) / 2);
            if (nums[mid] <= target)
                lower = mid;
            else
                upper = mid - 1;
            if (nums[upper] == target)
                return upper;
        }
        return -1;
    };
    Helper.print_Array = function (arr, bl, open, close) {
        if (bl === void 0) { bl = ', '; }
        if (open === void 0) { open = '[ '; }
        if (close === void 0) { close = ' ]'; }
        var str = '';
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i]))
                str += Helper.print_Array(arr[i], bl, '( ', ' )');
            // else if(arr[i].print)              str += "'"+arr[i]+"'";
            else if (typeof arr[i] == 'object')
                str += Helper.print_map(arr[i], -1);
            else if (typeof arr[i] == 'string')
                str += "'" + arr[i] + "'";
            else
                str += arr[i];
            if (i > 100) {
                str += ' >>> ' + (arr.length - i) + ' more items ';
                break;
            }
            str += (i != arr.length - 1 ? bl : '');
        }
        return open + str + close;
    };
    Helper.print_map = function (map, depth) {
        if (depth === void 0) { depth = 5; }
        // return nothing if map is null
        if (!map)
            return '';
        // Get all keys of the map an loop though them.
        var keys = Object.keys(map);
        var str = depth == -1 ? '\n     { ' : '';
        keys.forEach(function (k) {
            // Get value for the corresponding key.
            var val = map[k];
            // If the value of the key is an array, then call the specific function for printing arrays.
            if (k.includes('matrix'))
                val = Helper.matrix_toString(val);
            else if (Array.isArray(val))
                val = Helper.print_Array(val);
            // Call toString funtions if the type is a LinkedList or BinaryTree or Queue
            else if (val instanceof LinkedList_1.LinkedList)
                val = val.toString();
            else if (val instanceof BTree.BinaryTree)
                val = val.toString();
            else if (val instanceof BTree.BinaryTree.Node)
                val = val.toString();
            else if (val instanceof Queue.NodeQueue)
                val = val.toString();
            else if (val instanceof Queue.ArrayQueue)
                val = val.toString();
            // If the value is itself an object, then print its content recursivley.
            else if (typeof val == 'object')
                val = Helper.print_map(val, depth + 2);
            if (depth == -1)
                str += k + ': ' + val + ', ';
            // Create a string with correct indentations and the key and value.
            else
                str += '\n' + Helper.uniform_string('  ', depth) + k + ': ' + val;
        });
        if (depth == -1)
            return str.substr(0, str.length - 2) + ' }';
        else
            return str;
    };
    // Standard mapper to map arguments to the solver functions
    Helper.default_mapper = function (arg, solver) {
        for (var _i = 0, classes_2 = classes; _i < classes_2.length; _i++) {
            var c = classes_2[_i];
            if (arg instanceof c)
                return solver(arg);
        }
        if (Array.isArray(arg) || typeof arg != 'object')
            return solver(arg);
        else
            return solver.apply(void 0, Object.values(arg));
    };
    return Helper;
}());
exports.Helper = Helper;
// ############################################################################
// ######### SORTING
// ############################################################################
var MergeSort = /** @class */ (function () {
    function MergeSort() {
    }
    MergeSort.sort = function (list) {
        if (list instanceof LinkedList_1.LinkedList)
            MergeSort.sortLinkedList(list);
        else if (Array.isArray(list))
            MergeSort.sortArray(list);
        else
            throw 'Datatype not supported';
    };
    MergeSort.sortArray = function (arr, lower, upper) {
        if (lower === void 0) { lower = null; }
        if (upper === void 0) { upper = null; }
        if (lower == null)
            lower = 0;
        if (upper == null)
            upper = arr.length;
        // Recursive divding of array into partitions until length of 1.
        if (upper - lower == 1)
            return arr;
        var middle = Math.floor(lower + (upper - lower) / 2);
        //console.log( 'LOWER: ' + lower + '    UPPER: ' + upper + '  MIDDLE:  ' + middle)
        MergeSort.sortArray(arr, lower, middle);
        MergeSort.sortArray(arr, middle, upper);
        // Sorting and merging each partition recursivley back.
        MergeSort.mergeArray(arr, lower, middle, upper);
    };
    MergeSort.mergeArray = function (arr, lower, middle, upper) {
        // Create temporary array containing the elements of the lower and upper parts.
        var arr_lower = [];
        var arr_upper = [];
        for (var i = lower; i < middle; i++)
            arr_lower.push(arr[i]);
        for (var i = middle; i < upper; i++)
            arr_upper.push(arr[i]);
        /*
            console.log( 'LOWER: ' + lower + '    UPPER: ' + upper + '  MIDDLE:  ' + middle)
            console.log(arr_lower);
            console.log(arr_upper);
            console.log('---------------------------')
        */
        // Merge temporary arrays into the original array.
        var idx_lower = 0;
        var idx_upper = 0;
        var idx_target = lower;
        while (idx_lower < arr_lower.length && idx_upper < arr_upper.length) {
            if (arr_lower[idx_lower] <= arr_upper[idx_upper])
                arr[idx_target++] = arr_lower[idx_lower++];
            else
                arr[idx_target++] = arr_upper[idx_upper++];
        }
        while (idx_lower < arr_lower.length)
            arr[idx_target++] = arr_lower[idx_lower++];
        while (idx_upper < arr_upper.length)
            arr[idx_target++] = arr_upper[idx_upper++];
    };
    MergeSort.sortLinkedList = function (list, lower, upper) {
        if (lower === void 0) { lower = null; }
        if (upper === void 0) { upper = null; }
        if (lower == null)
            lower = list.head;
        if (upper == null)
            upper = list.tail;
        // If partition is of size on then return.
        if (lower == upper)
            return list;
        // Find middle node via runner and walker pattern.
        var walker = lower;
        var runner = walker.next;
        while (runner != upper) {
            walker = walker.next;
            runner = runner.next;
            if (runner == upper)
                break;
            else
                runner = runner.next;
        }
        // Partition list until it each partition is of size 1.
        MergeSort.sortLinkedList(list, lower, walker);
        MergeSort.sortLinkedList(list, walker.next, upper);
        // Sort and Merge partitions recursivley.
        MergeSort.mergeLinkedList(list, lower, walker, upper);
    };
    MergeSort.mergeLinkedList = function (list, lower, middle, upper) {
        // Create temporary array containing the elements of the lower and upper parts.
        var arr_lower = [];
        var arr_upper = [];
        for (var i = lower; i != middle.next; i = i.next)
            arr_lower.push(i.val);
        for (var i = middle.next; i != upper.next; i = i.next)
            arr_upper.push(i.val);
        /*
     
            console.log(list.toString());
            console.log('LOWER: ' + lower.val + ' MID: ' + middle.val + ' UPPER: ' + upper.val)
            console.log(arr_lower);
            console.log(arr_upper);
            console.log('--------------------------------')
    
        */
        // Merge temporary arrays into the original array.
        var idx_lower = 0;
        var idx_upper = 0;
        var node = lower;
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
        }
        ;
        while (idx_upper < arr_upper.length) {
            node.val = arr_upper[idx_upper++];
            node = node.next;
        }
        ;
    };
    return MergeSort;
}());
module.exports = Helper;
