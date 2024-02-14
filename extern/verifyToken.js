// This is to verify if the token's id matches with the user id for any update methods
const jwt = require("jsonwebtoken");
const {handleError} = require("./error.js");

// THIS IS THE SECRET KEY FOR TOKENIZING OUR WEB TOKEN STRING PAYLOAD
// UPON DEPLOYING THE APP, PLEASE STORE THIS IN AN .ENV FILE
// (You can also change it to be more secure)
const key = "myhelix";

// Function to verify that the token's id matches user id
exports.verifyToken = (req, res, next) => {
    // Grab the token from the session
    const token = req.cookies.access_token;
    // If token exists
    if(token){
        // Verify that the token matches with the user id
        jwt.verify(token, key, (err, user) => {
            if(err){
                return next(handleError(403, "Token is invalid"));
            }
            else{
                req.user = user;
            }
        });
    }
    else{
        return next(handleError(401, "Invalid Authentication"));
    }
}