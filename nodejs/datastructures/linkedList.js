class Node {

    constructor(val, next){
        this.val = val;
        this.next = next ?? null;
    }

}

class LinkedList {

    static Node = Node;

    constructor(val, next){
        this.head = val ? new LinkedList.Node(val, next):null;
        this.tail = this.head;
    }

    copy = () => LinkedList.Copy(this)
}


LinkedList.Copy = function (list) {

    const copy = new LinkedList();
    let node = list.head;

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
    
    if(this.head == null) {
        this.head = new LinkedList.Node(val);
        this.tail = this.head;
    } else {
        this.tail.next = new LinkedList.Node(val);
        this.tail = this.tail.next;
    }

}

LinkedList.prototype.Append_as_root = function (val) {
    
    const node = new LinkedList.Node(val, this.head);
    if(this.head == null)
        this.tail = node;
    this.head = node;

}

LinkedList.prototype.to_array = function ( value_converter = v => v ) {
    
    const arr = [];
    let node = this.head;
    while(node) {
        arr.push(value_converter(node.val));
        node = node.next;
    }
    
    return arr;
}

LinkedList.prototype.toString = function ( value_converter = v => v , connector = ' ==> ') {

    let str = '';
    let node = this.head;
    while(node) {
        str += value_converter(node.val) + connector;
        node = node.next;
    }

    return str.substr(0, str.length-5);
}


module.exports = LinkedList;

// NOTE https://www.geeksforgeeks.org/data-structures/linked-list/