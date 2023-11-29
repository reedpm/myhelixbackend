// Route to create a post or get info regarding a post
const express = require("express");
const router = express.Router(); // Initialize router

// Import the post controller
const PostController = require("../controllers/posts.js");

// Use a post method to create the post given the profile ID
router.post("/createPost/", PostController.createPost);

// Use a delete method to remove the post from the database
router.delete("/delete/:postid", PostController.deletePost);

// Use a post method to like a post and subsequently increase its like count
router.post("/like/:postid/:currentid", PostController.likePost);

// Use a post method to unlike a post and subsequently decrease its like count
router.post("/unlike/:postid/:currentid", PostController.unlikePost);

// Export router for use in app.js
module.exports = router;