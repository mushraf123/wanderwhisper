const Listing = require("../models/listing")
const Review = require("../models/review")

module.exports.createreview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review)

    newReview.author = req.user.id
    console.log(newReview)
    listing.review.push(newReview)
    await newReview.save()
    await listing.save()
    console.log("new review saved")
    req.flash("success", "New Review Created")
    res.redirect(`/listings/${listing.id}`)
}

module.exports.deletereview = async(req,res)=>{

    let{id, reviewid}= req.params

    await Review.findByIdAndDelete(reviewid)
    await Listing.findByIdAndUpdate(id,{$pull:{review : reviewid}})
    req.flash("success", " Review Deleted!")
    res.redirect(`/listings/${id}`)
}

