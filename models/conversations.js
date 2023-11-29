// This is the Conversation schema -> Direct Messages
const mongoose = require("mongoose");

// Here we are creating the schema for individual posts in our database
// we hope that the field names are pretty self explanatory, but they will be elaborated on 
// in the documentation
const conversationSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    conversators:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
            required: true
        }
    ],
    messages: [
        {
            message: String,
            date: Date,
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Profile",
                required: true
            }
        }
    ]
    /** Convenience vars */
}, {collection: "Conversations"});

module.exports = mongoose.model("Conversations", conversationSchema);
// Structure of Schema is further outlined in the Documentation