const debug = require('debug')('car-shop:api:db')

export default {
  db: {
    database: process.env.DB_NAME || 'db name',
    username: process.env.DB_USERNAME || 'db username',
    password: process.env.DB_PASS || 'db pass',
    host: process.env.DB_HOST || 'db host',
    dialect: 'postgres',
    loggin: s => debug(s)
  },
  auth: {
    secret: process.env.SECRET || "my secret example",
    algorithms: ['RS256']
  }
}