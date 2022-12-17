

module.exports = {

  Datastructures: {
    Vector: require('./datastructures/Vector'),
    BoundedShape: require('./datastructures/BoundedShape'),
    ...require('./datastructures/Heap'),
    ...require('./datastructures/Queue')
  },

  Utils: {
    ...require('./utils/Print')

  }

}