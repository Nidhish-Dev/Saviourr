const mongoose = require('mongoose');

const seekerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    registrationNumber: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    },
    email: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
      
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    }
}, {timestamps:true});

module.exports = mongoose.model('Seeker', seekerSchema);
