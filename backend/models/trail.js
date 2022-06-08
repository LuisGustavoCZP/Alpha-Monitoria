const Model = require('../templates/model')

class Duvida extends Model {
  constructor (userId = null) {
    super('trails', userId)
  }
}

module.exports = Duvida
