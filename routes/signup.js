// Route to properly sign up/authenticate user if user does not exist
const express = require("express");
const router = express.Router();    // Initialize router

// Import the signup controller
const SignUpController = require("../controllers/signup.js");

// Because this is used to create a new user, we need to use the POST method
/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Signs up a new user
 *     tags:
 *       - Signup
 *     requestBody:
 *       description: This JSON object should only include the password and the email to sign up and create a new User
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               displayName:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - displayName
 *     responses:
 *       '200':
 *         description: Successfully created a new User doc
 */
router.post("", SignUpController.signup);

// Export router for use in app.js
module.exports = router;