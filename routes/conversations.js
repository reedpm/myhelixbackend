// Note for new groups: Conversations are basically just DM's between Profiles

// Route to create a post or get info regarding a post
const express = require("express");
const router = express.Router(); // Initialize router

// Import the conversation controller
const conversationController = require("../controllers/conversations.js");

// Use a post method to create a new conversation
router.post("/create/", conversationController.createConvo);