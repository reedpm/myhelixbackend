// Import modules
// const { handleError } = require("../extern/error");
// Import profile since requests are mainly made from each profile
const Profile = require("../models/profile.js");

// PARAMS
// personalID: the current personal ID of the client making the request
// id: the id of the personal profile being followed or unfollowed


/**
 * Given: Profile ID
 * Function: Adds the current user to the list of followers of the user being followed
 */
exports.followProfile = async (req, res, next) => {
    try{
        // Find profile to be followed
        const profileToBeFollowed = await Profile.findOne(req.params.id);
        // Current Profile
        const currentProfile = await Profile.findOne(req.params.personalID);

        // Push the current profile to followers list of the profile to be followed if 
        // currently not following
        if(!profileToBeFollowed.followers.includes(req.params.personalID)){
            await profileToBeFollowed.updateOne({
                $push: {followers: req.params.personalID}
            });

            // Make sure we update the following list of the current profile as well
            await currentProfile.updateOne({
                $push: { followers: req.params.id }
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
        const currentProfile = await Profile.findOne(req.params.personalID);

        // Push the current profile to followers list of the profile to be followed if 
        // currently not following
        if(!currentProfile.following.includes(req.params.id)){
            await profileBeingFollowed.updateOne({
                $pull: { following: req.params.id }
            });

            // Make sure we update the following list of the current profile as well
            await profileBeingFollowed.updateOne({
                $pull: { followers: req.params.personalID }
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