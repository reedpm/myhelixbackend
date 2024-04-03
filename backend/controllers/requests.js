// Import modules
const { handleError } = require("../extern/error");
const Profile = require("../models/profile.js");
const Request = require("../models/requests.js");
const Conversation = require("../models/conversations.js");
const mongoose = require("mongoose");
const { profile } = require("console");




/**
 * IMPORTANT NOTE: Public and Personal profiles should be homogenous.
 *                 That is, public profiles should not be able to 
 *                 send personal profiles any requests and vice versa.
 */


/* ========================================================
   = Start to the Follow/Unfollow controller functions
   ======================================================== */
/**
 * Given: Profile IDs'
 * Function: Adds the current user to the list of followers of the user being followed
 * 
 */

// exports.fetchConnectionRequests = async(req)

// exports.followPublicProfile = async (req, res, next) => {
//     try {
//         // Find profile to be followed
//         const profileToBeFollowed = await Profile.findById(req.params.id);
//         // Current Profile
//         const currentProfile = await Profile.findById(req.params.profileID);

//         if(profileToBeFollowed.type !== currentProfile.type || profileToBeFollowed.type === "PERSONAL") {
//             return next(handleError(405, "Invalid profile types => No request sent"));
//         }

//         // Check to see if the profile that needs to be followed already has the sender profile id in its followers list
//         // If currentProfile is not following the profile to be followed
//         if(!profileToBeFollowed.followers.includes(currentProfile._id)){
//             // Create a new request
//             // const newFollowRequest = new Request(
//             //     {
//             //         _id: new mongoose.Types.ObjectId(),
//             //         requestType: 'FOLLOW',
//             //         sender: currentProfile._id,
//             //         recipients: [profileToBeFollowed._id]
//             //     }
//             // );
            
//             // update follower list automatically if public profile
//             profileToBeFollowed.followers.push(currentProfile._id);
//             profileToBeFollowed.save();

//             currentProfile.following.push(profileToBeFollowed._id);
//             currentProfile.save();

//             res.status(200).send("Successfully Followed");

//             // await newFollowRequest.save();

//             // // We add an incoming request to the recipient profile
//             // profileToBeFollowed.incomingRequests.push(newFollowRequest);
//             // await profileToBeFollowed.save();

//             // // We also add the request to the outgoing requests of the current sender profile
//             // currentProfile.outgoingRequests.push(newFollowRequest);
//             // await currentProfile.save();
//         }
//         else{
//             // Send back a Conflict response
//             return next(handleError(403, "Error: Profile does not exist or no further action required"));
//         }
//     } catch(err){
//         next(err);
//     }
// }
// followPrivateProfile
exports.followPrivateProfile = async (req, res, next) => { // private profile follow
    try{
        // Find profile to be followed
        const profileToBeFollowed = await Profile.findById(req.params.id); 
        console.log("### profile to be followed: " + profileToBeFollowed);
        // Current Profile
        const currentProfile = await Profile.findById(req.params.profileID);
        console.log("### current profile " + currentProfile);

        // Before we do anything, double check that the types are the same and are PERSONAL PROFILES
        if(profileToBeFollowed.type !== currentProfile.type || profileToBeFollowed.type === "PUBLIC"){
            return next(handleError(405, "Invalid profile types => No request sent"));
        }

        // Check to see if the profile that needs to be followed already has the sender profile id in its followers list
        // If currentProfile is not following the profile to be followed
        if(!profileToBeFollowed.followers.includes(currentProfile._id)){
            console.log("### INSIDE TO BE FOLLOWED");
            // Create a new request
            const newFollowRequest = new Request(
                {
                    _id: new mongoose.Types.ObjectId(),
                    requestType: 'FOLLOW',
                    sender: currentProfile._id,
                    recipients: [profileToBeFollowed._id]
                }
            );

            await newFollowRequest.save();

            // We add an incoming request to the recipient profile
            profileToBeFollowed.incomingRequests.push(newFollowRequest._id);
            await profileToBeFollowed.save();

            // We also add the request to the outgoing requests of the current sender profile
            currentProfile.outgoingRequests.push(newFollowRequest._id);
            await currentProfile.save();
        }
        else{
            // Send back a Conflict response
            return next(handleError(403, "Error: Profile does not exist or no further action required"));
        }

        res.status(200).send("Follow Request Sent");
    }
    catch(err){
        next(err);
    }
}

