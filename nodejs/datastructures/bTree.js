// Note https://www.geeksforgeeks.org/binary-tree-set-3-types-of-binary-tree/
const { serialize } = require("v8");
const { ID_Object } = require("./other")

class Node extends ID_Object {

    constructor(val, left, right) {
        super();
        this.val = val;
        this.left = left ?? null;
        this.right = right ?? null;
    }

    isLeaf() {
        return this.left == null && this.right == null;
    }

    toString() {
        this.val + (this.isLeaf() ? '/L' : '') + ' (Node - ' + this.id + ')';
    }

    print() {
        return this.toString()
    };
}


class BinaryTree extends ID_Object {

    static Node = Node;

    static TraverseType = {
        PRE_ORDER: 0,
        IN_ORDER: 1,
        POST_ORDER: 2,
    }

    constructor(val, print_null) {
        super();
        this.root = val == null ? null : new Node(val);
        this.print_null = print_null ?? true;
    }

    print() {
        return this.toString();
    }

    copy() {
        return BinaryTree.GenerateIntPreorderFromString(this.toString(), ',', '<NULL>', '/L')
    }

    compare(tree) {
        return BinaryTree._areTreesSame(this.root, tree.root);
    }

    static _areTreesSame(node_1, node_2) {

        if (node_1 == null && node_2 == null) return true;
        if (node_1 == null && node_2 != null) return false;
        if (node_1 != null && node_2 == null) return false;
        if (node_1.val !== node_2.val) return false;

        const left = BinaryTree._areTreesSame(node_1.left, node_2.left);
        const right = BinaryTree._areTreesSame(node_1.right, node_2.right);

        return left && right;
    }
}

BinaryTree.GenerateIntPreorderFromString = function (str, splitter = ',', rem = '/', rem2 = '$', sav = '*') {

    // switches toString method to shorter version
    const flag_null = str[0] == '%';
    const arr = (flag_null ? str.substr(1) : str).split(splitter);

    const temp = parseInt(arr[0]);
    const tree = new BinaryTree(Number.isNaN(temp) ? arr[0] : temp, !flag_null);

    const nodes = [];
    const stack = [];
    let node = tree.root;

    for (let i = 1, flag_leaf = false; i < arr.length; i++) {

        // Tree is build from preorder string: root, left, right
        // rem2 marks node as leaf and leaves its children as null
        // instead of generating from this: 5, 4, /, /, 4 ||| shorter form with this: 5, $4, 4 
        //              5
        //             / \
        //            4   4

        // Determines if current number is treated as a leaf or not.
        const flag_leaf = arr[i].includes(rem2);
        // Determines of current node is to be returned.
        const flag_save = arr[i].includes(sav);

        const val = arr[i].replace(rem2, '').replace(sav, '').trim();
        const num = parseInt(val);
        const isNum = Number.isNaN(num);

        const new_node = val === rem ? null : new Node(isNum ? val : num);
        if (flag_save && new_node) nodes.push(new_node);

        // Right nodes.
        if (node == null) {
            node = stack.pop();
            node.right = new_node;

            node = flag_leaf ? null : node.right;

        } else {
            // Left nodes.
            stack.push(node);
            node.left = new_node;

            node = flag_leaf ? null : node.left;
        }

    }

    tree.node = nodes[0];
    tree.nodes = nodes;

    return tree;
}

BinaryTree.prototype.toString = function (null_str = '<NULL>') {
    if (!this.root) return null_str;

    // Printing string in preorder fashion (Root, Left, Right)
    let str = '';
    let limbo = '';
    let stack = [this.root];
    let node = this.root;

    while (stack.length > 0) {

        if (node) {

            str += limbo;
            limbo = '';

            if (this.nodes && this.nodes.includes(node)) str += '*';
            str += node.val + (node.isLeaf() ? '/L' : '') + ', ';

            if (node.isLeaf())
                node = stack.pop().right;
            else {
                stack.push(node);
                node = node.left;
            }
        } else {
            limbo += null_str + ', ';
            node = stack.pop().right;
        }
    }

    return str.substr(0, str.length - 2);
}

BinaryTree.prototype.iterator = function* (traversal = BinaryTree.TraverseType.IN_ORDER) {

    const stack = [];
    const list = [];
    let node = this.root;

    while (node || stack.length > 0) {

        if (!node) {
            node = stack.pop();
            if (traversal == BinaryTree.TraverseType.IN_ORDER) yield node;
            if (traversal == BinaryTree.TraverseType.POST_ORDER) node = node.left;
            else node = node.right;
        }
        else {
            stack.push(node);

            if (traversal == BinaryTree.TraverseType.PRE_ORDER) yield node;     // Preorder    WLR
            if (traversal == BinaryTree.TraverseType.POST_ORDER) list.push(node); // Postorder LRW

            // If postorder do WRL, wich reverse to LRW, else WLR.
            if (traversal == BinaryTree.TraverseType.POST_ORDER) node = node.right
            else node = node.left;
        }
    }

    if (traversal === BinaryTree.TraverseType.POST_ORDER) {
        while (list.length !== 0) yield list.pop();
    }

    return list;
}


