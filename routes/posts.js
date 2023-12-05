// Route to create a post or get info regarding a post
const express = require("express");
const router = express.Router(); // Initialize router

// Import the post controller
const PostController = require("../controllers/posts.js");

// Use a post method to create the post given the profile ID

/**
 * @swagger
 * /api/posts/createPost/:
 *   post:
 *     summary: Creates a post
 *     requestBody:
 *       description: This JSON object should include all the necessary components to create a post
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileID:
 *                 type: string
 *                 description: The ID of the profile creating the post
 *               content:
 *                 type: string
 *                 description: The contents of the post
 *               category:
 *                 type: string
 *                 description: The category which this post falls under
 *             required:
 *               - profileID
 *               - content
 *     responses:
 *       '200':
 *         description: Successfully created a new Post (and returns the Post Doc)
 */
router.post("/createPost/", PostController.createPost);

// Use a delete method to remove the post from the database

/**
 * @swagger
 * /api/posts/delete/{postid}:
 *   delete:
 *     summary: Deletes a post
 *     parameters:
 *       - in: path
 *         name: postid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to be deleted
 *     responses:
 *       '200':
 *         description: Successfully deleted the post
 */
router.delete("/delete/:postid", PostController.deletePost);

// Use a post method to like a post and subsequently increase its like count

/**
 * @swagger
 * /api/posts/like/{postid}/{currentid}:
 *   post:
 *     summary: Likes a post (Adds to the like array and increments the like count of a post)
 *     parameters:
 *       - in: path
 *         name: postid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to be liked
 *       - in: path
 *         name: currentid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the profile that is liking the post
 *     responses:
 *       '200':
 *         description: Successfully liked the post given a profile ID
 */
router.post("/like/:postid/:currentid", PostController.likePost);

// Use a post method to unlike a post and subsequently decrease its like count

/**
 * @swagger
 * /api/posts/unlike/{postid}/{currentid}:
 *   post:
 *     summary: Unlikes a post (Removes a profile from the like array and decrements the like count of a post)
 *     parameters:
 *       - in: path
 *         name: postid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to be unliked
 *       - in: path
 *         name: currentid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the profile that is unliking the post
 *     responses:
 *       '200':
 *         description: Successfully unliked the post given a profile ID
 */
router.post("/unlike/:postid/:currentid", PostController.unlikePost);

// Export router for use in app.js
module.exports = router;