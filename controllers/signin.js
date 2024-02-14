// Import error handle function
const { handleError } = require("../extern/error");
// Import the user schema
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// THIS IS THE SECRET KEY FOR TOKENIZING OUR WEB TOKEN STRING PAYLOAD
// UPON DEPLOYING THE APP, PLEASE STORE THIS IN AN .ENV FILE
// (You can also change it to be more secure)
const key = "myhelix";

// Sign in method that sends a get request if the user is valid
exports.signin = async (req, res, next) => {
    try{
        const user = await User.findOne({ email: req.body.email }); // Try to find user by email
        
        // If user exists
        if(user){
            // Check to see if the password provided matches with the password in the DB
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            // Return cookie if password is correct
            if(passwordMatch){
                // Token with user id
                const token = jwt.sign({id: user._id}, key);
                const { password, ...userData } = user._doc;
                // send the token back to client as part of the response
                res
                .cookie("access_token", token, {
                    expires: new Date(Date.now() + 30 * 24 * 3600000) // Cookie is valid for 30 days
                })
                .status(200)
                .json(userData);
            }
            else{
                // Return error message if the password is incorrect
                return next(handleError(401, "Invalid Authentication"));
            }
        }
        else{
            // Returns error if user does not exist in the DB
            return next(handleError(404, "User not found"));
        }
    }
    catch(err){
        next(err);
    }
}