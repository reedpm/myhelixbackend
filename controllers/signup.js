// Controller responsible for signing up/authenticating new user
const mongoose = require("mongoose");
const User = require("../models/user.js");
const Profile = require("../models/profile.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// THIS IS THE SECRET KEY FOR TOKENIZING OUR WEB TOKEN STRING PAYLOAD
// UPON DEPLOYING THE APP, PLEASE STORE THIS IN AN .ENV FILE
// (You can also change it to be more secure)
const key = "myhelix";

// Sign Up function that sends a post request to our API
exports.signup = async (req, res, next) => {
    // Encapsulate the signup method in a try-catch block
    try{
        // Encrypt the password provided in the request
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        let bio1, bio2;
        // End of password encryption

        // Create new user
        const newUser = new User(
            {
                email: req.body.email, 
                password: hash
            }
        );

        // Wait for the new user to be saved in the database
        await newUser.save();

        // Make sure that the bios exist before making our profile
        if(req.body.bio1){
            bio1 = req.body.bio1;
        }
        else{
            bio1 = "";
        }
        if(req.body.bio1){
            bio2 = req.body.bio2;
        }
        else{
            bio2 = "";
        }

        // Create personal profiles
        const personalProfile = new Profile(
            {
                _id: new mongoose.Types.ObjectId(),
                type: "PERSONAL",
                user: newUser.email,
                displayName: req.body.displayName,
                profileImage: "",
                bio: bio1
            }
        );
        await personalProfile.save();
        // Create public profile
        const publicProfile = new Profile(
            {
                _id: new mongoose.Types.ObjectId(),
                type: "PUBLIC",
                user: newUser.email,
                displayName: req.body.displayName,
                profileImage: "",
                bio: bio2
            }
        );
        await publicProfile.save();

        // Set the newly created profiles as the user's profiles
        newUser.personalProfile = personalProfile._id;
        newUser.publicProfile = publicProfile._id;
        // Wait for the new user to be saved in the database
        await newUser.save();

        // Once we've created a new user, we want that user to stay logged in
        // The solution is for the backend server to send a cookie back to the client
        // so that they can stay logged in for however long the cookie remains valid
        const token = jwt.sign({id: newUser._id}, key);

        // We don't want to include the password in our json response
        // so we separate the json between password and the other user data
        const { password, ...userData } = newUser._doc;

        // send the token back to client as part of the response
        res
        .cookie("access_token", token, {
            expires: new Date(Date.now() + 30 * 24 * 3600000) // Cookie is valid for 30 days
        })
        .status(200)
        .json(userData);
    }
    catch(err){
        next(err); // Middleware that guarantees the throwing of an error after a request fails
    }
}