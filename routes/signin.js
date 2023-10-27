// Route to properly sign in user if user exists
const express = require("express");
const router = express.Router();    // Initialize router

// Import the signin controller
const SignInController = require("../controllers/signin.js");

// Use a post method to find the user
router.post("/:email", SignInController.signin);

// Export router for use in app.js
module.exports = router;