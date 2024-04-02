const mongoose = require("mongoose");
const Notification = require("../models/notifications");
const Profile = require("../models/profile");

exports.addNotification = async (req, res, next) => {
    try{
        // get the profile id of the user that is generating the notification
        const notificationSender = await Profile.findById(req.body.senderProfileID);

        // get the profile id of the user that the notification is being sent to
        const notificationRecipient = await Profile.findById(req.body.recipientProfileID);

        // Create new Notification Document
        const notification = new Notification(
            {
                _id: new mongoose.Types.ObjectId(),
                notificationType: req.body.notificationType,
                sender: notificationSender._id,
                recipient: notificationRecipient._id,
                read: false,
                createDate: new Date(),
            }
        );
        // Save the notification into the database
        await notification.save();

        res.status(200).send("Succesfully created a new notification");
    }
    catch(err){
        next(err);
    }
}

exports.getNotificationsForProfile = async (req, res, next) => {
    try{
        Notification.find({ recipient: req.params.profileID }).exec()
        .then(data => {
            // If data is found, send it back
            // everytime the getNotifications route is called, we count the user as having read the notifications
            for (var i = 0; i < data.length; i++) {
                data[i]['read'] = true;
            }
            res.status(200).send({ data: data });
        })
        .catch(err => {
            // If an error occurs, send an error response
            res.status(403).send({ data: err.message });
        });
    }
    catch(err){
        console.log("error");
        next(err);
    }
}