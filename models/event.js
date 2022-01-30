const mongoose = require('mongoose');
var mongoDB = "mongodb://localhost:27017/mhc";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const schema = mongoose.Schema({
    name: String,
    vendor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    confirm_Date: String,
    status : String,
    createAt: Date,
    request_Date: Array,
    reason : String
}, {collection: 'event'})


module.exports = mongoose.model("Event", schema)