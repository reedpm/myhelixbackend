// Route to handle any type of requests made by users
const express = require("express");
const router = express.Router();    // Initialize router

// Import the modules
const RequestController = require("../controllers/requests.js");
const { verifyToken } = require("../extern/verifyToken.js");

// Route to handle follow request
router.put("/follow", verifyToken, RequestController.followProfile);
// Route to handle an unfollow request
router.put("/unfollow", verifyToken, RequestController.unFollowProfile);