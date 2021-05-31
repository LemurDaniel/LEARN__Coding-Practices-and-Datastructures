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
    
    const keywords = ['list'];

    if(typeof str == 'object') {

        for(let key of Object.keys(str)){

            if( keywords.includes(key) )
                str[key] = LinkedList.LinkedListFromString_Int(str[key]);
            else if( typeof str[key] == 'string' && str[key][0] == '&' )
                str[key] = LinkedList.LinkedListFromString_Int(str[key].substr(1, str[key].length));
            else if( typeof str[key] == 'object' )
                str[key] = LinkedList.LinkedListFromString_Int(str[key]);

        }

        console.log(str)
        return str;
    }

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

LinkedList.prototype.Append_as_head = function (val) {
    
    const node = new LinkedList.Node(val, this.head);
    if(this.head == null)
        this.tail = node;
    this.head = node;

}

LinkedList.prototype.Remove_head = function () {
    if(this.head == null) return null;

    // Save node in variable and set head's next node as head
    const node = this.head;
    this.head  = this.head.next;

    // If the head becomes null, the tail must be set null too.
    if(this.head == null) this.tail = null;

    return node;
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


LinkedList.prototype.toString = function ( value_converter = v => v, connector = ' ==> ') {
    return LinkedList.toString(this.head, value_converter, connector);
}


LinkedList.toString = function (head, value_converter = v => v, connector = ' ==> ') {

    let str  = '';
    let node = head;
    while(node) {
        str += value_converter(node.val) + connector;
        node = node.next;
    }

    return str.substr(0, str.length-5);
}


/*
###################################################################################################
##### Circular Linked List
###################################################################################################
*/

// NOTE https://www.geeksforgeeks.org/data-structures/linked-list/

class CircularLinkedList {

    static Node = Node;

    constructor(val, next){
        this.tail = val ? new CircularLinkedList.Node(val, next) : null;
    }

    copy = () => LinkedList.Copy(this)

    Tail = () => this.tail;

    Head = () => this.tail ? this.tail.next : null;
}

CircularLinkedList.prototype.Append = function (val) {

    if(!this.tail) {
        this.tail = new CircularLinkedList.Node(val);
        this.tail.next = this.tail;
    } else {
        this.tail.next = new CircularLinkedList.Node(val, this.tail.next);
        this.tail = this.tail.next;
    } 

}

CircularLinkedList.prototype.toString = function ( converter = v => v , connector = ' ==> ') {

    let str = '<HEAD>'+connector;
    let node = this.tail;
    do {
        node = node.next;
        str += converter(node.val) + connector;
    } while(node != this.tail)

    return str + '<TAIL>';
}


module.exports = LinkedList;

/*
const t = new CircularLinkedList();
t.Append(1)
t.Append(2)
t.Append(3)
console.log(t.Tail())
console.log(t.Head())
console.log(t.toString());
*/