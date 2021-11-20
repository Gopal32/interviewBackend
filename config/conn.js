const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'Gopal@19',
    database: "interview"
})

conn.connect((err) => {
    if(err) throw err;
    console.log("Connected Successfully.....")
})

module.exports = conn;