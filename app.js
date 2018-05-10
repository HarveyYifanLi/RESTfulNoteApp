var express = require("express");
var app = express();
var mongoose = require("mongoose");

var Note = require("./models/note");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/restful_note_app");

var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

//set up jquery in node.js (i.e. serverside)
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = require("jquery")(window);

//old version of jsdom config, which does not work since jsdom v10
// jsdom.env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     var $ = require("jquery")(window);
// });

//app config
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//Remove all and then re-populate the DB with function seedDB() defined in seeds.js
seedDB();

// Note.create({
//     title:"first note",
//     image:"https://farm6.staticflickr.com/5145/5649228252_7dbaf5434c.jpg",
//     body:"Need to insert some stuff in the DB first..."
// }, function(err, dbres){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(dbres);
//     }
// })

app.get("/", function(req,res){
    res.redirect("/notes");
});

//index route
app.get("/notes", function(req,res){
    Note.find({}, function(err,dbres){
        if(err){
            console.log(err);
        }else{
            res.render("notes/index", {notesVar:dbres});
        }
    })
})

// new route
app.get("/notes/new", function(req,res){
    res.render("notes/new");
})
//create route
app.post("/notes", function(req,res){
    if(req.body.noteVar.title ==="" && req.body.noteVar.image ==="" && req.body.noteVar.body ===""){
        res.redirect("/notes/new");
    }else{
        Note.create(req.body.noteVar, function(err,dbres){
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
app.get("/notes/:id", function(req,res){
    Note.findById(req.params.id).populate("comments").exec(function(err,dbres){
        if(err){
            res.redirect("notes");
        }else{
            res.render("notes/show",{noteVar:dbres});
        }
    });
})

//edit route
app.get("/notes/:id/edit", function(req,res){
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
app.put("/notes/:id", function(req,res){
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
app.delete("/notes/:id", function(req,res){
    Note.findByIdAndRemove(req.params.id, function(err,dbres){
        if(err){
            console.log(err);
            res.redirect("/notes");
        }else{
            res.redirect("/notes");
        }
    })
})

//"comments" routes
// new route for "comments"
 app.get("/notes/:id/comments/new", function(req,res){
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
 app.post("/notes/:id/comments", function(req,res){
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



//added an extra route to explain the 7 RESTful routes included
app.get("/restfulroutes", function(req,res){
    res.render("notes/restfulroutes");
})

//app.listen()
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("The server is running...");
});


