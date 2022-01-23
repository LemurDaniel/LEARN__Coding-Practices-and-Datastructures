
// Full binary tree implementation using an array.

const { CustomError } = require("../Helper");
const { ID_Object } = require("./other");


class CompleteBinaryTree {

    get size() {
        return this.tree.length;
    }

    getNode(index) {
        if (index < 0 || index >= this.size)
            return null;
        else
            return this.tree[index];
    }

    getParent(index) {
        return Math.floor((index - 1) / 2);
    }
    getLeft(index) {
        return index * 2 + 1;
    }
    getRight(index) {
        return index * 2 + 2;
    }

    isLeaf(index) {
        let right = this.getRight(index);
        let left = this.getLeft(index);

        left = this.getNode(left);
        right = this.getNode(right);
        
        return left === null && right === null;
    }

    constructor() {
        this.tree = [];
    }

    add(value) {
        this.tree.push(value);
    }


}