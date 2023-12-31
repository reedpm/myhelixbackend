// Route to create a post or get info regarding a post
const express = require("express");
const router = express.Router(); // Initialize router

// Import the post controller
const ProfileController = require("../controllers/profile.js");

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






// THESE ARE SUGGESTIONS OF API CALLS PULLED FROM THE ORIGINAL APP

// router.get("/getAllTagNotifications", ProfileController.getAllTagNotifications);

// router.get("/getNumFollowers/:proid", ProfileController.getNumFollowers);
// router.get("/getNumFollowing/:proid", ProfileController.getNumFollowing);
// router.get("/getAllFollowers/:proid", ProfileController.getAllFollowers);
// router.get("/getAllFollowing/:proid", ProfileController.getAllFollowing);
// router.get("/getFollowInfo/:proid", ProfileController.getFollowInfo);
// router.get(
//   "/getPageOwnerProfiles/:proid",
//   ProfileController.getPageOwnerProfiles
// );
// router.get("/isFollower/:follower/:followee", ProfileController.isFollower);
// router.get("/getNumFriends/:proid", ProfileController.getNumFriends);
// router.get(
//   "/getIncomingRequests/:proid",
//   ProfileController.getIncomingRequests
// );
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