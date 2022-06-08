async function selectQuery (client, table, filters = {}) {
  const keys = Object.entries(filters)
  const conditions = []
  const values = []
  for (let i = 0; i < keys.length; i++) {
    conditions.push(`${keys[i][0]}=$${i + 1}`)
    values.push(keys[i][1])
  }
  const query = `SELECT * FROM ${table}${conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : ''}`
  let result
  if (values.length > 0) {
    result = await client.query(query, values)
  } else {
    result = await client.query(query)
  }
  return result.rows
}

async function updateQuery (client, table, id, body, userId) {
  const keys = Object.entries(body)
  const fields = []
  const values = []
  for (let i = 0; i < keys.length; i++) {
    fields.push(`${keys[i][0]}=$${i + 1}`)
    values.push(keys[i][1])
  }
  const query = `UPDATE ${table} SET ${fields.join(',')}${keys.length > 0 ? ',' : ''}updated_at=CURRENT_TIMESTAMP,updated_by=$${values.length + 1} WHERE id=$${values.length + 2} RETURNING *`
  values.push(userId)
  values.push(id)
  const result = await client.query(query, values)
  return result.rows
}

async function deleteQuery (client, table, id, userId) {
  const query = `UPDATE ${table} SET deleted_at=CURRENT_TIMESTAMP,deleted_by=$1 WHERE id=$2 RETURNING *`
  const result = await client.query(query, [userId, id])
  return result.rows
}

async function createQuery (client, table, body, userId) {
  try {
    const keys = Object.entries(body)
    const fields = []
    const positions = []
    const values = []
    for (let i = 0; i < keys.length; i++) {
      fields.push(keys[i][0])
      positions.push(`$${i + 1}`)
      values.push(keys[i][1])
    }
    const query = `INSERT INTO ${table} (${fields.join(',')}${keys.length > 0 ? ',' : ''}created_at,created_by) VALUES (${positions.join(',')},CURRENT_TIMESTAMP,$${values.length + 1})  RETURNING *`
    values.push(userId)
    const result = await client.query(query, values)
    return result.rows
  } catch( e ) {
    console.log('lalala')
    console.log(e)
  }
}

module.exports = {
  selectQuery,
  updateQuery,
  createQuery,
  deleteQuery
}
