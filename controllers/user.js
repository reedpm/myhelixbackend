// Import the user schema
const { handleError } = require("../extern/error");
const User = require("../models/user");

/**
 * Given: user's email
 * Returns: User object if a user with the email exists
 */
exports.getUser = async (req, res, next) => {
  try{
    const user = await User.findByEmail(req.params.email);
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