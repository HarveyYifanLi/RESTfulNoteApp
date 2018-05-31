var mongoose = require("mongoose");

var noteSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    comments:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
         }
    ],
    created:{type:Date, default: Date.now},
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    }
});

module.exports = mongoose.model("Note", noteSchema);