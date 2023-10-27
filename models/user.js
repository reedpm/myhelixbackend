const mongoose = require("mongoose");

// Here we are creating the schema for user information in our database
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    personalProfile: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Profile",
        required: false,
    },
    publicProfile: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Profile",
        required: false,
    },
    blocked: [
        { 
            type: String, 
            ref: "User", 
            required: false 
        }
    ],
},  { collection: 'Users' });

module.exports = mongoose.model("User", userSchema);
// Structure of User schema will be outlined in the Documentation