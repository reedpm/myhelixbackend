/**
 * Comment is for swagger documentation / defining the comments schema
 * 
 * @swagger 
 * components:
 *   schemas:
 *     Comments:
 *       type: object
 *       required:
 *         - commenter
 *         - commentBody
 *         - commentDate
 *       properties:
 *         commenter:
 *           type: ID
 *           description: The ID of the profile that made the comment
 *         commentBody:
 *           type: String
 *           description: The text of the comment
 *         commentDate:
 *           type: Date
 *           description: The date the comment was created
 */


// This is the post schema
const mongoose = require("mongoose");

// Here we are creating the schema for individual posts in our database
// we hope that the field names are pretty self explanatory, but they will be elaborated on 
// in the documentation
const commentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profiles",
        required: true
    },
    commentBody: {
        type: String,
        required: true,
        max: 200
    },
    commentDate: {
        type: Date,
        required: true
    },
    /** Convenience vars */
}, { collection: "Comments" });

module.exports = mongoose.model("Comment", commentSchema);
