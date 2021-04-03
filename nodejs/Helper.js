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

Helper.print_Array = function(arr, open = '[ ', close = ' ]') {
    str = '';
    for(let el of arr) {

        if(Array.isArray(el)) 
            str += Helper.print_Array(el, '( ', ' ), ');
        else
            str += el + ', ';
    }
    return open + str.substr(0, str.length-2) + close;
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


module.exports = Helper;