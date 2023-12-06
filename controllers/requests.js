// Import modules
// const { handleError } = require("../extern/error");
// Import profile since requests are mainly made from each profile
const Profile = require("../models/profile.js");

// PARAMS
// profileID: the current profile ID of the client making the request
// id: the id of the profile profile being followed or unfollowed


/**
 * Given: Profile ID
 * Function: Adds the current user to the list of followers of the user being followed
 */
exports.followProfile = async (req, res, next) => {
    try{
        // Find profile to be followed
        const profileToBeFollowed = await Profile.findById(req.params.id);
        // Current Profile
        const currentProfile = await Profile.findById(req.params.profileID);

        // Push the current profile to followers list of the profile to be followed if 
        // currently not following
        if(!profileToBeFollowed.followers.includes(req.params.profileID)){
            // If the current profile is not already following the profile to be followed, we add
            // an incoming request to the recipient profile
            await profileToBeFollowed.updateOne({
                $push: {incomingRequests: {request: 0, profileID: req.params.profileID}}
            });
            

            // Make sure that we also add an outgoing request to the current profile
            await currentProfile.updateOne({
                $push: {outgoingRequests: {request: 0, profileID: req.params.profileID}}
            });
        }
        else{
            res.status(403).json("Error: Profile does not exist or no further action required");
        }
    }
    catch(err){
        next(err);
    }
}

/**
 * Given: Profile ID
 * Function: Removes the current user to the list of followers of the user being followed
 */
exports.unFollowProfile = async (req, res, next) => {
    try{
        // Find profile to be followed
        const profileBeingFollowed = await Profile.findOne(req.params.id);
        // Current Profile
        const currentProfile = await Profile.findOne(req.params.profileID);

        // Pull the current profile from the followers list of the profile to unfollow if 
        // currently not following
        if(!currentProfile.following.includes(req.params.id)){
            await profileBeingFollowed.updateOne({
                $pull: { following: req.params.id }
            });

            // Make sure we update the following list of the current profile as well
            await profileBeingFollowed.updateOne({
                $pull: { followers: req.params.profileID }
            });
        }
        else{
            res.status(403).json("Error: Profile does not exist or no further action required");
        }
    }
    catch(err){
        next(err);
    }
}


// Code to Conversations/Messaging requests should go here