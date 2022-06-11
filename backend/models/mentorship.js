const Model = require('../templates/model')

class User extends Model {
  constructor (userId = null) {
    super('users', userId)
  }
}

module.exports = User
