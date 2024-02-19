// Import the user schema
const { useSyncExternalStore } = require("react");
const mongoose = require("mongoose");
const { handleError } = require("../extern/error");
const User = require("../models/user.js");
const Profile = require("../models/profile.js");

/**
 * Given: user's email
 * Returns: User object if a user with the email exists
 */
exports.getUser = async (req, res, next) => {
  try{
    const user = await User.findOne({email: req.params.email});
    res.status(200).json(user);
  }
  catch(err){
    next(err);
  }
};

/**
 * Given: user's email
 * Returns: Updated user information
 */
exports.update = async (req, res, next) => {
  // We ensure that the email passed in the path matches the email passed by the verification token
  if(req.params.email === req.user.email){
    try{
      // Here we are finding user by email, and updating its contents with the provided body from the request
      const updatedUser = await User.findOneAndUpdate( {email: req.params.email}, 
        {
          $set: req.body,
        },
        {
          new: true, // This simply states that we return the user contents after the update has been completed
        }
      );

      res.status(200).json(updatedUser);
    }
    catch(err){
      next(err);
    }
  }
  else{
    return next(handleError(403, "Invalid User update request"));
  }
}

/**
 * Given: user's email
 * Returns: New public profile info
 */
exports.addPublicProfile = async (req, res, next) => {
  try{

    const user = await User.findOne({email: req.params.email});
    
    let profileImage, bio;
    if(req.body.profileImage){
      profileImage = req.body.profileImage;
    }
    else{
        profileImage = "";
    }
    if(req.body.bio){
        bio = req.body.bio;
    }
    else{
        bio = "";
    }

    // Create new public profile
    const newPublicProfile = new Profile(
        {
            _id: new mongoose.Types.ObjectId(),
            type: "PUBLIC",
            user: user.email,
            displayName: req.body.displayName,
            profileImage: profileImage,
            bio: bio
        }
    );
    // Save the newly created profile into the collection
    await newPublicProfile.save();

    // Add the new public profile to the list of the user's public profiles
    user.publicProfiles.push(newPublicProfile._id);

    // Save the user with the new public profile in the list of profiles
    await user.save();

    res
    .status(200)
    .json(user);
  }
  catch(err){
      next(err); 
  }
}

/**
 * Given: user's email
 * Delete User
 */
exports.delete = async (req, res, next) => {
  if(req.params.email === req.user.email) {
    try{
      // Find user in DB by email and delete
      await User.findOneAndDelete({email: req.params.email});

      res.status(200).json("User Deleted");
    }
    catch(err){
      next(err);
    }
  }
  else{
    return next(handleError(403, "Invalid user delete request"));
  }
}