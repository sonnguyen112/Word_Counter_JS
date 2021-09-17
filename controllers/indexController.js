const History = require("../models/indexModel/History")
const User = require("../models/userModel/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

var message = "" //used to register and login
class IndexController{
    async index(req, res){
        var token = req.cookies["jwt"]
        if (token){
            //get id user by cookie
            var decoded = jwt.verify(token, process.env.PRIVATE_KEY); 
            var idUser = decoded["id"]
            var user = await User.findUserById(idUser)
            console.log(user)

            var history = await History.getAll()
            return res.render("index", {
                histories : history[0],
                user:user[0]
            })
        }
        return res.redirect("/login")
    }

    counter(req, res){
        console.log(req.method)
        var numWord = req.body.text.split(" ").length
        var history = new History(req.body.text, numWord)
        history.save()
        return res.render("counter", {
            numWord : numWord
        })
    }

    async register(req, res){
        if (req.method === "POST"){
            var username = req.body["username"]
            var email = req.body["email"]
            var password = req.body["password"]
            var password2 = req.body["password2"]

            if (password === password2){
                var user_email = await User.findUserByEmail(email)
                if (user_email.length > 0){
                    message = "The email has already"
                    return res.redirect("/register")
                }
                var user_username = await User.findUserByUsername(username)
                if (user_username.length > 0){
                    message = "The username has already"
                    return res.redirect("/register")
                }
                //hash password
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
                console.log(hash)

                var user = new User(email, username, hash)
                user.save()
                return res.render("login_register")
            }
            else{
                message = "The password must same"
                return res.redirect(`/register`)
            }
        }
        return res.render("login_register", {
            message : message
        })
    }


    async login(req, res){
        message = ""
        if (req.method === "POST"){
            var username = req.body["username"]
            var password = req.body["password"]

            var user = await User.findUserByUsername(username)

            var checkPass = bcrypt.compareSync(password, user[0]["password"]);
            if (checkPass){
                var cookie = req.cookies["jwt"]
                if (cookie === undefined){ //not have cookie
                    var token = jwt.sign({"id":user[0]["id"]}, process.env.PRIVATE_KEY, {expiresIn:3*24*60*60});
                    res.cookie("jwt", token, {maxAge: 3*24*60*60*1000, httpOnly: true})
                    return res.redirect("/")
                } 
                else{

                }
            }
            else{
                message = "Wrong username or password"
            }
        }
        return res.render("login_register", {
            message:message
        })
    }

    logout(req, res){
        res.cookie("jwt", " ", {maxAge:1})
        return res.redirect("/login")
    }

}

module.exports = new IndexController