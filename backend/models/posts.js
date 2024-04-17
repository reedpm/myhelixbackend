/**
 * Comment is for swagger documentation / defining the posts schema
 * 
 * @swagger 
 * components:
 *   schemas:
 *     Posts:
 *       type: object
 *       required:
 *         - _id
 *         - createdBy
 *       properties:
 *         name:
 *           type: string
 *           description: The name/category of a page
 *         topPosts:
 *           type: array
 *           description: An array of the top posts in relation to the page
 *         recentPosts:
 *           type: array
 *           description: An array of the most recent posts in relation to the page
 */


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
        ref: "Profiles",
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
            ref: "Profiles"
        }
    ],
    likeCount: Number,
    comments: [
        {
            commenter: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Profiles"
            },
            commentBody: {
                type: String,
                max: 200,
            },
            commentDate: {
                type: Date,
                default: Date.now,
            }
        }
    ]
    /** Convenience vars */
}, {collection: "Posts"});

module.exports = mongoose.model("Posts", postSchema);
// Structure of Schema is further outlined in the Documentation