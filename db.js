const mysql = require('mysql2/promise')

module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'catalogo_produtos',
  connectionLimit: 10,
  waitForConnections:true,
  queueLimit:0
})
