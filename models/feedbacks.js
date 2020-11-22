const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Currency = mongoose.Types.Currency;

const feedbackSchema = new Schema({
    firstname : {
        type: String,
        required: true,
    },
    lastname : {
        type: String,
        required: true,
    },
    telnum:{
        type: String,
        required: true,
        minlength:10,
        maxlength:10
    },
    email:{
        type: String,
        required: true,
    },
    agree:{
        type: Boolean,
        required: true,
    },
    contacttype:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

var Feedbacks = mongoose.model("feedback",feedbackSchema);
module.exports = Feedbacks ;