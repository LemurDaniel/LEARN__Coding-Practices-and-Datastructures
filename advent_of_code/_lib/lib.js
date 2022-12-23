

module.exports = {

  Datastructures: {
    ...require('./datastructures/Vector'),
    ...require('./datastructures/BoundedShape'),
    ...require('./datastructures/Heap'),
    ...require('./datastructures/Queue'),
    ...require('./datastructures/LinkedList'),
    ...require('./datastructures/CoordinateGrid')
  },

  Utils: {
    ...require('./utils/Print')

  }

}