const User =  require("../models/users")


module.exports.rendersignup = (req,res)=>{
    res.render("users/signup.ejs")
    }


module.exports.renderloginfrom = (req,res)=>{
    res.render("users/login.ejs")
    }


module.exports.signup = async(req,res)=>{
    try{
        let{username,email,password} = req.body;
        const newUser =new User({username,email});
        let registeruser = await User.register(newUser, password)
        console.log(registeruser)
        req.login(registeruser, (err)=>{
            if(err){
                return next(err)
            }
            req.flash("success", "Welcome to WanderWhisper")
        res.redirect("/listings")
        })
        
    } catch(e){
        req.flash("error", e.message)
        res.redirect("/signup")
    }
    
}


module.exports.login = async(req,res)=>{
    req.flash("success", "Welcome back to WanderWhisper")
    let redirectUrl = res.locals.redirectUrl || "/listings" 
    res.redirect(redirectUrl)
    
    }


module.exports.logout =  (req,res,next)=>{
        req.logout((err)=>{
            if(err){
                return next(err)
            }
            req.flash("success", "You Have Logout From WanderWhisper")
        res.redirect("/listings")
        })
        
    }