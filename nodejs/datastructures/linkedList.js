class Node {

    constructor(val, next) {
        this.val = val;
        this.next = next ?? null;
    }

    [Symbol.iterator]() {
        return {
            _node: this,
            next: function () {
                if (this._node == null) return { done: true };
                const val = this._node.val;
                this._node = this._node.next;
                return { value: val, done: false };
            }
        }
    }

}



class LinkedList {

    static Node = Node;

    [Symbol.iterator]() {
        return {
            _node: this.head,
            next: function () {
                if (this._node == null) return { done: true };
                const val = this._node.val;
                this._node = this._node.next;
                return { value: val, done: false };
            }
        }
    }

    constructor(val, next) {
        this.head = val ? new LinkedList.Node(val, next) : null;
        this.tail = this.head;
    }

    copy() {
        return LinkedList.Copy(this);
    };

    print() {
        return this.toString()
    };
}

LinkedList.Copy = function (list) {

    const copy = new LinkedList();
    let node = list.head;

    while (node) {
        copy.Append(node.val);
        node = node.next;
    }

    return copy;
}

LinkedList.LinkedListFromString = function (str) {

    const list = new LinkedList();

    if (str.includes(','))
        str.split(',').forEach(el => Number.isNaN(parseInt(el)) ? list.Append(el.trim()) : list.Append(parseInt(el)));
    else if (str.includes(' '))
        str.split(' ').forEach(el => Number.isNaN(parseInt(el)) ? list.Append(el.trim()) : list.Append(parseInt(el)));
    else
        str.split('').forEach(el => Number.isNaN(parseInt(el)) ? list.Append(el.trim()) : list.Append(parseInt(el)));

    return list;
}


LinkedList.prototype.Append = function (val) {

    if (this.head == null) {
        this.head = new LinkedList.Node(val);
        this.tail = this.head;
    } else {
        this.tail.next = new LinkedList.Node(val);
        this.tail = this.tail.next;
    }

}

LinkedList.prototype.Append_as_head = function (val) {

    const node = new LinkedList.Node(val, this.head);
    if (this.head == null)
        this.tail = node;
    this.head = node;

}

LinkedList.prototype.Remove_head = function () {
    if (this.head == null) return null;

    // Save node in variable and set head's next node as head
    const node = this.head;
    this.head = this.head.next;

    // If the head becomes null, the tail must be set null too.
    if (this.head == null) this.tail = null;

    return node;
}

LinkedList.prototype.to_array = function (value_converter = v => v) {

    const arr = [];
    let node = this.head;
    while (node) {
        arr.push(value_converter(node.val));
        node = node.next;
    }

    return arr;
}


LinkedList.prototype.toString = function (value_converter = v => v, connector = ' ==> ') {
    return LinkedList.toString(this, value_converter, connector);
}


LinkedList.toString = function (list, value_converter = v => v, connector = ' ==> ') {

    if(list.head === null && list.tail === null)
        return '<HEAD> -> <TAIL>'

    let str = '<HEAD> -> ';
    let node = list.head;
    
    while (node) {
        str += value_converter(node.val);
        if (node === list.tail)
            str += ' -> <TAIL>'
        str += connector;
        node = node.next;
    }

    str = str.substr(0, str.length - 5);

    if(list.tail === null) str+= ' [/?? <TAIL> Null Pointer]'
    return str;
}

/*
###################################################################################################
##### Circular Linked List
###################################################################################################
*/

// NOTE https://www.geeksforgeeks.org/data-structures/linked-list/

class CircularLinkedList {

    static Node = Node;

    constructor(val, next) {
        this.tail = val ? new CircularLinkedList.Node(val, next) : null;
    }

    copy = () => LinkedList.Copy(this)

    Tail = () => this.tail;

    Head = () => this.tail ? this.tail.next : null;
}

CircularLinkedList.prototype.Append = function (val) {

    if (!this.tail) {
        this.tail = new CircularLinkedList.Node(val);
        this.tail.next = this.tail;
    } else {
        this.tail.next = new CircularLinkedList.Node(val, this.tail.next);
        this.tail = this.tail.next;
    }

}

CircularLinkedList.prototype.toString = function (converter = v => v, connector = ' ==> ') {

    let str = '<HEAD>' + connector;
    let node = this.tail;
    do {
        node = node.next;
        str += converter(node.val) + connector;
    } while (node != this.tail)

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