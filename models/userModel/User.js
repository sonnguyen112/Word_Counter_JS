const db = require("../../config/db")
class User{
    constructor(email, username, password){
        this.email = email
        this.username = username
        this.password = password
    }

    save(){
        var sql = `INSERT INTO user(email, username, password) VALUES ('${this.email}', '${this.username}', '${this.password}')`
        db.query(sql)
    }

    static async findUserByEmail(email){
        var sql = `SELECT * FROM user WHERE email = '${email}'`
        var user = await db.query(sql)
        return user[0]
    }

    static async findUserByUsername(username){
        var sql = `SELECT * FROM user WHERE username = '${username}'`
        var user = await db.query(sql)
        return user[0]
    }

    static async findUserById(id){
        var sql = `SELECT * FROM user WHERE id = ${id}`
        var user = await db.query(sql)
        return user[0]
    }
}

module.exports = User