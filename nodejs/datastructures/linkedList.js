class Node {

    constructor(val, next){
        this.val = val;
        this.next = next ?? null;
    }

}

class LinkedList {

    static Node = Node;

    constructor(val, next){
        this.root = val ? new LinkedList.Node(val, next):null;
        this.last = this.root;
    }

}


LinkedList.Copy = function (list) {

    const copy = new LinkedList();
    let node = list.root;

    while(node) {
        copy.Append(node.val);
        node = node.next;
    }

    return copy;
}

LinkedList.LinkedListFromString_Int = function (str) {
    
    const list = new LinkedList();

    if(str.includes(','))
        str.split(',').forEach( el => list.Append(parseInt(el)) );
    else
        str.split('').forEach( c => list.Append(parseInt(c)) );

    return list;
}


LinkedList.prototype.Append = function (val) {
    
    if(this.root == null) {
        this.root = new LinkedList.Node(val);
        this.last = this.root;
    } else {
        this.last.next = new LinkedList.Node(val);
        this.last = this.last.next;
    }

}

LinkedList.prototype.toString = function ( connector = ' ==> ') {

    let str = '';
    let node = this.root;
    while(node) {
        str += node.val + connector;
        node = node.next;
    }

    return str.substr(0, str.length-5);
}


module.exports = LinkedList;