const BTree = require('./datastructures/bTree');
const Queue = require('./datastructures/queue');
const fs = require('fs');

import { Testcase } from './Inout';
import { LinkedList, LinkedListNode } from './datastructures/LinkedList';

const classes = [ BTree.BinaryTree, BTree.BinaryTree.Node, Queue.NodeQueue, Queue.ArrayQueue];

export class Helper {

    static uniform_string(str: string, len: number) {
        while (str.length < len) str = ' ' + str;
        return str;
    }

    static random_Array(min: number, max: number, min_len: number, max_len: number) {
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

    static matrix_toString(mat: Array<Array<object>>, rows_vertical: boolean = true, len: number = 4) {

        let str: string = '\n';
        if (!rows_vertical) {
            for (let col = mat[0].length - 1; col >= 0; col--) {
                str += '    ';
                for (let row = 0; row < mat.length; row++)
                    str += Helper.uniform_string(mat[row][col].toString(), len);
                str += '\n';
            }
        }
        else {
            for (let row = 0; row < mat.length; row++) {
                str += '    ';
                for (let col = 0; col < mat[row].length; col++)
                    str += Helper.uniform_string(mat[row][col].toString(), len);
                str += '\n';
            }
        }
        return str;
    }

    static print_Array = function (arr: Array<object>, bl: string = ', ', open: string = '[ ', close: string = ' ]') {

        let str: string = '';
        for (let i = 0; i < arr.length; i++) {

            if (Array.isArray(arr[i])) str += Helper.print_Array(arr[i] as Array<object>, bl, '( ', ' )');
            // else if(arr[i].print)              str += "'"+arr[i]+"'";
            else if (typeof arr[i] == 'object') str += Helper.print_map(arr[i], -1);
            else if (typeof arr[i] == 'string') str += "'" + arr[i] + "'";
            else str += arr[i]

            if (i > 100) {
                str += ' >>> ' + (arr.length - i) + ' more items ';
                break;
            }

            str += (i != arr.length - 1 ? bl : '');
        }
        return open + str + close;
    }

    static print_map = function (map: Object, depth: number = 5) {

        // return nothing if map is null
        if (!map) return '';

        // Get all keys of the map an loop though them.
        const keys = Object.keys(map);

        let str = depth == -1 ? '\n     { ' : '';
        keys.forEach(k => {

            // Get value for the corresponding key.
            let val = map[k];

            // If the value of the key is an array, then call the specific function for printing arrays.
            if (k.includes('matrix')) val = Helper.matrix_toString(val);
            else if (Array.isArray(val)) val = Helper.print_Array(val);

            // Call toString funtions if the type is a LinkedList or BinaryTree or Queue
            else if (val instanceof LinkedList) val = val.toString();
            else if (val instanceof BTree.BinaryTree) val = val.toString();
            else if (val instanceof BTree.BinaryTree.Node) val = val.toString();
            else if (val instanceof Queue.NodeQueue) val = val.toString();
            else if (val instanceof Queue.ArrayQueue) val = val.toString();

            // If the value is itself an object, then print its content recursivley.
            else if (typeof val == 'object') val = Helper.print_map(val, depth + 2);

            if (depth == -1) str += k + ': ' + val + ', ';
            // Create a string with correct indentations and the key and value.
            else str += '\n' + Helper.uniform_string('  ', depth) + k + ': ' + val
        });

        if (depth == -1) return str.substr(0, str.length - 2) + ' }';
        else return str;
    }


    // ############################################################################
    // ######### EUQALS METHODS
    // ############################################################################

    static Array_equals(arr: Array<object>, arr1: Array<object>) {

        if (!Array.isArray(arr) || !Array.isArray(arr1)) return false;
        if (arr.length != arr1.length) return false;

        for (let i = 0; i < arr.length; i++) {

            const el = arr[i];
            const el1 = arr1[i];

            if (Array.isArray(el)) {
                if (!Helper.Array_equals(el as Array<object>, el1 as Array<object>)) return false;
            } else if (typeof el == 'object') {
                if (!el.equals(el1)) return false;
            }
            else if (el != el1)
                return false;
        }

        return true;
    }

    static Array_has_same_values(arr: Array<object>, arr1: Array<Object>) {

        if (!Array.isArray(arr) || !Array.isArray(arr1)) return false;
        if (arr.length != arr1.length) return false;

        const dict = {};

        for (let i = 0; i < arr.length; i++) {

            const el: any = arr[i];
            const el1: any = arr1[i];

            if (el in dict) delete dict[el];
            else dict[el] = 0;

            if (el1 in dict) delete dict[el1];
            else dict[el1] = 0;

        }

        return Object.keys(dict).length == 0;
    }

    static scramble_Array(arr: Array<Object>, cycles: number = 10e2) {

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

    static string_toArray(str: string, split: string = '') {

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

    static string_toIntArray(str: string, split: string = ' ') {

        // Define variables.
        const matrix = [];
        const sub_strs = str.split('|');

        for (let i = 0; i < sub_strs.length; i++) {

            // Split the curren substring according to chosen split char.
            if (sub_strs[i].includes(',')) split = ',';
            else if (sub_strs[i].includes('\r\n')) split = '\r\n';
            else if (sub_strs[i].includes(' ')) split = ' ';

            const array: Array<string | number> = sub_strs[i].split(split);

            // Loop through the array and convert its contents to numbers.
            for (let i in array) {
                array[i] = (array[i] as string).trim();
                const num = parseInt(array[i] as string);
                if (!isNaN(num)) array[i] = num;
            }

            // If there is only one substring in 'str' then return a 1D array.
            if (sub_strs.length == 1) return array;
            // else push the array into a matrix.
            else matrix.push(array);
        }
        return matrix;
    }

    // converts all strings in an object to the desired object
    static convert_strings_in_object(obj: object, testcase: Testcase) {

        const keywords_arr = ['nums', 'arr', 'points'];
        const keywords_list = ['list'];
        const keywords_tree = ['tree', 'subtree'];

        if (typeof obj == 'function') return obj;
        else if (typeof obj == 'string') return Helper.convert_string(obj, testcase);
        else if (typeof obj == 'object') {
            for (let key of Object.keys(obj)) {

                if (typeof obj[key] == 'string') {

                    if (obj[key][0] == '&') obj[key] = Helper.convert_string(obj[key], testcase);
                    else if (keywords_arr.includes(key)) obj[key] = Helper.string_toIntArray(obj[key]);
                    else if (keywords_list.includes(key)) obj[key] = LinkedList.LinkedListFromString_Int(obj[key]);
                    else if (keywords_tree.includes(key)) obj[key] = BTree.BinaryTree.GenerateIntPreorderFromString(obj[key]);
                }

                else if (typeof obj[key] == 'object') obj[key] = Helper.convert_strings_in_object(obj[key], testcase);
            }
        }

        return obj;
    }

    // converts string to the desired object
    static convert_string(str: string, testcase: Testcase) {

        const keychars = {
            '&NA': str => Helper.string_toArray(str),
            '&NI': str => Helper.string_toIntArray(str, ''),
            '&AR': str => Helper.string_toIntArray(str),
            '&LL': str => LinkedList.LinkedListFromString_Int(str),
            '&BT': str => BTree.BinaryTree.GenerateIntPreorderFromString(str),
            '&FS': str => {
                const args = Helper.string_toArray(str);
                const file = fs.readFileSync(args[0], 'utf-8');
                return Helper.convert_string(args[1] + ' ' + file, testcase);
            },
            '&RF': str => {
                let obj = testcase;
                for (let ref of str.split('.')) obj = obj[ref];
                return obj;
            }
        }

        if (str[0] == '&') {
            const chars = str.substr(0, 3);
            const substr = str.substr((str[3] == ' ' ? 4 : 3), str.length);

            if (chars in keychars) return keychars[chars](substr);
        }

        return str;
    }


    // ############################################################################
    // ######### DEFAULT METHODS
    // ############################################################################

    // Copys 
    static default_copy(arg: any) {

        // If object has a copy method, then use it.
        if (!arg) return null;
        // TODO else if(arg.copy != null) return arg.copy();
        else if (typeof arg == 'function') return arg;

        // If arg is an object then copy all keys and their values.
        if (typeof arg == 'object' && !Array.isArray(arg)) {
            const copy = {};
            for (let key of Object.keys(arg))
                copy[key] = Helper.default_copy(arg[key]);

            return copy;
        }

        return JSON.parse(JSON.stringify(arg));
    }

    // Standard converter to convert arguments into string for display in console.
    static default_converter(arg: any) {

        if (arg == null) return '(undefined)';

        for (let c of classes)
            if (arg instanceof c) return arg.toString();

        if (Array.isArray(arg)) return Helper.print_Array(arg);
        else if (typeof arg == 'function') return '(function) ' + arg.name;
        else if (typeof arg == 'object') return Helper.print_map(arg);
        else return arg.toString();

    }

    // Standard mapper to map arguments to the solver functions
    static default_mapper = function (arg: object, solver: Function) {

        for (let c of classes)
            if (arg instanceof c) return solver(arg);

        if (Array.isArray(arg) || typeof arg != 'object') return solver(arg);
        else return solver(...Object.values(arg));
    }


    // ############################################################################
    // ######### BINARY SEARCH
    // ############################################################################

    static binary_search(nums: Array<number>, target: number, lower: number, upper: number) {

        upper = upper ?? nums.length - 1;
        lower = lower ?? 0;

        while (upper > lower) {
            const mid = Math.round((upper + lower) / 2);

            if (nums[mid] < target) lower = mid + 1;
            else if (nums[mid] > target) upper = mid - 1;
            else return mid;
        }

        return -1;
    }


    // Note: https://medium.com/@CalvinChankf/how-to-deal-with-lower-upper-bound-binary-search-b9ce744673df

    static binary_search_lower_bound(nums: Array<number>, target: number, lower: number, upper: number) {

        upper = upper ?? nums.length - 1;
        lower = lower ?? 0;

        while (upper > lower) {
            const mid = Math.floor((upper + lower) / 2);

            // console.log( '  Upper: ' + upper + '    Lower: ' + lower + '    Mid: ' + mid + '    Element: ' + nums[mid])
            if (nums[mid] >= target) upper = mid;
            else lower = mid + 1;

            if (nums[lower] == target)
                return lower;
        }

        return -1;
    }

    static binary_search_upper_bound(nums: Array<number>, target: number, lower: number, upper: number) {

        upper = upper ?? nums.length - 1;
        lower = lower ?? 0;

        while (upper > lower) {
            const mid = Math.ceil((upper + lower) / 2);

            if (nums[mid] <= target) lower = mid;
            else upper = mid - 1;

            if (nums[upper] == target)
                return upper;
        }

        return -1;
    }
}

// ############################################################################
// ######### SORTING
// ############################################################################

class MergeSort {

    constructor() { }

    static sort(list: any) {
        if (list instanceof LinkedList) MergeSort.sortLinkedList(list);
        else if (Array.isArray(list)) MergeSort.sortArray(list);
        else throw 'Datatype not supported';
    }

    static sortLinkedList = function (list: LinkedList<number>, lower: LinkedListNode<number> = null, upper: LinkedListNode<number> = null) {
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
        MergeSort.sortLinkedList(list, lower, walker);
        MergeSort.sortLinkedList(list, walker.next, upper);

        // Sort and Merge partitions recursivley.
        MergeSort.mergeLinkedList(list, lower, walker, upper);
    }

    static mergeLinkedList = function (list: LinkedList<number>, lower: LinkedListNode<number>, middle: LinkedListNode<number>, upper: LinkedListNode<number>) {

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

    static sortArray(arr: Array<number>, lower: number = null, upper: number = null) {
        if (lower == null) lower = 0;
        if (upper == null) upper = arr.length;

        // Recursive divding of array into partitions until length of 1.
        if (upper - lower == 1) return arr;

        const middle = Math.floor(lower + (upper - lower) / 2);
        //console.log( 'LOWER: ' + lower + '    UPPER: ' + upper + '  MIDDLE:  ' + middle)

        MergeSort.sortArray(arr, lower, middle);
        MergeSort.sortArray(arr, middle, upper);

        // Sorting and merging each partition recursivley back.
        MergeSort.mergeArray(arr, lower, middle, upper);
    }

    static mergeArray(arr: Array<number>, lower: number, middle: number, upper: number) {

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

}






module.exports = Helper;