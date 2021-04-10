const Helper = {};

Helper.uniform_string = function(str, len){
    while(str.length < len) str = ' '+str;
    return str;
}

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

Helper.string_toIntArray = function(str) {

    const arr = [];
    const sub_strs = str.split('|');

    for(let i=0; i<sub_strs.length; i++) {
        
        let split = '';
        if(sub_strs[i].includes(',')) split = ',';
        else if(sub_strs[i].includes(' ')) split = ' ';

        const sub_arr = [];
        for(let el of sub_strs[i].split(split)){
            if(el.trim() == '/') sub_arr.push('/');
            else sub_arr.push( parseInt(el) );
        }

        if(sub_strs.length == 1) return sub_arr
        else arr.push(sub_arr);
    }
    return arr;
}

Helper.print_Array = function(arr, bl = ', ', open = '[ ', close = ' ]') {
    str = '';
    for(let i=0; i<arr.length; i++) {

        if(Array.isArray(arr[i])) 
            str += Helper.print_Array(arr[i], bl, '( ', ' )');
        else
            str += arr[i];

        str += (i != arr.length-1 ? bl : '');
    }
    return open + str + close;
}

Helper.print_map = function(map) {
    const keys = Object.keys(map);

    let str = '    ';
    keys.forEach( k => {
        let val = map[k];
        if(Array.isArray(val)) val = Helper.print_Array(val)
        str += '\n     ' + k + ': ' + val

    });

    return str;
}

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

module.exports = Helper;