exports.followPublicProfile = async (req, res, next) => { // private profile follow
    try{
        // Find profile to be followed
        const profileToBeFollowed = await Profile.findById(req.params.id);
        // Current Profile
        const currentProfile = await Profile.findById(req.params.profileID);

        // Before we do anything, double check that the types are the same and are PERSONAL PROFILES
        if(profileToBeFollowed.type !== currentProfile.type || profileToBeFollowed.type === "PUBLIC"){
            return next(handleError(405, "Invalid profile types => No request sent"));
        }

        // Check to see if the profile that needs to be followed already has the sender profile id in its followers list
        // If currentProfile is not following the profile to be followed
        if(!profileToBeFollowed.followers.includes(currentProfile._id)){
            profileToBeFollowed.followers.push(currentProfile._id);
            await profileToBeFollowed.save();

            currentProfile.following.push(profileToBeFollowed._id);
            await currentProfile.save();
        }
        else{
            // Send back a Conflict response
            return next(handleError(403, "Error: Profile does not exist or no further action required"));
        }

        res.status(200).send("Follow Request Sent");
    }
    catch(err){
        next(err);
    }
}

/**
 * Given: Profile IDs'
 * Function: Removes the current user to the list of followers of the user being followed
 */
exports.unFollowPrivateProfile = async (req, res, next) => {
    try{
        // Find profile to be followed
        const profileBeingFollowed = await Profile.findById(req.params.id);
        // Current Profile
        const currentProfile = await Profile.findById(req.params.profileID);
        console.log("unfollow private profile");
        // Pull the current profile from the followers list of the profile to unfollow if 
        // currently not following
        if(currentProfile.following.includes(profileBeingFollowed._id)){
            console.log("inside the includes ");
            // Pull the current profile from the list of followers of the profile being followed
            profileBeingFollowed.following.pull(currentProfile._id);
            await profileBeingFollowed.save();
            profileBeingFollowed.followers.pull(currentProfile._id);
            await profileBeingFollowed.save();

            currentProfile.following.pull(profileBeingFollowed._id);
            await currentProfile.save();
            currentProfile.followers.pull(profileBeingFollowed._id);
            await currentProfile.save();
        } else{
            return next(handleError(403, "Error: Profile does not exist or no further action required"));
        }

        res.status(200).send("Unfollowed Successfully");
    }
    catch(err){
        next(err);
    }
}

/**
 * Given: Profile IDs'
 * Function: Removes the current user to the list of followers of the user being followed
 */
exports.unFollowPublicProfile = async (req, res, next) => {
    try{
        // Find profile to be followed
        const profileBeingFollowed = await Profile.findById(req.params.id);
        // Current Profile
        const currentProfile = await Profile.findById(req.params.profileID);

        // Pull the current profile from the followers list of the profile to unfollow if 
        // currently not following
        if(currentProfile.following.includes(profileBeingFollowed._id)){
            // Pull the current profile from the list of followers of the profile being followed
            profileBeingFollowed.followers.pull(currentProfile._id);
            await profileBeingFollowed.save();

            currentProfile.following.pull(profileBeingFollowed._id);
            await currentProfile.save();
        }
        else{
            return next(handleError(403, "Error: Profile does not exist or no further action required"));
        }

        res.status(200).send("Unfollowed Successfully");
    }
    catch(err){
        next(err);
    }
}

/**
 * Given: a value of 0 or 1
 * Given: Request ID
 * Function: Responds to a private follow request (ACCEPT/REJECT)
 */
