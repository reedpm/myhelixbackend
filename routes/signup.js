// Route to properly sign up/authenticate user if user does not exist
const express = require("express");
const router = express.Router();    // Initialize router

// Import the signup controller
const SignUpController = require("../controllers/signup.js");

// Because this is used to create a new user, we need to use the POST method
router.post("", SignUpController.signup);

// Export router for use in app.js
module.exports = router;