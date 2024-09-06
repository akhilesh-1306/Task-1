const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AvailabilitySchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    date : {
        type : String,
        required : true,
    },
    startTime : {
        type : String,
        required : true,
    },
    endTime : {
        type : String,
        required : true,
    }
})

const AvailabilityModel = mongoose.model("availability",AvailabilitySchema);

module.exports = AvailabilityModel
