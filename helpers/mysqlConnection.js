const mysql = require('mysql');

// ----- SETTING DB CONNECTION -----
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'psw',
    database: 'reportsdb'
});

// ----- CONNECTING TO DB -----
mysqlConnection.connect((err) => {
    err ? console.log(err) : console.log('Connected to MySQL DB!');
  });

  module.exports = mysqlConnection;