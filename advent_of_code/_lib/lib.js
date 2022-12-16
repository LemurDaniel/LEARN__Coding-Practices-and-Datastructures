

module.exports = {

  Datastructures: {
    Vector: require('./datastructures/Vector'),
    ...require('./datastructures/Heap'),
    ...require('./datastructures/Queue')
  },

  Utils: {
    ...require('./utils/Print')

  }

}