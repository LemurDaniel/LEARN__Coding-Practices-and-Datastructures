

class Node {

    constructor(val, left, right){
        this.val = val;
        this.left = left;
        this.right = right;
    }

    isLeaf = () => this.left == null && this.right == null;
}

class BTree {

    constructor(val, print_null){
        this.root = new Node(val);
        this.print_null = print_null ?? true;
    }




    toString() {
        if(!this.root)  return '<NUll>';

        // Printing string in preorder fashion (Root, Left, Right)
        let str = '';
        let stack = [this.root];
        let node = this.root;

        while(stack.length > 0){
                   
            // when 'print_null' is false the method switches to the shorter version
            // instead of printing two <NULL> behind every leaf, Leaves are marked with '<value>/L'
            if(node) {
                str +=  node.val +  (!this.print_null && node.isLeaf() ? '/L':'')  + ', ';
                if(!this.print_null && node.isLeaf())
                    node = stack.pop().right;
                else {
                    stack.push(node);
                    node = node.left;
                }
            }else{
                str += '<NULL>, ';
                node = stack.pop().right;
            }
        }

        return str.substr(0, str.length-2);
    }

    static GenerateIntPreorderFromString(str, splitter=',', rem='/', rem2='$'){

        // switches toString method to shorter version
        const flag_null = str[0] == '%'; 
        const arr = (flag_null ? str.substr(1):str).split(splitter);
        const tree = new BTree(parseInt(arr[0]), !flag_null);

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


module.exports = BTree;