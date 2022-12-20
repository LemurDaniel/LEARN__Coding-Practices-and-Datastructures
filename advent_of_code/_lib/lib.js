

module.exports = {

  Datastructures: {
    ...require('./datastructures/Vector'),
    BoundedShape: require('./datastructures/BoundedShape'),
    ...require('./datastructures/Heap'),
    ...require('./datastructures/Queue'),
    ...require('./datastructures/LinkedList')
  },

  Utils: {
    ...require('./utils/Print')

  }

}