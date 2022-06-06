const Model = require('../templates/model')

class Duvida extends Model {
  constructor (userId = null) {
    super('doubts', userId)
  }
}

module.exports = Duvida
