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
        type: String,
        ref: "Profile",
        required: true
    },
    postBody: {
        type: String,
        required: true,
        max: 200
    },
    imagesBase64: {
        type: [String],
    },
    likes: {
        type: Array,
        default: []
    },
    numLikes: {
        type: Number,
        default: 0
    },
    childPosts: {
        type: Array,
        default: []
    },
    visibility: {
        type: String,
        required: false
    },
    resharedBy: {
        type: Array,
        required: true,
        default: []
    },
    /** Convenience vars */

    // Reshare
    originPost: {
        type: ObjectID,
        required: false
    },

    // Comments
    immediateParentPost: {
        type: ObjectID,
        required: false
    },
    rootParentPost: {
        type: ObjectID,
        required: false
    }
}, {collection: "Posts"});

module.exports = mongoose.model("Posts", postSchema);
// Structure of Schema is further outlined in the Documentation