exports.respondToRequest = async (req, res, next) => { // request will be bi-directional --> follo
    try{
        // Here we are retrieving the response as an integer -> make sure it is a number
        const responseValue = parseInt(req.params.response);
        // If it's not a number handle error
        if(isNaN(responseValue)){
            return next(handleError(403, "Error: Response Value requires an integer"));
        }

        // Get the original request via the request id from the parameters
        const request = await Request.findById(req.params.reqID);

        // Get the profile responding to the request
        const recipient = await Profile.findById(request.recipients[0]);

        // Make sure the profile that is handling the request is indeed the recipient
        if(recipient._id.toString() !== req.params.profileID){
            return next(handleError(401, "Error: Profile Authorization invalid"));
        }

        // Get the profile of the original sender of the request
        const originalSender = await Profile.findById(request.sender);
        
        /**
         * 0 = Reject follow request
         * 1 = Accept follow request
         */
        // Accept the request
        if(responseValue){
            // Push the sender of the request to the followers list
            recipient.followers.push(originalSender._id);
            recipient.following.push(originalSender._id);
            await recipient.save();

            // Push the receiver of the request to sender's following list
            originalSender.following.push(recipient._id);
            originalSender.followers.push(recipient._id);
            await originalSender.save();
        }

        // Remove the outgoing request
        originalSender.outgoingRequests.pull(request._id);
        await originalSender.save();
        // Remove the incoming request
        recipient.incomingRequests.pull(request._id);
        await recipient.save();


        // Delete the request from the database
        await Request.findByIdAndDelete(request._id);

        res.status(200).send("Successfully handled follow request");
    }
    catch(err){
        next(err);
    }
}

/**
 * Given: a value of 0 or 1
 * Given: Request ID
 * Function: Responds to a follow request (ACCEPT/REJECT)
 */
exports.respondToFollow = async (req, res, next) => {
    try{
        // Here we are retrieving the response as an integer -> make sure it is a number
        const responseValue = parseInt(req.params.response);
        // If it's not a number handle error
        if(isNaN(responseValue)){
            return next(handleError(403, "Error: Response Value requires an integer"));
        }

        // Get the original request via the request id from the parameters
        const request = await Request.findById(req.params.reqID);
        // console.log("### here request: " + request);

        // Get the profile responding to the request
        const recipient = await Profile.findById(request.recipients[0]);
        // console.log("### here recipient: " + recipient);

        // Make sure the profile that is handling the request is indeed the recipient
        if(recipient._id.toString() !== req.params.profileID){
            return next(handleError(401, "Error: Profile Authorization invalid"));
        }

        // Get the profile of the original sender of the request
        const originalSender = await Profile.findById(request.sender);
        
        /**
         * 0 = Reject follow request
         * 1 = Accept follow request
         */
        // Accept the request
        if(responseValue){
            // Push the sender of the request to the followers list
            recipient.followers.push(originalSender._id);
            await recipient.save();

            // Push the receiver of the request to sender's following list
            originalSender.following.push(recipient._id);
            await originalSender.save();
        }

        // Remove the outgoing request
        originalSender.outgoingRequests.pull(request._id);
        await originalSender.save();
        // Remove the incoming request
        recipient.incomingRequests.pull(request._id);
        await recipient.save();


        // Delete the request from the database
        await Request.findByIdAndDelete(request._id);

        res.status(200).send("Successfully handled follow request");
    }
    catch(err){
        next(err);
    }
}
/* ========================================================
   = End of Follow/Unfollow controller functions
   ======================================================== */
/**

/* ===================================================================
   = Start to the Message/Conversation Requests controller functions =
   =================================================================== */

/**
 * PASS A JSON OBJECT AS PART OF THE REQUEST
 * Given: current Profile ID
 * Given: array of profile id's to start a conversation with
 * Function: Creates a new message/convo request
 */
