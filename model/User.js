const mongoose = require('../config/db');

const schema = mongoose.Schema;

const userSchema = new schema({
    name : String,
    photo : String,   //dont use image otherwise it will not work
    gender : String,
    age : Number,
    date : { type:Date, default:Date.now()}
});

const User = mongoose.model("User",userSchema);

module.exports = User;