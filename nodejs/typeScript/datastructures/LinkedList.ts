export class LinkedListNode<type> {

    public val: type;
    public next: LinkedListNode<type>;

    constructor(val: type, next: LinkedListNode<type> = null) {
        this.val = val;
        this.next = next ?? null;
    }
}


export class LinkedList<type> {

    public head: LinkedListNode<type>;
    public tail: LinkedListNode<type>;

    constructor(val: type = null, next: LinkedListNode<type> = null) {
        this.head = val ? new LinkedListNode<type>(val, next) : null;
        this.tail = this.head;
    }

    copy = () => LinkedList.Copy(this)

    static Copy(list: LinkedList<any>) {
        const copy = new LinkedList();
        let node = list.head;

        while (node) {
            copy.Append(node.val);
            node = node.next;
        }

        return copy;
    }

    static LinkedListFromString_Int(str: string) {

        const list = new LinkedList<number>();

        if (str.includes(','))
            str.split(',').forEach(el => list.Append(parseInt(el as string)));
        else
            str.split('').forEach(c => list.Append(parseInt(c as string)));

        return list;
    }

    Append(val: type) {

        if (this.head == null) {
            this.head = new LinkedListNode<type>(val);
            this.tail = this.head;
        } else {
            this.tail.next = new LinkedListNode<type>(val);
            this.tail = this.tail.next;
        }

    }

    Append_as_head(val: type) {

        const node = new LinkedListNode<type>(val, this.head);
        if (this.head == null)
            this.tail = node;
        this.head = node;

    }

    Remove_head() {
        if (this.head == null) return null;

        // Save node in variable and set head's next node as head
        const node = this.head;
        this.head = this.head.next;

        // If the head becomes null, the tail must be set null too.
        if (this.head == null) this.tail = null;

        return node;
    }

    to_array(value_converter = v => v) {

        const arr = [];
        let node = this.head;
        while (node) {
            arr.push(value_converter(node.val));
            node = node.next;
        }

        return arr;
    }


    toString(value_converter = v => v, connector = ' ==> ') {
        return LinkedList.toString(this.head, value_converter, connector);
    }


    static toString(head, value_converter = v => v, connector = ' ==> ') {

        let str = '';
        let node = head;
        while (node) {
            str += value_converter(node.val) + connector;
            node = node.next;
        }

        return str.substr(0, str.length - 5);
    }
}

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
