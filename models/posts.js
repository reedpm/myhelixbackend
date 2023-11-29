// This is the post schema
const mongoose = require("mongoose");

// Here we are creating the schema for individual posts in our database
// we hope that the field names are pretty self explanatory, but they will be elaborated on 
// in the documentation
const postSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    postBody: {
        type: String,
        required: true,
        max: 200
    },
    createDate: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        ref: "Pages",
        required: false
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        }
    ],
    likeCount: Number,
    /** Convenience vars */
}, {collection: "Posts"});

module.exports = mongoose.model("Posts", postSchema);
// Structure of Schema is further outlined in the Documentation