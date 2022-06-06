const bcrypt = require('bcrypt')

const SALT = 10

async function generateHashPassword (password) {
  return await bcrypt.hash(password, SALT)
}

async function compareHashPassword (password, hash) {
  return await bcrypt.compare(password, hash)
}

module.exports = {
  generateHashPassword,
  compareHashPassword
}
