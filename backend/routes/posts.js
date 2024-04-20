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
 *     tags:
 *       - Post
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
 *     tags:
 *       - Post
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
 *     tags:
 *       - Post
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
 *     tags:
 *       - Post
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

/**
 * @swagger
 * /api/posts/getPostsByProfileID/{proid}:
 *   get:
 *     summary: Gets all posts that have been created by the given profile ID
 *     tags:
 *       - Post
 *     parameters:
 *       - in: path
 *         name: proid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the profile whose posts are to be retrieved
 *     responses:
 *       '200':
 *         description: Successfully retrieved all posts made by the given a profile ID
 */
router.get("/getPostsByProfileID/:profileID", PostController.getPostsByCreatedBy);

/**
 * @swagger
 * /api/posts/createComment/:
 * post:
 *     summary: Creates a post
 *     tags:
 *       - Comment
 *     requestBody:
 *       description: This JSON object should include all the necessary components to create a comment
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commenter:
 *                 type: string
 *                 description: The ID of the profile creating the comment
 *               content:
 *                 type: string
 *                 description: The contents of the comment
 *             required:
 *               - commenter
 *               - commentBody
 *     responses:
 *       '200':
 *         description: Successfully created a new Comment 
 */
router.post("/createComment/", PostController.createComment);

/**
 * @swagger
 * /api/posts/getCommentsByPostID/{postid}:
 *   get:
 *     summary: Gets all comments that have been created for the given post id
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: postid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post whose comments are to be retrieved
 *     responses:
 *       '200':
 *         description: Successfully retrieved all comments made for the given a post ID
 */
router.get("/getCommentsByPostID/:postid", PostController.getCommentsByPostID);

// Export router for use in app.js
module.exports = router;