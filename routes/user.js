const express = require("express")
const router = express.Router()
const User =  require("../models/users")
const Asyncwrap = require("../util/Asyncwrap")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const { redirectsaveurl } = require("../middleware")
const controlleruser = require("../controller/user")


router.route("/signup")
    .get(controlleruser.rendersignup)
    .post(Asyncwrap(controlleruser.signup))


router.route("/login")
     .get(controlleruser.renderloginfrom)
    .post(
        redirectsaveurl,
        passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true
    }), controlleruser.login)


router.get("/logout", controlleruser.logout)

module.exports = router