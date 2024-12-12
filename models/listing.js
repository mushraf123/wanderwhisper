const { ref } = require("joi");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const Review = require("./review.js");

const ListSchema = new Schema({
    title:{
        type:String,
        require:true
    },

    description: String,
    image:{
        url: String,
        filename: String,
    },

    price: Number,
    location: {
     type:String,
     require:true
    },
    country:String,

    review:[{

        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
})

ListSchema.post("findOneAndDelete", async(listing)=>{
    if(listing) {
    await Review.deleteMany({_id :{$in : listing.review}})
    }
})

const Listing = mongoose.model("Listing", ListSchema)


module.exports = Listing