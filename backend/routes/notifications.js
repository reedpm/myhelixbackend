const express = require("express");
const router = express.Router();    

// Import the modules
const NotificationController = require("../controllers/notifications.js");

/**
 * @swagger
 * /api/notifications/addNotification/:
 *   post:
 *     summary: Adds a notification
 *     tags:
 *       - Notifications
 *     requestBody:
 *       description: This JSON object should include the sender's profile ID, receiver's profile ID, and notification type 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  senderProfileID:
 *                      type: string
 *                      description: The ID of the profile generating the notification
 *                  recipientProfileID:
 *                      type: string
 *                      description: The ID of the profile generating the notification
 *                  notificationType:
 *                      type: string
 *                      description: The type of the notification, from ['FOLLOW', 'MESSAGE', 'LIKE', 'COMMENT']
 *     responses:
 *       '200':
 *         description: Successfully created the notification
 */   
router.post("/addNotification/", NotificationController.addNotification);

/**
 * @swagger
 * /api/notifications/getNotificationsByProfileID/{profileID}:
 *   get:
 *     summary: Gets all notifications of the given profile ID
 *     tags:
 *       - Notifications
 *     parameters:
 *       - in: path
 *         name: profileID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the profile whose notifications we want to retrieve
 *     responses:
 *       '200':
 *         description: Successfully got all notifications for given profile
 */   
router.get("/getNotificationsByProfileID/:profileID", NotificationController.getNotificationsForProfile);

module.exports = router;