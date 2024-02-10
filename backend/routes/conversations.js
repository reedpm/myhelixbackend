// Note for new groups: Conversations are basically just DM's between Profiles

// Route to create a post or get info regarding a post
const express = require("express");
const router = express.Router(); // Initialize router

// Import the conversation controller
const conversationController = require("../controllers/conversations.js");

// Use a post method to create a new conversation
/**
 * @swagger
 * /api/conversations/send/:
 *   post:
 *     summary: Sends a new message to a particular conversation
 *     tags:
 *       - Conversations/Messages
 *     requestBody:
 *       description: This JSON object should include the conversation ID as well as the profile ID of the profile sending a message as well as the message itself
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               convoID:
 *                 type: string
 *                 description: The conversation ID that the message should be sent to
 *               senderID:
 *                 type: string
 *                 description: The ID of the profile sending the message
 *               message:
 *                 type: string
 *                 description: The contents of the message
 *     responses:
 *       '200':
 *         description: Successfully sent conversation requests to profiles
 */  
router.post("/send/", conversationController.sendMessage);

// Export router for use in app.js
module.exports = router;