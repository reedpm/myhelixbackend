/**
 * Comment is for swagger documentation / defining the conversation schema
 * It's worth noting the conversation is basically a direct message thread
 * @swagger 
 * components:
 *   schemas:
 *     Conversations:
 *       type: object
 *       required:
 *         - _id
 *         - conversators
 *         - messages
 *       properties:
 *         _id:
 *           type: object
 *           description: The MongoDB ID of the conversation
 *         conversators:
 *           type: array
 *           description: The list of users involved in the conversation
 *         messages:
 *           type: array
 *           description: The messages within a single conversation
 */

// This is the Conversation schema -> Direct Messages
const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    conversators:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profiles",
            required: true
        }
    ],
    messages: [
        {
            message: {
                type: String,
                required: true
            },
            date: {
              type: Date,
              required: true  
            },
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Profiles",
                required: true
            }
        }
    ]
    /** Convenience vars */
}, {collection: "Conversations"});

module.exports = mongoose.model("Conversations", conversationSchema);
// Structure of Schema is further outlined in the Documentation