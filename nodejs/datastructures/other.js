class ID_Object {

    static IDs = {}
    static Get_Unique_ID(obj) {

        const id = Math.floor((Math.random() * 10e12)).toString(16);
        if (id in ID_Object.IDs) return Helper.Get_Unique_Id();
        else ID_Object.IDs[id] = obj;

        return id;
    }

    constructor() {
        this.id = ID_Object.Get_Unique_ID(this);
    }

}

class LRU_Node_Cache {

    constructor(max_len) {
        this.max_len = max_len;
        this.length = 0;
        this.cache = {}

        // A list of nodes, where the last used key gets put at the start of the list.
        // Works in O(1) time complexity.
        this.start = null;
        this.tail = null;
    }

    move_key_to_start(key) {

        // Get the of the key.
        const node = this.cache[key];

        // If the node is already at the start of the list then return.
        if (node == this.start) return;
        if (node == this.tail) this.tail = node.prev;

        // If both pointers are null then it must be a new node.
        if (!node.next && !node.prev) this.length++;

        // Remove the node from its current position.
        if (node.next) node.next.prev = node.prev;
        if (node.prev) node.prev.next = node.next;

        if (!this.tail) this.tail = node;

        // Set the pointers and put the node at the start of the list.
        if (this.start) this.start.prev = node;
        node.next = this.start;
        node.prev = null;
        this.start = node;


        // Remove tail node if size is exceeded.
        if (this.length > this.max_len) {
            delete this.cache[this.tail.key];
            this.tail = this.tail.prev;
            this.tail.next = null;
            this.length--;
        }
    }

    put(key, val) {

        if (key in this.cache) this.cache[key].val = val;
        else this.cache[key] = { key: key, val: val };

        this.move_key_to_start(key);
    }

    get(key) {
        if (!(key in this.cache)) return 'None';
        this.move_key_to_start(key);
        return this.start.val;
    }
}


class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static fromAngle(angle, mag) {
        const x = Math.cos(angle) * mag;
        const y = Math.sin(angle) * mag;
        return new Vector(x, y);
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    print() {
        return `(${this.x} | ${this.y})`
    }
}

class Boundary {

    constructor(x, y, x2, y2) {
        this.p1 = new Vector(x, y);
        this.p2 = new Vector(x2, y2);
    }

    isPointOnBoundary(point) {
        const p1 = this.p1;
        const p2 = this.p2;

        const dxc = point.x - p1.x;
        const dyc = point.y - p1.y;

        const dxl = p2.x - p1.x;
        const dyl = p2.y - p1.y;

        const cross = dxc * dyl - dyc * dxl;

        if(cross !== 0) return false;

        return point.x <= Math.max(p1.x, p2.x) &&
            point.x >= Math.min(p1.x, p2.x) &&
            point.y <= Math.max(p1.y, p2.y) &&
            point.y >= Math.min(p1.y, p2.y);
    }

}


class Ray extends Vector {

    constructor(x, y, angle = 0) {
        super(x, y);
        this.angle = angle;
        this.intersections = 0;
    }

    cast(boundary) {
        const p1 = boundary.p1;
        const p2 = boundary.p2;

        const p3 = this;
        const p4 = Vector.fromAngle(this.angle, 1).add(this);

        const denominator = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
        if (denominator === 0) return false;

        const t = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / denominator;
        const u = -((p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x)) / denominator;

        if (t > 0 && t < 1 && u > 0) {
            const x = p1.x + t * (p2.x - p1.x);
            const y = p1.y + t * (p2.y - p1.y);
            this.intersections++;
            return new Vector(x, y);
        }

        return false;
    }

}


module.exports = {
    ID_Object,
    LRU_Node_Cache,
    Vector,
    Boundary,
    Ray,
}