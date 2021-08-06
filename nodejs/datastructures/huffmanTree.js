const { BinaryTree } = require("./bTree");


class Node extends BinaryTree.Node {

    get char() {
        return this.val;
    }

    constructor(val, freq) {
        super(val ?? HuffmanTree.Empty);
        this.freq = freq;
    }


    getHuffmanCodes(bits = 1, codes = []) {

        if (this.isLeaf) 
            codes.push( { char: this.char, code: bits.toString(2).substr(1) } );

        if (this.left) this.left.getHuffmanCodes(bits << 1 | 0, codes);
        if (this.right) this.right.getHuffmanCodes(bits << 1 | 1, codes);

        return codes;
    }


    toString() {
        if (this.val === HuffmanTree.Empty) return '*';
        else return this.val + '/' + this.freq.toFixed(2);
    }

}

class HuffmanTree extends BinaryTree {

    static Empty = '*';
    static Node = Node;

    constructor(val) {
        super(val)
    }

    getHuffmanCodes() {
        return this.root.getHuffmanCodes();
    }

    toString() {
        return super.toString(n => n.toString())
    }

}




module.exports = HuffmanTree;