var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req,res){
    res.redirect("/notes");
});

// show register form
router.get("/register", function(req,res){
    res.render("register");
});

router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, dbres){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/notes");
        })
    })
})

router.get("/login", function(req,res){
    res.render("login");
})

router.post("/login", passport.authenticate("local", {
    successRedirect:"/notes",
    failureRedirect:"/login"
}), function(req,res){
})

router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/notes");
})
//added an extra route to explain the 7 RESTful routes included
router.get("/restfulroutes", function(req,res){
    res.render("notes/restfulroutes");
})


module.exports = router;

