const mysql = require("mysql2")
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'handa098610@',
  database : 'project',
  port     : "23306"
});

module.exports = connection;