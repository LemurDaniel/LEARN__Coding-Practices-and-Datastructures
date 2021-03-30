const Helper = {};

Helper.matrix_toString = function(mat) {
    let str = '\n';
    for(let row = 0; row<mat.length; row++) {
        str += '         ' + mat[row].toString() + '\n';
    }
    return str;
}

module.exports = Helper;