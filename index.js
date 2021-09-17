require("dotenv").config() //set environment variable
const express = require('express')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")

const app = express()

//set middleware
app.use(express.urlencoded({
  extended:true
}))
app.use(express.json())

//http logger
app.use(morgan('combined'))

//set templates
app.set('view engine', 'hbs');

//set static
app.use(express.static(__dirname + "\\static"))

//set cookie-parser
app.use(cookieParser())

//set route
app.use("/", require("./routes/index"))

//start server
const PORT = process.env.PORT || 3000
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

module.exports = app