const express = require("express")
const router = express.Router()
const Asyncwrap = require("../util/Asyncwrap")
const ExpressError = require("../util/ExpressError")
const {listingschema } =  require("../schema.js")
const Listing = require("../models/listing")
const {Loggedin, isowner} = require("../middleware.js")
const {Logedit} = require("../middleware.js")
const {validatelisting} = require("../middleware.js")
const controllerlisting = require("../controller/listing.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })


router
.route("/")
.get(Asyncwrap(controllerlisting.index))
.post(
Loggedin,
upload.single("listing[image]"),
validatelisting,
Asyncwrap(controllerlisting.createListing)
);
        
    
//new Route  
router.get("/new",Loggedin,controllerlisting.rendernewform)

    
router.route("/:id")
         .get(Asyncwrap(controllerlisting.showListing))
         .put(
        Logedit,
        isowner,
        upload.single("listing[image]"),
        validatelisting,
        Asyncwrap(controllerlisting.updateListing))
        .delete(Logedit,isowner,
        Asyncwrap(controllerlisting.deleteListing)
        );
    
//edit route 
router.get("/:id/edit",
    Logedit,
    isowner,
    Asyncwrap(controllerlisting.editListing))
    
    module.exports = router