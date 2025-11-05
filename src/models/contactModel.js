const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name: {type: String,},
    email: {type: String,},
    message: {type: String},
    tel : {type: String,},
    telegram : {type: String,},
    instagram : {type: String,},
    facebook : {type: String,},
    linekdin : {type: String,},
})