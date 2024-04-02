/**
 * Comment is for swagger documentation / defining the request schema
 * @swagger 
 * components:
 *   schemas:
 *     Notifications:
 *       type: object
 *       required:
 *         - _id
 *         - notificationType
 *         - sender
 *         - recipient
 *       properties:
 *         _id:
 *           type: object
 *           description: The MongoDB ID of the notification
 *         notificationType:
 *           type: string
 *           description: The descriptor of the type of notification => Includes an enum of values to choose from
 *         sender:
 *           type: object
 *           description: The profile ID of the profile that caused the notification
 *         recipient:
 *           type: array
 *           description: The profile ID of the profile that the notification is sent to
 */

// This is the Conversation schema -> Direct Messages
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    notificationType: {
        type: String,
        required: true,
        enum: ['FOLLOW', 'MESSAGE', 'LIKE', 'COMMENT']
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profiles",
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profiles",
        required: true
    },
    read: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
    },
    createDate: {
        type: Date,
        required: true
    },
    /** Convenience vars */
}, {collection: "Notifications"});

module.exports = mongoose.model("Notifications", notificationSchema);
// Structure of Schema is further outlined in the Documentation