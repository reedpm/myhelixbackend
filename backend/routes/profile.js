// Route to create a post or get info regarding a post
const express = require("express");
const router = express.Router(); // Initialize router

// Import the post controller
const ProfileController = require("../controllers/profile.js");
const { verifyToken } = require("../extern/verifyToken.js");

// Pass in a profile ID and get the entire Profile Document back in a json
/**
 * @swagger
 * /api/profile/getProfile/{proid}:
 *   get:
 *     summary: Retrieves the Profile doc from the given profile ID
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: path
 *         name: proid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the profile to find
 *     responses:
 *       '200':
 *         description: Successfully found and returned the Profile doc
 */
router.get("/getProfile/:profileID", ProfileController.getProfile);

// Route to update profile information
/**
 * @swagger
 * /api/profile/updateProfile/{email}/{proid}:
 *   put:
 *     summary: Updates the profile information
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user that the profile to update belongs to
 *       - in: path
 *         name: proid
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id of the profile to be updated
 *     tags:
 *       - Profile
 *     requestBody:
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
 *                  type: string
 *     responses:
 *       '200':
 *         description: Successfully updated Profile with the data in the request body and returned the updated Profile doc
 */
router.put("/updateProfile/:email/:profileID", ProfileController.update);



/**
 * @swagger
 * /api/profile/getIncomingRequests/{proid}:
 *   get:
 *     summary: Gets the ObjectIDs of the profiles that have sent a request to the given profile
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: path
 *         name: proid
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id of the profile whose incoming requests we want
 *     responses:
 *       '200':
 *         description: Successfully gets all ObjectIDs of profiles that have sent a request to the given profile
 */
router.get(
  "/getIncomingRequests/:profileID",
  ProfileController.getIncomingRequests
);

/**
 * @swagger
 * /api/profile/getAllFollowing/{proid}:
 *   get:
 *     summary: Gets the ObjectIDs of the profiles that the given profile is following
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: path
 *         name: proid
 *         schema:
 *           type: string
 *         required: true
 *         description: The profile id of the profile whose following we want to get
 *     responses:
 *       '200':
 *         description: Successfully gets all ObjectIDs of profiles that the given profile is following
 */
router.get("/getAllFollowing/:profileID", ProfileController.getAllFollowing);

// THESE ARE SUGGESTIONS OF API CALLS PULLED FROM THE ORIGINAL APP

// router.get("/getAllTagNotifications", ProfileController.getAllTagNotifications);

// router.get("/getNumFollowers/:proid", ProfileController.getNumFollowers);
// router.get("/getNumFollowing/:proid", ProfileController.getNumFollowing);
// router.get("/getAllFollowers/:proid", ProfileController.getAllFollowers);

// router.get("/getFollowInfo/:proid", ProfileController.getFollowInfo);
// router.get(
//   "/getPageOwnerProfiles/:proid",
//   ProfileController.getPageOwnerProfiles
// );
// router.get("/isFollower/:follower/:followee", ProfileController.isFollower);
// router.get("/getNumFriends/:proid", ProfileController.getNumFriends);

// router.get(
//   "/getOutgoingRequests/:proid",
//   ProfileController.getOutgoingRequests
// );

// router.patch("/editProfile", ProfileController.setProfileInfo);
// router.patch("/followProfile", ProfileController.followProfile);
// router.patch("/unfollowProfile", ProfileController.unfollowProfile);
// router.patch("/withdrawRequest", ProfileController.withdrawRequest);
// router.patch("/sendRequest", ProfileController.sendRequest);
// router.patch("/unfriendProfile", ProfileController.unfriendProfile);
// router.patch("/acceptDenyRequest", ProfileController.acceptDenyRequest);
// router.post("/newPage", ProfileController.createNewPage);

// router.get("/getCategories", ProfileController.getCategories);

// router.get("/getProfessional", ProfileController.getProfessional);
// router.get("/getPersonal", ProfileController.getPersonal);

// router.get("/getConversations/:proid", ProfileController.getConversations);

// router.get("/getProfileID/:displayedName", ProfileController.getProfileID);
// router.get("/getProfileIDs", ProfileController.getProfileIDs);

// router.patch("/updateUnreadCount", ProfileController.updateUnreadCount);
// router.get("/getUnreadMessageCount/:proid", ProfileController.getUnreadMessageCount);

// Export router for use in app.js
module.exports = router;