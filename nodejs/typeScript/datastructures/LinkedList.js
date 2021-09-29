"use strict";
exports.__esModule = true;
exports.LinkedList = exports.LinkedListNode = void 0;
var LinkedListNode = /** @class */ (function () {
    function LinkedListNode(val, next) {
        if (next === void 0) { next = null; }
        this.val = val;
        this.next = next !== null && next !== void 0 ? next : null;
    }
    return LinkedListNode;
}());
exports.LinkedListNode = LinkedListNode;
var LinkedList = /** @class */ (function () {
    function LinkedList(val, next) {
        var _this = this;
        if (val === void 0) { val = null; }
        if (next === void 0) { next = null; }
        this.copy = function () { return LinkedList.Copy(_this); };
        this.head = val ? new LinkedListNode(val, next) : null;
        this.tail = this.head;
    }
    LinkedList.Copy = function (list) {
        var copy = new LinkedList();
        var node = list.head;
        while (node) {
            copy.Append(node.val);
            node = node.next;
        }
        return copy;
    };
    LinkedList.LinkedListFromString_Int = function (str) {
        var list = new LinkedList();
        if (str.includes(','))
            str.split(',').forEach(function (el) { return list.Append(parseInt(el)); });
        else
            str.split('').forEach(function (c) { return list.Append(parseInt(c)); });
        return list;
    };
    LinkedList.prototype.Append = function (val) {
        if (this.head == null) {
            this.head = new LinkedListNode(val);
            this.tail = this.head;
        }
        else {
            this.tail.next = new LinkedListNode(val);
            this.tail = this.tail.next;
        }
    };
    LinkedList.prototype.Append_as_head = function (val) {
        var node = new LinkedListNode(val, this.head);
        if (this.head == null)
            this.tail = node;
        this.head = node;
    };
    LinkedList.prototype.Remove_head = function () {
        if (this.head == null)
            return null;
        // Save node in variable and set head's next node as head
        var node = this.head;
        this.head = this.head.next;
        // If the head becomes null, the tail must be set null too.
        if (this.head == null)
            this.tail = null;
        return node;
    };
    LinkedList.prototype.to_array = function (value_converter) {
        if (value_converter === void 0) { value_converter = function (v) { return v; }; }
        var arr = [];
        var node = this.head;
        while (node) {
            arr.push(value_converter(node.val));
            node = node.next;
        }
        return arr;
    };
    LinkedList.prototype.toString = function (value_converter, connector) {
        if (value_converter === void 0) { value_converter = function (v) { return v; }; }
        if (connector === void 0) { connector = ' ==> '; }
        return LinkedList.toString(this.head, value_converter, connector);
    };
    LinkedList.toString = function (head, value_converter, connector) {
        if (value_converter === void 0) { value_converter = function (v) { return v; }; }
        if (connector === void 0) { connector = ' ==> '; }
        var str = '';
        var node = head;
        while (node) {
            str += value_converter(node.val) + connector;
            node = node.next;
        }
        return str.substr(0, str.length - 5);
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
/*
###################################################################################################
##### Circular Linked List
###################################################################################################
*/
// NOTE https://www.geeksforgeeks.org/data-structures/linked-list/
/*
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

*/
