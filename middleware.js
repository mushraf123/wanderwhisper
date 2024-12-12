const Listing = require("./models/listing")
const ExpressError = require("./util/ExpressError")
const {listingschema, reviewschema } =  require("./schema.js")
const Review = require("./models/review.js")


module.exports.Loggedin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "You Must Be Logged In Before Creating New Lisitng")
       return res.redirect("/login")
    }
        next()
}

module.exports.Logedit = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "You Must Be Logged In Before Edit The Listing")
       return res.redirect("/login")
    }
        next()
}

module.exports.Logdelete = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error", "You Must Be Logged In Before Edit The Listing")
       return res.redirect("/login")
    }
        next()
}



module.exports.redirectsaveurl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}

module.exports.isowner = async(req,res,next)=>{
        let {id} = req.params
        let listing = await Listing.findById(id);
        if(!listing.owner.equals(res.locals.curuser.id )){
        req.flash("error", " You are not the owner of this listing")
       return res.redirect(`/listings/${id}`)
        }
       next()
}

module.exports.isreviewauthor = async(req,res,next)=>{
    let {reviewid, id} = req.params
    let review = await Review.findById(reviewid);
    if(!review.author.equals(res.locals.curuser.id) ){
    req.flash("error", " You are not the author of this review")
   return res.redirect(`/listings/${id}`)
    }
   next()
}

module.exports.validatelisting = (req,res,next)=>{
    let {error} = listingschema.validate(req.body)
       if(error){
        let ermsg = error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,ermsg)
       }
       else{
        next()
       }
}

module.exports.validatereview = (req,res,next)=>{
    let {error} = reviewschema.validate(req.body)
       if(error){
        let ermsg = error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,ermsg)
       }
       else{
        next()
       }
}
