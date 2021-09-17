const db = require("../../config/db")
class History{
    constructor(text, num_word){
        this.text = text
        this.num_word = num_word
    }

    save(){
        var sql = `INSERT INTO history(text, num_word) VALUES ('${this.text}','${this.num_word}')`
        db.query(sql)
    }

    static getAll(){
        var sql = "SELECT * FROM history;"
        return db.query(sql)
    }
}

module.exports = History
