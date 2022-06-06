const { Client } = require('pg')
const {
  DATABASE_DATABASE,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER
} = require('./constants')

async function getClient () {
  const client = new Client({
    port: DATABASE_PORT,
    host: DATABASE_HOST,
    database: DATABASE_DATABASE,
    password: DATABASE_PASSWORD,
    user: DATABASE_USER
  })
  await client.connect()
  return client
}

module.exports = {
  getClient
}
