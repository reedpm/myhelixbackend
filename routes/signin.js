// Route to properly sign in user if user exists
const express = require("express");
const router = express.Router();    // Initialize router

// Import the signin controller
const SignInController = require("../controllers/signin.js");

// Use a post method to find the user
/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: Finds the user given email and password, verifies it, and returns a token containing user information to log the user in
 *     tags:
 *       - Signin
 *     requestBody:
 *       description: This JSON object should only include the password and the email to sign in a User
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
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successfully found, verified, and returned a token containing the user doc (minus the password)
 */
router.post("", SignInController.signin);

// Export router for use in app.js
module.exports = router;