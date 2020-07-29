const { createPool } = require('mysql')
const env = process.env
const pool = createPool({
    port: env.MYSQL_PORT,
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASS,
    database: env.MYSQL_DB,
    connectionLimit: 10
})



module.exports = pool