// Routing refers to how an application’s endpoints (URIs) respond to client requests.
const express = require("express");
const router = express.Router();    // Initialize router

// Import modules
const UserController = require("../controllers/user.js");
const { verifyToken } = require("../extern/verifyToken.js");

// Route to update the user information
router.put("/:email", verifyToken, UserController.update);
// Route get request to user controller
router.get("/getUser/:email", UserController.getUser);
// Route to delete user
router.delete("/delete/:email", UserController.delete);

// Export router for use in app.js
module.exports = router;