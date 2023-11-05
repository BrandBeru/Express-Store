const {Client} = require('pg')

async function getConnection(){
const client = new Client({
  host: '192.168.0.100',
  port: 5432,
  user: 'brandberu',
  password: 'Giobero140206PSQL',
  database: 'my_store'
})
  await client.connect()
  return client
}

module.exports = getConnection
