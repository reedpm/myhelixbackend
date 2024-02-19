// Routing refers to how an application’s endpoints (URIs) respond to client requests.
const express = require("express");
const router = express.Router();    // Initialize router

// Import modules
const UserController = require("../controllers/user.js");
const { verifyToken } = require("../extern/verifyToken.js");

// Route to update the user information
/**
 * @swagger
 * /api/user/{email}:
 *   put:
 *     summary: Updates the user information (should mainly be used for updating email and/or password)
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the User that we want to find
 *     tags:
 *       - User
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully updated User with the data in the request body and returned the new User doc
 */
router.put("/:email", verifyToken, UserController.update);


// Route get request to user controller
/**
 * @swagger
 * /api/user/getUser/{email}:
 *   get:
 *     summary: Retrieves the User doc from the given email
 *     responses:
 *       200:
 *         description: Successfully found and returned the new User doc
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the User that we want to find
 */
router.get("/getUser/:email", UserController.getUser);

/**
 * @swagger
 * /api/user/addPublicProfile/{email}:
 *   put:
 *     summary: Creates a new public Profile for the User with the given email
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the User that we want to add a public profile to
 *     tags:
 *       - User
 *     requestBody:
 *       description: This JSON object should include the display name, profile picture, and bio of the new profile
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *               profileImage:
 *                 type: string
 *               bio:
 *                 type: string
 *             required:
 *               - displayName
 *     responses:
 *       '200':
 *         description: Successfully created a new public Profile
 */
router.put("/addPublicProfile/:email", UserController.addPublicProfile);


// Route to delete user
/**
 * @swagger
 * /api/user/delete/{email}:
 *   delete:
 *     summary: Deletes the User associated with the given email
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the User that we want to find
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Successfully deleted the User from the database
 */
router.delete("/delete/:email", UserController.delete);

// Export router for use in app.js
module.exports = router;