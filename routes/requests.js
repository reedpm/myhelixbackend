// Route to handle any type of requests made by users
const express = require("express");
const router = express.Router();    // Initialize router

// Import the modules
const RequestController = require("../controllers/requests.js");
const { verifyToken } = require("../extern/verifyToken.js");

// Route to handle follow request

/**
 * @swagger
 * /api/requests/follow/{id}/{profileID}:
 *   put:
 *     summary: Places a Follow request to the profile's incoming requests array
 *     tags:
 *       - Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the profile that we want to follow
 *       - in: path
 *         name: profileID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the current profile sending the request
 *     responses:
 *       '200':
 *         description: Successfully sent a follow request to the profile being followed
 */
router.put("/follow/:id/:profileID", verifyToken, RequestController.followProfile);

// Route to handle an unfollow request
/**
 * @swagger
 * /api/requests/unfollow/{id}/{profileID}:
 *   put:
 *     summary: Unfollows a specific profile
 *     tags:
 *       - Requests
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the profile that we want to unfollow
 *       - in: path
 *         name: profileID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the current profile
 *     responses:
 *       '200':
 *         description: Successfully unfollowed a specific profile
 */
router.put("/unfollow/:id/:profileID", verifyToken, RequestController.unFollowProfile);


// SPACE TO ADD MESSAGING/ CONVERSATION REQUESTS HERE


module.exports = router;