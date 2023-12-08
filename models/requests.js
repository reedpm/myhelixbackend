/**
 * Comment is for swagger documentation / defining the request schema
 * @swagger 
 * components:
 *   schemas:
 *     Requests:
 *       type: object
 *       required:
 *         - _id
 *         - requestType
 *         - sender
 *         - recipients
 *       properties:
 *         _id:
 *           type: object
 *           description: The MongoDB ID of the request
 *         requestType:
 *           type: string
 *           description: The tag/descriptor of the type of request => Includes an enum of values to choose from
 *         convo:
 *           type: object
 *           description: The object ID of the conversation (should be undefined if one hasn't been created)
 *         sender:
 *           type: object
 *           description: The profile ID of the profile sending the request
 *         recipients:
 *           type: array
 *           description: The array of all the recipients of this particular request 
 */

// This is the Conversation schema -> Direct Messages
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    requestType: {
        type: String,
        required: true,
        enum: ['FOLLOW', 'MESSAGE']
    },
    convo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversations",
        required: false
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profiles",
        required: true,
    },
    recipients:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profiles",
            required: true
        }
    ]
    /** Convenience vars */
}, {collection: "Requests"});

module.exports = mongoose.model("Requests", requestSchema);
// Structure of Schema is further outlined in the Documentation