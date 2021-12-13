const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/huntdb",{useNewUrlParser:true});

let db = mongoose.connection;

db.on('open',() => {
    console.log("connected");
});

module.exports = mongoose;