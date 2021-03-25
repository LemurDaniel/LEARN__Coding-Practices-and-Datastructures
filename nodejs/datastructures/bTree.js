

class Node {

    constructor(val, left, right){
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class BTree {

    constructor(val){
        this.root = new Node(val);
    }




    toString() {
        if(!this.root)  return '<NUll>';

        let str = '';
        let stack = [this.root];
        let node = this.root;

        while(stack.length > 0){
                    
            if(node) {
                str +=  node.val+', ';
                stack.push(node);
                node = node.left;
            }else{
                str += '<NULL>, ';
                node = stack.pop().right;
            }
        }

        return str.substr(0, str.length-2);
    }

    static GenerateIntPreorderFromString(str, splitter=',', rem='/'){

        let arr = str.split(splitter);
        let tree = new BTree(parseInt(arr[0]));
        let node = tree.root;
        let stack = [];

        for(let i=1; i<arr.length; i++){

            if(node == null) {
                node = stack.pop();
                if(arr[i].trim() == rem) node.right = null;
                else node.right = new Node(parseInt(arr[i]));
                node = node.right;

            } else {
                
                if(arr[i].trim() == rem) node.left = null;
                else node.left = new Node(parseInt(arr[i]));
                stack.push(node);
                node = node.left;
            }
        }

        return tree;
    }

}


module.exports = BTree;