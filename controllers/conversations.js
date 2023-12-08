// Controller responsible for creating posts or getting posts
const mongoose = require("mongoose");
const Conversation = require("../models/conversations.js");

/**
 * Given: JSON body
 * Function: Send a message to the respective conversation
 */
exports.sendMessage = async (req, res, next) => {
    try{
        // First grab the conversation from the body
        const convo = await Conversation.findById(req.body.convoID);
        // Create new conversation object
        const message = {
            message: req.body.message,
            date: new Date(),
            sender: req.body.senderID
        }

        // Push the message into the conversation msgs array
        convo.messages.push(message);
        
        // Send the new post back to the user
        res.status(200).send("Message sent");
    }
    catch(err){
        next(err);
    }
}