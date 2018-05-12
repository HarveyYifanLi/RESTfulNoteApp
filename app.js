var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var Note = require("./models/note");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");
mongoose.connect("mongodb://localhost/restful_note_app");

var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

//require routes
var noteRoutes = require("./routes/notes");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

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
//passport config
app.use(require("express-session")({
    secret:"Bruce Lee is the best!",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// a middleware
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})
//use the routers
app.use(noteRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

//app.listen()
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("The server is running...");
});
