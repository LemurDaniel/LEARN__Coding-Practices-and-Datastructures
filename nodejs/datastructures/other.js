class ID_Object {

    static IDs = {}
    static Get_Unique_ID(obj) {
        
        const id = Math.floor((Math.random() * 10e12)).toString(16);
        if ( id in ID_Object.IDs ) return Helper.Get_Unique_Id();
        else ID_Object.IDs[id] = obj; 

        return id;
    }

    constructor(){
        this.id = ID_Object.Get_Unique_ID(this);
    }

}

class LRU_Node_Cache {

    constructor(max_len) {
        this.max_len = max_len;
        this.length  = 0;
        this.cache   = {}

        // A list of nodes, where the last used key gets put at the start of the list.
        // Works in O(1) time complexity.
        this.start   = null;
        this.tail    = null;
    }

    move_key_to_start(key) {
    
        // Get the of the key.
        const node = this.cache[key];

        // If the node is already at the start of the list then return.
        if(node == this.start) return;
        if(node == this.tail)  this.tail = node.prev;

        // If both pointers are null then it must be a new node.
        if(!node.next && !node.prev)  this.length++;

        // Remove the node from its current position.
        if(node.next)  node.next.prev = node.prev;
        if(node.prev)  node.prev.next = node.next;

        if(!this.tail) this.tail = node;
        
        // Set the pointers and put the node at the start of the list.
        if(this.start) this.start.prev = node;
        node.next      = this.start;
        node.prev      = null;
        this.start     = node;


        // Remove tail node if size is exceeded.
        if(this.length > this.max_len) {
            delete this.cache[this.tail.key];
            this.tail      = this.tail.prev;
            this.tail.next = null;
            this.length--;
        }
    }

    put(key, val) {
        
        if( key in this.cache ) this.cache[key].val = val;
        else this.cache[key] = { key: key, val: val };

        this.move_key_to_start(key);
    }

    get(key) {
        if( !(key in this.cache) ) return 'None';
        this.move_key_to_start(key);
        return this.start.val;
    }
}


module.exports = {
    ID_Object,
    LRU_Node_Cache
}