exports.conversationRequest = async (req, res, next) => {
    try{
        // Find the profile that is starting the convo/message
        const messageStarter = await Profile.findById(req.body.profileID);

        // Create new Request Document
        const messageRequest = new Request(
            {
                _id: new mongoose.Types.ObjectId(),
                requestType: 'MESSAGE',
                convoCreated: false,
                sender: messageStarter._id,
                recipients: []
            }
        );
        
        // Grab the JSON array of recipient IDs
        const recipients = req.body.recipients;
        // Loop through each profile ID in the recipients array
        const promise = recipients.map(async (id) => {
            // Retrieve profile document
            const receiver = await Profile.findById(id);

            // If the types between profiles don't match, return with a 403 error
            // without saving the new document instance at all (Message/Convo Request is invalid)
            if(receiver.type !== messageStarter.type){
                return next(handleError(403, "Error: Profiles are not of the same type"));
            }
            // If we are sending a message request between personal profiles, make sure that at least one
            // of them are following each other
            if(receiver.type === 'PERSONAL'){
                if(!(receiver.followers.includes(messageStarter._id) || messageStarter.followers.includes(receiver.id))){
                    return next(handleError(403, "Error: Personal profiles require following criteria to send a message request"));
                }
            }

            // Push the recipient into the recipients list
            messageRequest.recipients.push(receiver._id);

        });

        // Since the above loop executes asyncronously, we need to wait for the loop to finish before saving
        await Promise.all(promise);
        // Save the request into the database
        await messageRequest.save();

        // If we reach this part of the code, then that means the message request saved properly and we need to add
        // the request to the respective incoming/outgoing request arrays
        recipients.map(async (id) => {
            // Retrieve profile document
            const receiver = await Profile.findById(id);

            // Push the request into the incoming request list
            receiver.incomingRequests.push(messageRequest._id);
            await receiver.save();
        });

        // Then push the request id into the outgoing request of the sender
        messageStarter.outgoingRequests.push(messageRequest._id);
        await messageStarter.save();

        res.status(200).send("Succesfully created a new message/conversation request");
    }
    catch(err){
        next(err);
    }
}

/**
 * Given: a value of 0 or 1
 * Given: request ID
 * Function: Responds to a message/convo request (ACCEPT/REJECT)
 */
exports.conversationResponse = async (req, res, next) => {
    try{
        // Here we are retrieving the response as an integer -> make sure it is a number
        const responseValue = parseInt(req.body.response);
        // If it's not a number handle error
        if(isNaN(responseValue)){
            return next(handleError(403, "Error: Response Value requires an integer"));
        }

        // Get the original request via the request id from the parameters
        const request = await Request.findById(req.body.reqID);

        // Get the profile responding to the request
        const currentProfile = await Profile.findById(req.body.profileID);

        // Only handle the request if the profile is in the current list of recipients
        if(request.recipients.includes(currentProfile._id)){
            /**
            * 0 = Reject message/convo request
            * 1 = Accept message/convo request
            */
            // Accept the request
            if(responseValue){
                // If the convo has no field => create a new conversation model
                if(request.convo === undefined){
                    // Create new convo
                    const newConvo = new Conversation(
                        {
                            _id: new mongoose.Types.ObjectId(),
                            conversators: [],
                            messages: []
                        }
                    );

                    // Push the sender into the conversators list
                    newConvo.conversators.push(request.sender);
                    // Save the newly created convo into the database
                    await newConvo.save();
                    // Push the convo into the original sender's conversation list(Profile)
                    const sender = await Profile.findById(request.sender);
                    sender.conversations.push(newConvo._id);
                    await sender.save();

                    // Now set the request convo field to the id of the newly created conversation
                    request.convo = newConvo._id;
                    await request.save();
                }

                // Add the current profile to the conversation
                const convo = await Conversation.findById(request.convo);
                convo.conversators.push(currentProfile._id);
                await convo.save();

                // Add the conversation to the current Profile
                currentProfile.conversations.push(convo._id);
                await currentProfile.save();
            }

            // Now we want to remove requests from lists
            // First remove from recipients incoming request list
            currentProfile.incomingRequests.pull(request._id);
            await currentProfile.save();

            // Next we want to remove the user id from the recipients list of the request
            request.recipients.pull(currentProfile._id);
            await request.save();

            // If there are no more recipients in the recipients list, delete the request altogether
            if(request.recipients.length === 0){
                // Remove the request from the original sender's outgoing request list
                const originalSender = await Profile.findById(request.sender);
                originalSender.outgoingRequests.pull(request._id);
                await originalSender.save();

                // Delete the request from the database
                await Request.findByIdAndDelete(request._id);
            }

            res.status(200).send("Successfully handled follow request");
        }
    }
    catch(err){
        next(err);
    }
}