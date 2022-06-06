const Model = require('../templates/model')

class Novidade extends Model {
  constructor (userId = null) {
    super('news', userId)
  }
}

module.exports = Novidade
