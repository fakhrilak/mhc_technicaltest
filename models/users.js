const mongoose = require('mongoose');
var mongoDB = "mongodb://localhost:27017/mhc";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const schema = mongoose.Schema({
    username: String,
    email: String,
    picture: String,
    desc : String,
    password: String,
    role : Number
}, {collection: 'users'})


module.exports = mongoose.model("Users", schema)