const express = require("express")
const router = express.Router({mergeParams:true})
const Asyncwrap = require("../util/Asyncwrap")
const ExpressError = require("../util/ExpressError")
const { reviewschema} =  require("../schema.js")
const Review = require("../models/review")
const Listing = require("../models/listing")
const {validatereview, Loggedin , isreviewauthor, Logdelete} = require("../middleware.js")
const controllerreview = require("../controller/review.js")




router.post("/",
    Logdelete,
    validatereview, Asyncwrap(controllerreview.createreview))


//delete review route
router.delete("/:reviewid",
    Logdelete,
    isreviewauthor,
    Asyncwrap(controllerreview.deletereview))


module.exports = router
