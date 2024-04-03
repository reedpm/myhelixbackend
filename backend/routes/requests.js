// Route to handle any type of requests made by users
const express = require("express");
const router = express.Router();    // Initialize router

// Import the modules
const RequestController = require("../controllers/requests.js");
const { verifyToken } = require("../extern/verifyToken.js");


/* ========================================================
   = Start to the Follow/Unfollow routes
   ======================================================== */
// Route to send follow request
/**
 * @swagger
 * /api/requests/follow/{id}/{profileID}:
 *   post:
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
router.put("/followprivate/:id/:profileID", RequestController.followPrivateProfile);
// `requests/followprivate/${followProfileId}/${currentProfileID}`

// Route to send follow request
/**
 * @swagger
 * /api/requests/follow/{id}/{profileID}:
 *   post:
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
router.put("/followpublic/:id/:profileID", RequestController.followPublicProfile);

// Route to unfollow 
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
router.put("/unfollowprivate/:id/:profileID", RequestController.unFollowPrivateProfile);

// Route to unfollow 
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
router.put("/unfollowpublic/:id/:profileID",  RequestController.unFollowPublicProfile);

// Route to handle a follow request
/**
 * @swagger
 * /api/requests/handlefollow/{response}/{reqID}/{profileID}:
 *   put:
 *     summary: Handles a follow request
 *     tags:
 *       - Requests
 *     parameters:
 *       - in: path
 *         name: response
 *         schema:
 *           type: number
 *         required: true
 *         description: The response code of the profile's decision
 *       - in: path
 *         name: reqID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the request
 *       - in: path
 *         name: profileID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the profile that is handling the request (Also the recipient)
 *     responses:
 *       '200':
 *         description: Successfully handled the follow request
 */
router.put("/handlefollow/:response/:reqID/:profileID", RequestController.respondToFollow);

// Route to handle a follow request
/**
 * @swagger
 * /api/requests/handlerequest/{response}/{reqID}/{profileID}:
 *   put:
 *     summary: Handles a follow request
 *     tags:
 *       - Requests
 *     parameters:
 *       - in: path
 *         name: response
 *         schema:
 *           type: number
 *         required: true
 *         description: The response code of the profile's decision
 *       - in: path
 *         name: reqID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the request
 *       - in: path
 *         name: profileID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the profile that is handling the request (Also the recipient)
 *     responses:
 *       '200':
 *         description: Successfully handled the follow request
 */
router.put("/handlerequest/:response/:reqID/:profileID", RequestController.respondToRequest);


/* ========================================================
   = Start to any Message/Conversation routes
   ======================================================== */

/**
 * @swagger
 * /api/requests/messagerequest/:
 *   post:
 *     summary: Creates a request to start a conversation with other profiles
 *     tags:
 *       - Requests
 *     requestBody:
 *       description: This JSON object should include the sender's profile ID as well as the list of profile ID's to add in particular conversation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileID:
 *                 type: string
 *                 description: The ID of the profile sending the request
 *               recipients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The list of ID's to add to the conversation
 *     responses:
 *       '200':
 *         description: Successfully sent conversation requests to profiles
 */   
router.post("/messagerequest/", RequestController.conversationRequest);

/**
 * @swagger
 * /api/requests/messageresponse/:
 *   post:
 *     summary: Handles the response to a particular conversation request
 *     tags:
 *       - Requests
 *     requestBody:
 *       description: This JSON object should include the sender's profile ID as well as the list of profile ID's to add in particular conversation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               response:
 *                 type: number
 *                 description: The response code of the current profile's (recipient) decision
 *               reqID:
 *                 type: string
 *                 description: The ID of the request
 *               profileID:
 *                 type: string
 *                 description: The ID of the profile that is responding to the request
 *     responses:
 *       '200':
 *         description: Successfully sent conversation requests to profiles
 */   
router.post("/messageresponse/", RequestController.conversationResponse);

module.exports = router;