BinaryTree.prototype.traverse = function (traversal = BinaryTree.TraverseType.IN_ORDER) {

    const stack = [];
    const list = [];
    let node = this.root;

    while (node || stack.length > 0) {

        if (!node) {
            node = stack.pop();
            if (traversal == BinaryTree.TraverseType.IN_ORDER) list.push(node.val);
            if (traversal == BinaryTree.TraverseType.POST_ORDER) node = node.left;
            else node = node.right;
        }
        else {
            stack.push(node);

            if (traversal == BinaryTree.TraverseType.PRE_ORDER) list.push(node.val);     // Preorder    WLR
            if (traversal == BinaryTree.TraverseType.POST_ORDER) list.unshift(node.val); // Postorder LRW

            // If postorder do WRL, wich reverse to LRW, else WLR.
            if (traversal == BinaryTree.TraverseType.POST_ORDER) node = node.right
            else node = node.left;
        }
    }

    return list;
}

BinaryTree.prototype.serialize = function serialize(isSplit = ':', isNull = '#', isLeaf = '$') {

    const format = {
        isSplit: isSplit,
        isNull: isNull,
        isLeaf: isLeaf,
        tree: [],
    }

    const stack = [this.root];
    let node = this.root;

    while (stack.length > 0) {

        if (node === null) {
            format.tree.push(isNull);
            node = stack.pop().right;
        }
        else if (node.isLeaf()) {
            format.tree.push(isLeaf + node.val);
            node = stack.pop().right;
        }
        else {
            format.tree.push(node.val);
            stack.push(node);
            node = node.left;
        }

    }

    format.tree = format.tree.join(isSplit);
    return '&' + Object.entries(format).map(([key, val]) => `${key}=${val}`).join('&');
}

BinaryTree.deserialize = function deserialize(serialized) {

    const format = {
        isSplit: null,
        isNull: null,
        isLeaf: null,
        tree: null
    };

    serialized.substr(1).split(serialized[0]).map(v => v.split('=')).forEach(v => format[v[0]] = v[1]);

    for (const [key, val] of Object.entries(format)) {
        if (val === null) throw Error(`Wrong format because of missing parameter: ${key}`)
    }

    // Destructure.
    const { isNull, isLeaf, isSplit, tree } = format;
    const serialTree = tree.split(isSplit);

    // Build tree.
    const root = parseInt(serialTree[0]);
    const deserialized = new BinaryTree(root);

    const stack = [];
    let node = deserialized.root;

    for (let i = 1, insertLeft = true; i < serialTree.length; i++) {

        const value = serialTree[i];

        const flag_Null = value === isNull;
        const flag_Leaf = value[0] === isLeaf;

        if (flag_Null) {
            if (insertLeft) insertLeft = false;
            else node = stack.pop();
            continue;
        }

        const numberStr = flag_Leaf ? value.substr(1) : value;
        const parsedNum = parseInt(numberStr);
        const newNode = new BinaryTree.Node(parsedNum);

        if (insertLeft) {
            stack.push(node);
            node.left = newNode;
            node = node.left;
        }
        else {
            node.right = newNode;
            node = node.right;
            insertLeft = true;
        }

        if (flag_Leaf) {
            node = stack.pop();
            insertLeft = false;
        }
    }

    return deserialized;
}


// ############################################################################
// ######### Binary Search Tree
// ############################################################################


class BinarySearchTree extends BinaryTree {

    static Insert_static(tree, val) {
        if (!tree.root) return tree.root = new BinarySearchTree.Node(val);
        BinarySearchTree.Node.Insert_static(tree.root, val);
    }

    constructor(val) {
        super(val, false)
    }

    Insert(val) {
        if (this.root) this.root.Insert(val);
        else this.root = new BinarySearchTree.Node(val);
    }

    Search(val) {
        if (this.root) return this.root.Search(val);
        else return null;
    }

    Insert_iterative(val) {
        if (!this.root) return this.root = new BinarySearchTree.Node(val);

        let node = this.root;
        while (true) {

            if (val > node.val) {
                if (node.right) node = node.right;
                else return node.right = new BinarySearchTree.Node(val);
            } else {
                if (node.left) node = node.left;
                else return node.left = new BinarySearchTree.Node(val);
            }
        }
    }
}

BinarySearchTree.Node.prototype.Insert = function (val) {
    if (val > this.val) {
        if (this.right) this.right.Insert(val);
        else this.right = new BinarySearchTree.Node(val);
    } else {
        if (this.left) this.left.Insert(val);
        else this.left = new BinarySearchTree.Node(val);
    }
}

BinarySearchTree.Node.prototype.Search = function (val) {
    const comp = val.compare(this.val);
    if (comp == 0) return this;
    else if (comp > 0 && this.right) return this.right.Search(val);
    else if (comp <= 0 && this.left) return this.left.Search(val);
    else return null;
}

BinarySearchTree.Node.Insert_static = function (node, val) {

    // create a new node to insert, when node is null
    if (node == null)
        return new BinarySearchTree.Node(val);

    // change right or left pointer depending on value of val
    // the left or right node is passed down to the method and
    // 1. either returned unchanged if not null
    // 2. a new node with the to be inserted value is returned if node is null
    if (val > node.val) node.right = BinarySearchTree.Node.Insert_static(node.right, val);
    else node.left = BinarySearchTree.Node.Insert_static(node.left, val);

    // unchanged pointer
    return node;
}

module.exports = { BinaryTree, BinarySearchTree };