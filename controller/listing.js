const { query } = require("express");
const Listing = require("../models/listing")
const maptilerClient = require("@maptiler/client");
const mapToken = process.env.MAP_TOKEN;
// const maptilerClient = maptilerclient({ accessToken : mapToken});
// add your API key
maptilerClient.config.apiKey = mapToken;


module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({})
    res.render("listings/index.ejs", {allListings})
}

module.exports.rendernewform = (req,res)=>{
    res.render("listings/new.ejs")
}

module.exports.showListing = async(req,res,next)=>{
    let {id} = req.params
    const listing = await Listing.findById(id)
    .populate(
        {path:"review", populate:{path: "author"}})
        .populate("owner")
    if(!listing){
        req.flash("error", "The Listing you try is doesn't exist")
        res.redirect("/listings")
    }
    res.render("listings/show.ejs", {listing})
    console.log(listing)
}


module.exports.createListing = async(req,res,next)=>{
   
    let result = await maptilerClient.geocoding.forward(req.body.listing.location)

    let url = req.file.url;
    let filename = req.file.display_name;
    const newlist = new Listing(req.body.listing)
    newlist.owner = req.user.id;
    newlist.image = {url, filename}
    newlist.geometry = result.features[0].geometry
   let savelist = await newlist.save()
    console.log(savelist)
    req.flash("success", "New Listing Created")
    res.redirect("/listings")

   
}


module.exports.editListing = async(req,res,next)=>{
    let {id} = req.params
    const listing = await Listing.findById(id)
    if(!listing){
        req.flash("error", "The Listing you try is doesn't exist")
        res.redirect("/listings")
    }

    let originalimageurl = listing.image.url;
    originalimageurl = originalimageurl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {listing , originalimageurl})
}

module.exports.updateListing = async(req,res,next)=>{
    let {id} = req.params
    let lisitng =await Listing.findByIdAndUpdate(id,{...req.body.listing})
    let result = await maptilerClient.geocoding.forward(req.body.listing.location)
    lisitng.geometry = result.features[0].geometry
    let savelist = await lisitng.save()
    console.log(savelist)


    if(typeof req.file!== "undefined"){
    let url = req.file.url;
    let filename = req.file.display_name;
    lisitng.image ={url, filename}
    await lisitng.save();
    }
    req.flash("success", " Listing Updated")
    res.redirect(`/listings/${id}`)

}

module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params
   let deletelisting = await Listing.findByIdAndDelete(id)
   console.log(deletelisting)
    req.flash("success", "Listing Deleted!")
    res.redirect("/listings")
}