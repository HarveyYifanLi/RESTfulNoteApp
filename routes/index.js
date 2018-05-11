var express = require("express");
var router = express.Router();


router.get("/", function(req,res){
    res.redirect("/notes");
});

//added an extra route to explain the 7 RESTful routes included
router.get("/restfulroutes", function(req,res){
    res.render("notes/restfulroutes");
})


module.exports = router;

