const Helper = {};

Helper.matrix_toString = function(mat) {
    let str = '\n';
    for(let row = 0; row<mat.length; row++) {
        str += '         ' + mat[row].toString() + '\n';
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
        for(let el of sub_strs[i].split(split))
            sub_arr.push( parseInt(el) );

        if(sub_strs.length == 1) return sub_arr
        else arr.push(sub_arr);
    }
    return arr;
}

Helper.print_Array = function(arr) {
    str = '';
    for(let sub_arr of arr) {
        let sub_str = '';
        for(let el of sub_arr)
            sub_str += el + ', ';

        str += '(' + sub_str.substr(0, sub_str.length-2) + '), '
    }
    return '[ ' + str.substr(0, str.length-2) + ' ]';
}


module.exports = Helper;