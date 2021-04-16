// Note https://www.geeksforgeeks.org/binary-tree-set-3-types-of-binary-tree/

class Node {

    constructor(val, left, right){
        this.val = val;
        this.left = left;
        this.right = right;
    }

    isLeaf = () => this.left == null && this.right == null;

}

class BinaryTree {

    static Node = Node;

    constructor(val, print_null){
        this.root = val == null ? null : new Node(val);
        this.print_null = print_null ?? true;
    }

    copy = () => BinaryTree.GenerateIntPreorderFromString(this.toString(true, '/'));

    toString(print_null = null, null_str = '<NULL>') {
        if(!this.root)  return null_str;
        
        // Printing string in preorder fashion (Root, Left, Right)
        let str = '';
        let stack = [this.root];
        let node = this.root;

        print_null = print_null ?? this.print_null;

        while(stack.length > 0){
                   
            // when 'print_null' is false the method switches to the shorter version
            // instead of printing two <NULL> behind every leaf, Leaves are marked with '<value>/L'
            if(node) {
                str +=  node.val +  (!print_null && node.isLeaf() ? '/L':'')  + ', ';
                if(!print_null && node.isLeaf())
                    node = stack.pop().right;
                else {
                    stack.push(node);
                    node = node.left;
                }
            }else{
                str += null_str+', ';
                node = stack.pop().right;
            }
        }

        return str.substr(0, str.length-2);
    }

    static GenerateIntPreorderFromString(str, splitter=',', rem='/', rem2='$'){

        // switches toString method to shorter version
        const flag_null = str[0] == '%'; 
        const arr = (flag_null ? str.substr(1):str).split(splitter);
        const tree = new BinaryTree(parseInt(arr[0]), !flag_null);

        const stack = [];
        let node = tree.root;

        for(let i=1, flag_leaf = false; i<arr.length; i++){

            // Tree is build from preorder string: root, left, right
            // rem2 marks node as leaf and leaves its children as null
            // instead of generating from this: 5, 4, /, /, 4 ||| shorter form with this: 5, $4, 4 
            //              5
            //             / \
            //            4   4

            flag_leaf = arr[i][0] == rem2;
            const num =  (!flag_leaf ? arr[i]:arr[i].substr(1)).trim();

            if(node == null) {
                node = stack.pop();
                if(num == rem) node.right = null;
                else node.right = new Node(parseInt(num));

                node = flag_leaf ? null : node.right;

            } else {     
                if(num == rem) node.left = null;
                else node.left = new Node(parseInt(num));           
                stack.push(node);

                node = flag_leaf ? null : node.left;
            }

        }

        return tree;
    }

}


class BinarySearchTree extends BinaryTree {

    static Insert_static (tree, val) {
        if(!tree.root) return tree.root = new BinarySearchTree.Node(val);
        BinarySearchTree.Node.Insert_static(tree.root, val);
    }

    constructor(val) {
        super(val, false)
    }

    Insert(val) {
        if(this.root) this.root.Insert(val);
        else this.root = new BinarySearchTree.Node(val);
    }

    Search(val) {
        if(this.root) return this.root.Search(val);
        else return null;
    }

    Insert_iterative(val){
        if(!this.root) return this.root = new BinarySearchTree.Node(val);
        
        let node = this.root;
        while(true){

            if(val > node.val) {
                if(node.right) node = node.right;
                else return node.right = new BinarySearchTree.Node(val);
            } else {
                if(node.left) node = node.left;
                else return node.left = new BinarySearchTree.Node(val);
            }
        }
    }
}

BinarySearchTree.Node.prototype.Insert = function (val) {
    if(val > this.val) {
        if(this.right) this.right.Insert(val);
        else this.right = new BinarySearchTree.Node(val);
    } else {
        if(this.left) this.left.Insert(val);
        else this.left = new BinarySearchTree.Node(val);
    }
}

BinarySearchTree.Node.prototype.Search = function (val) {
    const comp = val.compare(this.val);
    if(comp == 0) return this;
    else if(comp > 0 && this.right) return this.right.Search(val);
    else if(comp <= 0 && this.left) return this.left.Search(val);
    else return null; 
}

BinarySearchTree.Node.Insert_static = function (node, val){
    
    // create a new node to insert, when node is null
    if(node == null) 
        return new BinarySearchTree.Node(val);

    // change right or left pointer depending on value of val
    // the left or right node is passed down to the method and
    // 1. either returned unchanged if not null
    // 2. a new node with the to be inserted value is returned if node is null
    if(val > node.val) node.right = BinarySearchTree.Node.Insert_static(node.right, val);
    else node.left = BinarySearchTree.Node.Insert_static(node.left, val);

    // unchanged pointer
    return node;
}

module.exports = { BinaryTree, BinarySearchTree};