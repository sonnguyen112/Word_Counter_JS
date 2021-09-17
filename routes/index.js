const express = require("express")
const router = express.Router()
const indexControler = require("../controllers/indexController")

router.use("/logout", indexControler.logout)
router.use("/login", indexControler.login)
router.use("/register",indexControler.register)
router.use("/counter",indexControler.counter)
router.use("/", indexControler.index)

module.exports = router