const Inout = new (require ('../Inout'))('DailyCode --- Find Closest Points');
const LinkedList = require('../datastructures/linkedList');
const Helper = require('../Helper');

/*

    Hi, here's your problem today. This problem was recently asked by LinkedIn:

    Given a list of points as a tuple (x, y) and an integer k, find the k closest points to the origin (0, 0).

    Here's an example and some starter code:

    def closest_points(points, k):
    # Fill this in.

    print(closest_points([(0, 0), (1, 2), (-3, 4), (3, 1)], 2))
    # [(1, 2), (0, 0)]

*/

Inout.map_input = (input, solver) => solver(input.points, input.k); 

function add_testcase(str, k, out) {
    Inout.push( { 
        input: { 
            points: Helper.string_toIntArray(str),
            k: k 
        },
        output: Helper.string_toIntArray(out)
    } );
}

add_testcase('0,0|1,2|-3,4|3,1', 2, '0,0|1,2');
add_testcase('-3,4|3,1|0,0|1,2|', 2, '0,0|1,2');
add_testcase('-3,4|3,1|0,0|1,2|', 3, '0,0|1,2|3,1');

Inout.solvers = [find_nearest_points];
Inout.solve();



/*
    ###########################################################################################
    ###########################################################################################
    ####################             Solving problem below              #######################
    ###########################################################################################
*/


/*
    Create a linked list which will store all points an their distance in ascending order.
    The root of the list will be the point with the lowest distance increasing from there.

    The main for-loop calculates the distance for each point in the array, then traverses all
    values from the start of the linked list until a maximal depth of k-1. This way it doesn't 
    traverse the whole list each iteration but only the k first points with the smallest distance.

    If it exceeds k-1 the main for-loop jumps to the next point.
    If its distance is smaller then one of points in the linked list, the point gets inserted
    as a new node at this place in the linked list, moving everything following it by one.

    After finishing the main loop an array is created from the k first nodes in the linked list
    representing the points with the smallest distance to origin (0, 0).
*/
function find_nearest_points(points, k){

    const nearest_points = new LinkedList();

    for(let point of points) {
        const dist = Math.sqrt(point[0]*point[0] + point[1]*point[1]);

        let prev = null;
        let node = nearest_points.root;
        let depth = 0;

        while(depth++ < k) {
            // if no node is present or the distance is smaller than the one of the current node
            // then insert the current point at this place in the Linked List
            if(node == null || dist <= node.val.dist) {
                // to be inserted object with the current point and its distance
                const insert =  { point: point, dist: dist };
                // insert as node in list or as root of the list
                if(prev != null) prev.next = new LinkedList.Node(insert, node);
                else nearest_points.Append_as_root(insert);
                node = insert;
            }

            // break when end of list is reached
            if(node == null) break;
            // keep the linked list the size of k
            else if(depth >= k) node.next = null;

            // move forward in linked list by one node
            prev = node;
            node = node.next;
        }
    }

    return nearest_points.to_array( v => v.point );
}