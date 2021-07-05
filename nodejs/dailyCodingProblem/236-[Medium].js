const Inout = new (require("../Inout"))("Daily Coding Problem --- Determine if point is in shape");
const { Vector, Boundary, Ray } = require("../datastructures/other");
const Helper = require('../Helper');

/*

    Good morning! Here's your coding interview problem for today.

    This problem was asked by Nvidia.

    You are given a list of N points (x1, y1), (x2, y2), ..., (xN, yN) representing a polygon. 
    You can assume these points are given in order; that is, you can construct the polygon by connecting point 1 to point 2, point 2 to point 3, and so on, finally looping around to connect point N to point 1.

    Determine if a new point p lies inside this polygon. (If p is on the boundary of the polygon, you should return False).

*/

Inout.convert_result = res => {
    if(res === 0) return 'Point is on the boundary of the Polygon';
    if(res === true) return 'Point is on the inside of the Polygon';
    if(res === false || res === -1 ) return 'Point is outside of the Polygon';
    return res;
}
Inout.convert_output = Inout.convert_result;

Inout.push( { 
    shape: '&PT 1,1|-1,1|-1,-1|1,-1',
    point: new Vector(0, 0)
},true);

Inout.push( { 
    shape: '&PT 1,1|-1,1|-1,-1|1,-1',
    point: new Vector(2, 0),
},false);

Inout.push( { 
    shape: '&PT 1,1|-1,1|-1,-1|1,-1',
    point: new Vector(1, 1),
},0);


Inout.push( { 
    shape: '&PT 0,0|12,0|8,8|0,12',
    point: new Vector(20, 20),
},false);
Inout.push( { 
    shape: '&PT 0,0|12,0|8,8|0,12',
    point: new Vector(4, 5),
},true);

Inout.solvers = [isPointInShape];
Inout.solve();

/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/

function isPointInShape( shape, point) {

    if(shape.length < 3) throw new Error('Shape needs three points');

    // Bounding Box check.
    const min = new Vector(0, 0);
    const max = new Vector(0, 0);
    for(const p of shape) {
        max.x = Math.max(max.x, p.x)
        max.y = Math.max(max.y, p.y)
        min.x = Math.min(min.x, p.x)
        min.y = Math.min(min.y, p.y)
    }

    if ( point.x > max.x || point.y > max.y || point.x < min.x || point.y < min.y ) return -1;


    // Note https://www.youtube.com/watch?v=TOEi6T2mtHo
    const ray = new Ray(point.x, point.y);

    for(let i=1; i<=shape.length; i++) {
        const prev = shape[i-1];
        const curr = i === shape.length ? shape[0] : shape[i];
        const bound = new Boundary(prev.x, prev.y, curr.x, curr.y);
 
        // Check if point is directly on boundary.
        if(bound.isPointOnBoundary(point)) return 0;
        else ray.cast(bound);
    }

    return ray.intersections > 0 && ray.intersections % 2 !== 0;

}