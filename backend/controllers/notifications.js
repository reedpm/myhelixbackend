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
                type: req.body.type,
                sender: notificationSender._id,
                recipient: notificationRecipient._id,
                read: false,
                createDate: new Date(),
            }
        );
        // Save the notification into the database
        await notification.save();

        // res.status(200).send("Succesfully created a new notification");
    }
    catch(err){
        next(err);
    }
}

exports.getNotificationsForProfile = async (req, res, next) => {
    // try{
    //     Notification.find({ recipient: req.params.profileID }).populate('sender').exec()
    //     .then(data => {
    //         // save data before updating read field
    //         // using object spread syntax to do shallow copy 
    //         const dataToSend = data.map(item => ({
    //             ...item.toObject(),
    //         }));
    //         // If data is found, send it back
    //         // everytime the getNotifications route is called, we count the user as having read the notifications
    //         data.forEach(item => {
    //             item.read = true;
    //         });
    //         res.status(200).send({ data: dataToSend });
    //     })
    //     .catch(err => {
    //         // If an error occurs, send an error response
    //         res.status(403).send({ data: err.message });
    //     });
    // }
    // catch(err){
    //     console.log("error");
    //     next(err);
    // }
    try {
        // notifications of the profile with the given profile id, sorted by most to least recent
        const data = await Notification.find({ recipient: req.params.profileID }).populate('sender').sort({ createDate: -1 }).exec();

        if (data.length > 0) {

            // Send the data in the response
            res.status(200).send({ data: data });

            // Update the read field for each notification
            data.forEach(item => {
                item.read = true;
            });

            // Save each updated notification individually
            await Promise.all(data.map(item => item.save()));
        } else {
            // Send a response if no data is found
            res.status(404).send({ message: 'No notifications found' });
        }
    } catch (err) {
        // Handle errors
        console.error('Error fetching notifications:', err);
        res.status(500).send({ message: 'Internal server error' });
    }
}