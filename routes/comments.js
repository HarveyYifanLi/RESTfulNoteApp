var express = require("express");
var router = express.Router();
var Note = require("../models/note");
var Comment = require("../models/comment");

//"comments" routes
// new route for "comments"
 router.get("/notes/:id/comments/new", isLoggedIn, function(req,res){
     Note.findById(req.params.id, function(err, note){
         if(err){
             console.log(err);
             res.redirect("/notes");
         }else{
             res.render("comments/new",{noteVar: note});
         }
     })
 })
 //create route for "comments"
 router.post("/notes/:id/comments", isLoggedIn, function(req,res){
     Note.findById(req.params.id, function(err, note){
         if(err){             
             console.log(err);
             res.redirect("/notes");
         }else{
             if(req.body.comment.author ==="" && req.body.comment.text ===""){
                res.redirect("/notes/"+req.params.id+"/comments/new");
            }else{
                 Comment.create(req.body.comment, function(err,dbres){
                     if(err){
                         console.log(err);
                     }else{
                         note.comments.push(dbres);
                         note.save();
                         res.redirect("/notes/"+req.params.id);
                     }
                 });
            }
         }
     })
 })
 
 //middleware to check if a use is currently logged in:
 function isLoggedIn(req, res, next){
  if(req.isAuthenticated){
   return next();
  }
  res.redirect("/login");
 }


module.exports = router;
