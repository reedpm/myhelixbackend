// Controller responsible for creating posts or getting posts
const mongoose = require("mongoose");
const bodyParser = require()
const Conversation = require("../models/conversations.js");

/**
 * Given: JSON body
 * JSON body will provide the profile ID's of all invited participants
 * This function will check first if everyone is mutually following one another
 * If even a single profile is not being followed, everyone will receive a request
 * for a direct message
 */
exports.createConvo = async (req, res, next) => {
    try{
        // Create a new post
        // (We understand that there should be a size limit to the contents of the post itself
        // however, it is most likely the better solution to check that on the frontend before
        // posting)
        const newPost = new Post(
            {
                _id: new mongoose.Types.ObjectId(),
                createdBy: req.body.profileID,
                postBody: req.body.content,
                createDate: new Date(myDate.toISOString()),
                category: req.body.category
            }
        );
        
        // Send the new post back to the user
        res.status(200).json(newPost);
    }
    catch(err){
        next(err);
    }
}