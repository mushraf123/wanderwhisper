const mongoose = require("mongoose");
const Listing = require("../models/listing.js")
const initdata = require("./data.js")


let url = "mongodb://127.0.0.1:27017/wonderlist"

main().then((res)=>{
    console.log("connection successful")
}).catch((err) =>{
     console.log(err)
    });

async function main() {
  await mongoose.connect(url);

}

const initdb = async()=>{
 await  Listing.deleteMany({})
 initdata.data = initdata.data.map((obj)=>({...obj, owner:"6691152e28df7ae4e078a855"}));
 await  Listing.insertMany(initdata.data)
 console.log("data was initialized")
}

initdb().catch((err)=>{
    console.log(err)
})


