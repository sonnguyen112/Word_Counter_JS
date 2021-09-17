require("dotenv").config()
const mysql = require("mysql2")

const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD
})

// var sql = "SELECT * FROM history;"
// connection.query(sql, function(err,res){
//     if (err){
//         console.log(err)
//     }
//     console.log(res)
// })

module.exports = connection.promise()