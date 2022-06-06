const Model = require('../templates/model')

class Navegacao extends Model {
  constructor (userId = null) {
    super('navigations', userId)
  }
}

module.exports = Navegacao
