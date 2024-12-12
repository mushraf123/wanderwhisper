if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express = require("express")
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")
const Review = require("./models/review")
const path = require("path")
const methodOveride = require("method-override")
const ejsmate = require("ejs-mate")
const gsap = require("gsap");
const { error } = require("console");
const ExpressError = require("./util/ExpressError")
const {listingschema , reviewschema} =  require("./schema.js")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/users.js")

const listings = require("./routes/listing.js")
const review = require("./routes/review.js")
const user = require("./routes/user.js")


const dbUrl = process.env.ATLASDB_URL;


main().then((res)=>{
    console.log("connection successful")
}).catch((err) =>{
     console.log(err)
    });

async function main() {
  await mongoose.connect(dbUrl);

}

app.set("views", path.join(__dirname, "views") )
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride("method"))
app.engine("ejs", ejsmate)
app.use(express.static(path.join(__dirname,"/public")))


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
})

store.on("error", ()=>{
    console.log("ERROR IN MONGO STORE", err)
})

const sessionOption = {
    store,
    secret: process.env.SECRET,
    saveUninitialized:true,
    resave:false,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 *1000,
        maxAge: 7 * 24 * 60 * 60 *1000,
        httpOnly:true
    }
}



let port = 8080;


app.listen(port,()=>{
    console.log(`The server is listening on port ${port}`)
})



app.use(session(sessionOption))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req,res, next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.curuser = req.user
    res.locals.listing = req.listings
    next()
})

app.use("/listings",listings)
app.use("/listings/:id/review", review)
app.use("/", user)




app.all("*",(req,res,next)=>{
    next( new ExpressError(404,"Page not found"))
})

app.use((err,req,res,next)=>{
    let{status=500,message="some thing went wrong"} = err
    res.status(status).render("listings/error.ejs",{message})

})