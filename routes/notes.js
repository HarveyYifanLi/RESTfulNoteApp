var express = require("express");
var router = express.Router();
var Note = require("../models/note");

//index route
router.get("/notes", function(req,res){
    Note.find({}, function(err,dbres){
        if(err){
            console.log(err);
        }else{
            res.render("notes/index", {notesVar:dbres});
        }
    })
})

// new route
//Moreover, Can't post a new note until loggedin!!
router.get("/notes/new", isLoggedIn, function(req,res){
    res.render("notes/new");
})
//create route
router.post("/notes", isLoggedIn, function(req,res){
    if(req.body.noteVar.title ==="" && req.body.noteVar.image ==="" && req.body.noteVar.body ===""){
        res.redirect("/notes/new");
    }else{
        var title = req.body.noteVar.title;
        var image = req.body.noteVar.image;
        var body = req.body.noteVar.body;
        var author = {
            username: req.user.username,
            id: req.user._id
        }
        var newNote ={
            title: title,
            image: image,
            body: body,
            author: author
        }
        Note.create(newNote, function(err,dbres){
            if(err){
                console.log(err);
                res.redirect("/notes/new");
            }else{
                console.log(req.body.noteVar);
                res.redirect("/notes");
            }
        })
    }
})

//show route (which also contains all the comments)
router.get("/notes/:id", function(req,res){
    Note.findById(req.params.id).populate("comments").exec(function(err,dbres){
        if(err){
            res.redirect("notes");
        }else{
            res.render("notes/show",{noteVar:dbres});
        }
    });
})

//edit route
router.get("/notes/:id/edit", isLoggedIn, function(req,res){
    Note.findById(req.params.id, function(err,dbres){
        if(err){
            console.log(err);
            res.redirect("/notes");
        }else{
            res.render("notes/edit", {noteVar:dbres});
        }
    })
})
//update route
router.put("/notes/:id", isLoggedIn, function(req,res){
    //need to sanitize the newNoteVar[body] first...
    req.body.newNoteVar.body = req.sanitize(req.body.newNoteVar.body);
    Note.findByIdAndUpdate(req.params.id, req.body.newNoteVar, function(err, dbres){
        if(err){
            res.redirect("/notes");
        }else{
            res.redirect("/notes/"+req.params.id);
        }
    })
})

//delete route
router.delete("/notes/:id", isLoggedIn, function(req,res){
    Note.findByIdAndRemove(req.params.id, function(err,dbres){
        if(err){
            console.log(err);
            res.redirect("/notes");
        }else{
            res.redirect("/notes");
        }
    })
})

//middleware to check if a use is currently logged in:
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;