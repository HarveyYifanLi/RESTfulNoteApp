var mongoose = require("mongoose");
var Note = require("./models/note");
var Comment = require("./models/comment");

var seedsData = [
    { 
    title:"Broadridge Financial Solutions, Inc.",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8rfYSctHjWwGwPbrn7Wv8SIyUyJkfsODcHW9ISS4uDgBq369",
    body:"Broadridge, a global fintech leader with $4 billion in revenue, helps clients get ahead of today’s challenges" 
    + "to capitalize on what’s next with communications, technology, data and analytics solutions that help transform their businesses."
    + "BR (NYSE) 107.81  stock-arrow 0.42"
    + "<p><strong>MileStones</strong></p>"
    + "<p>In 2010, Broadridge Financial Solutions acquired NewRiver, Inc., an innovator in Electronic Investor Disclosure [3]</p>"
    + "<p>In 2011, it acquired Matrix Financial Solutions, a provider of retirement products for third party administrators and other financial professionals.[4]</p>"
    + "<p>Also in 2011, Broadridge Financial Solutions acquired Paladyne Systems, Inc., a provider of investment management solutions.[5]</p>"
    + "<p>In 2016, Broadridge Financial Solutions acquired DST’s North American Customer Communications Business. [6]</p>"
    + "<p>Also in 2016, the company acquired M&amp;O Systems, Inc., an advisor to wealth management firms, for $25 million in cash.[7]</p>"
    + "<p>In 2017, the company acquired institutional Spence Johnson for an undisclosed sum.[8]</p>",
    //Must not include this field!!!   created:{type:Date, default: Date.now}
    },
    { 
    title:"Dataphile",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAP2mRYkkklE64tzOqwSxd46l1LBfcBRMZv6gcD2L2AEUnuG6P",
    body:"<p><strong>Sector: Technology</strong></p>" 
    + "<p>Industry: Software</p>"
    + "<p>Sub-Industry: Application Software</p>"
    + "Dataphile Software Limited provides real-time straight-through processing solutions for broker/dealers in Canada. The Company's products include ExeClear a real-time back-office" 
    + "processing engine, ExeNet, an Internet-based retail client desktop, and RapidPhire, a proprietary order management system with electronic interfaces to the Canadian exchanges." 
    + "BR (NYSE) 107.81  stock-arrow 0.42",
    //Must not include this field!!!   created:{type:Date, default: Date.now}
    },
    { 
    title:"ClearancePro",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAP2mRYkkklE64tzOqwSxd46l1LBfcBRMZv6gcD2L2AEUnuG6P",
    body:"LAKE SUCCESS, N.Y., Feb. 14, 2013 – Broadridge Financial Solutions (NYSE:BR), the leading provider of investor communications and technology-driven solutions to broker-dealers, banks, mutual funds and corporate issuers, today announced new functionality for its ClearanceProSM processing capabilities for clients in North America.  ClearancePro is a pre-settlement and settlement clearing solution that provides a set of applications that connect client processing systems to the respective industry utilities or client internal solutions."
    + "The new ClearancePro Obligation Warehouse application and updates to ClearancePro’s CDS and CDCC applications eliminates manual and error-prone processes, enhances"
    + "risk management and consolidates clearance and settlement into a single location.",
    //Must not include this field!!!   created:{type:Date, default: Date.now}
    },
    { 
    title:"Broadridge Financial Solutions, Inc.",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8rfYSctHjWwGwPbrn7Wv8SIyUyJkfsODcHW9ISS4uDgBq369",
    body:"Broadridge, a global fintech leader with $4 billion in revenue, helps clients get ahead of today’s challenges" 
    + "to capitalize on what’s next with communications, technology, data and analytics solutions that help transform their businesses."
    + "BR (NYSE) 107.81  stock-arrow 0.42"
    + "<p><strong>MileStones</strong></p>"
    + "<p>In 2010, Broadridge Financial Solutions acquired NewRiver, Inc., an innovator in Electronic Investor Disclosure [3]</p>"
    + "<p>In 2011, it acquired Matrix Financial Solutions, a provider of retirement products for third party administrators and other financial professionals.[4]</p>"
    + "<p>Also in 2011, Broadridge Financial Solutions acquired Paladyne Systems, Inc., a provider of investment management solutions.[5]</p>"
    + "<p>In 2016, Broadridge Financial Solutions acquired DST’s North American Customer Communications Business. [6]</p>"
    + "<p>Also in 2016, the company acquired M&amp;O Systems, Inc., an advisor to wealth management firms, for $25 million in cash.[7]</p>"
    + "<p>In 2017, the company acquired institutional Spence Johnson for an undisclosed sum.[8]</p>",
    //Must not include this field!!!   created:{type:Date, default: Date.now}
    },
];

function seedDB(){
    Note.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("All Notes have been removed");
        seedsData.forEach(function(seed){
            Note.create(seed, function(err,note){
                if(err){
                    console.log(err);
                }else{
                    console.log("Added a new note...");
                    console.log(note);
                    //Add a new comment once having added a new note
                    Comment.create({
                        author:"Yifan",
                        text:"This is an automatically generated test comment, when seeding the Database..."
                    },function(err, comment){
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Added a new comment to the note");
                            note.comments.push(comment);
                            note.save();
                            console.log(note.comments);
                        }
                        
                    });
                }
            });
        });
    });
}

module.exports = seedDB;